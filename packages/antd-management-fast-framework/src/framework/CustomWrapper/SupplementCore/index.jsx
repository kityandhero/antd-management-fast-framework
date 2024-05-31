import {
  logDebug,
  mergeArrowText,
  pretreatmentRemoteSingleData,
} from 'easy-soft-utility';

import { Common } from '../../Common';

const primaryCallName = 'CustomWrapper::SupplementCore';

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 * @namespace CustomWrapper
 * @class SupplementCore
 * @extends Common
 */
class SupplementCore extends Common {
  /**
   * 预处理图片上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  pretreatmentImageUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentImageUploadRemoteResponse',
    );

    let result = { image: '', data: {} };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const { data } = v;

      const { imageUrl } = data;

      result = { image: imageUrl || '', data };
    } else {
      logDebug(
        {
          data: v,
        },
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'pretreatmentImageUploadRemoteResponse',
          'upload fail',
        ),
      );
    }

    return result;
  };

  /**
   * 预处理文件Base64上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentFileBase64UploadRemoteResponse',
    );

    let result = { image: '', data: {} };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const { data } = v;

      const { fileBase64 } = data;

      result = { fileBase64: fileBase64 || '', data };
    } else {
      logDebug(
        {
          data: v,
        },
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'pretreatmentFileBase64UploadRemoteResponse',
          'upload fail',
        ),
      );
    }

    return result;
  };

  /**
   * 预处理视频上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  pretreatmentVideoUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentVideoUploadRemoteResponse',
    );

    let result = { video: '', data: {} };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const { data } = v;

      const { videoUrl } = data;

      result = { video: videoUrl || '', data };
    } else {
      logDebug(
        {
          data: v,
        },
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'pretreatmentVideoUploadRemoteResponse',
          'upload fail',
        ),
      );
    }

    return result;
  };

  /**
   * 预处理音频上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  pretreatmentAudioUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentAudioUploadRemoteResponse',
    );

    let result = { audio: '', data: {} };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const { data } = v;

      const { audioUrl } = data;

      result = { audio: audioUrl || '', data };
    } else {
      logDebug(
        {
          data: v,
        },
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'pretreatmentAudioUploadRemoteResponse',
          'upload fail',
        ),
      );
    }

    return result;
  };

  /**
   * 预处理文件上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  pretreatmentFileUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentFileUploadRemoteResponse',
    );

    let result = { file: '', data: {} };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const { data } = v;

      const { fileUrl } = data;

      result = { file: fileUrl || '', data };
    } else {
      logDebug(
        {
          data: v,
        },
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'pretreatmentFileUploadRemoteResponse',
          'upload fail',
        ),
      );
    }

    return result;
  };
}

export { SupplementCore };
