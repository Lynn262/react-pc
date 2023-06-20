// 1 判断token是否存在
// 2 如果存在 直接正常跳转
// 3 不存在泽重定向到登陆路由

const { getToken } = require("@/utils");
const { Navigate } = require("react-router-dom");

// 高阶组件：把一个组件当成另外一个组件的参数传入
// 通过一定的判断 返回新的组件

function AuthComponent ({ children }){
	const isToken = getToken()
	if(isToken){
		return (<>
			{children}
		</>)
	}else {
		<Navigate to='/login' replace></Navigate>
	}
}

export default AuthComponent;