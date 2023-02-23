import {
  buildTokenData,
  pretreatmentRemoteSingleData,
} from 'easy-soft-utility';

import { Common } from '../../Common';

class SupplementCore extends Common {
  getUploadTokenObject = () => {
    return buildTokenData();
  };

  pretreatmentImageUploadRemoteResponse = (response) => {
    let result = { image: '' };

    const v = pretreatmentRemoteSingleData(response);

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { imageUrl },
      } = v;

      result = { image: imageUrl || '' };
    }

    return result;
  };

  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    let result = { image: '' };

    const v = pretreatmentRemoteSingleData(response);

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { fileBase64 },
      } = v;

      result = { fileBase64: fileBase64 || '' };
    }

    return result;
  };

  pretreatmentVideoUploadRemoteResponse = (response) => {
    let result = { video: '' };

    const v = pretreatmentRemoteSingleData(response);

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { videoUrl },
      } = v;

      result = { video: videoUrl || '' };
    }

    return result;
  };

  pretreatmentAudioUploadRemoteResponse = (response) => {
    let result = { audio: '' };

    const v = pretreatmentRemoteSingleData(response);

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { audioUrl },
      } = v;

      result = { audio: audioUrl || '' };
    }

    return result;
  };

  pretreatmentFileUploadRemoteResponse = (response) => {
    let result = { file: '' };

    const v = pretreatmentRemoteSingleData(response);

    const { dataSuccess } = v;

    if (dataSuccess) {
      const {
        data: { fileUrl },
      } = v;

      result = { file: fileUrl || '' };
    }

    return result;
  };
}

export { SupplementCore };
