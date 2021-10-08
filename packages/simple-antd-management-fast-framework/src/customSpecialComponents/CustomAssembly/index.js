import React from 'react';
import {
  DashboardOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ReconciliationOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { stringIsNullOrWhiteSpace } from '@fast-framework/utils/tools';
import IconInfo from '@fast-framework/customComponents/IconInfo';
import { buildMenuHeaderRender } from '@fast-framework/customComponents/FunctionComponent';

import { defaultSettings } from '@/defaultSettings';

export const defaultFooterData = {
  copyright: defaultSettings.getCopyright(),
  links: [
    {
      key: 'dataCenter',
      title: <IconInfo icon={<DashboardOutlined />} text="数据中心" />,
      href: '/#/dashboard/analysis',
      blankTarget: false,
    },
    {
      key: 'product',
      title: <IconInfo icon={<ShopOutlined />} text="商品管理" />,
      href: '/#/product/pageList',
      blankTarget: false,
    },
    {
      key: 'order',
      title: <IconInfo icon={<ShoppingCartOutlined />} text="订单管理" />,
      href: '/#/order/pageList',
      blankTarget: false,
    },
    {
      key: 'orderProcessing',
      title: <IconInfo icon={<ReconciliationOutlined />} text="物流配送" />,
      href: '/#/orderProcessing/list/1/waitDeliver',
      blankTarget: false,
    },
    {
      key: 'user',
      title: <IconInfo icon={<TeamOutlined />} text="个人中心" />,
      href: '/#/person/listRegUser',
      blankTarget: false,
    },
  ],
};

export function menuHeaderRender(logoDom, config) {
  const { global } = config;
  const { currentOperator } = {
    ...{
      currentOperator: { platform: { shortName: '' } },
    },
    ...(global || {}),
  };

  const { platform } = {
    ...{ platform: { shortName: '' } },
    ...(currentOperator || {}),
  };

  const { shortName } = { ...{ shortName: '' }, ...(platform || {}) };

  let shortNameData = shortName;

  if (stringIsNullOrWhiteSpace(shortNameData)) {
    shortNameData = defaultSettings.getLeftBarText();
  }

  const {
    collapsed,
    settings: { navTheme },
  } = config;

  return buildMenuHeaderRender({ logoDom, collapsed, navTheme, shortName: shortNameData });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
