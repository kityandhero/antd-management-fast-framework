import { defaultEmptyImage } from 'antd-management-fast-framework/es/utils/constants';
import { request } from 'antd-management-fast-framework/es/utils/requestAssistor';
import { getValueByKey, toString } from 'antd-management-fast-framework/es/utils/tools';

import { defaultSettings } from '@/defaultSettings';

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

const emptyLogo = defaultSettings.getEmptyLogo();

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
  image: emptyLogo,
  video: 'http://file.panduolakeji.com/1053686316.mp4',
  audio: 'http://file.panduolakeji.com/1057052295.mpeg',
  imageList: [emptyLogo, emptyLogo, emptyLogo, emptyLogo, emptyLogo],
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
  systemId: 0,
  areaAgentId: '1385411903530078208',
  cityCode: '410100000000',
  platformId: '1385408435780194304',
  key: '',
  renderTypeNote: '媒体渲染',
  statusNote: '已下线',
  image: emptyLogo,
  imageList: [emptyLogo, emptyLogo],
  imageFileList: imageFileList,
  mediaItemList: [],
};

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

export async function singleListTreeData(params) {
  return request({
    api: `/article/singleListTree`,
    params,
    virtualSuccessResponse: {
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

export async function updateImageSortData(params) {
  return request({
    api: `/article/updateImageSort`,
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
