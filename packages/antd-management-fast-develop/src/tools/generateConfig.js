/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const uuid = require('uuid');
const {
  promptSuccess,
  promptWarn,
  promptEmptyLine,
  writeJsonFileSync,
} = require('easy-soft-develop');

const configDefined = {
  model: '',
  key: '',
  action: false,
  config: false,
  tools: false,
  data: false,
  addBasicInfoDrawer: false,
  changeImageModal: false,
  changeSortModal: false,
  tabPageBase: false,
  edit: false,
  basicInfo: false,
  operateLogDrawer: false,
  operateLogInnerPageList: false,
  pageList: false,
  pageListDrawer: false,
  baseInnerPageList: false,
  pageListSelectDrawer: false,
  pageListSelectModal: false,
  pageListSelectActionDrawer: false,
  selectDrawerField: false,
  selectModalField: false,
  updateBasicInfoDrawer: false,
};

function generateConfig(list, mainFolder, path) {
  const listAdjust = list.map((o) => adjustSource(o));

  generateAddBasicInfoDrawerConfig(listAdjust, mainFolder, path);
}

function generateAddBasicInfoDrawerConfig(list, mainFolder, path) {
  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'addBasicInfoDrawer.config.json',
    judgeCallback: (one) => {
      const { addBasicInfoDrawer } = {
        ...configDefined,
        ...one,
      };

      return addBasicInfoDrawer || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/AddBasicInfoDrawer`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'assist.action.config.json',
    judgeCallback: (one) => {
      const { action } = {
        ...configDefined,
        ...one,
      };

      return action || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/Assist`,
        model: model,
        key: key,
        fileName: 'action.js',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'assist.config.config.json',
    judgeCallback: (one) => {
      const { config } = {
        ...configDefined,
        ...one,
      };

      return config || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/Assist`,
        model: model,
        key: key,
        fileName: 'config.js',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'assist.tools.config.json',
    judgeCallback: (one) => {
      const { tools } = {
        ...configDefined,
        ...one,
      };

      return tools || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/Assist`,
        model: model,
        key: key,
        fileName: 'tools.js',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'common.data.config.json',
    judgeCallback: (one) => {
      const { data } = {
        ...configDefined,
        ...one,
      };

      return data || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/Common`,
        model: model,
        key: key,
        fileName: 'data.js',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'changeImageModal.config.json',
    judgeCallback: (one) => {
      const { changeImageModal } = {
        ...configDefined,
        ...one,
      };

      return changeImageModal || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/ChangeImageModal`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'changeSortModal.config.json',
    judgeCallback: (one) => {
      const { changeSortModal } = {
        ...configDefined,
        ...one,
      };

      return changeSortModal || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/ChangeSortModal`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'edit.basicInfo.config.json',
    judgeCallback: (one) => {
      const { basicInfo } = {
        ...configDefined,
        ...one,
      };

      return basicInfo || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/Edit/BasicInfo`,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'edit.config.json',
    judgeCallback: (one) => {
      const { edit } = {
        ...configDefined,
        ...one,
      };

      return edit || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/Edit`,
        name: folder,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'operateLog.drawer.config.json',
    judgeCallback: (one) => {
      const { operateLogDrawer } = {
        ...configDefined,
        ...one,
      };

      return operateLogDrawer || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/OperateLogDrawer`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: true,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'operateLog.edit.pageList.config.json',
    judgeCallback: (one) => {
      const { operateLogInnerPageList } = {
        ...configDefined,
        ...one,
      };

      return operateLogInnerPageList || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/Edit/OperateLog/PageList`,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: true,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'pageList.config.json',
    judgeCallback: (one) => {
      const { pageList } = {
        ...configDefined,
        ...one,
      };

      return pageList || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/PageList`,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'pageListDrawer.config.json',
    judgeCallback: (one) => {
      const { pageListDrawer } = {
        ...configDefined,
        ...one,
      };

      return pageListDrawer || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/PageListDrawer`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'baseInnerPageList.config.json',
    judgeCallback: (one) => {
      const { baseInnerPageList } = {
        ...configDefined,
        ...one,
      };

      return baseInnerPageList || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/BaseInnerPageList`,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'pageListSelectDrawer.config.json',
    judgeCallback: (one) => {
      const { pageListSelectDrawer } = {
        ...configDefined,
        ...one,
      };

      return pageListSelectDrawer || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/PageListSelectDrawer`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'pageListSelectModal.config.json',
    judgeCallback: (one) => {
      const { pageListSelectModal } = {
        ...configDefined,
        ...one,
      };

      return pageListSelectModal || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/PageListSelectModal`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'pageListSelectActionDrawer.config.json',
    judgeCallback: (one) => {
      const { pageListSelectActionDrawer } = {
        ...configDefined,
        ...one,
      };

      return pageListSelectActionDrawer || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/PageListSelectActionDrawer`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'selectDrawerField.config.json',
    judgeCallback: (one) => {
      const { selectDrawerField } = {
        ...configDefined,
        ...one,
      };

      return selectDrawerField || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/SelectDrawerField`,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'selectModalField.config.json',
    judgeCallback: (one) => {
      const { selectModalField } = {
        ...configDefined,
        ...one,
      };

      return selectModalField || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/SelectModalField`,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'tabPageBase.config.json',
    judgeCallback: (one) => {
      const { tabPageBase } = {
        ...configDefined,
        ...one,
      };

      return tabPageBase || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/TabPageBase`,
        model: model,
        key: key,
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });

  generateConfigCore({
    list,
    mainFolder,
    path,
    fileName: 'updateBasicInfoDrawer.config.json',
    judgeCallback: (one) => {
      const { updateBasicInfoDrawer } = {
        ...configDefined,
        ...one,
      };

      return updateBasicInfoDrawer || false;
    },
    buildCallback: ({ mainFolder, folder, model, key }) => {
      return {
        folder: `${mainFolder}/${folder}/UpdateBasicInfoDrawer`,
        model: model,
        key: key,
        visibleFlag: uuid.v4().replaceAll('-', ''),
        fileName: 'index.jsx',
        coverFile: false,
      };
    },
  });
}

function generateConfigCore({
  list,
  mainFolder,
  path,
  fileName,
  // eslint-disable-next-line no-unused-vars
  judgeCallback = (one) => false,
  // eslint-disable-next-line no-unused-vars
  buildCallback = ({ mainFolder, folder, model, key }) => null,
}) {
  const listResult = [];

  for (const o of list) {
    const judgeResult = judgeCallback(o);

    if (!judgeResult) {
      continue;
    }

    const { folder, model, key } = o;

    listResult.push(
      buildCallback({
        mainFolder,
        folder,
        model,
        key,
      }),
    );
  }

  const result = {};

  result.list = listResult;

  writeJsonFileSync(`${path}/../${fileName}`, result, {
    coverFile: true,
  });

  promptSuccess(`Generate complete[${mainFolder}]: "./${fileName}".`);
}

function adjustSource(o) {
  const d = { ...o };

  const folder = d.folder;

  if (folder === undefined) {
    promptWarn('data has error, check item: ');

    console.log(d);

    promptEmptyLine();

    throw new Error('data has not key "folder"');
  }

  return d;
}

module.exports = {
  generateConfig,
};
