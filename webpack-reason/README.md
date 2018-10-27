## 1. webpack工作原理
### 1.1 流程概括
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### 1.2 三大阶段
- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
- 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
- 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

## 调试
```js
npm i vscode-webpack-debugger -D
```

### 初始化阶段
```js
/Users/zhangrenyang/Documents/Projects/webpack-reason/node_modules/webpack-cli/bin/webpack.js
```
|行数|时间名|说明|
|:----|:----|:----|
|217|初始化参数|从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。|{context:"/Users/zhangrenyang/Documents/Projects/webpack-reason"
entry:"./src/index.js"
output:Object {path: "/Users/zhangrenyang/Documents/Projects/webpack-reason/dist", filename: "bundle.js"}
}|
|436|实例化 Compiler|用上一步得到的参数初始化 Compiler 实例，Compiler 负责文件监听和启动编译。Compiler 实例中包含了完整的 Webpack 配置，全局只有一个 Compiler 实例。|


## 2. 日志
### 2.1 注册流程
>
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync FileKindPlugin
tapAsync DirectoryExistsPlugin
tapAsync MainFieldPlugin
tapAsync UseFilePlugin
tapAsync AppendPlugin
tapAsync SymlinkPlugin
tapAsync FileExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
tapAsync ModuleAppendPlugin
tap Compiler
tap ResolverFactory
tap NodeEnvironmentPlugin
tap JsonpTemplatePlugin
tap FetchCompileWasmTemplatePlugin
tap FunctionModulePlugin
tap NodeSourcePlugin
tap LoaderTargetPlugin
tap JavascriptModulesPlugin
tap JsonModulesPlugin
tap WebAssemblyModulesPlugin
tap EntryOptionPlugin
tap SingleEntryPlugin
tapAsync SingleEntryPlugin
tap CompatibilityPlugin
tap HarmonyModulesPlugin
tap AMDPlugin
tap CommonJsPlugin
tap LoaderPlugin
tap NodeStuffPlugin
tap RequireJsStuffPlugin
tap APIPlugin
tap ConstPlugin
tap UseStrictPlugin
tap RequireIncludePlugin
tap RequireEnsurePlugin
tap RequireContextPlugin
tap ImportPlugin
tap SystemPlugin
tap WarnNoModeSetPlugin
tap EnsureChunkConditionsPlugin
tap RemoveParentModulesPlugin
tap RemoveEmptyChunksPlugin
tap MergeDuplicateChunksPlugin
tap FlagIncludedChunksPlugin
tap OccurrenceOrderPlugin
tap SideEffectsFlagPlugin
tap FlagDependencyExportsPlugin
tap FlagDependencyUsagePlugin
tap ModuleConcatenationPlugin
tap SplitChunksPlugin
tap NoEmitOnErrorsPlugin
tap DefinePlugin
tap { name: 'UglifyJSPlugin' }
tap SizeLimitsPlugin
tap TemplatedPathPlugin
tap RecordIdsPlugin
tap WarnCaseSensitiveModulesPlugin
tap WebpackOptionsApply
Compiler:before-run
Compiler:run
tap NormalModuleFactory
normal-module-factory
tap ContextModuleFactory
Compiler:context-module-factory
Compiler:before-compile
Compiler:compile
tap Compilation
tap MainTemplate
Compiler:this-compilation
tap JsonpMainTemplatePlugin
tap JsonpChunkTemplatePlugin
tap JsonpHotUpdateChunkTemplatePlugin
tap FetchCompileWasmMainTemplatePlugin
tap WasmModuleTemplatePlugin
Compiler:compilation
tap FunctionModuleTemplatePlugin
tapAsync { name: 'UglifyJSPlugin' }
tapAsync UnsafeCachePlugin
    ResolverFactory:resolver
tapAsync AliasFieldPlugin
tapAsync AliasPlugin
    Resolver:resolveStep
tap Parser
    NormalModuleFactory:parser
tap HarmonyDetectionParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyExportDependencyParserPlugin
tap HarmonyTopLevelThisParserPlugin
tap AMDRequireDependenciesBlockParserPlugin
tap AMDDefineDependencyParserPlugin
tap CommonJsRequireDependencyParserPlugin
tap RequireResolveDependencyParserPlugin
tap RequireIncludeDependencyParserPlugin
tap RequireEnsureDependenciesBlockParserPlugin
tap RequireContextDependencyParserPlugin
tap ImportParserPlugin


###  2.2 触发流程
> 
Compiler:before-run
Compiler:run
normal-module-factory
Compiler:context-module-factory
Compiler:before-compile
Compiler:compile
Compiler:this-compilation
Compiler:compilation
Compiler:make
    NormalModuleFactory:before-resolve
    NormalModuleFactory:factory
    NormalModuleFactory:resolver
    ResolverFactory:resolve-options
    ResolverFactory:resolver
    Resolver:resolveStep
    NormalModuleFactory:parser
    NormalModuleFactory:generator
    NormalModuleFactory:after-resolve
    NormalModuleFactory:create-module
    NormalModuleFactory:module
  Compilation:build-module
  Compilation:succeed-module
  Compilation:finish-modules
  Compilation:seal
  Compilation:optimize-dependencies-basic
  Compilation:optimize-dependencies
  Compilation:optimize-dependencies-advanced
  Compilation:after-optimize-dependencies
  Compilation:optimize
  Compilation:optimize-modules-basic
  Compilation:optimize-modules
  Compilation:optimize-modules-advanced
  Compilation:after-optimize-modules
  Compilation:optimize-chunks-basic
  Compilation:optimize-chunks
  Compilation:optimize-chunks-advanced
  Compilation:after-optimizeChunks
  Compilation:optimize-tree
  Compilation:after-optimize-tree
  Compilation:optimize-chunk-modules-basic
  Compilation:optimize-chunk-modules
  Compilation:optimize-chunk-modules-advanced
  Compilation:after-optimize-chunk-modules
  Compilation:should-record
  Compilation:revive-modules
  Compilation:optimize-moduleOrder
  Compilation:advanced-optimize-module-order
  Compilation:before-moduleIds
  Compilation:module-ids
  Compilation:optimize-module-ids
  Compilation:after-optimize-module-ids
  Compilation:revive-chunks
  Compilation:optimize-chunk-order
  Compilation:before-chunk-ids
  Compilation:optimize-chunk-ids
  Compilation:after-optimize-chunk-ids
  Compilation:record-modules
  Compilation:record-chunks
  Compilation:before-hash
    MainTemplate:hash
    ChunkTemplate:hash
    ModuleTemplate:hash
    MainTemplate:hash-for-chunk
  Compilation:chunk-hash
  Compilation:after-hash
  Compilation:record-hash
  Compilation:before-module-assets
  Compilation:should-generate-chunk-assets
  Compilation:before-chunk-assets
    MainTemplate:render-manifest
    MainTemplate:global-hash-paths
    MainTemplate:bootstrap
    MainTemplate:localVars
    MainTemplate:require
    MainTemplate:require-extensions
    MainTemplate:asset-path
    MainTemplate:before-startup
    MainTemplate:startup
    ModuleTemplate:content
    ModuleTemplate:module
    ModuleTemplate:render
    ModuleTemplate:package
    MainTemplate:render-with-entry
  Compilation:chunk-asset
  Compilation:additional-chunk-assets
  Compilation:record
  Compilation:additional-assets
  Compilation:optimize-chunk-assets
  Compilation:after-optimize-chunk-assets
  Compilation:optimize-assets
  Compilation:after-optimize-assets
  Compilation:need-additional-seal
  Compilation:after-seal
Compiler:after-compile
Compiler:should-emit
Compiler:emit
Compiler:after-emit
Compiler:done

##  2.3 完整流程
> 
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync MainFieldPlugin
tapAsync UseFilePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync TryNextPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync SymlinkPlugin
tapAsync FileExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync MainFieldPlugin
tapAsync UseFilePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync TryNextPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync SymlinkPlugin
tapAsync FileExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync ModuleAppendPlugin
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync MainFieldPlugin
tapAsync MainFieldPlugin
tapAsync UseFilePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync TryNextPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync SymlinkPlugin
tapAsync FileExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync ModuleAppendPlugin
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync MainFieldPlugin
tapAsync MainFieldPlugin
tapAsync UseFilePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync TryNextPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync SymlinkPlugin
tapAsync FileExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Compiler
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap ResolverFactory
tap NodeEnvironmentPlugin
tap JsonpTemplatePlugin
tap FetchCompileWasmTemplatePlugin
tap FunctionModulePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap LoaderTargetPlugin
tap JavascriptModulesPlugin
tap JsonModulesPlugin
tap WebAssemblyModulesPlugin
tap EntryOptionPlugin
tap SingleEntryPlugin
tapAsync SingleEntryPlugin
tap CompatibilityPlugin
tap HarmonyModulesPlugin
tap AMDPlugin
tap AMDPlugin
tap CommonJsPlugin
tap LoaderPlugin
tap LoaderPlugin
tap NodeStuffPlugin
tap RequireJsStuffPlugin
tap APIPlugin
tap ConstPlugin
tap UseStrictPlugin
tap RequireIncludePlugin
tap RequireEnsurePlugin
tap RequireContextPlugin
tap ImportPlugin
tap SystemPlugin
tap WarnNoModeSetPlugin
tap EnsureChunkConditionsPlugin
tap RemoveParentModulesPlugin
tap RemoveEmptyChunksPlugin
tap MergeDuplicateChunksPlugin
tap FlagIncludedChunksPlugin
tap OccurrenceOrderPlugin
tap SideEffectsFlagPlugin
tap SideEffectsFlagPlugin
tap FlagDependencyExportsPlugin
tap FlagDependencyUsagePlugin
tap ModuleConcatenationPlugin
tap SplitChunksPlugin
tap NoEmitOnErrorsPlugin
tap NoEmitOnErrorsPlugin
tap DefinePlugin
tap { name: 'UglifyJSPlugin' }
tap SizeLimitsPlugin
tap TemplatedPathPlugin
tap RecordIdsPlugin
tap WarnCaseSensitiveModulesPlugin
tap WebpackOptionsApply
tap WebpackOptionsApply
tap WebpackOptionsApply
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap AMDPlugin
Compiler:before-run
Compiler:run
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap NormalModuleFactory
tap NormalModuleFactory
tap NormalModuleFactory
normal-module-factory
tap SideEffectsFlagPlugin
tap SideEffectsFlagPlugin
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap ContextModuleFactory
Compiler:context-module-factory
Compiler:before-compile
Compiler:compile
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Compilation
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap MainTemplate
tap MainTemplate
tap MainTemplate
tap MainTemplate
tap MainTemplate
tap MainTemplate
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
Compiler:this-compilation
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpMainTemplatePlugin
tap JsonpChunkTemplatePlugin
tap JsonpChunkTemplatePlugin
tap JsonpHotUpdateChunkTemplatePlugin
tap JsonpHotUpdateChunkTemplatePlugin
tap FetchCompileWasmMainTemplatePlugin
tap FetchCompileWasmMainTemplatePlugin
tap FetchCompileWasmMainTemplatePlugin
tap FetchCompileWasmMainTemplatePlugin
tap WasmModuleTemplatePlugin
tap WasmModuleTemplatePlugin
tap SplitChunksPlugin
tap SplitChunksPlugin
Compiler:compilation
tap FunctionModuleTemplatePlugin
tap FunctionModuleTemplatePlugin
tap FunctionModuleTemplatePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap LoaderTargetPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JavascriptModulesPlugin
tap JsonModulesPlugin
tap JsonModulesPlugin
tap WebAssemblyModulesPlugin
tap WebAssemblyModulesPlugin
tap WebAssemblyModulesPlugin
tap CompatibilityPlugin
tap HarmonyModulesPlugin
tap HarmonyModulesPlugin
tap AMDPlugin
tap AMDPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap LoaderPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap RequireJsStuffPlugin
tap RequireJsStuffPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap ConstPlugin
tap ConstPlugin
tap ConstPlugin
tap UseStrictPlugin
tap UseStrictPlugin
tap UseStrictPlugin
tap RequireIncludePlugin
tap RequireIncludePlugin
tap RequireEnsurePlugin
tap RequireEnsurePlugin
tap RequireContextPlugin
tap RequireContextPlugin
tap RequireContextPlugin
tap RequireContextPlugin
tap RequireContextPlugin
tap ImportPlugin
tap ImportPlugin
tap ImportPlugin
tap SystemPlugin
tap SystemPlugin
tap EnsureChunkConditionsPlugin
tap EnsureChunkConditionsPlugin
tap RemoveParentModulesPlugin
tap RemoveParentModulesPlugin
tap RemoveEmptyChunksPlugin
tap RemoveEmptyChunksPlugin
tap MergeDuplicateChunksPlugin
tap FlagIncludedChunksPlugin
tap OccurrenceOrderPlugin
tap OccurrenceOrderPlugin
tap SideEffectsFlagPlugin
tap FlagDependencyExportsPlugin
tap FlagDependencyExportsPlugin
tap FlagDependencyExportsPlugin
tap FlagDependencyUsagePlugin
tap ModuleConcatenationPlugin
tap ModuleConcatenationPlugin
tap ModuleConcatenationPlugin
tap ModuleConcatenationPlugin
tap NoEmitOnErrorsPlugin
tap DefinePlugin
tap DefinePlugin
tap DefinePlugin
tapAsync { name: 'UglifyJSPlugin' }
tap TemplatedPathPlugin
tap TemplatedPathPlugin
tap TemplatedPathPlugin
tap RecordIdsPlugin
tap RecordIdsPlugin
tap RecordIdsPlugin
tap RecordIdsPlugin
tap WarnCaseSensitiveModulesPlugin
Compiler:make
    NormalModuleFactory:before-resolve
    NormalModuleFactory:factory
    NormalModuleFactory:resolver
    ResolverFactory:resolve-options
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync UnsafeCachePlugin
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync MainFieldPlugin
tapAsync MainFieldPlugin
tapAsync UseFilePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync TryNextPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync SymlinkPlugin
tapAsync FileExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
    ResolverFactory:resolver
    ResolverFactory:resolve-options
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Resolver: before/after
tap Resolver: step hooks
tapAsync UnsafeCachePlugin
tapAsync ParsePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync AliasFieldPlugin
tapAsync { stage: 10, name: 'ModuleKindPlugin' }
tapAsync { stage: 10, name: 'JoinRequestPlugin' }
tapAsync TryNextPlugin
tapAsync ModulesInHierachicDirectoriesPlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync FileKindPlugin
tapAsync TryNextPlugin
tapAsync DirectoryExistsPlugin
tapAsync MainFieldPlugin
tapAsync MainFieldPlugin
tapAsync MainFieldPlugin
tapAsync UseFilePlugin
tapAsync DescriptionFilePlugin
tapAsync { stage: 10, name: 'NextPlugin' }
tapAsync TryNextPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync AppendPlugin
tapAsync AliasFieldPlugin
tapAsync SymlinkPlugin
tapAsync FileExistsPlugin
tapAsync NextPlugin
tapAsync ResultPlugin
    ResolverFactory:resolver
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
tapAsync AliasPlugin
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
    Resolver:resolveStep
tap { name: 'Tapable camelCase', stage: 100 }
tap { name: 'Tapable this.hooks', stage: 200 }
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
tap Parser
    NormalModuleFactory:parser
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap NodeSourcePlugin
tap CompatibilityPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyDetectionParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyImportDependencyParserPlugin
tap HarmonyExportDependencyParserPlugin
tap HarmonyExportDependencyParserPlugin
tap HarmonyExportDependencyParserPlugin
tap HarmonyExportDependencyParserPlugin
tap HarmonyExportDependencyParserPlugin
tap HarmonyExportDependencyParserPlugin
tap HarmonyTopLevelThisParserPlugin
tap AMDRequireDependenciesBlockParserPlugin
tap AMDDefineDependencyParserPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap AMDPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsPlugin
tap CommonJsRequireDependencyParserPlugin
tap CommonJsRequireDependencyParserPlugin
tap CommonJsRequireDependencyParserPlugin
tap RequireResolveDependencyParserPlugin
tap RequireResolveDependencyParserPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap NodeStuffPlugin
tap RequireJsStuffPlugin
tap RequireJsStuffPlugin
tap RequireJsStuffPlugin
tap RequireJsStuffPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap APIPlugin
tap ConstPlugin
tap ConstPlugin
tap ConstPlugin
tap ConstPlugin
tap UseStrictPlugin
tap RequireIncludeDependencyParserPlugin
tap RequireIncludePlugin
tap RequireIncludePlugin
tap RequireEnsureDependenciesBlockParserPlugin
tap RequireEnsurePlugin
tap RequireEnsurePlugin
tap RequireContextDependencyParserPlugin
tap ImportParserPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap SystemPlugin
tap ModuleConcatenationPlugin
tap DefinePlugin
tap DefinePlugin
tap DefinePlugin
tap DefinePlugin
tap DefinePlugin
tap DefinePlugin
tap DefinePlugin
    NormalModuleFactory:generator
    NormalModuleFactory:after-resolve
    NormalModuleFactory:create-module
    NormalModuleFactory:module
  Compilation:build-module
  Compilation:succeed-module
  Compilation:finish-modules
  Compilation:seal
  Compilation:optimize-dependencies-basic
  Compilation:optimize-dependencies
  Compilation:optimize-dependencies-advanced
  Compilation:after-optimize-dependencies
  Compilation:optimize
  Compilation:optimize-modules-basic
  Compilation:optimize-modules
  Compilation:optimize-modules-advanced
  Compilation:after-optimize-modules
  Compilation:optimize-chunks-basic
  Compilation:optimize-chunks
  Compilation:optimize-chunks-advanced
  Compilation:after-optimizeChunks
  Compilation:optimize-tree
  Compilation:after-optimize-tree
  Compilation:optimize-chunk-modules-basic
  Compilation:optimize-chunk-modules
  Compilation:optimize-chunk-modules-advanced
  Compilation:after-optimize-chunk-modules
  Compilation:should-record
  Compilation:revive-modules
  Compilation:optimize-moduleOrder
  Compilation:advanced-optimize-module-order
  Compilation:before-moduleIds
  Compilation:module-ids
  Compilation:optimize-module-ids
  Compilation:after-optimize-module-ids
  Compilation:revive-chunks
  Compilation:optimize-chunk-order
  Compilation:before-chunk-ids
  Compilation:optimize-chunk-ids
  Compilation:after-optimize-chunk-ids
  Compilation:record-modules
  Compilation:record-chunks
  Compilation:before-hash
    MainTemplate:hash
    ChunkTemplate:hash
    ModuleTemplate:hash
    ModuleTemplate:hash
    MainTemplate:hash
    MainTemplate:hash-for-chunk
  Compilation:chunk-hash
  Compilation:after-hash
  Compilation:record-hash
  Compilation:before-module-assets
  Compilation:should-generate-chunk-assets
  Compilation:before-chunk-assets
    MainTemplate:render-manifest
    MainTemplate:global-hash-paths
    MainTemplate:bootstrap
    MainTemplate:localVars
    MainTemplate:require
    MainTemplate:require-extensions
    MainTemplate:asset-path
    MainTemplate:before-startup
    MainTemplate:startup
    ModuleTemplate:content
    ModuleTemplate:module
    ModuleTemplate:render
    ModuleTemplate:package
    MainTemplate:render-with-entry
    MainTemplate:asset-path
  Compilation:chunk-asset
  Compilation:additional-chunk-assets
  Compilation:record
  Compilation:additional-assets
  Compilation:optimize-chunk-assets
  Compilation:after-optimize-chunk-assets
  Compilation:optimize-assets
  Compilation:after-optimize-assets
  Compilation:need-additional-seal
  Compilation:after-seal
Compiler:after-compile
Compiler:should-emit
Compiler:emit
    MainTemplate:asset-path
Compiler:after-emit
Compiler:done


			this.hooks.make.callAsync(compilation, err => {
				if (err) return callback(err);

				compilation.finish();

				compilation.seal(err => {
					if (err) return callback(err);

					this.hooks.afterCompile.callAsync(compilation, err => {
						if (err) return callback(err);

						return callback(null, compilation);
					});
				});
			});




            this.mainTemplate = new MainTemplate(this.outputOptions);
		this.chunkTemplate = new ChunkTemplate(this.outputOptions);
		this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate(
			this.outputOptions
		);
		this.runtimeTemplate = new RuntimeTemplate(
			this.outputOptions,
			this.requestShortener
		);