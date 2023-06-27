import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
	message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link,  useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useStore from "@/store";
import { observer } from "mobx-react-lite";
import { useState ,useRef, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publics = () => {
	const navigate = useNavigate()
  const { channelStore } = useStore();
	// 存放上传图片的列表
	const [fileList ,setFileList] = useState([])
	//使用useref声明一个暂存仓库
	const cacheImgList = useRef([])
	const onUploadChange = ({fileList})=>{
		console.log(fileList);
		// 采取受控写法 在最后一次log里response 最终react state 

		//关键位置 做一些格式化
		const formatList = fileList.map(file => {
			if(file.response){
				return {
					url:file.response.data.url
				}
			}else {
				return file
			}
		})
		
		setFileList(formatList)
		cacheImgList.current = formatList
	}

	//切换图片
	const [imgCount, setImgCount] = useState(1)
	const radioChange = (e)=>{
		console.log(e.target.value);
		setImgCount(e.target.value)
		//从仓库里面取对应的图片数量 这里拿的是上一次的值  交给用来渲染图片列表的fileList
		if (imgCount === 1){
			setFileList(cacheImgList.current)
		}else if(imgCount === 3) {
			const img = cacheImgList.current[0] ? [cacheImgList.current[0]]:null
			setFileList(img)
		}
	}
	//提交·表单
	const formFinish = async (value)=>{
		console.log(value);
		//数据二次处理 重点处理cover字段
		const {channel_id , content , title , type } = value
		const params = {
			channel_id,
			content,
			title,
			type,
			cover: {
				type: type,
				images : fileList.map(item => item.url)
			}
		}
		console.log(params);
		if(id){
			await http.put(`mp/articles/${id}?draft=false`, params)
		}
		else {
			await http.post('mp/articles?draft=false', params)
		}

		navigate('/layout/article')
		message.success(`${id? '更新成功':'发布成功'}`)
	}

	//编辑功能
	//文案适配 路由参数id 判断条件
	const [params] = useSearchParams()
	const id = params.get('id')

	//数据回填 
	const form = useRef(null)
	useEffect(()=>{
		const loadDetail = async ()=>{
			const res = await http.get(`/mp/articles/${id}`)
			form.current.setFieldsValue({...res.data,type: res.data.cover.type})
			//调用setFileList方法
			setFileList(res.data.cover.images.map(item => {
				return {
					url:item
				}
			}))
			//暂存列表也存一份
			cacheImgList.current = res.data.cover.images.map(item => {
				return {
					url:item
				}
			})
		}
		if(id){
			loadDetail()
		}

	},[id])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id? '编辑':'发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
					onFinish = {formFinish}
					ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
						{imgCount > 0 && (
							<Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action="http://geek.itheima.net/v1_0/upload"
              fileList={fileList}
              onChange={onUploadChange}
							multiple={imgCount > 1}
							maxCount = {imgCount}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
						)}
            
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id?'更新':'发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publics);
