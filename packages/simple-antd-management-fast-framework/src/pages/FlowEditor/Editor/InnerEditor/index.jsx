import { connect } from 'umi';

import { Graph } from '@antv/x6';

import TabPageBase from '../../TabPageBase';

const graph = new Graph();

@connect(({ flowEditor, global, loading }) => ({
  flowEditor,
  global,
  loading: loading.models.flowEditor,
}))
class Index extends TabPageBase {
  containerId = '';

  renderEdit = () => {
    return null;
  };
}

export default Index;
