import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import { trim } from 'antd-management-fast-common/es/utils/tools';

import Guide from '@/components/Guide';

import styles from './index.less';

const HomePage = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
