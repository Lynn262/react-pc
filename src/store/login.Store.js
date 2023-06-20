import { makeAutoObservable } from "mobx";
import { http ,setToken , getToken,removeToken} from "@/utils";

class LoginStore {
	//这样刷新就不会丢失了
	token = getToken() || ''
	constructor(){
		//响应式
		makeAutoObservable(this);
	}

	login = async ({mobile , code})=>{
		//调用登录接口
		const res = await http.post('http://geek.itheima.net/v1_0/authorizations',{
			mobile,
			code
		})
		//使用token
		this.token = res.data.token
		//存入localstorage
		setToken(this.token)
	}

	loginOut = ()=>{
		this.token = ''
		removeToken();
	}
}

export default LoginStore;