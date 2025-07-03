import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { keyValueEditModeCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { TabPageBase } from '../../TabPageBase';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class Index extends TabPageBase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.applicationTypeCollection.getConfigure,
      applicationId: null,
      targetFieldData: null,
      keyValueEditMode: keyValueEditModeCollection.string,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [],
    };
  };
}

export default Index;
