import { getValueByKey, request, requestMode } from 'easy-soft-utility';

import { defaultEmptyImage, getEmptyLogo } from 'antd-management-fast-common';

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

function createEmptyList(size) {
  const list = [];

  if (size > 0) {
    for (let index = 0; index < size; index++) {
      list.push({});
    }
  }

  return list;
}

function buildAbundantArticle() {
  return {
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
      '[\r\n  {\r\n    "id": "c04a81bf-220f-43fe-b68d-78c307ea4522",\r\n    "mediaType": 10,\r\n    "title": "段落",\r\n    "description": "这样看来， 我认为， 问题的关键究竟为何？ 我认为， 我们不得不面对一个非常尴尬的事实，那就是， 要想清楚，玉米，到底是一种怎么样的存在。 总结的来说， 而这些并不是完全重要，更加重要的问题是， 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 玉米的发生，到底需要如何做到，不玉米的发生，又会如何产生。 俾斯麦曾经说过，对于不屈不挠的人来说，没有失败这回事。这句话语虽然很短，但令我浮想联翩。 现在，解决玉米的问题，是非常非常重要的。",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "audio": "",\r\n    "attachment": "",\r\n    "sort": 0,\r\n    "createTime": "2021-12-17 18:33:22",\r\n    "updateTime": "2021-12-18 09:59:23"\r\n  },\r\n  {\r\n    "id": "c740865c-26be-49ac-905e-079a71ee141c",\r\n    "mediaType": 10,\r\n    "title": "段落",\r\n    "description": "",\r\n    "image": "1036865750.jpeg",\r\n    "link": "",\r\n    "video": "",\r\n    "audio": "",\r\n    "attachment": "",\r\n    "sort": 1,\r\n    "createTime": "2021-12-18 10:01:20",\r\n    "updateTime": "2021-12-18 10:01:20"\r\n  },\r\n  {\r\n    "id": "0afef77a-7efd-4a4a-a267-b139ad8f0bce",\r\n    "mediaType": 10,\r\n    "title": "段落",\r\n    "description": "所谓玉米，关键是玉米需要如何写。 了解清楚玉米到底是一种怎么样的存在，是解决一切问题的关键。 一般来讲，我们都必须务必慎重的考虑考虑。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。",\r\n    "image": "",\r\n    "link": "",\r\n    "video": "",\r\n    "audio": "",\r\n    "attachment": "",\r\n    "sort": 2,\r\n    "createTime": "2021-12-18 09:59:35",\r\n    "updateTime": "2021-12-18 09:59:35"\r\n  },\r\n  {\r\n    "id": "a286d75a-b8da-48dd-8071-94b544c481a6",\r\n    "mediaType": 20,\r\n    "title": "图片",\r\n    "description": "",\r\n    "image": "530011601.jpeg",\r\n    "link": "",\r\n    "video": "",\r\n    "audio": "",\r\n    "attachment": "",\r\n    "sort": 3,\r\n    "createTime": "2021-12-18 10:00:52",\r\n    "updateTime": "2021-12-18 10:00:52"\r\n  }\r\n]',
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
    systemId: 0,
    areaAgentId: '1385411903530078208',
    cityCode: '410100000000',
    platformId: '1385408435780194304',
    key: '1430367617461391360',
    renderTypeNote: '媒体渲染',
    statusNote: '已下线',
    switch: 1,
    video: 'http://file.panduolakeji.com/1053686316.mp4',
    audio: 'http://file.panduolakeji.com/1057052295.mpeg',
    imageList: [
      getEmptyLogo(),
      getEmptyLogo(),
      getEmptyLogo(),
      getEmptyLogo(),
      getEmptyLogo(),
    ],
    imageFileList: imageFileList,
    mediaItemList: [
      {
        id: 'c04a81bf-220f-43fe-b68d-78c307ea4522',
        mediaType: 10,
        title: '段落',
        description:
          '这样看来， 我认为， 问题的关键究竟为何？ 我认为， 我们不得不面对一个非常尴尬的事实，那就是， 要想清楚，玉米，到底是一种怎么样的存在。 总结的来说， 而这些并不是完全重要，更加重要的问题是， 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 玉米的发生，到底需要如何做到，不玉米的发生，又会如何产生。 俾斯麦曾经说过，对于不屈不挠的人来说，没有失败这回事。这句话语虽然很短，但令我浮想联翩。 现在，解决玉米的问题，是非常非常重要的。',
        image: '',
        link: '',
        video: '',
        audio: '',
        attachment: '',
        sort: 0,
        createTime: '2021-12-17 18:33:22',
        updateTime: '2021-12-18 09:59:23',
        key: 'c04a81bf-220f-43fe-b68d-78c307ea4522',
      },
      {
        id: 'c740865c-26be-49ac-905e-079a71ee141c',
        mediaType: 10,
        title: '段落',
        description: '',
        image:
          'http://file.panduolakeji.com/1036865750.jpeg?imageMogr2/thumbnail/340x340/format/jpg/blur/1x0/quality/75',
        link: '',
        video: '',
        audio: '',
        attachment: '',
        sort: 1,
        createTime: '2021-12-18 10:01:20',
        updateTime: '2021-12-18 10:01:20',
        key: 'c740865c-26be-49ac-905e-079a71ee141c',
      },
      {
        id: '0afef77a-7efd-4a4a-a267-b139ad8f0bce',
        mediaType: 10,
        title: '段落',
        description:
          '所谓玉米，关键是玉米需要如何写。 了解清楚玉米到底是一种怎么样的存在，是解决一切问题的关键。 一般来讲，我们都必须务必慎重的考虑考虑。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。',
        image: '',
        link: '',
        video: '',
        audio: '',
        attachment: '',
        sort: 2,
        createTime: '2021-12-18 09:59:35',
        updateTime: '2021-12-18 09:59:35',
        key: '0afef77a-7efd-4a4a-a267-b139ad8f0bce',
      },
      {
        id: 'a286d75a-b8da-48dd-8071-94b544c481a6',
        mediaType: 20,
        title: '图片',
        description: '',
        image:
          'http://file.panduolakeji.com/530011601.jpeg?imageMogr2/thumbnail/340x340/format/jpg/blur/1x0/quality/75',
        link: '',
        video: '',
        audio: '',
        attachment: '',
        sort: 3,
        createTime: '2021-12-18 10:00:52',
        updateTime: '2021-12-18 10:00:52',
        key: 'a286d75a-b8da-48dd-8071-94b544c481a6',
      },
    ],
  };
}

function buildSimpleArticle() {
  return {
    articleId: '',
    title: '标题',
    subtitle: '副标题',
    description: '简介描述',
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
    systemId: 0,
    areaAgentId: '1385411903530078208',
    cityCode: '410100000000',
    platformId: '1385408435780194304',
    key: '',
    renderTypeNote: '媒体渲染',
    statusNote: '已下线',
    switch: 0,
    image: getEmptyLogo(),
    imageList: [getEmptyLogo(), getEmptyLogo()],
    imageFileList: imageFileList,
    mediaItemList: [],
  };
}

// const article2 = {
//   ...article,
//   ...{
//     key: '1',
//     articleId: '1',
//     mediaData: '',
//     imageList: [],
//     mediaItemList: [],
//   },
// };

function buildArticleList() {
  const simpleData = getSimpleArticle();

  const list = createEmptyList(30).map((o, index) => {
    const no = `${index + 1}`;

    return {
      ...simpleData,
      articleId: no,
      key: no,
      title: simpleData.title + no,
      subtitle: simpleData.subtitle + no,
      description: simpleData.description + no,
      image: '',
    };
  });

  list.unshift(getAbundantArticle());

  return list;
}

let abundantArticle = null;

let simpleArticle = null;

let articleList = [];

function getAbundantArticle() {
  if (abundantArticle == null) {
    abundantArticle = buildAbundantArticle();
  }

  return abundantArticle;
}

function getSimpleArticle() {
  if (simpleArticle == null) {
    simpleArticle = buildSimpleArticle();
  }

  return simpleArticle;
}

function getArticleList() {
  if (articleList.length <= 0) {
    articleList = buildArticleList();
  }

  return articleList;
}

function findArticle({ articleId }) {
  let result = null;

  getArticleList().some((o) => {
    const itemArticleId = getValueByKey({
      data: o,
      key: 'articleId',
    });

    if (toString(itemArticleId) === toString(articleId)) {
      result = o;

      return true;
    }

    return false;
  });

  return result;
}

export async function pageListData(parameters) {
  const { pageNo, pageSize } = parameters;

  const list = getArticleList();

  return request({
    api: `/article/pageList`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      extra: {
        pageNo: pageNo,
        pageSize: pageSize,
        total: list.length,
      },
      list: list.slice((pageNo - 1) * pageSize, pageNo * pageSize),
    },
  });
}

export async function singleListData(parameters) {
  return request({
    api: `/article/singleList`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      list: getArticleList(),
    },
  });
}

export async function singleListTreeData(parameters) {
  return request({
    api: `/article/singleListTree`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      list: [
        { label: '条目1', code: '1' },
        { label: '条目2', code: '2' },
        {
          label: '条目3',
          code: '3',
          children: [
            {
              label: '子栏目1',
              code: '1526849364746702848',
            },
            {
              label: '子栏目2',
              code: '1526849364746712848',
            },
            {
              label: '子栏目3',
              code: '1526849367646702848',
            },
          ],
        },
      ],
    },
  });
}

export async function getData(parameters) {
  return request({
    api: `/article/get`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: findArticle(parameters),
    },
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: `/article/addBasicInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: findArticle(parameters),
    },
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: `/article/updateBasicInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function updateContentInfoData(parameters) {
  return request({
    api: `/article/updateContentInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function updateMediaInfoData(parameters) {
  return request({
    api: `/article/updateMediaInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function updateSortData(parameters) {
  return request({
    api: `/article/updateSort`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function updateImageSortData(parameters) {
  return request({
    api: `/article/updateImageSort`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function updateRenderTypeData(parameters) {
  return request({
    api: `/article/updateRenderType`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function setOnlineData(parameters) {
  return request({
    api: `/article/setOnline`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,

        status: 1,
      },
    },
  });
}

export async function setOfflineData(parameters) {
  return request({
    api: `/article/setOffline`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,

        status: 0,
      },
    },
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: `/article/refreshCache`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function removeData(parameters) {
  return request({
    api: `/article/remove`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function getMediaItemData(parameters) {
  return request({
    api: `/article/getMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
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

export async function addMediaItemData(parameters) {
  return request({
    api: `/article/addMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function updateMediaItemData(parameters) {
  return request({
    api: `/article/updateMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function setMediaCollectionSortData(parameters) {
  return request({
    api: `/article/setMediaCollectionSort`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function removeMediaItemData(parameters) {
  return request({
    api: `/article/removeMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function listImageData(parameters) {
  return request({
    api: `/article/ListImage`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      list: imageFileList,
    },
  });
}

export async function addImageData(parameters) {
  return request({
    api: `/article/addImage`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...findArticle(parameters),
        ...parameters,
      },
    },
  });
}

export async function removeImageData(parameters) {
  return request({
    api: `/article/removeImage`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        ...parameters,
      },
    },
  });
}
