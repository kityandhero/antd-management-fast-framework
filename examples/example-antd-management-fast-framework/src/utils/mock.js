import {
  datetimeFormat,
  formatDatetime,
  getNow,
  getValueByKey,
  toString,
} from 'easy-soft-utility';

import { defaultEmptyImage, getEmptyLogo } from 'antd-management-fast-common';

export const imageFileList = [
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

export const listApprove = [
  {
    nodeId: 'e840a9d25e9649ae87791495d51b7794',
    title: '已审批节点1',
    note: '拟同意',
    name: '张三',
    signet:
      'data:image/png;base64,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',
    time: '2023-12-26 14:50',
  },
  {
    nodeId: 'ad7da4522e7b4e4baca8b3397506a0ea',
    title: '已审批节点2',
    note: '拟同意',
    name: '李四',
    signet:
      'data:image/png;base64,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',
    time: '2023-12-26 14:50',
  },
];

export const listAllApproveProcess = [
  {
    nodeId: 'e840a9d25e9649ae87791495d51b7794',
    title: '未审批节点1',
    note: '',
    name: '',
    signet: '',
    time: '',
  },
  {
    nodeId: 'ad7da4522e7b4e4baca8b3397506a0ea',
    title: '未审批节点2',
    note: '',
    name: '',
    signet: '',
    time: '',
  },
  {
    nodeId: '68168424d4df45d19321baf89c6ace88',
    title: '未审批节点3',
    note: '',
    name: '',
    signet: '',
    time: '',
  },
  {
    nodeId: '73b4e41ed40642ce8f1960e222bb650b',
    title: '未审批节点4',
    note: '',
    name: '',
    signet: '',
    time: '',
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
    simpleId: '1430367617461391360',
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
    color: '#13A8A8',
    accessCount: 0,
    businessMode: 10,
    createUserId: '1385411903626547200',
    createTime: formatDatetime({
      data: getNow(),
      format: datetimeFormat.monthDayHourMinuteSecond,
    }),
    updateUserId: '1385411903626547200',
    updateTime: formatDatetime({
      data: getNow(),
      format: datetimeFormat.monthDayHourMinuteSecond,
    }),
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
    simpleId: '',
    title: '标题',
    subtitle: '副标题',
    description: '简介描述',
    contentData: '',
    mediaData: '',
    renderType: 20,
    sort: 0,
    status: 0,
    author: '',
    color: '#1311A8',
    accessCount: 0,
    businessMode: 10,
    createUserId: '1385411903626547200',
    createTime: formatDatetime({
      data: getNow(),
      format: datetimeFormat.monthDayHourMinuteSecond,
    }),
    updateUserId: '1385411903626547200',
    updateTime: formatDatetime({
      data: getNow(),
      format: datetimeFormat.monthDayHourMinuteSecond,
    }),
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

function buildArticleList() {
  const simpleData = getSimpleArticle();

  const list = createEmptyList(30).map((o, index) => {
    const no = `${200_000 + index + 1}`;

    return {
      ...simpleData,
      simpleId: no,
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

let simpleList = [];

function getAbundantArticle() {
  if (abundantArticle == null) {
    abundantArticle = buildAbundantArticle();
  }

  return abundantArticle;
}

export function getSimpleArticle() {
  if (simpleArticle == null) {
    simpleArticle = buildSimpleArticle();
  }

  return simpleArticle;
}

export function getArticleList() {
  if (simpleList.length <= 0) {
    simpleList = buildArticleList();
  }

  return simpleList;
}

export function findArticle({ simpleId }) {
  let result = null;

  getArticleList().some((o) => {
    const itemArticleId = getValueByKey({
      data: o,
      key: 'simpleId',
    });

    if (toString(itemArticleId) === toString(simpleId)) {
      result = o;

      return true;
    }

    return false;
  });

  return result;
}
