import { message } from 'antd';

import {
  pretreatmentRemoteSingleData,
  handleCommonDataAssist,
} from 'antd-management-fast-framework/lib/utils/requestAssistor';
import { whetherString } from 'antd-management-fast-framework/lib/utils/constants';

import {
  getMetaDataCache,
  setMetaDataCache,
  getCurrentOperatorCache,
  setCurrentOperatorCache,
} from '@/utils/storageAssist';

import { queryNotices } from '../services/user';
import { getData } from '../services/global';
import { getCurrentBasicInfoData } from '../services/currentOperator';

const GlobalModel = {
  namespace: 'global',

  state: {
    currentOperator: null,
    collapsed: false,
    amapObject: null,
    notices: [],
    whetherList: [
      { key: '0', flag: '0', name: '否' },
      { key: '1', flag: '1', name: '是' },
    ],
    platform: {},
    rankList: [],
    brandList: [],
    productStatusList: [],
    productBuyTypeList: [],
    businessModeList: [],
    productSkuSaleTypeList: [],
    productUnitList: [],
    productSkuStatusList: [],
    productSkuSaleTimeModeList: [],
    productMediaStatusList: [],
    userScoreOrderStatusList: [],
    payTypeList: [],
    userTypeList: [],
    cityList: [],
    genderList: [],
    userManageList: [],
    userIsSendMsgList: [],
    refundOrderHandleTypeList: [],
    refundOrderReturnStoreList: [
      { key: '0', flag: '0', name: '否' },
      { key: '1', flag: '1', name: '是' },
    ],
    refundOrderStateList: [],
    replenishmentStatusModeList: [
      { key: '-2', flag: '-2', name: '无效申请' },
      { key: '1', flag: '1', name: '同意售后' },
      { key: '2', flag: '2', name: '转到退款处理' },
    ],
    orderMessageList: [
      { key: '0', flag: '0', name: '不接受' },
      { key: '1', flag: '1', name: '接受' },
    ],
    replenishmentReasonTypeList: [],
    replenishmentStatusList: [],
    replenishmentTypeList: [],
    showInStoreList: [
      { key: whetherString.no, flag: whetherString.no, name: '否' },
      { key: whetherString.yes, flag: whetherString.yes, name: '是' },
    ],
    showInAppList: [
      { key: whetherString.no, flag: whetherString.no, name: '否' },
      { key: whetherString.yes, flag: whetherString.yes, name: '是' },
    ],
    showInWeChatList: [
      { key: whetherString.no, flag: whetherString.no, name: '否' },
      { key: whetherString.yes, flag: whetherString.yes, name: '是' },
    ],
    areaAccountRecordRevenueExpensesList: [],
    areaAccountRecordTypeList: [],
    areaAccountRecordIsHandleList: [
      { key: whetherString.no, flag: whetherString.no, name: '结算中' },
      { key: whetherString.yes, flag: whetherString.yes, name: '已结算' },
    ],
    areaDistributionStatusList: [],
    areaDistributionPayTypeList: [],
    areaCallCenterStatusList: [],
    areaCallCenterCategoryList: [],
    areaDistributionTempData: null,
    clientTypeList: [],
    productSkuStockChangeTypeList: [],
    distributionStatusList: [],
    areaManagerStatusList: [],
    areaAgentRoleStateList: [],
    areaAgentRoleCreateModeList: [],
    stockTypeList: [],
    statisticModeList: [],
    statisticStateList: [],
    peopleAccountLogTypeList: [],
    peopleAccountLogIsOutInList: [],
    peopleAccountLogInTypeList: [],
    merchantSaleStatisticShowModeList: [],
    departmentStatusList: [],
    employeeStatusList: [],
    productPurchaseStatusList: [],
    couponStatusList: [],
    couponScopeList: [],
    couponApplicableObjectList: [],
    couponExpireModeList: [],
    couponDisplayRangeList: [],
    couponDisplayList: [],
    couponSceneList: [],
    couponGoodsUseInBusinessList: [],
    couponStockChangeTypeList: [],
    couponStockCacheChangedList: [],
    couponStockCacheChangeTypeList: [],
    couponStockModeList: [],
    couponStockStateList: [],
    userCouponStatusList: [],
    userCouponChangeExpirationTimeModeList: [],
    couponTypeList: [
      { key: -1, flag: -1, name: '已删除' },
      { key: '0', flag: '0', name: '待使用' },
      { key: '1', flag: '1', name: '已使用' },
    ],
    expiredList: [
      { key: '0', flag: '0', name: '未过期' },
      { key: '1', flag: '1', name: '已过期' },
    ],
    weChatMessageRecordSendStateList: [],
    merchantCreditScoreList: [],
    merchantStainScoreList: [],
    areaConfigWhetherCustomOutboundNoticeList: [
      { key: '0', flag: '0', name: '否' },
      { key: '1', flag: '1', name: '是' },
    ],
    tagDisplayRangeList: [
      { key: '0', flag: '0', name: '不限' },
      { key: '1', flag: '1', name: '微信端' },
      { key: '2', flag: '2', name: '微信小程序' },
      { key: '3', flag: '3', name: 'App' },
    ],
    tagGoodsTypeList: [
      { key: '0', flag: '0', name: '商品' },
      { key: '1', flag: '1', name: '商品分类' },
    ],
    recommendList: [
      { key: '0', flag: '0', name: '未推荐' },
      { key: '1', flag: '1', name: '已推荐' },
    ],
    statusList: [
      { key: '0', flag: '0', name: '未启用' },
      { key: '1', flag: '1', name: '已启用' },
    ],
    smsLogStatusList: [],
    smsLogAggregateList: [],
    smsCategoryStatusList: [],
    expressOrderStatusList: [],
    expressOrderDetailOrderTypeList: [],
    expressOrderSaleTypeList: [],
    expressOrderDetailScoreProcessingStatusList: [],
    expressOrderDetailStatusList: [],
    expressRefundOrderStatusList: [],
    expressRefundOrderHandleTypeList: [],
    expressReplenishmentStatusList: [],
    expressReplenishmentTypeList: [],
    expressReplenishmentReasonTypeList: [],
    settlementStatusList: [],
  },

  effects: {
    *getMetaData({ payload }, { call, put }) {
      const { force, showMessage } = payload || {
        force: false,
        showMessage: true,
      };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        result = getMetaDataCache();

        if ((result || null) == null) {
          fromRemote = true;
          result = {};
        }
      }

      if (fromRemote) {
        if (showMessage) {
          requestAnimationFrame(() => {
            message.info('初始数据正在努力加载中，需要一点点时间哦！', 0.8);
          });
        }

        const response = yield call(getData, payload);

        const data = pretreatmentRemoteSingleData(response);

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          const {
            platform,
            rankList,
            brandList,
            productSkuStockChangeTypeList,
            productStatusList,
            productSkuStatusList,
            productSkuSaleTypeList,
            productBuyTypeList,
            businessModeList,
            productUnitList,
            productSkuSaleTimeModeList,
            productMediaStatusList,
            userScoreOrderStatusList,
            payTypeList,
            clientTypeList,
            areaAccountRecordRevenueExpensesList,
            areaAccountRecordTypeList,
            areaDistributionStatusList,
            areaDistributionPayTypeList,
            areaCallCenterStatusList,
            areaCallCenterCategoryList,
            areaDistributionTempData,
            refundOrderStateList,
            refundOrderHandleTypeList,
            userTypeList,
            userManageList,
            userIsSendMsgList,
            genderList,
            replenishmentReasonTypeList,
            replenishmentStatusList,
            replenishmentTypeList,
            replenishmentRollBackMoneyList,
            distributionStatusList,
            areaManagerStatusList,
            areaAgentRoleStateList,
            areaAgentRoleCreateModeList,
            stockTypeList,
            statisticModeList,
            statisticStateList,
            peopleAccountLogTypeList,
            peopleAccountLogIsOutInList,
            peopleAccountLogInTypeList,
            merchantSaleStatisticShowModeList,
            departmentStatusList,
            employeeStatusList,
            productPurchaseStatusList,
            couponStatusList,
            couponScopeList,
            couponApplicableObjectList,
            couponExpireModeList,
            couponDisplayRangeList,
            couponDisplayList,
            couponSceneList,
            couponGoodsUseInBusinessList,
            couponStockChangeTypeList,
            couponStockCacheChangedList,
            couponStockCacheChangeTypeList,
            couponStockModeList,
            couponStockStateList,
            userCouponStatusList,
            userCouponChangeExpirationTimeModeList,
            weChatMessageRecordSendStateList,
            merchantCreditScoreList,
            merchantStainScoreList,
            smsLogStatusList,
            smsLogAggregateList,
            smsCategoryStatusList,
            expressOrderStatusList,
            expressOrderDetailOrderTypeList,
            expressOrderSaleTypeList,
            expressOrderDetailScoreProcessingStatusList,
            expressOrderDetailStatusList,
            expressRefundOrderStatusList,
            expressRefundOrderHandleTypeList,
            expressReplenishmentStatusList,
            expressReplenishmentTypeList,
            expressReplenishmentReasonTypeList,
            settlementStatusList,
          } = metaData;

          result = {
            platform,
            rankList,
            brandList,
            productSkuStockChangeTypeList,
            productStatusList,
            productSkuStatusList,
            productSkuSaleTypeList,
            productBuyTypeList,
            businessModeList,
            productUnitList,
            productSkuSaleTimeModeList,
            productMediaStatusList,
            userScoreOrderStatusList,
            payTypeList,
            clientTypeList,
            areaAccountRecordRevenueExpensesList,
            areaAccountRecordTypeList,
            areaDistributionStatusList,
            areaDistributionPayTypeList,
            areaCallCenterStatusList,
            areaCallCenterCategoryList,
            areaDistributionTempData,
            refundOrderStateList,
            refundOrderHandleTypeList,
            userTypeList,
            userManageList,
            userIsSendMsgList,
            genderList,
            replenishmentReasonTypeList,
            replenishmentStatusList,
            replenishmentTypeList,
            replenishmentRollBackMoneyList,
            distributionStatusList,
            areaManagerStatusList,
            areaAgentRoleStateList,
            areaAgentRoleCreateModeList,
            stockTypeList,
            statisticModeList,
            statisticStateList,
            peopleAccountLogTypeList,
            peopleAccountLogIsOutInList,
            peopleAccountLogInTypeList,
            merchantSaleStatisticShowModeList,
            departmentStatusList,
            employeeStatusList,
            productPurchaseStatusList,
            couponStatusList,
            couponScopeList,
            couponApplicableObjectList,
            couponExpireModeList,
            couponDisplayRangeList,
            couponDisplayList,
            couponSceneList,
            couponGoodsUseInBusinessList,
            couponStockChangeTypeList,
            couponStockCacheChangedList,
            couponStockCacheChangeTypeList,
            couponStockModeList,
            couponStockStateList,
            userCouponStatusList,
            userCouponChangeExpirationTimeModeList,
            weChatMessageRecordSendStateList,
            merchantCreditScoreList,
            merchantStainScoreList,
            smsLogStatusList,
            smsLogAggregateList,
            smsCategoryStatusList,
            expressOrderStatusList,
            expressOrderDetailOrderTypeList,
            expressOrderSaleTypeList,
            expressOrderDetailScoreProcessingStatusList,
            expressOrderDetailStatusList,
            expressRefundOrderStatusList,
            expressRefundOrderHandleTypeList,
            expressReplenishmentStatusList,
            expressReplenishmentTypeList,
            expressReplenishmentReasonTypeList,
            settlementStatusList,
          };

          setMetaDataCache(result);
        }
      }

      yield put({
        type: 'changeMetaData',
        payload: result,
      });
    },
    *getCurrentOperator({ payload }, { call, put }) {
      const { force } = payload || { force: false };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        result = getCurrentOperatorCache();

        if ((result || null) == null) {
          fromRemote = true;
          result = {};
        }
      }

      if (fromRemote) {
        const response = yield call(getCurrentBasicInfoData, payload);

        const data = pretreatmentRemoteSingleData(response);

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          result = metaData;

          setCurrentOperatorCache(result);
        }
      }

      yield put({
        type: 'changeCurrentOperator',
        payload: result,
      });
    },
    *setAMapObject({ payload }, { put }) {
      yield put({
        type: 'handleAmapObject',
        payload,
      });
    },
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        (state) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select((state) => state.global.notices.length);
      const unreadCount = yield select(
        (state) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select((state) =>
        state.global.notices.map((item) => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter((item) => !item.read).length,
        },
      });
    },
    *setAreaDistributionTempData({ payload }, { put }) {
      yield put({
        type: 'changeAreaDistributionTempData',
        payload,
      });
    },
  },

  reducers: {
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
    changeMetaData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeCurrentOperator(state, { payload }) {
      return {
        ...state,
        currentOperator: payload,
      };
    },
    handleAmapObject(state, { payload }) {
      return {
        ...state,
        amapObject: payload,
      };
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter((item) => item.type !== payload),
      };
    },
    changeAreaDistributionTempData(state, { payload }) {
      return {
        ...state,
        areaDistributionTempData: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
