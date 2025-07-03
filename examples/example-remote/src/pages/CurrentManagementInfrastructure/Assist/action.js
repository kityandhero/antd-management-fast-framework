import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldDataDefaultImage } from '../Common/data';

export async function refreshKeyValueCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .refreshKeyValueCache,
    params: {
      tag: getValueByKey({
        data: handleData,
        key: fieldDataDefaultImage.tag.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function updateFlowDebugUserIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .updateFlowDebugUserId,
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function updateFlowDebugSubsidiaryIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .updateFlowDebugSubsidiaryId,
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuImageSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .toggleQiniuImageSwitch,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuAudioSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .toggleQiniuAudioSwitch,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuVideoSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .toggleQiniuVideoSwitch,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuFileSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .toggleQiniuFileSwitch,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function testSecretKeyAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .testSecretKey,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function testDiskSpaceMonitoringConfigAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .testDiskSpaceMonitoringConfig,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function testDiskSpaceMonitoringAlarmEmailAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .testDiskSpaceMonitoringAlarmEmail,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function testDiskSpaceMonitoringDetectionEmailAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .testDiskSpaceMonitoringDetectionEmail,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function startExecuteDebugAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .startExecuteDebug,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function stopExecuteDebugAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: modelTypeCollection.currentManagementInfrastructureTypeCollection
      .stopExecuteDebug,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}
