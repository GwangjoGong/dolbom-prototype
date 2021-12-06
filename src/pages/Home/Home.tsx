import 'moment/locale/ko';

import { Card, Col, DatePicker, Layout, Radio, Row, Typography } from 'antd';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import moment from 'moment';
import React from 'react';

import { Bullet, Column, Line, Pie, Radar } from '@ant-design/charts';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

moment.updateLocale('ko_KR', {
  monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
  weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
  week: {
    dow: 1,
  },
});

const freqData = [
  {
    day: '월요일',
    value: 1,
  },
  {
    day: '화요일',
    value: 2,
  },
  {
    day: '수요일',
    value: 2,
  },
  {
    day: '목요일',
    value: 1,
  },
  {
    day: '금요일',
    value: 3,
  },
  {
    day: '토요일',
    value: 3,
  },
  {
    day: '일요일',
    value: 2,
  },
];

const ampData = [
  {
    day: '월요일',
    value: 3,
  },
  {
    day: '화요일',
    value: 4,
  },
  {
    day: '수요일',
    value: 2,
  },
  {
    day: '목요일',
    value: 4,
  },
  {
    day: '금요일',
    value: 5,
  },
  {
    day: '토요일',
    value: 6,
  },
  {
    day: '일요일',
    value: 4,
  },
];

const durData = [
  {
    day: '월요일',
    value: 3,
  },
  {
    day: '화요일',
    value: 4,
  },
  {
    day: '수요일',
    value: 2,
  },
  {
    day: '목요일',
    value: 5,
  },
  {
    day: '금요일',
    value: 6,
  },
  {
    day: '토요일',
    value: 4,
  },
  {
    day: '일요일',
    value: 2,
  },
];

const statData = [
  {
    day: '월요일',
    label: '소리 지르기',
    value: 0,
  },
  {
    day: '화요일',
    label: '소리 지르기',
    value: 1,
  },
  {
    day: '수요일',
    label: '소리 지르기',
    value: 4,
  },
  {
    day: '목요일',
    label: '소리 지르기',
    value: 1,
  },
  {
    day: '금요일',
    label: '소리 지르기',
    value: 0,
  },
  {
    day: '토요일',
    label: '소리 지르기',
    value: 2,
  },
  {
    day: '일요일',
    label: '소리 지르기',
    value: 1,
  },
  {
    day: '월요일',
    label: '울기',
    value: 1,
  },
  {
    day: '화요일',
    label: '울기',
    value: 0,
  },
  {
    day: '수요일',
    label: '울기',
    value: 1,
  },
  {
    day: '목요일',
    label: '울기',
    value: 3,
  },
  {
    day: '금요일',
    label: '울기',
    value: 2,
  },
  {
    day: '토요일',
    label: '울기',
    value: 1,
  },
  {
    day: '일요일',
    label: '울기',
    value: 2,
  },
  {
    day: '월요일',
    label: '기타',
    value: 1,
  },
  {
    day: '화요일',
    label: '기타',
    value: 0,
  },
  {
    day: '수요일',
    label: '기타',
    value: 0,
  },
  {
    day: '목요일',
    label: '기타',
    value: 1,
  },
  {
    day: '금요일',
    label: '기타',
    value: 0,
  },
  {
    day: '토요일',
    label: '기타',
    value: 1,
  },
  {
    day: '일요일',
    label: '기타',
    value: 0,
  },
];

export const Home: React.FC = () => {
  const [date, setDate] = React.useState(moment());
  const [loading, setLoading] = React.useState(true);
  const [done, setDone] = React.useState(false);

  const weekFormat = 'MM/DD';
  const koreanDays = ['월', '화', '수', '목', '금', '토', '일'];

  const customWeekStartEndFormat = (value: moment.Moment) =>
    `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
      .endOf('week')
      .format(weekFormat)}`;

  const isCurrentWeek =
    customWeekStartEndFormat(date) === customWeekStartEndFormat(moment());

  React.useEffect(() => {
    const isDone = window.localStorage.getItem('done');
    if (isDone) {
      setDone(true);
      window.localStorage.removeItem('done');
    } else {
      setDone(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <Typography.Title level={4}>주간 보고서</Typography.Title>

      <Card style={{ marginBottom: 20 }}>
        <Row align="middle">
          <Col span={2}>
            <Typography.Text>대상 아동</Typography.Text>
          </Col>
          <Col span={2}>
            <Typography.Text strong>홍길동</Typography.Text>
          </Col>
          <Col span={20}>
            <DatePicker
              defaultValue={moment()}
              picker="week"
              format={customWeekStartEndFormat}
              locale={locale}
              style={{ float: 'right' }}
              disabledDate={date => {
                return date > moment();
              }}
              onChange={newDate => {
                if (newDate) {
                  setDate(newDate);
                }
              }}
            />
          </Col>
        </Row>
      </Card>

      <Row gutter={20}>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={12}>
                <Typography.Title level={5}>평균 빈도</Typography.Title>
                <Typography.Title level={3}>
                  {isCurrentWeek
                    ? (done
                        ? [
                            ...freqData.slice(0, moment().days() - 1),
                            {
                              day: `${koreanDays[moment().days() - 1]}요일`,
                              value: 2,
                            },
                          ].slice(0, moment().days())
                        : freqData.slice(0, moment().days() - 1)
                      ).reduce((a, b) => a + b.value, 0) /
                      (moment().days() - 1)
                    : freqData.reduce((a, b) => a + b.value, 0) /
                      freqData.length}
                  회
                </Typography.Title>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#2ecc71',
                    fontWeight: 'bold',
                  }}
                >
                  1
                  <ArrowDownOutlined
                    style={{ marginLeft: 5, marginRight: 5 }}
                  />
                  <text
                    style={{
                      color: '#bdc3c7',
                      fontWeight: 'normal',
                    }}
                  >
                    지난주 대비
                  </text>
                </div>
              </Col>
              <Col span={12} style={{ paddingTop: 10 }}>
                <Line
                  data={
                    isCurrentWeek
                      ? done
                        ? [
                            ...freqData.slice(0, moment().days() - 1),
                            {
                              day: `${koreanDays[moment().days() - 1]}요일`,
                              value: 2,
                            },
                          ].slice(0, moment().days())
                        : freqData.slice(0, moment().days() - 1)
                      : freqData
                  }
                  xField="day"
                  yField="value"
                  height={100}
                  xAxis={false}
                  yAxis={false}
                  loading={loading}
                  lineStyle={{
                    stroke: '#6395f9',
                  }}
                  animation={{
                    enter: {
                      animation: 'path-in',
                      duration: 1000,
                      repeat: loading,
                    },
                  }}
                  area={{
                    style: {
                      fill: 'l(270) 0:#ffffff 0.5:#6395f9',
                    },
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={12}>
                <Typography.Title level={5}>평균 강도</Typography.Title>
                <Typography.Title level={3}>
                  {isCurrentWeek
                    ? (done
                        ? [
                            ...ampData.slice(0, moment().days() - 1),
                            {
                              day: `${koreanDays[moment().days() - 1]}요일`,
                              value: 4,
                            },
                          ]
                        : ampData
                      )
                        .slice(0, moment().days() - 1)
                        .reduce((a, b) => a + b.value, 0) /
                      (moment().days() - 1)
                    : ampData.reduce((a, b) => a + b.value, 0) / ampData.length}
                </Typography.Title>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#2ecc71',
                    fontWeight: 'bold',
                  }}
                >
                  25%
                  <ArrowDownOutlined
                    style={{ marginLeft: 5, marginRight: 5 }}
                  />
                  <text
                    style={{
                      color: '#bdc3c7',
                      fontWeight: 'normal',
                    }}
                  >
                    지난주 대비
                  </text>
                </div>
              </Col>
              <Col span={12} style={{ paddingTop: 10 }}>
                <Line
                  data={
                    isCurrentWeek
                      ? done
                        ? [
                            ...ampData.slice(0, moment().days() - 1),
                            {
                              day: `${koreanDays[moment().days() - 1]}요일`,
                              value: 4,
                            },
                          ].slice(0, moment().days())
                        : ampData.slice(0, moment().days() - 1)
                      : ampData
                  }
                  xField="day"
                  yField="value"
                  height={100}
                  xAxis={false}
                  yAxis={false}
                  loading={loading}
                  lineStyle={{
                    stroke: '#61daab',
                  }}
                  animation={{
                    enter: {
                      animation: 'path-in',
                      duration: 1000,
                      repeat: loading,
                    },
                  }}
                  area={{
                    style: {
                      fill: 'l(270) 0:#ffffff 0.5:#61daab',
                    },
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={12}>
                <Typography.Title level={5}>평균 지속 시간</Typography.Title>
                <Typography.Title level={3}>
                  {isCurrentWeek
                    ? (
                        (done
                          ? [
                              ...durData.slice(0, moment().days() - 1),
                              {
                                day: `${koreanDays[moment().days() - 1]}요일`,
                                value: 5,
                              },
                            ].slice(0, moment().days())
                          : durData.slice(0, moment().days() - 1)
                        ).reduce((a, b) => a + b.value, 0) /
                        (moment().days() - (done ? 0 : 1))
                      ).toFixed(2)
                    : (
                        durData.reduce((a, b) => a + b.value, 0) /
                        durData.length
                      ).toFixed(2)}
                  분
                </Typography.Title>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#e74c3c',
                    fontWeight: 'bold',
                  }}
                >
                  1
                  <ArrowUpOutlined style={{ marginLeft: 5, marginRight: 5 }} />
                  <text
                    style={{
                      color: '#bdc3c7',
                      fontWeight: 'normal',
                    }}
                  >
                    지난주 대비
                  </text>
                </div>
              </Col>
              <Col span={12} style={{ paddingTop: 10 }}>
                <Line
                  data={
                    isCurrentWeek
                      ? done
                        ? [
                            ...durData.slice(0, moment().days() - 1),
                            {
                              day: `${koreanDays[moment().days() - 1]}요일`,
                              value: 5,
                            },
                          ].slice(0, moment().days())
                        : durData.slice(0, moment().days() - 1)
                      : durData
                  }
                  xField="day"
                  yField="value"
                  height={100}
                  xAxis={false}
                  yAxis={false}
                  loading={loading}
                  lineStyle={{
                    stroke: '#657797',
                  }}
                  animation={{
                    enter: {
                      animation: 'path-in',
                      duration: 1000,
                      repeat: loading,
                    },
                  }}
                  area={{
                    style: {
                      fill: 'l(270) 0:#ffffff 0.5:#657797',
                    },
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col span={16}>
          <Card>
            <Row style={{ marginBottom: 20 }}>
              <Col span={18}>
                <Typography.Title level={5}>
                  문제행동별 주간 통계
                </Typography.Title>
              </Col>
              <Col span={6}>
                <Radio.Group defaultValue="빈도" style={{ float: 'right' }}>
                  <Radio.Button value="빈도">빈도</Radio.Button>
                  <Radio.Button value="강도">강도</Radio.Button>
                  <Radio.Button value="지속시간">지속 시간</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>

            <Line
              style={{ margin: '20px 60px', marginTop: 40 }}
              data={
                isCurrentWeek
                  ? statData
                      .filter(data =>
                        koreanDays
                          .slice(0, moment().days() - 1)
                          .includes(data.day.substring(0, 1)),
                      )
                      .concat(
                        done
                          ? [
                              {
                                day: `${koreanDays[moment().days() - 1]}요일`,
                                label: '울기',
                                value: 2,
                              },
                            ]
                          : [],
                      )
                  : statData
              }
              xField="day"
              yField="value"
              seriesField="label"
              yAxis={{ grid: { line: { style: { stroke: 'transparent' } } } }}
              xAxis={{
                grid: {
                  line: {
                    style: {
                      stroke: '#ebebeb',
                    },
                  },
                },
              }}
              annotations={[
                {
                  type: 'line',
                  start: ['min', '3.2'],
                  end: ['max', '3.2'],
                  text: {
                    content: '지난주 평균',
                  },
                  style: {
                    stroke: '#a9a9a9',
                    lineDash: [2, 2],
                  },
                },
                {
                  type: 'line',
                  start: ['min', '3.8'],
                  end: ['max', '3.8'],
                  text: {
                    content: '치료전 평균',
                  },
                  style: {
                    stroke: '#e74c3c',
                    lineDash: [2, 2],
                  },
                },
                {
                  type: 'regionFilter',
                  start: ['min', '3.2'],
                  end: ['max', 'max'],
                  color: '#F4664A',
                },
              ]}
              loading={loading}
              animation={{
                enter: {
                  animation: 'path-in',
                  duration: 1000,
                  repeat: loading,
                },
              }}
              legend={{
                position: 'right',
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: '100%' }}>
            <Typography.Title level={5}>일정별 주간 통계</Typography.Title>
            <Bullet
              style={{ marginTop: 40 }}
              data={
                loading
                  ? []
                  : [
                      {
                        title: '학교',
                        ranges: [1.5, 3, 4],
                        measure: [
                          isCurrentWeek
                            ? (
                                (3.2 + (done ? 1.0 : 0)) /
                                (8 - moment().days())
                              ).toFixed(2)
                            : 3.2,
                        ],
                        target: 0,
                      },
                      {
                        title: '놀이',
                        ranges: [1.5, 3, 4],
                        measure: [
                          isCurrentWeek
                            ? (
                                (2.4 + (done ? 1.0 : 0)) /
                                (8 - moment().days())
                              ).toFixed(2)
                            : 2.4,
                        ],
                        target: 0,
                      },
                      {
                        title: '저녁',
                        ranges: [1.5, 3, 4],
                        measure: [
                          isCurrentWeek
                            ? (1.8 / (8 - moment().days())).toFixed(2)
                            : 1.8,
                        ],
                        target: 0,
                      },
                      {
                        title: '기타',
                        ranges: [1.5, 3, 4],
                        measure: [isCurrentWeek ? 0 : 0.6],
                        target: 0,
                      },
                    ].reverse()
              }
              measureField="measure"
              rangeField="ranges"
              xField="title"
              targetField="target"
              loading={loading}
              //@ts-ignore
              color={{
                range: ['#bfeec8', '#FFe0b0', '#FFbcb8'],
                measure: '#657797',
                target: '#657797',
              }}
              appendPadding={10}
              animation={{
                enter: {
                  animation: 'path-in',
                  duration: 1000,
                  repeat: loading,
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card>
            <Typography.Title level={5} style={{ marginBottom: 20 }}>
              문제행동별 평균 빈도
            </Typography.Title>
            <Radar
              xField="type"
              yField="value"
              appendPadding={10}
              legend={{
                position: 'left',
              }}
              label={false}
              data={
                loading
                  ? []
                  : [
                      {
                        type: '소리 지르기',
                        value: isCurrentWeek
                          ? Math.floor((1.6 * moment().days()) / 4)
                          : 1.6,
                      },
                      {
                        type: '울기',
                        value: isCurrentWeek
                          ? Math.floor(
                              ((done ? 4.8 : 2.8) * moment().days()) / 4,
                            )
                          : 2.8,
                      },
                      {
                        type: '기타',
                        value: isCurrentWeek
                          ? Math.floor((0.4 * moment().days()) / 4)
                          : 0.44,
                      },
                    ]
              }
              loading={loading}
              area={{
                style: {
                  fill: '#1990ff',
                },
              }}
              animation={{
                enter: {
                  animation: 'path-in',
                  duration: 1000,
                  repeat: loading,
                },
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Typography.Title level={5} style={{ marginBottom: 20 }}>
              문제행동별 평균 강도
            </Typography.Title>
            <Column
              xField="type"
              yField="value"
              appendPadding={10}
              maxColumnWidth={30}
              color="#61daab"
              label={{
                fields: ['type'],
              }}
              data={
                loading
                  ? []
                  : [
                      {
                        type: '소리 지르기',
                        value: isCurrentWeek
                          ? Math.floor((2.28 * moment().days()) / 7)
                          : 4.18,
                      },
                      {
                        type: '울기',
                        value: isCurrentWeek
                          ? Math.floor(
                              ((done ? 8.8 : 4.18) * moment().days()) / 7,
                            )
                          : 2.28,
                      },
                      {
                        type: '기타',
                        value: isCurrentWeek
                          ? Math.floor((1.13 * moment().days()) / 7)
                          : 1.13,
                      },
                    ]
              }
              loading={loading}
              animation={{
                enter: {
                  animation: 'path-in',
                  duration: 1000,
                  repeat: loading,
                },
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Typography.Title level={5} style={{ marginBottom: 20 }}>
              문제행동별 평균 지속시간
            </Typography.Title>
            <Pie
              angleField="value"
              colorField="type"
              appendPadding={10}
              innerRadius={0.9}
              legend={{
                position: 'right',
              }}
              label={false}
              statistic={{
                title: {
                  content: '전체 평균',
                },
                content: {
                  content: `${
                    isCurrentWeek
                      ? (
                          (done
                            ? [
                                ...durData.slice(0, moment().days() - 1),
                                {
                                  day: `${koreanDays[moment().days() - 1]}요일`,
                                  value: 5,
                                },
                              ].slice(0, moment().days())
                            : durData.slice(0, moment().days() - 1)
                          ).reduce((a, b) => a + b.value, 0) /
                          (moment().days() - (done ? 0 : 1))
                        ).toFixed(2)
                      : (
                          durData.reduce((a, b) => a + b.value, 0) /
                          durData.length
                        ).toFixed(2)
                  }분`,
                },
              }}
              data={
                loading
                  ? []
                  : [
                      {
                        type: '소리 지르기',
                        value: isCurrentWeek
                          ? Math.floor((4 * moment().days()) / 7)
                          : 4,
                        color: '#5b8ff9',
                      },
                      {
                        type: '울기',
                        value: isCurrentWeek
                          ? Math.floor(((done ? 15 : 9) * moment().days()) / 7)
                          : 9,
                        color: '#2ecc71',
                      },
                      {
                        type: '기타',
                        value: isCurrentWeek
                          ? Math.floor((2 * moment().days()) / 7)
                          : 2,
                        color: '#f1c40f',
                      },
                    ]
              }
              loading={loading}
              animation={{
                enter: {
                  animation: 'path-in',
                  duration: 1000,
                  repeat: loading,
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
