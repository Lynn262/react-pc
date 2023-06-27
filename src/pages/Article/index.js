import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space} from 'antd'
// import 'moment/locale/zh-cn'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { http } from '@/utils'
import img404 from '@/assets/logo192.png'
import { useEffect, useState } from 'react'
import useStore from '@/store'
import { observer } from "mobx-react-lite";
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
	const {channelStore} = useStore()
	//频道列表管理
	const [channelList , setchannelList] = useState([])
	//文章列表管理 统一管理数据
	const [articleList,setArticleList] = useState({
		list:[],//文章列表
		count:0//文章数量
	})
	//文章参数管理
	const [params, setParams] = useState({
		page:1,
		per_page: 1,
	})

	// 如果异步请求函数需要依赖一些数据的变化而重新执行
	// 推荐写到函数内部
	useEffect(()=>{
		const loadList = async ()=>{
		const res = await http.get('/mp/articles',{params})
		setArticleList({
			list:res.data.results,
			count:res.data.total_count
		})
	}
		loadList()
	},[params])

	const onfinish = (values)=>{
		const {channel_id , date , status} = values;
		const _params = {
		}
		if(status !== -1){
			_params.status = status
		}
		if(channel_id){
			_params.channel_id = channel_id
		}
		if(date){
			_params.begin_pubdate = date[0].format('YYYY-MM-DD')			
			_params.end_pubdate = date[1].format('YYYY-MM-DD')			
		}
		//修改params数据 引起接口重新发送 注意：类组件parmas会合并 但是在这里会重新覆盖
		setParams({
			...params,
			..._params
		})
		// console.log(values);
	}
	const pagechange = (page)=>{
		setParams({
			...params,
			page
		})
	}
	const delArticle = async (data)=>{
		console.log(data);
		await http.delete(`/mp/articles/${data.id}`)
		//刷新列表
		setParams({
			...params,
			page: 1
		})
	}
	const navigate = useNavigate()
	const goPublish = async(data) =>{
		navigate(`/layout/publics?id=${data.id}`)
	}
	const data = [
		{
				id: '8218',
				comment_count: 0,
				cover: {
					images:['http://geek.itheima.net/resources/images/15.jpg'],
				},
				like_count: 0,
				pubdate: '2019-03-11 09:00:00',
				read_count: 2,
				status: 2,
				title: 'wkwebview离线化加载h5资源解决方案' 
		}
]
const columns = [
	{
		title: '封面',
		dataIndex: 'cover',
		width:120,
		render: cover => {
			return <img src={cover.images[0]} width={80} height={60} alt="" />
		}
	},
	{
		title: '标题',
		dataIndex: 'title',
		width: 220
	},
	{
		title: '状态',
		dataIndex: 'status',
		render: data => <Tag color="green">审核通过</Tag>
	},
	{
		title: '发布时间',
		dataIndex: 'pubdate'
	},
	{
		title: '阅读数',
		dataIndex: 'read_count'
	},
	{
		title: '评论数',
		dataIndex: 'comment_count'
	},
	{
		title: '点赞数',
		dataIndex: 'like_count'
	},
	{
		title: '操作',
		render: data => {
			return (
				<Space size="middle">
					<Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>goPublish(data)}/>
					<Button
						type="primary"
						danger
						shape="circle"
						icon={<DeleteOutlined />}
						onClick={()=>delArticle(data)}
					/>
				</Space>
			)
		}
	}
]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form 
				onFinish={onfinish}
				initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
						{channelStore.channelList.map(channel => <Option value={channel.id} key={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
			<Card title={`根据筛选条件共查询到 ${articleList.count} 条结果：`}>
			<Table rowKey="id" columns={columns} dataSource={articleList.list} pagination={{
				pageSize:params.per_page,
				total:articleList.count,
				onChange:pagechange
			}} />
      </Card>
    </div>
  )
}

export default observer(Article)