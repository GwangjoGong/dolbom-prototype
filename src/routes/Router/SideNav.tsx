import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  CloudSyncOutlined,
  FileOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
export const SideNav: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = React.useState(['home']);

  React.useEffect(() => {
    setSelectedKeys([location.pathname.replace('/', '')]);
  }, [location]);

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/home">홈</Link>
        </Menu.Item>
        <Menu.Item key="upload" icon={<CloudSyncOutlined />}>
          <Link to="/upload">디바이스 연동</Link>
        </Menu.Item>
        <Menu.Item key="comment" icon={<FileOutlined />}>
          <Link to="/comment">중재지침</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
