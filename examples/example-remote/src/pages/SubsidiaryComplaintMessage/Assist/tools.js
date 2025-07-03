import { getValueByKey, handleItem } from 'easy-soft-utility';

import { fieldData } from '../Common/data';

export function handleItemWhetherConfirm({ target, handleData, remoteData }) {
  const id = getValueByKey({
    data: handleData,
    key: fieldData.subsidiaryComplaintMessageId.name,
  });

  handleItem({
    target,
    value: id,
    compareValueHandler: (o) => {
      return getValueByKey({
        data: o,
        key: fieldData.subsidiaryComplaintMessageId.name,
      });
    },
    handler: (d) => {
      const o = d;

      o[fieldData.whetherConfirm.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherConfirm.name,
      });

      o[fieldData.whetherConfirmNote.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherConfirmNote.name,
      });

      return d;
    },
  });
}
