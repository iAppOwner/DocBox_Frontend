import React, {useState, useEffect} from 'react';
import { Layout, DatePicker, Popconfirm, Badge, Input,Menu, Modal, Drawer, Dropdown, Card, Row, Col, Avatar, Space, Divider, Button, Table, message, Tooltip } from 'antd';
import { UserOutlined   , DownloadOutlined, UploadOutlined, FieldTimeOutlined, FolderOutlined , DeleteOutlined ,EyeOutlined , PlusOutlined, DownOutlined , LogoutOutlined, DropboxOutlined, FilePdfOutlined } from '@ant-design/icons';
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
    totalDocs : 0,
    totalFile : 0,
    totalUsers : 0
  })
  const [fileSource,setFilesource] = useState([]) 

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
  .catch((err)=>message.error("Try Again..."))
}

const getData = (docName)=>{
  axios.get(`${api}/file/get/${docName}`)
  .then((res)=>{
    setFilesource(res.data.value)
  })
  .catch((err)=>message.error("Try Again..."))
}
const download = (i,type)=>{
  axios.get(`${api}/file/download?fileName=${i.filename}&&docName=${i.docName}`)
  .then((res)=>{
   
if(type=="v")
{
  try {
        const response =  fetch(res.data.link);
        const blob =  response.blob();
        // Use the blob as needed
        console.log(blob);
      } catch (error) {
        console.error('Error:', error);
      }
}
else
{
  window.open(res.data.link, '_blank')
}
  })
  .catch((err)=>message.error("Try Again..."))
}


const pconfirm = (i) => {
  axios.delete(`${api}/file/delete?fileName=${i.filename}&&docName=${i.docName}`)
  .then((res)=>{
    getData(i.docName)
  })
  .catch((err)=>message.error("Try Again..."))
};
const pcancel = (e) => {
  console.log("CANCELED");
};
  let user = sessionStorage.getItem('role');
  let un = sessionStorage.getItem('un');
  const createDropbox = ()=>{
    let payload = {docName : ddata, aurthor : un, date : dateUtil(new Date).appDate, role : user };
   
    axios.post(`${api}/doc/create`,payload)
    .then((res)=>{
   if(res.data.status==200)
   {
    getBoardData()
    message.success("DocBox Created..")
   
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
          getData(i.docName)
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
        }}><DeleteOutlined /> Delete</Button>
      }
      
    },
  ];
  
  const fileColumns = [
    {
      title: ()=>{
       return <><FolderOutlined/> File</>
      },
      dataIndex: 'filename',
      key: 'filename',
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
    // {
    //   title: '',
    //   dataIndex: 'view',
    //   key: 'view',
    //   render : (text,i)=>{
    //     return  <Button type='primary'
    //     onClick={()=>{
    //       download(i,'v')
    //       // setOpen(true)
    //     }}
    //     ><EyeOutlined /> View</Button>
    //   }
    // },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render : (text,i)=>{
        return <Button style={{backgroundColor : 'green', color : 'white'}}
        onClick={()=>{
          download(i,'d')
        }}
        ><DownloadOutlined /> Download</Button>
      }
    },
  //   {
  //     title: '',
  //     dataIndex: 'view',
  //     key: 'view',
  //     render : (text,i)=>{
  //       return  <div>
  //       <label style={{backgroundColor : '#20283E', color : 'white'}} className="ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary"
  //  htmlFor={`upload`}>
  //     <UploadOutlined/> &nbsp; Replase
  //      </label>
  //      <input
  //        id={`replase`}
  //        type="file"
  //        style={{display:'none'}}
  //        onChange={(e)=>handleFileUpload(e,i,'r')}
  //      />
  //    </div>
  //     }
  //   },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render : (text,i)=>{
        
        return  ( (user == 'admin') || (user == i.aurthor)) && <div>
            <Popconfirm
    title={`Delete the file ${i.name}`}
    description={`Are you sure to delete this file ${i.name}?`}
    onConfirm={()=>pconfirm(i)}
    onCancel={()=>pcancel()}
    okText="Yes"
    cancelText="No"
  >
          <Button
        style={{
          backgroundColor : "red",
          color : 'white'
        }}><DeleteOutlined /> Delete</Button>       
  </Popconfirm>
        </div>}
      
    },
  ];

  const handleDateChange = (dates) => {
    let dateString = dates && new Date(dates[0]).toDateString();

console.log(dateUtil(dateString)); 
  };

  const handleFileUpload = (event,i={},type) => {
    const file = event.target.files[0];
    const fd = new FormData();
    let role = sessionStorage.getItem('role');
    if(type==="r")
    {
      file.name = i.filename
      console.log(file.name,i.file.name)
    }
    fd.append('file',file)
    fd.append('docName',current.docName)
    fd.append('aurthor',sessionStorage.getItem('un'))
    fd.append("filename",file.name)
    fd.append('role',role)
    fd.append("date",dateUtil(new Date()).appDate)
    message.loading("Uploading...")
    axios.put(`${api}/file/save/${current.docName}`,fd,{ headers: { 'Content-Type': 'multipart/form-data'}})
    .then((res)=>{
     setFilesource(getData(current.docName))
     message.destroy()
     message.success(`Uploaded Successfully...`)
    })
  } 

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
          <div>
       <label  className="ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary"
  htmlFor={`upload`}>
     <UploadOutlined/> &nbsp; Upload file
      </label>
      <input
        id={`upload`}
        type="file"
        style={{display:'none'}}
        onChange={(e)=>handleFileUpload(e,'c')}
      />
    </div>
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
