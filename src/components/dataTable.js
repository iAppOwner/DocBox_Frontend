import React,{useState,useEffect} from 'react';
import { Table, Button, message, Input, Space } from 'antd';
import axios from 'axios';
import { jsonPlaceholderApi,saveApi } from '../constants';
import { SearchOutlined } from '@ant-design/icons';

const Datatable = () => {
    const [dataSource,setDataSource] = useState() 
       useEffect(()=>{
        message.loading("Loading...")
        const fetchData = async () => {
            try {
              const result = await axios.get(jsonPlaceholderApi);
              message.destroy()
              setDataSource(result.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    },[])

  const columns = [
    {
      title: 'UID',
      dataIndex: 'userId',
      key: 'userId',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Supplier Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
       filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      
      onFilter: (value, record) =>
        record.userId == value,

        sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Supplier Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      
      onFilter: (value, record) =>
        record.id == value,

        sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Supplier Name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),

      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      
      onFilter: (value, record) =>
        record.title == value,

        // sorter: (a, b) => a.title - b.title,
    },
    {
        title: 'BODY',
        dataIndex: 'body',
        key: 'body',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
              <Input
                placeholder="Search Supplier Name"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => confirm()}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => confirm()}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Search
                </Button>
                <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                  Reset
                </Button>
              </Space>
            </div>
          ),

        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      
        onFilter: (value, record) =>
          record.body == value,

        //   sorter: (a, b) => a.body - b.body,
      },
  ];
  
  const saveData = ()=>{
    message.loading("Saving...")
            axios.post(`${saveApi}/save`,{
              dataSource
            })
            .then((res)=>{
                message.destroy()
                if(res.status == 200)
                message.success("DATA SAVED SUCCESSFULLY..");
            })
            .catch((err)=>{
                message.error("Oh, No Some thing went wrong!!!")
            })
  }

  return (
    <Table
     dataSource={dataSource}
      columns={columns}
     title={()=>{
        return <span style={{color : "blue", fontWeight : "bolder"}}>DATA TABLE FROM JSON PLACE HOLDER API</span>
    }}
    footer={()=>{
        return <Button type="primary" onClick={()=>{
            saveData()
        }}>Save Data</Button>
    }}
    />
  );
}

export default Datatable;
