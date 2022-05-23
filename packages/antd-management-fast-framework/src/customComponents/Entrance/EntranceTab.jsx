import { Tabs } from 'antd';
import { useEffect } from 'react';

// import EntranceContext from './EntranceContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

const EntranceTab = (props) => {
  useEffect(() => {
    const uniqueId = generateId('entrance-tab-');
    const { tabUtil } = props;

    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, [props]);

  const { children } = props;

  return <TabPane {...props}>{props.active && children}</TabPane>;
};

// const WrapContext = (props) => (
//   <EntranceContext.Consumer>
//     {(value) => <EntranceTab tabUtil={value.tabUtil} {...props} />}
//   </EntranceContext.Consumer>
// );

// WrapContext.typeName = 'EntranceTab';

export default EntranceTab;
