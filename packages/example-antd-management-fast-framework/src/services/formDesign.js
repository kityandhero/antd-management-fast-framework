import {
  getStringFromLocalStorage,
  request,
  requestMode,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

const formDesignKey = 'form-design-remote';
const uuid = '842927b4edc94b61a4005603b89bd356';

function buildDataSchemaKey() {
  return `${formDesignKey}-data-schema-${uuid}`;
}

function buildDesignSchemaKey() {
  return `${formDesignKey}-design-schema-${uuid}`;
}

export const getDataApiAddress = '/formDesign/get';

export async function getData(parameters) {
  const dataSchema = getStringFromLocalStorage(buildDataSchemaKey());
  const designSchema = getStringFromLocalStorage(buildDesignSchemaKey());

  return request({
    api: getDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 800,
    simulativeSuccessResponse: {
      data: {
        dataSchema: dataSchema ?? '',
        designSchema: designSchema ?? '',
      },
    },
  });
}

export const setDataApiAddress = '/formDesign/set';

export async function setData(parameters) {
  const { dataSchema, designSchema } = parameters;

  saveStringToLocalStorage(buildDataSchemaKey(), dataSchema);
  saveStringToLocalStorage(buildDesignSchemaKey(), designSchema);

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

  saveStringToLocalStorage(buildDataSchemaKey(), dataSchema);

  return request({
    api: setDataApiAddress,
    params: parameters,
    mode: requestMode.simulation,
    simulateRequestMaxDelay: 300,
    simulativeSuccessResponse: {
      data: {
        dataSchema: dataSchema ?? '',
        designSchema: getStringFromLocalStorage(buildDesignSchemaKey()),
      },
    },
  });
}
