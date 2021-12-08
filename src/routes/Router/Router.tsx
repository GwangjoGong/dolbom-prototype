import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Comment, Home, Upload } from '../../pages';
import { SideNav } from './SideNav';

const { Content } = Layout;

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <SideNav />
      <Content style={{ padding: 30, height: '100%', overflow: 'auto' }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </Content>
    </BrowserRouter>
  );
};
