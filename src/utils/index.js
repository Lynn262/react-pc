//先把所有工具函数导出的模块在这里导入
//然后统一导出
import {http} from './https'
import {getToken,setToken,removeToken} from './token'


export {http , getToken , setToken , removeToken}