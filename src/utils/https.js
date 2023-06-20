import axios from "axios";
import { history } from "./history";
import { getToken } from "./token";
// 实例化 请求拦截器 相应拦截器

const http = axios.create({
	baseURL: 'http://geek.itheima.net/v1_0',
	timeout: 5000
})

//添加请求拦截器
http.interceptors.request.use((config)=>{
	const token = getToken()
	if(token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
},(error)=>{
	if(error.response.status === 401){
		//跳回到登陆 但是reactrouter不支持在组件之外完成路由跳转
		history.push('/login')
	}
	return Promise.reject(error)
})

//添加相应拦截器
http.interceptors.response.use((response)=>{
	return response.data
},(error)=>{
	return Promise.reject(error)
})

export {http}