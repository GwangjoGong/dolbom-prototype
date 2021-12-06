import './App.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
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
      </Header>
      <Layout style={{ height: 'calc(100vh - 64px)', marginTop: 64 }}>
        <Router />
      </Layout>
    </Layout>
  );
};

export default App;
