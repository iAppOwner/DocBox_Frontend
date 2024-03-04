import React, {useState, useEffect} from 'react';
import { Layout, DatePicker, Badge, Input,Menu, Modal, Drawer, Dropdown, Card, Row, Col, Avatar, Space, Divider, Button, Table, message, Tooltip } from 'antd';
import { UserOutlined  , DownloadOutlined, UploadOutlined, FieldTimeOutlined, FolderOutlined , DeleteOutlined ,EyeOutlined , PlusOutlined, DownOutlined , LogoutOutlined, DropboxOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Box from "./../static/dbox.png";
import Pdf from "./../static/pdf.png";
import User from "./../static/users.png";
import { dateUtil } from './utils';
import axios from 'axios';
import { api } from '../constants';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [open,setOpen] = useState(false)
  const [current,setCurrent] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mdata,setMdata] = useState({})
  const [ddata,setDdata] = useState('')
  const [final,setFinal] = useState({
    dataSource : [],
    fileSource : [],
    totalDocs : 0,
    totalFile : 0,
    totalUsers : 0
  })
  const navigate = useNavigate()
  useEffect(()=>{
    const isLoggedIn = sessionStorage.getItem('role');
    if (isLoggedIn == null) {
      navigate('/');
    }
getBoardData()
  },[])

const getBoardData = ()=>{
  axios.get(`${api}/board`)
  .then((res)=>{
    setFinal(res.data)
  })
}

  let user = sessionStorage.getItem('role');
  let un = sessionStorage.getItem('un');
  const createDropbox = ()=>{
    let payload = {docName : ddata, aurthor : un, date : dateUtil(new Date).appDate, role : user };
   
    axios.post(`${api}/doc/create`,payload)
    .then((res)=>{
   if(res.data.status==200)
   {
    message.success("DocBox Created..")
    getBoardData()
   }
   else
   {
    message.error("DocBox Exist, Try with different name...")
   }
    })
    .catch((err)=>message.error("Try Again..."))
  }
  const deleteDropbox = ()=>{
    axios.delete(`${api}/doc/delete/${ddata}`)
    .then((res)=>{
      message.success("DocBox Deleted..")
      getBoardData()
    })
    .catch((err)=>message.error("Try Again..."))
   }
  const showModal = () => {
    setDdata('')
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    if(ddata.trim() == mdata.docName)
    { deleteDropbox()
     setIsModalOpen(false);}
     else
     {
       message.info(`Type ${mdata.docName} to delete`)
     }
  };
  const handleCreate = () => {
    if(ddata.trim())
   { createDropbox()
    setIsModalOpen(false);}
    else
    {
      message.error("Enter Valid Name...")
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const logout = ()=>{
    sessionStorage.clear()
    navigate('/')
  }
  const items = [
    {
      label: <span style={{cursor : 'pointer'}} onClick={()=>logout()}><LogoutOutlined/> Logout</span>,
      key: '1',
    },
  ];
  
  
  const columns = [
    {
      title: ()=>{
       return <><DropboxOutlined/> DocBox</>
      },
      dataIndex: 'docName',
      key: 'docName',
      render : (text,i)=>{
        return <span style={{cursor : "pointer"}}  onClick={()=>{
          setCurrent(i)
          setOpen(true)
        }}><b><FolderOutlined /> &nbsp;
       <Badge count={i.count} offset={[15, 7]} color="green">
       {text}
        </Badge> </b></span>
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
          setDdata('')
          showModal()
          setMdata({...i})
        }}
        style={{
          backgroundColor : "red",
          color : 'white'
        }}><DeleteOutlined /> Delete</Button>}
      
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
        return  <Button type='primary'
        onClick={()=>{
          setCurrent(i)
          // setOpen(true)
        }}
        ><EyeOutlined /> View</Button>
      }
    },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render : (text,i)=>{
        return <Button style={{backgroundColor : 'green', color : 'white'}}
        onClick={()=>{
          setCurrent(i)
          // setOpen(true)
        }}
        ><DownloadOutlined /> Download</Button>
      }
    },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render : (text,i)=>{
        return  <Button style={{backgroundColor : '#20283E', color : 'white'}}
        disabled={!( (user == 'admin') || (user == i.aurthor))}
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
                  <span style={{ color : "blue"}}>
                  <DropboxOutlined/> DocBox
                  </span>
                }>
                  <div>
                  <Row gutter={12}>
                    <Col span={6}>
                    <img src={Box}/>
                    </Col>
                    <Col span={6} style={{fontSize : '200%'}}>
                     {final.totalDocs}
                    </Col>
                    </Row>
                  </div>
        
               </Card>
              </Col>
              {   user != 'admin' &&
              <Col span={8}>
                <Card title={
                  <span style={{ color : "red"}}>
                  <FilePdfOutlined/> Documents
                  </span>
                }> 
                          <Row gutter={12}>
                    <Col span={6}>
                    <img src={Pdf}/>
                    </Col>
                    <Col span={6} style={{fontSize : '200%'}}>
                     {final.totalFile}
                    </Col>
                    </Row>
                </Card>
              </Col>}
          {   user === 'admin' && <Col span={8}>
                <Card title={
                  <span style={{ color : "green"}}>
                  <UserOutlined/> Active Users
                  </span>
                }> 
                          <Row gutter={12}>
                    <Col span={6}>
                    <img src={User}/>
                    </Col>
                    <Col span={6} style={{fontSize : '200%'}}>
                     {final.totalUsers}
                    </Col>
                    </Row>
                </Card>
              </Col>}
            </Row>
            <Divider/>
{     user==="admin"  &&  <div>
          <Button onClick={()=>{
            setMdata({
              type : "create"
            })
            setDdata('')
            showModal()
          }} style={{backgroundColor : 'green', color : 'white'}}><PlusOutlined /> New DocBox</Button>
          </div>}
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
           dataSource={final.dataSource}
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
            <><FolderOutlined/> {current.docName}</>
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
            <FolderOutlined/> Files in {current.docName}
            </div>
           }
          }
           dataSource={final.fileSource}
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
        } open={isModalOpen} onOk={mdata.type == "create"?handleCreate : handleDelete} onCancel={handleCancel}>
     {mdata.type == "create" ? <span><Input defaultValue={''} placeholder="DocBox Name" onChange={(e)=>setDdata(e.target.value)} /></span> :
           <span><Input defaultValue={''} placeholder="Enter DocBox Name to Delete"  onChange={(e)=>setDdata(e.target.value)} />
           <div style={{color : 'red'}}><code>Type Docbox name <i>"{mdata.docName}"</i> to delete.</code></div>
           </span>} 
      </Modal>
    </>
  );
};

export default Dashboard;
