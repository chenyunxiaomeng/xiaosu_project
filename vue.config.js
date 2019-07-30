module.exports = {
	devServer:{
		open:true,
     	host:'localhost',
//		host:'192.168.0.104' //电脑ip  浏览器需输入 http://192.168.0.104:8080
		port:8080,
		https:false,
		proxy:{//配置跨域请求
			'/api':{
				target:'https://ele-interface.herokuapp.com/api/', //接口地址
				ws:true,
				changeOrigin:true,
				pathRewrite:{
					'^/api':''
				}
			}
			
		},
		before:app => {}
	}
};
