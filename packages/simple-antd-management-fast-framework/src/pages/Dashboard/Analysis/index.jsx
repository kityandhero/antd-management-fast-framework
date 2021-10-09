import React from 'react';
import { connect } from 'umi';
import {
  Row,
  Col,
  Card,
  Tabs,
  DatePicker,
  Tooltip,
  Statistic,
  // Menu,
  // Dropdown,
  Spin,
  Alert,
} from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import {
  //  EllipsisOutlined,
  InfoCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
} from 'antd-management-fast-framework/es/customComponents/Charts';
import {
  formatDecimal,
  formatDatetime,
  formatMoney,
} from 'antd-management-fast-framework/es/utils/tools';
import { pretreatmentRequestParams } from 'antd-management-fast-framework/es/utils/requestAssistor';
import { datetimeFormat } from 'antd-management-fast-framework/es/utils/constants';
import DataLoad from 'antd-management-fast-framework/es/framework/DataSingleView/DataLoad';
import Trend from 'antd-management-fast-framework/es/customComponents/Trend';
import VerticalBox from 'antd-management-fast-framework/es/customComponents/VerticalBox';

import { accessWayCollection } from '@/customConfig/config';

import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const productRankingMaxCount = 7;

@connect(({ dashboard, chart, loading }) => ({
  dashboard,
  chart,
  loading: loading.models.dashboard,
}))
class Analysis extends DataLoad {
  componentAuthority = accessWayCollection.dashboard.analysis.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        loadDataAfterMount: false,
        saleAmountLoading: true,
        saleAmountData: {
          totalSaleAmount: 0,
          totalSaleAmountTime: '',
          todaySaleAmount: 0,
          dayChainRelativeRatio: 0,
          weekChainRelativeRatio: 0,
        },
        saleCountLoading: true,
        saleCountData: {
          totalSaleCount: 0,
          todaySaleCount: 0,
          saleCountRange: [],
        },
        goodsCountLoading: true,
        goodsCountData: {
          totalGoodsCount: 0,
          todayGoodsCount: 0,
          goodsCountRange: [],
        },
        areaAccountBalanceLoading: true,
        areaAccountBalanceData: {
          totalAreaAccountBalance: 0,
          availableAreaAccountBalance: 0,
          areaAccountBalanceRange: [],
        },
        replenishmentStatisticLoading: true,
        replenishmentStatisticData: {
          rate: 0.0,
          replenishmentCount: 0,
          saleCount: 0,
        },
        saleAmountRangeLoading: true,
        saleAmountRangeData: {
          saleAmountRange: [],
          productRankingList: [],
        },
        saleCountRangeLoading: true,
        saleCountRangeData: {
          saleCountRange: [],
          productRankingList: [],
        },
        searchDataLoading: true,
        searchData: {
          searchRange: [],
          topSearchList: [],
        },
        saleRangeMode: '',
        saleStartTime: null,
        saleEndTime: null,
        rankStatisticLoading: true,
        rankStatisticData: {
          totalAmount: 0,
          totalCount: 0,
          rankSale: [],
        },
        salesType: 'all',
        currentTabKey: '',
        offlineDataLoading: true,
        offlineData: [],
        offlineChartData: [],
      },
    };
  }

  init = () => {
    this.loadShowAnalysis();
  };

  beforeUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  };

  loadShowAnalysis = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'dashboard/showAnalysis',
      payload: {},
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          this.loadSaleAmount();
          this.loadSaleCount();
          this.loadGoodsCount();
          this.loadReplenishmentStatistic();
          this.loadSaleAmountRange();
          this.loadSaleCountRange();
        }
      }
    });
  };

  loadSaleCount = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, (d) => {
      const o = d;

      return o;
    });

    this.setState({ saleCountLoading: true });

    dispatch({
      type: 'dashboard/getSaleCount',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { totalSaleCount, todaySaleCount, saleCountRange: saleCountRangeData } = metaData;

          const saleCountRange = [];

          (saleCountRangeData || []).forEach((item) => {
            const o = {
              x: item.title,
              y: item.data,
            };

            saleCountRange.push(o);
          });

          const saleCountData = {
            totalSaleCount,
            todaySaleCount,
            saleCountRange,
          };

          this.setState({ saleCountData });
        }

        this.setState({ saleCountLoading: false });
      }
    });
  };

  loadSaleAmount = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, (d) => {
      const o = d;

      return o;
    });

    this.setState({ saleAmountLoading: true });

    dispatch({
      type: 'dashboard/getSaleAmount',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const {
            totalSaleAmount,
            totalSaleAmountTime,
            todaySaleAmount,
            dayChainRelativeRatio,
            weekChainRelativeRatio,
          } = metaData;

          const saleAmountData = {
            totalSaleAmount,
            totalSaleAmountTime,
            todaySaleAmount,
            dayChainRelativeRatio,
            weekChainRelativeRatio,
          };

          this.setState({ saleAmountData });
        }

        this.setState({ saleAmountLoading: false });
      }
    });
  };

  loadGoodsCount = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, (d) => {
      const o = d;

      return o;
    });

    this.setState({ goodsCountLoading: true });

    dispatch({
      type: 'dashboard/getGoodsCount',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const {
            totalGoodsCount,
            todayGoodsCount,
            goodsCountRange: goodsCountRangeData,
          } = metaData;

          const goodsCountRange = [];

          (goodsCountRangeData || []).forEach((item) => {
            const o = {
              x: item.title,
              y: item.data,
            };

            goodsCountRange.push(o);
          });

          const goodsCountData = {
            totalGoodsCount,
            todayGoodsCount,
            goodsCountRange,
          };

          this.setState({ goodsCountData });
        }

        this.setState({ goodsCountLoading: false });
      }
    });
  };

  loadAreaAccountBalance = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, (d) => {
      const o = d;

      return o;
    });

    this.setState({ areaAccountBalanceLoading: true });

    dispatch({
      type: 'dashboard/getAreaAccountBalance',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const {
            totalAreaAccountBalance,
            availableAreaAccountBalance,
            areaAccountBalanceRange: areaAccountBalanceRangeData,
          } = metaData;

          const areaAccountBalanceRange = [];

          (areaAccountBalanceRangeData || []).forEach((item) => {
            const o = {
              x: item.title,
              y: item.data,
            };

            areaAccountBalanceRange.push(o);
          });

          const areaAccountBalanceData = {
            totalAreaAccountBalance,
            availableAreaAccountBalance,
            areaAccountBalanceRange,
          };

          this.setState({ areaAccountBalanceData });
        }

        this.setState({ areaAccountBalanceLoading: false });
      }
    });
  };

  loadReplenishmentStatistic = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, (d) => {
      const o = d;

      return o;
    });

    this.setState({ replenishmentStatisticLoading: true });

    dispatch({
      type: 'dashboard/getReplenishmentStatistic',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { rate, replenishmentCount, saleCount } = metaData;

          const replenishmentStatisticData = {
            rate,
            replenishmentCount,
            saleCount,
          };

          this.setState({ replenishmentStatisticData });
        }

        this.setState({ replenishmentStatisticLoading: false });
      }
    });
  };

  loadSaleAmountRange = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, (d) => {
      const { saleRangeMode, saleStartTime, saleEndTime } = this.state;
      const o = d;

      o.mode = saleRangeMode || 'today';
      o.startTime = saleStartTime;
      o.endTime = saleEndTime;

      return o;
    });

    this.setState({ saleAmountRangeLoading: true });

    dispatch({
      type: 'dashboard/getSaleAmountRange',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { saleAmountRange: saleAmountRangeSource, productRankingList } = metaData;

          const saleAmountRange = [];

          (saleAmountRangeSource || []).forEach((item) => {
            const o = {
              x: item.title,
              y: item.data,
            };

            saleAmountRange.push(o);
          });

          const saleAmountRangeData = {
            saleAmountRange,
            productRankingList,
          };

          this.setState({ saleAmountRangeData });
        }

        this.setState({ saleAmountRangeLoading: false });
      }
    });
  };

  loadSaleCountRange = () => {
    const { dispatch } = this.props;

    const submitData = pretreatmentRequestParams({}, (d) => {
      const { saleRangeMode, saleStartTime, saleEndTime } = this.state;
      const o = d;

      o.mode = saleRangeMode || 'today';
      o.startTime = saleStartTime;
      o.endTime = saleEndTime;

      return o;
    });

    this.setState({ saleCountRangeLoading: true });

    dispatch({
      type: 'dashboard/getSaleCountRange',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          dashboard: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;
          const { saleCountRange: saleCountRangeSource, productRankingList } = metaData;

          const saleCountRange = [];

          (saleCountRangeSource || []).forEach((item) => {
            const o = {
              x: item.title,
              y: item.data,
            };

            saleCountRange.push(o);
          });

          const saleCountRangeData = {
            saleCountRange,
            productRankingList,
          };

          this.setState({ saleCountRangeData });
        }

        this.setState({ saleCountRangeLoading: false });
      }
    });
  };

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (dates, dateStrings) => {
    this.setState(
      {
        saleRangeMode: 'custom',
        saleStartTime: dateStrings[0],
        saleEndTime: dateStrings[1],
      },
      () => {
        this.loadSaleCountRange();
        this.loadSaleAmountRange();
      },
    );
  };

  saleRangeChange = (type) => {
    this.setState(
      {
        saleRangeMode: type,
        saleStartTime: null,
        saleEndTime: null,
      },
      () => {
        this.loadSaleCountRange();
        this.loadSaleAmountRange();
      },
    );
  };

  isActive(type) {
    const { saleRangeMode } = this.state;

    const ck = saleRangeMode || 'today';

    if (ck === type) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const {
      saleAmountLoading,
      saleAmountData,
      saleCountLoading,
      saleCountData,
      goodsCountLoading,
      goodsCountData,
      replenishmentStatisticLoading,
      replenishmentStatisticData,
      saleAmountRangeLoading,
      saleAmountRangeData,
      saleCountRangeLoading,
      saleCountRangeData,
      saleRangeMode,
    } = this.state;

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('today')}
            onClick={() => this.saleRangeChange('today')}
          >
            今日
          </a>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('week')}
            onClick={() => this.saleRangeChange('week')}
          >
            本周
          </a>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('month')}
            onClick={() => this.saleRangeChange('month')}
          >
            本月
          </a>
          <a
            disabled={saleAmountRangeLoading || saleCountRangeLoading}
            className={this.isActive('year')}
            onClick={() => this.saleRangeChange('year')}
          >
            全年
          </a>
        </div>
        <RangePicker
          disabled={saleAmountRangeLoading || saleCountRangeLoading}
          placeholder={['开始时间', '结束时间']}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const RankingNoSupportBox = () => (
      <div className={styles.rankingNoSupportBox}>
        <Alert message="暂不支持自定时间段单品排名" type="info" showIcon />
      </div>
    );

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <Spin spinning={saleAmountLoading}>
              <ChartCard
                bordered={false}
                title="成交总销售额"
                action={
                  <>
                    <Tooltip
                      title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                        saleAmountData.totalSaleAmountTime,
                        datetimeFormat.yearMonthDayHourMinute,
                      )}`}
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  </>
                }
                total={formatMoney(saleAmountData.totalSaleAmount)}
                // total={`￥${numeral(saleAmountData.todaySaleAmount).format('0,0.00')}`}
                footer={
                  <Field
                    label="今日目前销售额"
                    value={formatMoney(saleAmountData.todaySaleAmount)}
                  />
                }
                contentHeight={46}
              >
                <VerticalBox
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  align="bottom"
                >
                  <div style={{ width: '100%' }}>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Statistic
                          title=""
                          value={Math.abs(saleAmountData.weekChainRelativeRatio) * 100}
                          formatter={(v) => {
                            return (
                              <>
                                <span
                                  style={
                                    saleAmountData.weekChainRelativeRatio >= 0
                                      ? { color: '#e20019' }
                                      : { color: '#3f8600' }
                                  }
                                >
                                  {saleAmountData.weekChainRelativeRatio >= 0 ? (
                                    <ArrowUpOutlined />
                                  ) : (
                                    <ArrowDownOutlined />
                                  )}
                                  {formatDecimal(v)}
                                </span>
                              </>
                            );
                          }}
                          precision={2}
                          valueStyle={{ fontSize: '14px' }}
                          prefix="周环比："
                          suffix="%"
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title=""
                          value={Math.abs(saleAmountData.dayChainRelativeRatio) * 100}
                          formatter={(v) => {
                            return (
                              <>
                                <span
                                  style={
                                    saleAmountData.dayChainRelativeRatio >= 0
                                      ? { color: '#e20019' }
                                      : { color: '#3f8600' }
                                  }
                                >
                                  {saleAmountData.dayChainRelativeRatio >= 0 ? (
                                    <ArrowUpOutlined />
                                  ) : (
                                    <ArrowDownOutlined />
                                  )}
                                  {formatDecimal(v)}
                                </span>
                              </>
                            );
                          }}
                          precision={2}
                          valueStyle={{ fontSize: '14px' }}
                          prefix="日环比："
                          suffix="%"
                        />
                      </Col>
                    </Row>
                  </div>{' '}
                </VerticalBox>
              </ChartCard>
            </Spin>
          </Col>
          <Col {...topColResponsiveProps}>
            <Spin spinning={saleCountLoading}>
              <ChartCard
                bordered={false}
                title="成交总订单量"
                action={
                  <Tooltip
                    title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                      saleAmountData.totalSaleAmountTime,
                      datetimeFormat.yearMonthDayHourMinute,
                    )}`}
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                total={saleCountData.totalSaleCount}
                footer={
                  <Field label="今日目前订单量" value={`${saleCountData.todaySaleCount}笔`} />
                }
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={saleCountData.saleCountRange} />
              </ChartCard>
            </Spin>
          </Col>
          <Col {...topColResponsiveProps}>
            <Spin spinning={goodsCountLoading}>
              <ChartCard
                bordered={false}
                title="成交物品总数"
                action={
                  <Tooltip
                    title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                      goodsCountData.totalGoodsCountTime,
                      datetimeFormat.yearMonthDayHourMinute,
                    )}`}
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                total={() => <>{goodsCountData.totalGoodsCount}</>}
                footer={
                  <>
                    <Field
                      label="今日出库物品数"
                      value={<>{`${goodsCountData.todayGoodsCount || '暂无'}`}</>}
                    />
                  </>
                }
                contentHeight={46}
              >
                <MiniBar data={goodsCountData.goodsCountRange} />
              </ChartCard>
            </Spin>
          </Col>
          <Col {...topColResponsiveProps}>
            <Spin spinning={replenishmentStatisticLoading}>
              <ChartCard
                bordered={false}
                title="总售后占比"
                action={
                  <Tooltip
                    title={`每隔10分钟统计一次,本次统计时间为${formatDatetime(
                      saleAmountData.totalSaleAmountTime,
                      datetimeFormat.yearMonthDayHourMinute,
                    )}`}
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                total={`${Math.abs(replenishmentStatisticData.rate) * 100}%`}
                footer={
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                      总订单量
                      <span className={styles.trendText}>
                        {replenishmentStatisticData.saleCount}
                      </span>
                    </Trend>
                    <Trend flag="up">
                      总售后量
                      <span className={styles.trendText}>
                        {replenishmentStatisticData.replenishmentCount}
                      </span>
                    </Trend>
                  </div>
                }
                contentHeight={46}
              >
                <VerticalBox
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  align="bottom"
                >
                  <MiniProgress
                    percent={Math.abs(replenishmentStatisticData.rate) * 100}
                    strokeWidth={8}
                    target={1}
                    color="#13C2C2"
                  />
                </VerticalBox>
              </ChartCard>
            </Spin>
          </Col>
        </Row>

        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <Spin spinning={saleAmountRangeLoading || saleCountRangeLoading}>
            <div className={styles.salesCard}>
              <Tabs
                animated
                tabBarExtraContent={salesExtra}
                size="large"
                tabBarStyle={{ marginBottom: 24 }}
              >
                <TabPane tab="成交销售额" key="sales">
                  <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <Bar
                          height={295}
                          title="销售额趋势"
                          data={saleAmountRangeData.saleAmountRange}
                        />
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <div className={styles.salesRankInner}>
                          <h4 className={styles.rankingTitle}>商品销售额排名</h4>
                          <ul className={styles.rankingList}>
                            {(saleAmountRangeData.productRankingList || []).map((item, i) => {
                              if (i >= productRankingMaxCount) {
                                return null;
                              }

                              return (
                                <li key={`saleAmountMerchant_${item.ranking}`}>
                                  <span
                                    className={`${styles.rankingItemNumber} ${
                                      i < 3 ? styles.active : ''
                                    }`}
                                  >
                                    {item.ranking}
                                  </span>
                                  <span
                                    className={styles.rankingItemTitle}
                                    title={item.name || '暂无排名'}
                                  >
                                    {item.name || '暂无排名'}
                                  </span>
                                  <span className={styles.rankingItemValue}>
                                    {formatMoney(item.amount)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                          {saleRangeMode === 'custom' ? <RankingNoSupportBox /> : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="成交订单量" key="views">
                  <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <Bar
                          height={292}
                          title="订单量趋势"
                          data={saleCountRangeData.saleCountRange}
                        />
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <div className={styles.salesRankInner}>
                          <h4 className={styles.rankingTitle}>单品订单量排名</h4>
                          <ul className={styles.rankingList}>
                            {(saleCountRangeData.productRankingList || []).map((item, i) => {
                              if (i >= productRankingMaxCount) {
                                return null;
                              }

                              return (
                                <li key={`saleCountMerchant_${item.ranking}`}>
                                  <span
                                    className={`${styles.rankingItemNumber} ${
                                      i < 3 ? styles.active : ''
                                    }`}
                                  >
                                    {item.ranking}
                                  </span>
                                  <span
                                    className={styles.rankingItemTitle}
                                    title={item.name || '暂无排名'}
                                  >
                                    {item.name || '暂无排名'}
                                  </span>
                                  <span>{item.count}</span>
                                </li>
                              );
                            })}
                          </ul>
                          {saleRangeMode === 'custom' ? <RankingNoSupportBox /> : null}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </Spin>
        </Card>
      </GridContent>
    );
  }
}

export default Analysis;
