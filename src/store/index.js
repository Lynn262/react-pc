//把所有模块统一处理
import LoginStore from "./login.Store"
import UserStore from "./user.Store"
import ChannelStore from "./channel.Store"
import React from "react"
class RootStore {
	constructor(){
		this.loginStore = new LoginStore()
		this.userStore = new UserStore()
		this.channelStore = new ChannelStore()
	}


}

const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = ()=> React.useContext(context)

export default useStore