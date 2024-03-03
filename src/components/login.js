import React,{useState,useEffect} from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { DropboxOutlined, LoginOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { api } from '../constants';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
  const onFinish = (values) => {
    setLoading(true)
    let loginDetails = {
      username : values.username,
      password : values.password
    }
    axios.post(`${api}/login`,{loginDetails})
    .then((res)=>{
      if(res.data.status != 200)
      {
        message.info(res.data.message)
        setLoading(false)
      }
      else
      {
        sessionStorage.setItem('role',res.data.role)
        sessionStorage.setItem('un',res.data.username)
        navigate("/board")
        setLoading(false)
      }
 
  })
    .catch((err)=>{message.error("Try Again...")
    setLoading(false)
  })
  };

  return (
    <Form
      name="login-form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1 className="login-form-title"><DropboxOutlined/> &nbsp;DocBox</h1>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" className="login-form-input" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" className="login-form-input" />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="/">
          Forgot password
        </a>
      </Form.Item> */}
      <Form.Item style={{textAlign : "center"}}>

{   loading ?   <div><Spin />&nbsp;
Logging ...
</div>:
        <Button type="primary" htmlType="submit" className="login-form-button">
          <LoginOutlined /> Log in 
        </Button>}
        {/* Or <a href="/">register now!</a> */}
      </Form.Item>
    </Form>
  );
};

const Login = () => {
  useEffect(()=>{
    sessionStorage.clear()
  })
  return (
    <div className="login-container">
      <div className="login-box">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
