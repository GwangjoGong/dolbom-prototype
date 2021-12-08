import './App.css';
import 'antd/dist/antd.css';

import { Avatar, Layout, Typography } from 'antd';
import React from 'react';

import logo from './assets/dolbom_logo.png';
import { Router } from './routes';

const { Header } = Layout;

export const App: React.FC = () => {
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e9e9e9',
          height: 64,
          width: '100%',
          position: 'fixed',
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            float: 'left',
            width: 70,
            marginTop: 12,
          }}
        />
        <div
          style={{
            height: 40,
            float: 'right',
            marginTop: 12,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            style={{
              backgroundColor: '#1990ff',
              border: '1px solid white',
              color: 'white',
            }}
          >
            홍
          </Avatar>
          <Typography.Text style={{ marginLeft: 10 }}>홍길동</Typography.Text>
        </div>
      </Header>
      <Layout style={{ height: 'calc(100vh - 64px)', marginTop: 64 }}>
        <Router />
      </Layout>
    </Layout>
  );
};

export default App;
