import { request } from 'antd-management-fast-framework/lib/utils/requestAssistor';

export async function pageListData(params) {
  return request({
    api: `/article/pageList`,
    params,
    virtualSuccessResponse: {
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 1,
      },
      list: [
        {
          articleId: '1430367617461391360',
          title: '测试2',
          subtitle: '测试2',
          description: '测试2',
          image: '',
          contentData: '',
          mediaData:
            '[\r\n  {\r\n    "id": "986170e1-1b3f-46ca-930e-1b20cba2ef8b",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 0,\r\n    "createTime": "2021-08-25 17:07:02",\r\n    "updateTime": "2021-08-25 17:07:02"\r\n  },\r\n  {\r\n    "id": "893d9347-e23a-47bc-a880-d8974d057a28",\r\n    "title": "",\r\n    "description": "描述1",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 1,\r\n    "createTime": "2021-08-25 17:08:41",\r\n    "updateTime": "2021-08-25 17:08:41"\r\n  }\r\n]',
          renderType: 20,
          sort: 0,
          status: 0,
          author: '',
          accessCount: 0,
          businessMode: 10,
          createUserId: '1385411903626547200',
          createTime: '2021-08-25 11:13:09',
          updateUserId: '1385411903626547200',
          updateTime: '2021-08-25 17:08:41',
          universalityMallId: 0,
          areaAgentId: '1385411903530078208',
          cityCode: '410100000000',
          platformId: '1385408435780194304',
          key: '1430367617461391360',
          renderTypeNote: '媒体渲染',
          statusNote: '已下线',
          mediaItemList: [
            {
              id: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
              title: '标题1',
              description: '',
              image: '',
              link: '',
              video: '',
              sort: 0,
              createTime: '2021-08-25 17:07:02',
              updateTime: '2021-08-25 17:07:02',
              key: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
            },
          ],
        },
      ],
    },
  });
}

export async function getData(params) {
  return request({
    api: `/article/get`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
        title: '测试2',
        subtitle: '测试2',
        description: '测试2',
        image: '',
        contentData: '',
        mediaData:
          '[\r\n  {\r\n    "id": "986170e1-1b3f-46ca-930e-1b20cba2ef8b",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 0,\r\n    "createTime": "2021-08-25 17:07:02",\r\n    "updateTime": "2021-08-25 17:07:02"\r\n  },\r\n  {\r\n    "id": "893d9347-e23a-47bc-a880-d8974d057a28",\r\n    "title": "",\r\n    "description": "描述1",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 1,\r\n    "createTime": "2021-08-25 17:08:41",\r\n    "updateTime": "2021-08-25 17:08:41"\r\n  }\r\n]',
        renderType: 20,
        sort: 0,
        status: 0,
        author: '',
        accessCount: 0,
        businessMode: 10,
        createUserId: '1385411903626547200',
        createTime: '2021-08-25 11:13:09',
        updateUserId: '1385411903626547200',
        updateTime: '2021-08-25 17:08:41',
        universalityMallId: 0,
        areaAgentId: '1385411903530078208',
        cityCode: '410100000000',
        platformId: '1385408435780194304',
        key: '1430367617461391360',
        renderTypeNote: '媒体渲染',
        statusNote: '已下线',
        mediaItemList: [
          {
            id: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
            title: '标题1',
            description: '',
            image: '',
            link: '',
            video: '',
            sort: 0,
            createTime: '2021-08-25 17:07:02',
            updateTime: '2021-08-25 17:07:02',
            key: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
          },
        ],
      },
    },
  });
}

export async function addBasicInfoData(params) {
  return request({
    api: `/article/addBasicInfo`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function updateBasicInfoData(params) {
  return request({
    api: `/article/updateBasicInfo`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function updateContentInfoData(params) {
  return request({
    api: `/article/updateContentInfo`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function updateMediaInfoData(params) {
  return request({
    api: `/article/updateMediaInfo`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function updateSortData(params) {
  return request({
    api: `/article/updateSort`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function updateRenderTypeData(params) {
  return request({
    api: `/article/updateRenderType`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function setOnlineData(params) {
  return request({
    api: `/article/setOnline`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function setOfflineData(params) {
  return request({
    api: `/article/setOffline`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function refreshCacheData(params) {
  return request({
    api: `/article/refreshCache`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function removeData(params) {
  return request({
    api: `/article/remove`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function getMediaItemData(params) {
  return request({
    api: `/article/getMediaItem`,
    params,
    virtualSuccessResponse: {
      data: {
        id: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
        title: '标题1',
        description: '',
        image: '',
        link: '',
        video: '',
        sort: 0,
        createTime: '2021-08-25 17:07:02',
        updateTime: '2021-08-25 17:07:02',
        key: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
        articleId: '1430367617461391360',
      },
    },
  });
}

export async function addMediaItemData(params) {
  return request({
    api: `/article/addMediaItem`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
        title: '测试2',
        subtitle: '测试2',
        description: '测试2',
        image: '',
        contentData: '',
        mediaData:
          '[\r\n  {\r\n    "id": "986170e1-1b3f-46ca-930e-1b20cba2ef8b",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 0,\r\n    "createTime": "2021-08-25 17:07:02",\r\n    "updateTime": "2021-08-25 17:07:02"\r\n  },\r\n  {\r\n    "id": "893d9347-e23a-47bc-a880-d8974d057a28",\r\n    "title": "",\r\n    "description": "描述1",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 1,\r\n    "createTime": "2021-08-25 17:08:41",\r\n    "updateTime": "2021-08-25 17:08:41"\r\n  },\r\n  {\r\n    "id": "68063daa-6afc-4128-aa74-c4a19a196c52",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 2,\r\n    "createTime": "2021-08-25 17:26:16",\r\n    "updateTime": "2021-08-25 17:26:16"\r\n  }\r\n]',
        renderType: 20,
        sort: 0,
        status: 0,
        author: '',
        accessCount: 0,
        businessMode: 10,
        createUserId: '1385411903626547200',
        createTime: '2021-08-25 11:13:09',
        updateUserId: '1385411903626547200',
        updateTime: '2021-08-25 17:26:16',
        universalityMallId: 0,
        areaAgentId: '1385411903530078208',
        cityCode: '410100000000',
        platformId: '1385408435780194304',
        key: '1430367617461391360',
        renderTypeNote: '媒体渲染',
        statusNote: '已下线',
        mediaItemList: [
          {
            id: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
            title: '标题1',
            description: '',
            image: '',
            link: '',
            video: '',
            sort: 0,
            createTime: '2021-08-25 17:07:02',
            updateTime: '2021-08-25 17:07:02',
            key: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
          },
        ],
      },
    },
  });
}

export async function updateMediaItemData(params) {
  return request({
    api: `/article/updateMediaItem`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
        title: '测试2',
        subtitle: '测试2',
        description: '测试2',
        image: '',
        contentData: '',
        mediaData:
          '[\r\n  {\r\n    "id": "986170e1-1b3f-46ca-930e-1b20cba2ef8b",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 0,\r\n    "createTime": "2021-08-25 17:07:02",\r\n    "updateTime": "2021-08-25 17:27:33"\r\n  },\r\n  {\r\n    "id": "893d9347-e23a-47bc-a880-d8974d057a28",\r\n    "title": "",\r\n    "description": "描述1",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 1,\r\n    "createTime": "2021-08-25 17:08:41",\r\n    "updateTime": "2021-08-25 17:08:41"\r\n  },\r\n  {\r\n    "id": "68063daa-6afc-4128-aa74-c4a19a196c52",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 2,\r\n    "createTime": "2021-08-25 17:26:16",\r\n    "updateTime": "2021-08-25 17:26:16"\r\n  }\r\n]',
        renderType: 20,
        sort: 0,
        status: 0,
        author: '',
        accessCount: 0,
        businessMode: 10,
        createUserId: '1385411903626547200',
        createTime: '2021-08-25 11:13:09',
        updateUserId: '1385411903626547200',
        updateTime: '2021-08-25 17:27:33',
        universalityMallId: 0,
        areaAgentId: '1385411903530078208',
        cityCode: '410100000000',
        platformId: '1385408435780194304',
        key: '1430367617461391360',
        renderTypeNote: '媒体渲染',
        statusNote: '已下线',
        mediaItemList: [
          {
            id: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
            title: '标题1',
            description: '',
            image: '',
            link: '',
            video: '',
            sort: 0,
            createTime: '2021-08-25 17:07:02',
            updateTime: '2021-08-25 17:27:33',
            key: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
          },
        ],
      },
    },
  });
}

export async function setMediaCollectionSortData(params) {
  return request({
    api: `/article/setMediaCollectionSort`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
        title: '测试2',
        subtitle: '测试2',
        description: '测试2',
        image: '',
        contentData: '',
        mediaData:
          '[\r\n  {\r\n    "id": "893d9347-e23a-47bc-a880-d8974d057a28",\r\n    "title": "",\r\n    "description": "描述1",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 0,\r\n    "createTime": "2021-08-25 17:08:41",\r\n    "updateTime": "2021-08-25 17:08:41"\r\n  },\r\n  {\r\n    "id": "986170e1-1b3f-46ca-930e-1b20cba2ef8b",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 1,\r\n    "createTime": "2021-08-25 17:07:02",\r\n    "updateTime": "2021-08-25 17:27:33"\r\n  },\r\n  {\r\n    "id": "68063daa-6afc-4128-aa74-c4a19a196c52",\r\n    "title": "标题1",\r\n    "description": "",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "sort": 2,\r\n    "createTime": "2021-08-25 17:26:16",\r\n    "updateTime": "2021-08-25 17:26:16"\r\n  }\r\n]',
        renderType: 20,
        sort: 0,
        status: 0,
        author: '',
        accessCount: 0,
        businessMode: 10,
        createUserId: '1385411903626547200',
        createTime: '2021-08-25 11:13:09',
        updateUserId: '1385411903626547200',
        updateTime: '2021-08-25 17:33:25',
        universalityMallId: 0,
        areaAgentId: '1385411903530078208',
        cityCode: '410100000000',
        platformId: '1385408435780194304',
        key: '1430367617461391360',
        renderTypeNote: '媒体渲染',
        statusNote: '已下线',
        mediaItemList: [
          {
            id: '893d9347-e23a-47bc-a880-d8974d057a28',
            title: '',
            description: '描述1',
            image: '',
            link: '',
            video: '',
            sort: 0,
            createTime: '2021-08-25 17:08:41',
            updateTime: '2021-08-25 17:08:41',
            key: '893d9347-e23a-47bc-a880-d8974d057a28',
          },
        ],
      },
    },
  });
}

export async function removeMediaItemData(params) {
  return request({
    api: `/article/removeMediaItem`,
    params,
    virtualSuccessResponse: {
      data: {
        articleId: '1430367617461391360',
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
