export const accessWayCollection = {
  ...{
    super: {
      permission: 'super',
    },
    currentOperator: {
      updateBasicInfo: {
        permission: '93679cff-4891-4a34-9c0e-f4443db85e69',
      },
    },
    accessWay: {
      pageList: {
        paramsKey: '6ec51bf6-9656-4271-9a7a-4c01dbf795b0',
        permission: '3817d76a-07a4-43b7-bb46-b872efa81bcf',
      },
      get: {
        permission: 'be827093-426e-4d57-9504-60122dc99c9f',
      },
      setOnline: {
        permission: '3ef9d7d9-f280-4ee8-b73f-5d0fe636b5b1',
      },
      setOffline: {
        permission: 'b72d811e-0a49-411f-bd84-8485cf77a6a4',
      },
      refreshCache: {
        permission: '8393b5e0-9b2d-4967-9479-857964f7c098',
      },
    },
    article: {
      pageList: {
        paramsKey: 'a1b398d9-0bf7-40df-9f2b-4bb15d69f970',
        permission: '3c116539-3729-4459-b4bd-c23fbbc66c52',
      },
      singleList: {
        permission: 'a85ac9a4-4c04-4a50-84f2-8ae87f315475',
      },
      get: {
        permission: '93937868-009f-4e79-b15f-d7efc093ae2c',
      },
      addBasicInfo: {
        permission: 'e4eb9d95-bf7b-4753-82ab-03a4c7c12386',
      },
      updateBasicInfo: {
        permission: '4249a324-3120-443f-87c2-67d06a8a067f',
      },
      updateContentInfo: {
        permission: '7b6b9bfd-ed43-437d-bd93-08835ba09a25',
      },
      updateMediaData: {
        permission: '70e613b7-4bea-4663-8e52-042f62a6388b',
      },
      updateSort: {
        permission: '51a9f279-ec9b-44de-8ce7-bf51cce5a774',
      },
      updateRenderType: {
        permission: 'ee450172-8163-4a46-963d-ed2a1f6c2ffc',
      },
      setOnline: {
        permission: 'ae4640d4-2217-403d-9ed1-873d957a56f2',
      },
      setOffline: {
        permission: '2d644589-7d71-4d62-b808-402541157ae4',
      },
      Remove: {
        permission: '8cb5f77f-4580-4601-8359-78b6f742acef',
      },
      refreshCache: {
        permission: '0ab0b4b6-9f30-407e-9895-e75d978065be',
      },
      getMediaItem: {
        permission: 'f44d30e7-328a-4aeb-b5e7-c0209596893d',
      },
      addMediaItem: {
        permission: 'b1427fd0-6e24-4a72-8f71-6029cbbcbca0',
      },
      updateMediaItem: {
        permission: '5c129c76-0a08-42e1-a4ab-a151c4a236de',
      },
      setMediaCollectionSort: {
        permission: '85a5a920-4ae2-4b67-a5fd-d44b1843172d',
      },
      removeMediaItem: {
        permission: 'fe15d6cc-d873-4dcd-8e75-d0bb33416859',
      },
      addImage: {
        permission: '28ebb2c0-9ad7-4e38-baff-b655a614e516',
      },
      removeImage: {
        permission: '04e8ce87-9c32-424d-a6f7-a586448906c2',
      },
      updateImageSort: {
        permission: 'd4d861d7-0d7b-4503-ac1b-0516591b7b15',
      },
    },
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
