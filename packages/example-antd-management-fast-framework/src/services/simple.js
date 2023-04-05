import {
  datetimeFormat,
  formatDatetime,
  getNow,
  request,
  requestMode,
} from 'easy-soft-utility';

import { findArticle, getArticleList, imageFileList } from '../utils/mock';

export async function pageListData(parameters) {
  const { pageNo, pageSize } = parameters;

  const list = getArticleList();

  return request({
    api: `/simple/pageList`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 100,
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
    api: `/simple/singleList`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 100,
    simulativeSuccessResponse: {
      list: getArticleList(),
    },
  });
}

export async function singleListTreeData(parameters) {
  return request({
    api: `/simple/singleListTree`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 100,
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
    api: `/simple/get`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
    simulativeSuccessResponse: {
      data: findArticle(parameters),
    },
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: `/simple/addBasicInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
    simulativeSuccessResponse: {
      data: findArticle(parameters),
    },
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: `/simple/updateBasicInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/updateContentInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/updateMediaInfo`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/updateSort`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/updateImageSort`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/updateRenderType`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/setOnline`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/setOffline`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/refreshCache`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/remove`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/getMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 200,
    simulativeSuccessResponse: {
      data: {
        id: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
        title: '标题1',
        description: '',
        image: '',
        link: '',
        video: '',
        sort: 0,
        createTime: formatDatetime({
          data: getNow(),
          format: datetimeFormat.monthDayHourMinuteSecond,
        }),
        updateTime: formatDatetime({
          data: getNow(),
          format: datetimeFormat.monthDayHourMinuteSecond,
        }),
        key: '986170e1-1b3f-46ca-930e-1b20cba2ef8b',
        simpleId: '1430367617461391360',
      },
    },
  });
}

export async function addMediaItemData(parameters) {
  return request({
    api: `/simple/addMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/updateMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/setMediaCollectionSort`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/removeMediaItem`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/ListImage`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      list: imageFileList,
    },
  });
}

export async function addImageData(parameters) {
  return request({
    api: `/simple/addImage`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
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
    api: `/simple/removeImage`,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestDelay: 300,
    simulativeSuccessResponse: {
      data: {
        ...parameters,
      },
    },
  });
}
