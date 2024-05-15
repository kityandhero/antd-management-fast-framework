import {
  checkStringIsNullOrWhiteSpace,
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  isArray,
  isObject,
  request,
  requestMode,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

const formDataSchemaKey =
  'simple-form-data-schema-remote-0f58a9f4b87e4488b48d7a1d478dd6ff';
const formDesignSchemaKey =
  'simple-form-design-schema-remote-35713f03ad864e71a34b44984e6a6263';
const formDocumentGeneralSchemaKey =
  'simple-form-document-general-schema-remote-c8f8ac92604545b7b4adfb266169937d';
const formDocumentItemsSchemaKey =
  'simple-form-document-items-schema-remote-5fceb57ac251401a8dd811cb9d0f14e2';
const formDataKey = 'simple-form-data-remote-e3cabeac8b4b4277adce624793b584c7';
const formRemarkListKey =
  'simple-form-remark-list-remote-57449e0602d944028bc853b063633429';
const formRemarkColorKey =
  'simple-form-remark-color-remote-e1da2c23d73247c8be233ad4385bdd40';

export const getDataApiAddress = '/formDesign/get';

export async function getData(parameters) {
  const dataSchema = getStringFromLocalStorage(formDataSchemaKey);
  const designSchema = getStringFromLocalStorage(formDesignSchemaKey);

  let documentGeneralSchema = {};

  try {
    documentGeneralSchema = getJsonFromLocalStorage(
      formDocumentGeneralSchemaKey,
    );

    if (!isObject(documentGeneralSchema)) {
      documentGeneralSchema = {};

      saveJsonToLocalStorage(
        formDocumentGeneralSchemaKey,
        documentGeneralSchema,
      );
    }
  } catch {
    documentGeneralSchema = {};

    saveJsonToLocalStorage(formDocumentGeneralSchemaKey, documentGeneralSchema);
  }

  let documentItemsSchema = [];

  try {
    documentItemsSchema = getJsonFromLocalStorage(formDocumentItemsSchemaKey);

    if (!isArray(documentItemsSchema)) {
      documentItemsSchema = [];

      saveJsonToLocalStorage(formDocumentItemsSchemaKey, documentItemsSchema);
    }
  } catch {
    documentItemsSchema = [];

    saveJsonToLocalStorage(formDocumentItemsSchemaKey, documentItemsSchema);
  }

  const listFormStorage = getJsonFromLocalStorage(formDataKey);

  let formRemarkList = getJsonFromLocalStorage(formRemarkListKey);
  let formRemarkColor = getStringFromLocalStorage(formRemarkColorKey);

  if (!isArray(formRemarkList)) {
    formRemarkList = [
      '表单备注1表单备注1表单备注1表单备注1表单备注1表单备注1表单备注1表单备注1',
      '表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2',
    ];

    saveJsonToLocalStorage(formRemarkListKey, formRemarkList);
  }

  if (checkStringIsNullOrWhiteSpace(formRemarkColor)) {
    formRemarkColor = '';
    saveStringToLocalStorage(formRemarkColorKey, formRemarkColor);
  }

  return request({
    api: getDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 800,
    simulativeSuccessResponse: {
      data: {
        dataSchema: dataSchema ?? '',
        designSchema: designSchema ?? '',
        documentSchema: {
          general: documentGeneralSchema ?? {},
          items: documentItemsSchema,
        },
        listFormStorage: listFormStorage || [],
        formRemarkList: formRemarkList,
        formRemarkColor: formRemarkColor,
      },
    },
  });
}

export const setDataApiAddress = '/formDesign/set';

export async function setData(parameters) {
  const { dataSchema, designSchema } = parameters;

  saveStringToLocalStorage(formDataSchemaKey, dataSchema);
  saveStringToLocalStorage(formDesignSchemaKey, designSchema);

  return request({
    api: setDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 300,
    simulativeSuccessResponse: {
      data: {
        dataSchema: dataSchema ?? '',
        designSchema: designSchema ?? '',
      },
    },
  });
}

export const setDataSchemaDataApiAddress = '/formDesign/setDataSchema';

export async function setDataSchemaData(parameters) {
  const { dataSchema } = parameters;

  saveStringToLocalStorage(formDataSchemaKey, dataSchema);

  return request({
    api: setDataSchemaDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 300,
    simulativeSuccessResponse: {
      data: {
        dataSchema: dataSchema ?? '',
        designSchema: getStringFromLocalStorage(formDesignSchemaKey),
      },
    },
  });
}

export const setDocumentSchemaDataApiAddress = '/formDesign/setDocumentSchema';

export async function setDocumentSchemaData(parameters) {
  const { documentGeneralSchema, documentItemsSchema } = parameters;

  saveJsonToLocalStorage(formDocumentGeneralSchemaKey, documentGeneralSchema);

  saveJsonToLocalStorage(formDocumentItemsSchemaKey, documentItemsSchema);

  return request({
    api: setDataSchemaDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 300,
    simulativeSuccessResponse: {
      data: {
        general: documentGeneralSchema,
        items: documentItemsSchema,
      },
    },
  });
}

export const saveFormDataApiAddress = '/formDesign/saveForm';

export async function saveFormData(parameters) {
  const { listFormStorage } = parameters;

  saveJsonToLocalStorage(formDataKey, listFormStorage);

  return request({
    api: saveFormDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 300,
    simulativeSuccessResponse: {
      data: {
        listFormStorage,
      },
    },
  });
}

export const getFormRemarkDataApiAddress = '/formDesign/getFormRemark';

export async function getFormRemarkData(parameters) {
  let formRemarkList = getJsonFromLocalStorage(formRemarkListKey);
  let formRemarkColor = getStringFromLocalStorage(formRemarkColorKey);

  if (!isArray(formRemarkList)) {
    formRemarkList = [
      '表单备注1表单备注1表单备注1表单备注1表单备注1表单备注1表单备注1表单备注1',
      '表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2表单备注2',
      '表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3表单备注3',
    ];

    saveJsonToLocalStorage(formRemarkListKey, formRemarkList);
  }

  if (checkStringIsNullOrWhiteSpace(formRemarkColor)) {
    formRemarkColor = '';
    saveStringToLocalStorage(formRemarkColorKey, formRemarkColor);
  }

  return request({
    api: getFormRemarkDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 800,
    simulativeSuccessResponse: {
      data: {
        formRemarkColor,
        formRemarkList,
      },
    },
  });
}

export const saveFormRemarkDataApiAddress = '/formDesign/saveFormRemark';

export async function saveFormRemarkData(parameters) {
  let { color, list } = parameters;

  if (!isArray(list)) {
    list = [];
  }

  if (checkStringIsNullOrWhiteSpace(color)) {
    color = '';
  }

  saveJsonToLocalStorage(formRemarkListKey, list);
  saveStringToLocalStorage(formRemarkColorKey, color);

  return request({
    api: saveFormRemarkDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 300,
    simulativeSuccessResponse: {
      data: {
        formRemarkColor: color,
        formRemarkList: list,
      },
    },
  });
}
