import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '../../pages';
import { SideNav } from './SideNav';

const { Content } = Layout;

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <SideNav />
      <Content style={{ padding: 30 }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </Content>
    </BrowserRouter>
  );
};
