import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {store} from './store/store'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

import { Indicator } from 'mint-ui';


Vue.use(VueRouter);

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

Vue.use(Mint);

//请求拦截
axios.interceptors.request.use(
	config => {
		//加载动画
		Indicator.open();
		return config;
},
error => {
	return Promise.reject(error);
}
);

//响应拦截
axios.interceptors.response.use(response => {
	Indicator.close();
	return response;
},
error => {
	//错误提醒
	Indicator.close();
	return Promise.reject(error);
})

const routes = [
	{
		path:'/',
//		name:"index",
		component:() => import("./views/index.vue"),
		children:[
		{
			path:'',
			redirect:'/home'
		},
		{
			path:"/home",
			name:"home",
			component:() => import('./views/Home.vue')
		},
		{
			path:'/order',
			name:'order',
			component:() => import('./views/Order.vue')
		},
		{
			path:'/me',
			name:'me',
			component:() => import('./views/Me.vue')
		},
		{
			path:'/address',
			name:'address',
			component:() => import('./views/Address.vue')
		},
		{
			path:'/city',
			name:'city',
			component:() => import('./views/City.vue')
		}
		]
	},
	{
		path:'/Login',
		name:"login", 
		component:() => import('./views/Login.vue')
	},
	{
		path:'/search',
		name:'search',
		component:() => import('./views/Search.vue')
	},
	{
		path:'/shop',
		name:'shop',
		redirect:'/goods',
		component:() => import('./views/Shops/Shop.vue'),
		children:[
			{
				path:'/goods',
				name:'goods',
				component:() => import('./views/Shops/Goods.vue')
			},
			{
				path:'/comments',
				name:'comments',
				component: () => import('./views/Shops/Comments.vue')
			},
			{
				path:'/seller',
				name:'seller',
				component:() => import('./views/Shops/Seller.vue')
			}
		]
	}
]

const router = new VueRouter({
	routes,
	mode:'history',  // 去掉路由地址的#
	base: process.env.BASE_URL,
	linkActiveClass:'active',  //添加下划线（点击出现下划线）
})

//路由守卫
//router.beforeEach((to,from,next) => {
//	const isLogin = localStorage.ele_login ? true : false;
//	if(to.path == '/login'){
//		next();
//	}else{
//		//是否在登录状态下
//		isLogin ? next() : next('/login');
//	}
//});

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
