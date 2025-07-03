import { getValueByKey, handleItem } from 'easy-soft-utility';

import { fieldData } from '../Common/data';

export function handleItemWhetherConfirm({ target, handleData, remoteData }) {
  const tagId = getValueByKey({
    data: handleData,
    key: fieldData.subsidiaryReportMessageId.name,
  });

  handleItem({
    target,
    value: tagId,
    compareValueHandler: (o) => {
      const { tagId: v } = o;

      return v;
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
