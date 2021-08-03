import React, { PureComponent } from 'react';
import { connect } from 'umi';
import { Row, Col, Card, Tooltip } from 'antd';
import numeral from 'numeral';
import { GridContent } from '@ant-design/pro-layout';

import {
  Pie,
  WaterWave,
  Gauge,
  TagCloud,
} from 'antd-management-fast-framework/lib/customComponents/Charts';
import NumberInfo from 'antd-management-fast-framework/lib/customComponents/NumberInfo';
import Authorized from 'antd-management-fast-framework/lib/utils/Authorized';

import { formatMessage } from '@/utils/tools';
// import CountDown from '@/components/CountDown';
// import ActiveChart from '@/components/ActiveChart';

import styles from './Monitor.less';

const { Secured } = Authorized;

// const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise((resolve) => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
class Monitor extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title={formatMessage({ id: 'app.monitor.trading-activity' })} bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={formatMessage({
                      id: 'app.monitor.total-transactions',
                    })}
                    suffix="元"
                    total={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={formatMessage({ id: 'app.monitor.sales-target' })}
                    total="92%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={formatMessage({
                      id: 'app.monitor.remaining-time',
                    })}
                    // total={<CountDown target={targetTime} />}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={formatMessage({
                      id: 'app.monitor.total-transactions-per-second',
                    })}
                    suffix="元"
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip
                  title={formatMessage({
                    id: 'app.monitor.waiting-for-implementation',
                  })}
                >
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                    alt="map"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title={formatMessage({ id: 'app.monitor.activity-forecast' })}
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              {/* <ActiveChart /> */}
            </Card>
            <Card
              title={formatMessage({ id: 'app.monitor.efficiency' })}
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                title={formatMessage({
                  id: 'app.monitor.ratio',
                  defaultMessage: 'Ratio',
                })}
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title={formatMessage({
                id: 'app.monitor.proportion-per-category',
              })}
              bordered={false}
              className={styles.pieCard}
            >
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle={formatMessage({ id: 'app.monitor.fast-food' })}
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle={formatMessage({ id: 'app.monitor.western-food' })}
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle={formatMessage({ id: 'app.monitor.hot-pot' })}
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title={formatMessage({ id: 'app.monitor.popular-searches' })}
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={tags} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title={formatMessage({ id: 'app.monitor.resource-surplus' })}
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave
                height={161}
                title={formatMessage({ id: 'app.monitor.fund-surplus' })}
                percent={34}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Monitor;
