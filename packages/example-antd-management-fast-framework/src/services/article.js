import {
  checkStringIsNullOrWhiteSpace,
  request,
  requestMode,
} from 'easy-soft-utility';

import { getCorsDomain } from 'antd-management-fast-common';

import { findArticle, getArticleList, imageFileList } from '../utils/mock';

export async function pageListData(parameters) {
  const { pageNo, pageSize } = parameters;

  const list = getArticleList();

  return request({
    api: `/article/pageList`,
    params: parameters,
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
    simulativeSuccessResponse: {
      list: getArticleList(),
    },
  });
}

export async function singleListTreeData(parameters) {
  return request({
    api: `/article/singleListTree`,
    params: parameters,
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
    simulativeSuccessResponse: {
      data: findArticle(parameters),
    },
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: `/article/addBasicInfo`,
    params: parameters,
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
    simulativeSuccessResponse: {
      data: findArticle(parameters),
    },
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: `/article/updateBasicInfo`,
    params: parameters,
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
    simulativeSuccessResponse: {
      list: imageFileList,
    },
  });
}

export async function addImageData(parameters) {
  return request({
    api: `/article/addImage`,
    params: parameters,
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
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
    mode: checkStringIsNullOrWhiteSpace(getCorsDomain())
      ? requestMode.simulation
      : requestMode.real,
    simulativeSuccessResponse: {
      data: {
        ...parameters,
      },
    },
  });
}
