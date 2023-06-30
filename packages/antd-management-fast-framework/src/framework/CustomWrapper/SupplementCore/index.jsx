import {
  logDebug,
  mergeArrowText,
  pretreatmentRemoteSingleData,
} from 'easy-soft-utility';

import { Common } from '../../Common';

const primaryCallName = 'CustomWrapper::SupplementCore';

class SupplementCore extends Common {
  pretreatmentImageUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentImageUploadRemoteResponse',
    );

    let result = { image: '' };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { imageUrl },
      } = v;

      result = { image: imageUrl || '' };
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

  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentFileBase64UploadRemoteResponse',
    );

    let result = { image: '' };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { fileBase64 },
      } = v;

      result = { fileBase64: fileBase64 || '' };
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

  pretreatmentVideoUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentVideoUploadRemoteResponse',
    );

    let result = { video: '' };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { videoUrl },
      } = v;

      result = { video: videoUrl || '' };
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

  pretreatmentAudioUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentAudioUploadRemoteResponse',
    );

    let result = { audio: '' };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { audioUrl },
      } = v;

      result = { audio: audioUrl || '' };
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

  pretreatmentFileUploadRemoteResponse = (response) => {
    this.logCallTrack(
      {
        parameter: response,
      },
      primaryCallName,
      'pretreatmentFileUploadRemoteResponse',
    );

    let result = { file: '' };

    const v = pretreatmentRemoteSingleData({ source: response });

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { fileUrl },
      } = v;

      result = { file: fileUrl || '' };
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
