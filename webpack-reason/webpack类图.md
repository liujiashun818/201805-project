
## 1. 模块
Module是webpack中最核心的类，要加载定的一切和依赖都是Module. 它有很多子类
- RawModule
- NormalModule
- MultiModule
- ContextModule
- DelegatedModule
- DllModule
- ExternalModule

## 2. 依赖
- Module类继承自DependenciesBlock，它有一个`dependencies`数组，表示此模块依赖的其他模块。
-  webpack使用Dependency的各种子类来表示不同的模块加载规范，美个规范都有自己的`DependencyParserPlugin`来加载
  - AMDRequireDependency
  - AMDDefineDependency
  - AMDRequireArrayDependency
  - CommonJsRequireDependency
  - SystemImportDependency
- 每个Dependency都有自己的Template方法，用来生成加载该依赖模块定的JS代码
- 不同的模块工厂可以生产不同的模块

## 3.执行流程
- compile 开始编译
- make 从入口点分析模块及其依赖的模块，创建这些模块对象
- build-module 构建模块
- after-compile 完成构建
- seal 封装构建结果
- emit 把各个chunk输出到结果文件
- after-emit 完成输出


## 3.1 编译核心对象 Compilation
```js
this.compiler = compiler;       //Compiler对象
this.resolvers = compiler.resolvers;   //模块解析器
this.mainTemplate = new MainTemplate(this.outputOptions);   //生成主模块JS
this.chunkTemplate = new ChunkTemplate(this.outputOptions, this.mainTemplate);//异步加载的模块JS
this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate(this.outputOptions);//热更新是的代码块模版JS
this.moduleTemplate = new ModuleTemplate(this.outputOptions); //入口模块代码
this.entries = []; //入口
this.preparedChunks = [];//预先加载的chunk
this.chunks = [];//所有的chunk
this.namedChunks = {};//每个都对应一个名字，可以通过namedChunks[name]获取chunk
this.modules = []; //所有module
this.assets = {}; //保存所有生成的文件
this.children = []; // 保存子Compilation对象，子Compilation对象依赖它的上级Compilation对象生成的结果，所以要等父Compilation编译完成才能开始。
this.dependencyFactories = new ArrayMap();//保存Dependency和ModuleFactory的对应关系，方便创建该依赖对应的Module
this.dependencyTemplates = new ArrayMap();   //保存Dependency和Template对应关系，方便生成加载此模块的代码
```

## 3.2 开始模块编译
- `SingleEntryPlugin`,`MultiEntryPlugin`两个插件中注册了对`make`事件的监听，当Compiler执行`make`时，触发对 `Compilation.addEntry`方法的调用. 在`addEntry`方法内调用私有方法`_addModuleChain`
- 使用acorn生成AST，并遍历AST收集依赖
- webpack使用`acorn`解析每一个经`loader`处理过的`source`，并且成`AST`，然后遍历所有节点，当遇到`require`调用时，会分析是`AMD`的还是`CMD`的调用，或者是`require.ensure `.
- webpack在`build`模块时 (`调用doBuild方法`)，要先调用相应的`loader`对`source`进行加工，生成一段JS代码后交给`acorn`解析生成`AST`.所以不管是css文件，还是jpg文件，还是html模版，最终经过loader处理会变成一个module
- 比如`url-loader`，根据loader配置生成一段`dataURL`或者使用调用`loadercontext`的`emitFile`方法向`assets`添加一个文件
```js
_addModuleChain(context, dependency, onModule, callback) {
	//根据依赖模块的类型获取对应的模块工厂，用于后边创建模块。
	const moduleFactory = this.dependencyFactories.get(dependency.constructor);
	//使用模块工厂创建模块，并将创建出来的module作为参数传给回调方法:就是下边`function(err, module)`的参数
     moduleFactory.create((err, module) => {
		 const addModuleResult = this.addModule(module);
		 //下面要对module进行build了。包括调用loader处理源文件，使用acorn生成AST，将遍历AST,遇到requirt等依赖时，创建依赖(Dependency)加入依赖数组
		 this.buildModule(module, false, null, null, err => {
			 //module已经build完了，依赖也收集好了，开始处理依赖的module
			this.processModuleDependencies(module, err => {
				callback(null, module);
			});
		 });
	 })
}
```




## 3.3 开始封装
- 调用seal方法封装，要逐次对每个module和chunk进行整理，生成编译后的源码，合并，拆分，生成hash
- webpack会根据不同的插件，如MinChunkSizePlugin,LimitChunkCountPlugin 将不同的module整理到不同的chunk里，每个chunk最终对应一个输出文件
- 此时所有的module仍然保存的是编译前的 原始文件内容。webpack会把源代码里的reuqire调用换成webpack模块加载代码,也就是最终编译后的代码


## 3.4 通过Template生成结果代码
调用`compilation`类里的`createChunkAssets`方法
```js
//如果是入口，则使用MainTemplate生成结果，否则使用ChunkTemplate
const template = chunk.hasRuntime()
					? this.mainTemplate
					: this.chunkTemplate;
```
在MainTemplate和ChunkTemplate需要根据依赖的模块，逐个调用ModuleTemplate的render方法

```js
render(module, dependencyTemplates, options) {
	//生成该模块结果代码的方法,source是一个抽象方法，在Module的不同子类里会重写该方法
	const moduleSource = module.source(
			dependencyTemplates,
			this.runtimeTemplate
		);
}
```
在子类NormalModule的source方法里，必须把源代码中的require()引入的模块代码替换成webpack的模块加载代码
NormalModule.js
```js
source(dependencyTemplates, runtimeTemplate) {
	const source = this.generator.generate(
			this,
			dependencyTemplates,
			runtimeTemplate
		);
}
```

```js
class JavascriptGenerator {
	//source是一个ReplaceSource,可利用dep参数的range属性定位require调用在源码中的位置，从而实现替换
	//range: 根据paser:acorn的文档说明，保存了AST节点在源码中的起始位置和结束位置[ start , end ]
	//export default 'hello'; 会转换为
	//"/* harmony default export */ var __WEBPACK_MODULE_DEFAULT_EXPORT__ = ('hello');"
	generate(module, dependencyTemplates, runtimeTemplate) {
		const source = new ReplaceSource(originalSource);
	}
}
```

## 3.5 输出到结果文件
webpack会在`Compiler`的`emitAssets`方法里把`compilation.assets`里的结果写到输出文件里，在此前会先创建输出目录。
所以当你要开发一些自定义的插件要输出一些结果时，把文件放入`compilation.assets`里即可。
