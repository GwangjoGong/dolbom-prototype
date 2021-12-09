import 'react-h5-audio-player/lib/styles.css';

/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Layout,
  message,
  Row,
  Select,
  Spin,
  Tooltip,
  Typography,
} from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import moment from 'moment';
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useNavigate } from 'react-router-dom';

import {
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export const Upload: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

  const [selected, setSelected] = React.useState<number>(1);
  const [tagged, setTagged] = React.useState<number[]>([]);

  const [sitItems, setSitItems] = React.useState(['착석 요구', '기타']);
  const [newSit, setNewSit] = React.useState('');
  const [funcItems, setFuncItems] = React.useState(['회피', '반항', '기타']);
  const [newFunc, setNewFunc] = React.useState('');

  const [firstSit, setFirstSit] = React.useState('');
  const [secondSit, setSecondSit] = React.useState('');
  const [firstFunc, setFirstFunc] = React.useState('');
  const [secondFunc, setSecondFunc] = React.useState('');

  const onSelect = (target: number) => {
    if (tagged.includes(target) || selected === target) return;
    setSelected(target);
  };

  const getSubmitDisabled = () => {
    if (selected === 1) {
      return firstFunc.trim().length === 0 || firstSit.trim().length === 0;
    } else {
      return secondFunc.trim().length === 0 || secondSit.trim().length === 0;
    }
  };

  const onSubmit = () => {
    if (selected === 1) {
      setTagged(prev => [...prev, 1]);
    } else {
      setTagged(prev => [...prev, 2]);
    }
  };

  const onFinalSubmit = () => {
    message.success('제출 완료되었습니다.');
    window.localStorage.setItem('done', '1');
    navigate('/home');
  };

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  }, [loading]);

  React.useEffect(() => {
    setLoading(false);
    setDirty(false);
  }, []);

  return (
    <Layout>
      <Typography.Title level={4}>디바이스 연동</Typography.Title>
      <Card>
        {loading ? (
          <div
            style={{
              height: 500,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin
              size="large"
              tip="데이터 연동 중입니다..."
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 48, marginBottom: 10 }}
                  spin
                />
              }
            />
          </div>
        ) : dirty ? (
          <>
            <Typography.Title level={5}>데이터 연동 결과</Typography.Title>
            <Typography.Title level={3}>
              금일 문제행동이 2회 발견되었습니다.
            </Typography.Title>
            <Typography.Title level={5} style={{ marginTop: 40 }}>
              일정별 발생 현황
            </Typography.Title>
            <Typography.Text style={{ color: '#a9a9a9' }}>
              하단 일정표에서 확인 후, 하단 버튼을 눌러 정보를 저장해주세요.
            </Typography.Text>
            <div
              style={{
                marginTop: 40,
                marginBottom: 40,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Row
                style={{
                  borderLeft: '1px solid #99a5ba',
                  width: '1000px',
                  position: 'relative',
                }}
              >
                {Array(24)
                  .fill(0)
                  .map((_, index) => (
                    <Col
                      key={`block-${index}`}
                      span={1}
                      style={{
                        height: 48,
                        borderRight: '1px solid #bdc3c7',
                      }}
                    ></Col>
                  ))}
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: '#6395f9',
                    width: 330,
                    height: 40,
                    top: 4,
                    left: 335,
                    borderRadius: 8,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    border: '2px solid white',
                    boxSizing: 'border-box',
                  }}
                >
                  학교
                </div>

                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: '#6395f9',
                    width: 80,
                    height: 40,
                    top: 4,
                    left: 708,
                    borderRadius: 8,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    border: '2px solid white',
                    boxSizing: 'border-box',
                  }}
                >
                  놀이
                </div>

                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: '#69dcaf',
                    width: 60,
                    height: 40,
                    top: 4,
                    left: 500,
                    borderRadius: 8,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    border: '2px solid white',
                    boxSizing: 'border-box',
                  }}
                >
                  점심
                </div>

                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: '#69dcaf',
                    width: 60,
                    height: 40,
                    top: 4,
                    right: 130,
                    borderRadius: 8,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    border: '2px solid white',
                    boxSizing: 'border-box',
                  }}
                >
                  저녁
                </div>
                <Tooltip placement="top" title="문제행동#1 - 학교">
                  <div
                    className={selected === 1 ? '' : 'hoverable'}
                    style={{
                      position: 'absolute',
                      backgroundColor: tagged.includes(1)
                        ? '#6c7e9b'
                        : '#e74c3c',
                      width: 20,
                      height: 48,
                      top: 0,
                      left: 430,
                      borderRadius: 8,
                      padding: 8,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'white',
                      border: 'white',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                    onClick={() => onSelect(1)}
                  />
                </Tooltip>
                <Tooltip placement="top" title="문제행동#2 - 놀이">
                  <div
                    className={selected === 2 ? '' : 'hoverable'}
                    style={{
                      position: 'absolute',
                      backgroundColor: tagged.includes(2)
                        ? '#6c7e9b'
                        : '#e74c3c',
                      width: 20,
                      height: 48,
                      top: 0,
                      left: 750,
                      borderRadius: 8,
                      padding: 8,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'white',
                      border: 'white',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                    onClick={() => onSelect(2)}
                  />
                </Tooltip>
              </Row>
              <Row style={{ width: '1000px', marginTop: 10 }}>
                {Array(24)
                  .fill(0)
                  .map((_, index) => (
                    <Col key={`time-${index}`} span={1}>
                      {index === 0 && (
                        <Typography.Text
                          style={{
                            fontSize: 6,
                            float: 'left',
                            marginLeft: -10,
                          }}
                        >
                          {index}시
                        </Typography.Text>
                      )}
                      <Typography.Text
                        style={{
                          fontSize: 6,
                          float: 'right',
                          marginRight: -10,
                        }}
                      >
                        {index + 1}시
                      </Typography.Text>
                    </Col>
                  ))}
              </Row>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 40,
              }}
            >
              <Button
                type="primary"
                style={{ width: 200 }}
                onClick={onFinalSubmit}
              >
                저장
              </Button>
            </div>
            {/* <Typography.Title level={5} style={{ marginTop: 40 }}>
              {`문제행동#${selected}`}
            </Typography.Title>
            <Row style={{ marginTop: 20 }}>
              <Col span={5}>
                <Row style={{ marginBottom: 10 }}>
                  <Col span={6}>
                    <Typography.Text strong>일정</Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {selected === 1 ? '학교' : '놀이'}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Col span={6}>
                    <Typography.Text strong>발생시간</Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {selected === 1 ? '10:30' : '18:00'}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Col span={6}>
                    <Typography.Text strong>종류</Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>울기</Typography.Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Col span={6}>
                    <Typography.Text strong>지속시간</Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {selected === 1 ? '3분' : '7분'}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Col span={6}>
                    <Typography.Text strong>강도</Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {selected === 1 ? '3' : '5'}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={5}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography.Text strong>
                    문제행동 유발 상황 선택
                  </Typography.Text>
                  <Select
                    style={{ width: 240, marginTop: 10, marginBottom: 20 }}
                    placeholder="클릭해서 선택"
                    onSelect={value => {
                      if (!value) return;
                      if (selected === 1) {
                        setFirstSit(value as string);
                      } else {
                        setSecondSit(value as string);
                      }
                    }}
                    dropdownRender={menu => (
                      <div>
                        {menu}
                        <Divider style={{ margin: '4px 0' }} />
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            padding: 8,
                          }}
                        >
                          <Input
                            style={{ flex: 'auto' }}
                            value={newSit}
                            onChange={e => setNewSit(e.target.value)}
                          />
                          <a
                            style={{
                              flex: 'none',
                              padding: '8px',
                              display: 'block',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              if (newSit.trim().length > 0) {
                                setSitItems(prev => [...prev, newSit]);
                                setNewSit('');
                              }
                            }}
                          >
                            <PlusOutlined /> 선택지 추가
                          </a>
                        </div>
                      </div>
                    )}
                  >
                    {sitItems.map(item => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                  <Typography.Text strong>문제행동 기능 선택</Typography.Text>
                  <Select
                    style={{ width: 240, marginTop: 10 }}
                    placeholder="클릭해서 선택"
                    onSelect={value => {
                      if (!value) return;
                      if (selected === 1) {
                        setFirstFunc(value as string);
                      } else {
                        setSecondFunc(value as string);
                      }
                    }}
                    dropdownRender={menu => (
                      <div>
                        {menu}
                        <Divider style={{ margin: '4px 0' }} />
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            padding: 8,
                          }}
                        >
                          <Input
                            style={{ flex: 'auto' }}
                            value={newFunc}
                            onChange={e => setNewFunc(e.target.value)}
                          />
                          <a
                            style={{
                              flex: 'none',
                              padding: '8px',
                              display: 'block',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              if (newFunc.trim().length > 0) {
                                setFuncItems(prev => [...prev, newFunc]);
                                setNewFunc('');
                              }
                            }}
                          >
                            <PlusOutlined /> 선택지 추가
                          </a>
                        </div>
                      </div>
                    )}
                  >
                    {funcItems.map(item => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span={5}>
                <Typography.Text strong>녹음파일</Typography.Text>
                <div style={{ height: 10 }} />
                <AudioPlayer
                  src={
                    selected === 1
                      ? 'https://github.com/amsehili/noise-of-life/blob/master/BabyCry/babyCry-003.wav?raw=true'
                      : 'https://github.com/amsehili/noise-of-life/blob/master/BabyCry/babyCry-005.wav?raw=true'
                  }
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col span={12}>
                <Button disabled={getSubmitDisabled()} onClick={onSubmit}>
                  태그 완료
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  disabled={!tagged.includes(1) || !tagged.includes(2)}
                  onClick={onFinalSubmit}
                  style={{ width: 200, float: 'right' }}
                >
                  제출
                </Button>
              </Col>
            </Row> */}
          </>
        ) : (
          <>
            <Typography.Title level={5}>디바이스 목록</Typography.Title>

            <Card bordered style={{ maxWidth: '400px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Typography.Title level={5}>디바이스 #1</Typography.Title>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography.Text style={{ color: '#a9a9a9', marginRight: 8 }}>
                    정상
                  </Typography.Text>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#2ecc71',
                    }}
                  />
                </div>
              </div>
              <Typography.Text style={{ color: '#a9a9a9' }}>
                최근 연동일자 :{' '}
                {moment().subtract(1, 'days').format('YYYY-MM-DD')}
              </Typography.Text>
              <Button
                type="primary"
                style={{ float: 'right', marginTop: 40 }}
                onClick={() => {
                  setLoading(true);
                  setDirty(true);
                }}
              >
                데이터 불러오기
              </Button>
            </Card>
          </>
          // <Dragger
          //   height={500}
          //   accept=".wav"
          //   multiple={false}
          //   onChange={info => {
          //     setLoading(true);
          //     setDirty(true);
          //   }}
          //   onDrop={() => {
          //     setLoading(true);
          //     setDirty(true);
          //   }}
          // >
          //   <p className="ant-upload-drag-icon">
          //     <InboxOutlined />
          //   </p>
          //   <p className="ant-upload-text">
          //     이 곳을 클릭하거나 파일을 드래그해서 업로드해주세요.
          //   </p>
          //   <p className="ant-upload-hint">.wav 파일만 업로드 가능합니다.</p>
          // </Dragger>
        )}
      </Card>
    </Layout>
  );
};
