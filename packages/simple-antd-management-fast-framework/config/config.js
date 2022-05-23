import { buildConfig } from 'antd-management-fast-framework/es/configGroup/configGeneral';
import pageRoutes from './router.config';

const config = buildConfig({
  routes: pageRoutes,
  headerExtraLinks: ['/home.css'],
  mfsu: false,
});

export default config;
