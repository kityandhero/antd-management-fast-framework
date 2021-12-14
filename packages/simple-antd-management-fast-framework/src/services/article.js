import { defaultEmptyImage } from 'antd-management-fast-framework/es/utils/constants';
import { request } from 'antd-management-fast-framework/es/utils/requestAssistor';

import { defaultSettings } from '@/defaultSettings';
import { getValueByKey, toString } from 'antd-management-fast-framework/es/utils/tools';

const imageFileList = [
  {
    id: '1441333040210120704',
    key: '1441333040210120704',
    sort: 1,
    url: '/EmptyLogo.png',
  },
  {
    id: '1440597205999292416',
    key: '1440597205999292416',
    sort: 2,
    url: '/EmptyLogo.png',
  },
  {
    id: '1455072511795531776',
    key: '1455072511795531776',
    sort: 3,
    url: '/EmptyLogo.png',
  },
  {
    id: '1455072513007685632',
    key: '1455072513007685632',
    sort: 4,
    url: '/EmptyLogo.png',
  },
  {
    id: '1455072513582305280',
    key: '1455072513582305280',
    sort: 5,
    url: '/EmptyLogo.png',
  },
  {
    id: '1455072514349862912',
    key: '1455072514349862912',
    sort: 6,
    url: '/EmptyLogo.png',
  },
];

const article = {
  articleId: '1430367617461391360',
  title:
    '标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的',
  subtitle:
    '副标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的',
  description:
    '简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述简介描述',
  image: defaultEmptyImage,
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
  image: defaultSettings.getEmptyLogo(),
  video: 'http://file.panduolakeji.com/1053686316.mp4',
  audio: 'http://file.panduolakeji.com/1057052295.mpeg',
  imageList: [
    defaultSettings.getEmptyLogo(),
    defaultSettings.getEmptyLogo(),
    defaultSettings.getEmptyLogo(),
    defaultSettings.getEmptyLogo(),
    defaultSettings.getEmptyLogo(),
  ],
  imageFileList: imageFileList,
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
    {
      id: '986170e1-1b3f-46ca-930e-1b20cba21f8b',
      title: '标题2',
      description: '',
      image: '',
      link: '',
      video: '',
      sort: 1,
      createTime: '2021-08-25 17:07:02',
      updateTime: '2021-08-25 17:07:02',
      key: '986170e1-1b3f-46ca-930e-1b20cba21f8b',
    },
    {
      id: '986140e1-1b3f-46ca-930e-1b20cba2ef8b',
      title: '标题3',
      description: '',
      image: '',
      link: '',
      video: '',
      sort: 2,
      createTime: '2021-08-25 17:07:02',
      updateTime: '2021-08-25 17:07:02',
      key: '986140e1-1b3f-46ca-930e-1b20cba2ef8b',
    },
  ],
};

const articleSimple = {
  articleId: '',
  title: '标题',
  subtitle: '副标题',
  description: '简介描述',
  image: '',
  contentData: '',
  mediaData: '',
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
  key: '',
  renderTypeNote: '媒体渲染',
  statusNote: '已下线',
  image: defaultSettings.getEmptyLogo(),
  imageList: [defaultSettings.getEmptyLogo(), defaultSettings.getEmptyLogo()],
  imageFileList: imageFileList,
  mediaItemList: [],
};

const article2 = {
  ...article,
  ...{
    key: '1',
    articleId: '1',
    mediaData: '',
    imageList: [],
    mediaItemList: [],
  },
};

const articleEmptyList = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

const articleList = articleEmptyList.map((o, index) => {
  const no = `${index + 1}`;

  return {
    ...articleSimple,
    ...{
      articleId: no,
      key: no,
      title: articleSimple.title + no,
      subtitle: articleSimple.subtitle + no,
      description: articleSimple.description + no,
      image: '',
    },
  };
});

articleList.unshift(article);

function findArticle({ articleId }) {
  let result = null;

  articleList.some((o) => {
    const itemArticleId = getValueByKey({
      data: o,
      key: 'articleId',
    });

    if (toString(itemArticleId) === toString(articleId)) {
      result = o;

      return true;
    }
  });

  return result;
}

export async function pageListData(params) {
  const { pageNo, pageSize } = params;

  return request({
    api: `/article/pageList`,
    params,
    virtualSuccessResponse: {
      extra: {
        pageNo: pageNo,
        pageSize: pageSize,
        total: articleList.length,
      },
      list: articleList.slice((pageNo - 1) * pageSize, pageNo * pageSize),
    },
  });
}

export async function singleListData(params) {
  return request({
    api: `/article/singleList`,
    params,
    virtualSuccessResponse: {
      list: articleList,
    },
  });
}

export async function getData(params) {
  return request({
    api: `/article/get`,
    params,
    virtualSuccessResponse: {
      data: findArticle(params),
    },
  });
}

export async function addBasicInfoData(params) {
  return request({
    api: `/article/addBasicInfo`,
    params,
    virtualSuccessResponse: {
      data: findArticle(params),
    },
  });
}

export async function updateBasicInfoData(params) {
  return request({
    api: `/article/updateBasicInfo`,
    params,
    virtualSuccessResponse: {
      data: {
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
        ...{
          status: 1,
        },
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
        ...findArticle(params),
        ...params,
        ...{
          status: 0,
        },
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
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
        ...findArticle(params),
        ...params,
      },
    },
  });
}

export async function listImageData(params) {
  return request({
    api: `/article/ListImage`,
    params,
    virtualSuccessResponse: {
      list: imageFileList,
    },
  });
}

export async function addImageData(params) {
  return request({
    api: `/article/addImage`,
    params,
    virtualSuccessResponse: {
      data: {
        ...findArticle(params),
        ...params,
      },
    },
  });
}

export async function removeImageData(params) {
  return request({
    api: `/article/removeImage`,
    params,
    virtualSuccessResponse: {
      data: {
        ...params,
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
