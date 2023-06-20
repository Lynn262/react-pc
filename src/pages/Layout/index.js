import { Layout,Menu,Popconfirm } from "antd";
import { observer } from "mobx-react-lite";
import {
	HomeOutlined,
	DiffOutlined,
	EditOutlined,
	LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet,Link ,useLocation, Navigate} from "react-router-dom";
import useStore from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const {Header , Sider} = Layout;

const GeekLayout = ()=>{
	const {pathname}= useLocation()
	const navigate = useNavigate()
	const {userStore,loginStore} = useStore()
	useEffect(()=>{
		userStore.getUserInfo()
	},[userStore])


	//确定退出
	const onConfirm =()=>{
		// 退出登录
		loginStore.loginOut()
		navigate('/login')
	}
	return (
		<Layout>
			<Header className="header">
				<div className="logo"></div>
				<div className="user-info">
					<span className="user-name">{userStore.userInfo.name}</span>
					<span className="user-logout">
						<Popconfirm title="是否确认退出" okText="退出" cancelText="取消" onConfirm={onConfirm}>
							<LogoutOutlined/>退出
						</Popconfirm>

					</span>
				</div>

			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
				{/* 高亮原理：defaultSelectedKeys等于什么 */}
				{/* 获取当前激活的path路径 */}
					<Menu
					mode="inline"
					theme="dark"
					defaultSelectedKeys={[pathname]}
					style={{height:'100%' , borderRight:0}}>
						<Menu.Item icon={<HomeOutlined/>} key='/layout'>
							<Link to={'/layout'}>数据概览</Link>
						</Menu.Item>
						<Menu.Item icon={<DiffOutlined/>} key='/layout/article'>
							<Link to={'/layout/article'}>内容管理</Link>
						</Menu.Item>
						<Menu.Item icon={<EditOutlined/>} key='/layout/publics'>
							<Link to={'/layout/publics'}>发布文章</Link>
						</Menu.Item>
					</Menu>

				</Sider>
				<Layout className="layout-content" style={{padding:20}}> <Outlet/></Layout>
			</Layout>
		</Layout>
	)
}

export default observer(GeekLayout);