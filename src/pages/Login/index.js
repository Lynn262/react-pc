import { Card, Form, Input, Checkbox, Button ,message} from "antd";
import logo from "@/assets/logo3.png";
import "./index.scss";
import useStore from "@/store";
import { useNavigate } from "react-router-dom";

function Login() {
	const { loginStore } = useStore()
	const navigate = useNavigate()
	const onFinish = async (values)=>{
		console.log(values);
		await loginStore.login({
			mobile:values.username,
			code:values.password
		})
		//跳转首页
		navigate('/layout')
		message.success('登陆成功')
	}
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt=""></img>
        {/* 登陆表单 */}
        <Form
          initialValues={{
            remember: true,
          }}
					validateTrigger={['onBlur','onChange']}
					onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input placeholder="请输入密码" size="large" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意 [用户协议] 和 [隐私条款]
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
