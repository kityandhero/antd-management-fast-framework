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
