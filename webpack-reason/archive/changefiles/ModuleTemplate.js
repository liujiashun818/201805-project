/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Tapable = require("tapable").Tapable;
const SyncWaterfallHook = require("tapable").SyncWaterfallHook;
const SyncHook = require("tapable").SyncHook;

module.exports = class ModuleTemplate extends Tapable {
	constructor(runtimeTemplate) {
		super();
		this.runtimeTemplate = runtimeTemplate;
		this.hooks = {
			content: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			module: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			render: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			package: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			hash: new SyncHook(["hash"])
		};
	}

	render(module, dependencyTemplates, options) {
		const moduleSource = module.source(
			dependencyTemplates,
			this.runtimeTemplate
		);
		console.log('    ModuleTemplate:content');	
		const moduleSourcePostContent = this.hooks.content.call(
			moduleSource,
			module,
			options,
			dependencyTemplates
		);
		console.log('    ModuleTemplate:module');
		const moduleSourcePostModule = this.hooks.module.call(
			moduleSourcePostContent,
			module,
			options,
			dependencyTemplates
		);
		console.log('    ModuleTemplate:render');
		const moduleSourcePostRender = this.hooks.render.call(
			moduleSourcePostModule,
			module,
			options,
			dependencyTemplates
		);
		console.log('    ModuleTemplate:package');
		return this.hooks.package.call(
			moduleSourcePostRender,
			module,
			options,
			dependencyTemplates
		);
	}

	updateHash(hash) {
		hash.update("1");
		console.log('    ModuleTemplate:hash');
		this.hooks.hash.call(hash);
	}
};
