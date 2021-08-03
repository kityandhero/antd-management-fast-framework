import React from 'react';
import { connect } from 'umi';
import { Card, Row, Col, Spin, BackTop, Select, notification, Popover, message } from 'antd';
import {
  ProjectOutlined,
  CompressOutlined,
  ContactsOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import HtmlBox from 'antd-management-fast-framework/lib/customComponents/HtmlBox';
import {
  getDerivedStateFromPropsForUrlParams,
  pretreatmentRequestParams,
} from 'antd-management-fast-framework/lib/utils/tools';

import { parseUrlParamsForSetState } from '../../Assist/config';
import TabPageBase from '../../TabPageBase';

import { fieldData } from '../../Common/data';
import styles from './index.less';

@connect(({ accessWay, global, loading }) => ({
  accessWay,
  global,
  loading: loading.models.accessWay,
}))
class BasicInfo extends TabPageBase {
  mounted = false;

  constructor(props) {
    super(props);

    this.state = {
      metaData: null,
      dataLoading: true,
      // loadSuccess: false,
      processing: false,
      accessWayId: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const {
      urlParams: { op },
    } = this.state;

    const { dataLoading } = this.state;

    if (!dataLoading) {
      if (op === 'update' || this.checkNeedUpdate(preProps, preState, snapshot)) {
        this.loadData();
      }
    }
  };

  loadData = () => {
    const { dispatch } = this.props;

    this.setState({
      dataLoading: true,
      //  loadSuccess: false,
      metaData: null,
    });

    const submitData = pretreatmentRequestParams({}, (d) => {
      const o = d;
      const { accessWayId } = this.state;

      o.accessWayId = accessWayId;

      return o;
    });

    dispatch({
      type: 'accessWay/get',
      payload: submitData,
    }).then(() => {
      if (this.mounted) {
        const {
          accessWay: { data },
        } = this.props;

        const { dataSuccess } = data;

        if (dataSuccess) {
          const { data: metaData } = data;

          this.setState({
            metaData,
            //  loadSuccess: dataSuccess
          });
        }

        this.setState({ dataLoading: false });
      }
    });
  };

  reloadData = () => {
    this.loadData();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      dispatch,
      form,
      location: { pathname },
    } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ processing: true });

        const submitData = pretreatmentRequestParams(values, (d) => {
          const o = d;
          const { accessWayId } = this.state;

          o.accessWayId = accessWayId;

          return o;
        });

        dispatch({
          type: 'accessWay/updateBasicInfo',
          payload: submitData,
        }).then(() => {
          if (this.mounted) {
            this.setState({ processing: false });

            const {
              accessWay: { data },
            } = this.props;

            const { dataSuccess } = data;

            if (dataSuccess) {
              requestAnimationFrame(() => {
                notification.success({
                  placement: 'bottomRight',
                  message: '操作结果',
                  description: '数据已经保存成功，请进行后续操作。',
                });
              });
            }

            that.redirectToPath(pathname.replace('/load/', '/update/'));
          }
        });
      } else {
        const m = [];

        Object.values(err).forEach((o) => {
          m.push(o.errors[0].message);
        });

        message.warn(m.join());
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();

    this.reloadData();
  };

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter((key) => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map((key) => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CompressOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldData[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          <ExclamationCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      location: { pathname },
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        this.setState({ processing: true });

        const submitData = pretreatmentRequestParams(values, (d) => {
          const o = d;
          const { accessWayId } = this.state;

          o.accessWayId = accessWayId;

          return o;
        });

        dispatch({
          type: 'accessWay/updateBasicInfo',
          payload: submitData,
        }).then(() => {
          if (this.mounted) {
            const {
              accessWay: { data },
            } = this.props;

            const { dataSuccess } = data;

            if (dataSuccess) {
              requestAnimationFrame(() => {
                notification.success({
                  placement: 'bottomRight',
                  message: '操作结果',
                  description: '数据已经保存成功，请进行后续操作。',
                });
              });
            }

            const that = this;

            that.setState({ processing: false }, () => {
              dispatch(that.redirectToPath(pathname.replace('/load/', '/update/')));
            });
          }
        });
      }
    });
  };

  render() {
    const { metaData, processing, dataLoading } = this.state;

    const accessWayTypeData = this.accessWayTypeList();
    const accessWayTypeOption = [];

    accessWayTypeData.forEach((item) => {
      const { name, flag } = item;
      accessWayTypeOption.push(
        <Select.Option key={flag} value={flag}>
          {name}
        </Select.Option>,
      );
    });

    return (
      <>
        <div className={styles.containorBox}>
          <Card
            title={
              <>
                <ContactsOutlined />
                <span className={styles.cardTitle}>基本信息</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col lg={24} md={12} sm={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.message}：${metaData === null ? '' : metaData.message || '无'}`}
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={24} md={12} sm={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.url}：${metaData === null ? '' : metaData.url || '无'}`}
                  </div>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.source}：${metaData === null ? '' : metaData.source || '无'}`}
                  </div>
                </Col>

                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.userId}：${metaData === null ? '' : metaData.userId || '无'}`}
                  </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.scene}：${metaData === null ? '' : metaData.scene || '无'}`}
                  </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.host}：${metaData === null ? '' : metaData.host || '无'}`}
                  </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.port}：${metaData === null ? '' : metaData.port || '无'}`}
                  </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.log}：${metaData === null ? '' : metaData.log || '无'}`}
                  </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.autoRemark}：${
                      metaData === null ? '' : metaData.autoRemark || '无'
                    }`}
                  </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.ip}：${metaData === null ? '' : metaData.ip || '无'}`}
                  </div>
                </Col>
              </Row>
            </Spin>
          </Card>
          <Card
            title={
              <>
                <ContactsOutlined />
                <span className={styles.cardTitle}>异常信息</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <Row gutter={24}>
                <Col lg={12} md={12} sm={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.exceptionTypeName}：${
                      metaData === null ? '' : metaData.exceptionTypeName || '无'
                    }`}
                  </div>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <div className={styles.fieldBox}>
                    {`${fieldData.exceptionTypeFullName}：${
                      metaData === null ? '' : metaData.exceptionTypeFullName || '无'
                    }`}
                  </div>
                </Col>
              </Row>
            </Spin>
          </Card>
          <Card
            title={
              <>
                <ProjectOutlined />
                <span className={styles.cardTitle}>{fieldData.stackTrace}</span>
              </>
            }
            className={styles.card}
            bordered={false}
          >
            <Spin spinning={dataLoading || processing}>
              <HtmlBox>
                {metaData === null
                  ? ''
                  : (metaData.stackTrace || '无').replace(new RegExp('\\r\\n', 'g'), '<br/>')}
              </HtmlBox>
            </Spin>
          </Card>
        </div>
        <BackTop />
      </>
    );
  }
}

export default BasicInfo;