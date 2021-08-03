import request from 'antd-management-fast-framework/lib/utils/request';
import {
  apiVirtualSuccessAccess,
  transferToVirtualAccess,
} from '@/customConfig/apiVirtualAccessAssist';
import { getApiVersion } from '@/customConfig/config';

export async function getCurrentData() {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      name: 'Li Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      email: 'Test@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    });

    return result;
  }

  return request(`${getApiVersion()}/areaConfig/getCurrent`);
}

export async function changeOutStockTimeData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request(`${getApiVersion()}/areaConfig/changeOutStockTime`, {
    method: 'POST',
    data: params,
  });
}

export async function getOutboundNoticeData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request(`${getApiVersion()}/areaConfig/getOutboundNotice`, {
    method: 'POST',
    data: params,
  });
}

export async function setOutboundNoticeData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request(`${getApiVersion()}/areaConfig/setOutboundNotice`, {
    method: 'POST',
    data: params,
  });
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
