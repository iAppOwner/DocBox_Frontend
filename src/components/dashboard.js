import React, {useState, useEffect} from 'react';
import { Layout, DatePicker, Input,Menu, Modal, Drawer, Dropdown, Card, Row, Col, Avatar, Space, Divider, Button, Table, message, Tooltip } from 'antd';
import { UserOutlined  , UploadOutlined, FieldTimeOutlined, FolderOutlined , DeleteOutlined ,EyeOutlined , PlusOutlined, DownOutlined , LogoutOutlined, DropboxOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Box from "./../static/box.png"
import { dateUtil } from './utils';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [open,setOpen] = useState(false)
  const [current,setCurrent] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mdata,setMdata] = useState({})
  const navigate = useNavigate()
  useEffect(()=>{
    const isLoggedIn = sessionStorage.getItem('role');
    if (isLoggedIn == null) {
      navigate('/');
    }
  })
  let user = sessionStorage.getItem('role');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const logout = ()=>{
    sessionStorage.clear()
    navigate('/')
  }
  const items = [
    // {
    //   label: <span ><UserOutlined/> My Profile</span>,
    //   key: '0',
    // },
    // {
    //   type: 'divider',
    // },
    {
      label: <span style={{cursor : 'pointer'}} onClick={()=>logout()}><LogoutOutlined/> Logout</span>,
      key: '1',
    },
  ];
  // const dataSource = []
  const dataSource = [
    {
      key: '1',
      name: 'Mariraja',
      aurthor: 'user',
      date: '25/02/2000',
    },
    {
      key: '2',
      name: 'Vijaya',
      aurthor: 'admin',
      date: '25/02/2000',
    },
    {
      key: '3',
      name: 'Selvam',
      aurthor: 'user',
      date: '25/02/2000',
    },
    {
      key: '4',
      name: 'Jothika',
      aurthor: 'user',
      date: '25/02/2000',
    },
  ];
  
  const columns = [
    {
      title: ()=>{
       return <><DropboxOutlined/> DocBox</>
      },
      dataIndex: 'name',
      key: 'name',
      render : (text,i)=>{
        return <span style={{cursor : "pointer"}}  onClick={()=>{
          setCurrent(i)
          setOpen(true)
        }}><b><FolderOutlined /> &nbsp;
        {text}</b></span>
      }
    },
    {
      title: 'Aurthor',
      dataIndex: 'aurthor',
      key: 'aurthor',
      title: ()=>{
        return <><UserOutlined/> Aurthor</>
       },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      title: ()=>{
        return <><FieldTimeOutlined/> Date</>
       },
    },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render : (text,i)=>{
        return <Button type='primary'
        onClick={()=>{
          setCurrent(i)
          setOpen(true)
        }}
        ><EyeOutlined /> View</Button>
      }
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render : (text,i)=>{
        return ( (user == 'admin') || (user == i.aurthor))&& <Button
        onClick={()=>{
          showModal()
          setMdata({...i})
        }}
        style={{
          backgroundColor : "red",
          color : 'white'
        }}><DeleteOutlined /> Delete</Button>}
      
    },
  ];
  //FOR FILES
  const fileSource = [
    {
      key: '1',
      name: 'Mariraja',
      aurthor: 'user',
      date: '21/02/2000',
    },
    {
      key: '2',
      name: 'Vijaya',
      aurthor: 'admin',
      date: '25/02/2000',
    },
    {
      key: '3',
      name: 'Selvam',
      aurthor: 'user',
      date: '29/02/2000',
    },
    {
      key: '4',
      name: 'Jothika',
      aurthor: 'user',
      date: '01/03/2000',
    },
  ];
  
  const fileColumns = [
    {
      title: ()=>{
       return <><FolderOutlined/> File</>
      },
      dataIndex: 'name',
      key: 'name',
      render : (text,i)=>{
        return <span style={{cursor : "pointer"}}  onClick={()=>{
          setCurrent(i)
          setOpen(true)
        }}><b><FilePdfOutlined /> &nbsp;
        {text}</b></span>
      }
    },
    {
      title: 'Aurthor',
      dataIndex: 'aurthor',
      key: 'aurthor',
      title: ()=>{
        return <><UserOutlined/> Aurthor</>
       },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      title: ()=>{
        return <><FieldTimeOutlined/> Date</>
       },
    },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render : (text,i)=>{
        return ( (user == 'admin') || (user == i.aurthor)) && <Button type='primary'
        onClick={()=>{
          setCurrent(i)
          // setOpen(true)
        }}
        ><UploadOutlined /> Replace</Button>
      }
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render : (text,i)=>{
        return  ( (user == 'admin') || (user == i.aurthor)) && <Button
        onClick={()=>{
          // setMdata({...i})
          // showModal()
        }}
        style={{
          backgroundColor : "red",
          color : 'white'
        }}><DeleteOutlined /> Delete</Button>}
      
    },
  ];

  const handleDateChange = (dates) => {
    let dateString = dates && new Date(dates[0]).toDateString();

console.log(dateUtil(dateString)); 
  };
  return (
    <>
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div  style={{color : "white"}}><DropboxOutlined/> &nbsp;DocBox <span style={{float : 'right'}}>
       <Tooltip title={
        <>
        Welcome!, {sessionStorage.getItem('un')?.toLocaleUpperCase()}...
        </>
       }>
        <Avatar style={{ backgroundColor: '#f56a00', cursor : "pointer" }}>{sessionStorage.getItem('un')?.charAt(0).toLocaleUpperCase()}</Avatar>&nbsp;
        </Tooltip>
          &nbsp;
          <span>
          <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
      <UserOutlined/>
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
  </span>
  </span></div>
        
      </Header>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card title={
                  <>
                  <DropboxOutlined/> DocBox
                  </>
                }>
        1
               </Card>
              </Col>
              <Col span={8}>
                <Card title={
                  <>
                  <FilePdfOutlined/> Documents
                  </>
                }> 1</Card>
              </Col>
          {   user === 'admin' && <Col span={8}>
                <Card title={
                  <>
                  <UserOutlined/> Active Users
                  </>
                }> 1</Card>
              </Col>}
            </Row>
            <Divider/>
            <div>
          <Button onClick={()=>{
            setMdata({
              type : "create"
            })
            showModal()
          }} style={{backgroundColor : 'green', color : 'white'}}><PlusOutlined /> New DocBox</Button>
          </div>
          <div>
            <br/>
            <Space style={{float : 'right'}} direction="horizontal" size={12}>
 <RangePicker onChange={handleDateChange}/>
  </Space>
          <Table
          title={
           ()=>{
            return  <div style={{textAlign : "center", fontWeight : "bolder"}}>
            <DropboxOutlined/> All DocBox
            </div>
           }
          }
           dataSource={dataSource}
            columns={columns}
             />
          </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
          <Drawer
           width={'100%'}
          title={
            <><FolderOutlined/> {current.name}</>
          } onClose={()=>{
            setOpen(false)
          }} open={open}>
          <Button type="primary"
          // onClick={()=>{
          //   showModal()
          // }}
          ><UploadOutlined/> Upload File</Button>
                      <Space style={{float : 'right'}} direction="horizontal" size={12}>
 <RangePicker />
  </Space>
          <Table
          title={
           ()=>{
            return  <div style={{textAlign : "center", fontWeight : "bolder"}}>
            <FolderOutlined/> Files in {current.name}
            </div>
           }
          }
           dataSource={fileSource}
            columns={fileColumns}
             />
        </Drawer>
        <Modal title={
          <>
          <span>
          {mdata.type == "create" ? <span><DropboxOutlined/> Create New DocBox</span> :
           <span><DeleteOutlined/> Delete</span>} 
          </span>
          </>
        } open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     {mdata.type == "create" ? <span><Input placeholder="DocBox Name"  /></span> :
           <span><Input placeholder="Enter DocBox Name to Delete"  />
           <div style={{color : 'red'}}><code>Type Docbox name <i>"{mdata.name}"</i> to delete.</code></div>
           </span>} 
      </Modal>
    </>
  );
};

export default Dashboard;
