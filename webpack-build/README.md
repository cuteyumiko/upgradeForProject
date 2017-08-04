# upgradeForProject

build config optimization

## 1 commonChunkPlugin && dll plugin
	
	 commonChunkPlugin 用来提取公共业务代码
	 dll plugin 来打包依赖库
#### dll 生成的manifest 加速本地build

## 2 HashedModuleIdsPlugin 改变 module hash id 用路径的计算方式 
	
