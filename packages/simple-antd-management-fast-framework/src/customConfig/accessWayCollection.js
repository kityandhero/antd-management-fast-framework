export const accessWayCollection = {
  ...{
    super: {
      permission: 'super',
    },
    currentOperator: {
      updateBasicInfo: {
        permission: '93679cff48914a349c0ef4443db85e69',
      },
    },
    accessWay: {
      pageList: {
        paramsKey: '6ec51bf6965642719a7a4c01dbf795b0',
        permission: '3817d76a07a443b7bb46b872efa81bcf',
      },
      get: {
        permission: 'be827093426e4d57950460122dc99c9f',
      },
      setOnline: {
        permission: '3ef9d7d9f2804ee8b73f5d0fe636b5b1',
      },
      setOffline: {
        permission: 'b72d811e0a49411fbd848485cf77a6a4',
      },
      refreshCache: {
        permission: '8393b5e09b2d49679479857964f7c098',
      },
    },
    article: {
      pageList: {
        paramsKey: 'a1b398d90bf740df9f2b4bb15d69f970',
        permission: '3c11653937294459b4bdc23fbbc66c52',
      },
      singleList: {
        permission: 'a85ac9a44c044a5084f28ae87f315475',
      },
      get: {
        permission: '93937868009f4e79b15fd7efc093ae2c',
      },
      addBasicInfo: {
        permission: 'e4eb9d95bf7b475382ab03a4c7c12386',
      },
      updateBasicInfo: {
        permission: '4249a3243120443f87c267d06a8a067f',
      },
      updateContentInfo: {
        permission: '7b6b9bfded43437dbd9308835ba09a25',
      },
      updateImageContentInfo: {
        permission: '7f7f2ba7e94f44e5a8a90ff5aaf1b85b',
      },
      updateMediaData: {
        permission: '70e613b74bea46638e52042f62a6388b',
      },
      updateSort: {
        permission: '51a9f279ec9b44de8ce7bf51cce5a774',
      },
      updateRenderType: {
        permission: 'ee45017281634a46963ded2a1f6c2ffc',
      },
      setOnline: {
        permission: 'ae4640d42217403d9ed1873d957a56f2',
      },
      setOffline: {
        permission: '2d6445897d714d62b808402541157ae4',
      },
      Remove: {
        permission: '8cb5f77f45804601835978b6f742acef',
      },
      refreshCache: {
        permission: '0ab0b4b69f30407e9895e75d978065be',
      },
      getMediaItem: {
        permission: 'f44d30e7328a4aebb5e7c0209596893d',
      },
      addMediaItem: {
        permission: 'b1427fd06e244a728f716029cbbcbca0',
      },
      updateMediaItem: {
        permission: '5c129c760a0842e1a4aba151c4a236de',
      },
      setMediaCollectionSort: {
        permission: '85a5a9204ae24b67a5fdd44b1843172d',
      },
      removeMediaItem: {
        permission: 'fe15d6ccd8734dcd8e75d0bb33416859',
      },
      addImage: {
        permission: '28ebb2c09ad74e38baffb655a614e516',
      },
      removeImage: {
        permission: '04e8ce879c32424da6f7a586448906c2',
      },
      updateImageSort: {
        permission: 'd4d861d70d7b4503ac1b0516591b7b15',
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
