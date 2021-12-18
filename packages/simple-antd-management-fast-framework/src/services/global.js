import { request } from 'antd-management-fast-framework/es/utils/requestAssistor';

/**
 * 综合数据
 * @param {*} params
 */
export async function getData(params) {
  return request({
    api: `/metaData/get`,
    params,
    virtualSuccessResponse: {
      data: {
        mediaTypeList: [
          {
            flag: '10',
            name: '段落',
            availability: 1,
          },
          {
            flag: '20',
            name: '图片',
            availability: 1,
          },
          {
            flag: '30',
            name: '视频',
            availability: 1,
          },
          {
            flag: '40',
            name: '音频',
            availability: 1,
          },
          {
            flag: '50',
            name: '附件',
            availability: 1,
          },
        ],
        webChannelList: [
          {
            flag: '20000',
            name: '管理中心',
            availability: 1,
          },
          {
            flag: '21000',
            name: '地区管理后台',
            availability: 1,
          },
          {
            flag: '21100',
            name: '一件代发管理后台',
            availability: 1,
          },
          {
            flag: '53000',
            name: '供应商管理系统',
            availability: 1,
          },
        ],
        accessWayStatusList: [
          {
            flag: '-1',
            name: '未知',
            availability: 1,
          },
          {
            flag: '1',
            name: '上线',
            availability: 1,
          },
          {
            flag: '0',
            name: '下线',
            availability: 1,
          },
        ],
        articleStatusList: [
          {
            flag: '-1',
            name: '未知',
            availability: 1,
          },
          {
            flag: '1',
            name: '上线',
            availability: 1,
          },
          {
            flag: '0',
            name: '下线',
            availability: 1,
          },
        ],
      },
    },
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
