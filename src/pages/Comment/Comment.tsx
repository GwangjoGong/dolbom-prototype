import { Card, Col, Layout, Row, Table, Typography } from 'antd';
import React from 'react';

const guidesData = [
  {
    step: '선행 사건 중재',
    method: [
      '자주 충돌하거나 마음에 맞지 않는 또래와 가까이 앉지 않도록 자리를 배치하고, 필요시 파티션 등의 물품을 배치하여 학습활동에 집중할 수 있도록 함',
      '대상 학생이 선호하는 색감 있는 실물이나 그림을 주로 제시하고, 스티커나 라벨지를 활용한 과제로 대체',
      '요구하기와 회피하기 기능을 가르치기 위한 맨드훈련 실시',
    ],
    tool: '환경 재구성, 교수과정 수정, 맨드교육',
  },
  {
    step: '후속 결과 중재',
    method:
      '손등을 무는 행동을 하지 않으면 각 교과 교사가 쿠폰을 제공하고 쿠폰을 모아 강화제(장난감, 스트링아트, 스티커)를 제공. 점차 강화시간을 증가시킴',
    tool: '행동계약, 타행동차별강화',
  },
  {
    step: '선행 사건 중재',
    method:
      '자해행동 또는 공격행동을 보일 때 따른 대체 행동으로 수정. 이 떄 복도를 걸으며 새로운 교육적 환경을 제공하고, 유형 강화제를 제공하지 않는댜. 자해행동으로 공격행동을 10초 이상 보이지 않으면 다시 사회적 관심을 제공하고 쉬운 학습 활동부터 점진적으로 시작함',
    tool: '대체행동차별 강화',
  },
];

const guideColumns = [
  {
    title: '단계',
    dataIndex: 'step',
    key: 'step',
  },
  {
    title: '중재 방법',
    dataIndex: 'method',
    key: 'method',
    render: (data: string[] | string) =>
      typeof data === 'string' ? data : data.map(datum => <div>- {datum}</div>),
  },
  {
    title: '전략 및 도구',
    dataIndex: 'tool',
    key: 'tool',
  },
];

export const Comment: React.FC = () => {
  return (
    <Layout>
      <Typography.Title level={4}>치료사 의견</Typography.Title>
      <Row gutter={20}>
        <Col span={12}>
          <Card>
            <Typography.Title level={5}>문제행동 조작적 정의</Typography.Title>
            <Typography.Text>
              자신이 원하는 물건이나 음식을 얻기 위해 소리를 지르면서 바닥을
              발로차거나 타인을 방해하는 행동
            </Typography.Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Typography.Title level={5}>행동 가설 설정</Typography.Title>
            <Typography.Text>
              자신이 원하는 것을 요구할 때 손을 들고 의사표시를 하게 된다면
              문제행동이 감소 될 것이다.
            </Typography.Text>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 20 }}>
        <Typography.Title level={5}>중재 후 목표 행동</Typography.Title>
        <Typography.Text>
          수업활동이나 식사 시 자신이 원하는 물건이나 음식을 얻기 위하여 손을
          들고 간단한 말로 의사를 표한함으로써 문제행동의 빈도가 감소
        </Typography.Text>
      </Card>
      <Card style={{ marginTop: 20 }}>
        <Typography.Title level={5}>중재 방법</Typography.Title>
        <Table
          dataSource={guidesData}
          columns={guideColumns}
          pagination={false}
          style={{ marginTop: 20 }}
        />
      </Card>
    </Layout>
  );
};
