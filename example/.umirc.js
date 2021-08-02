import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  headerExtraLinks: ['/link1.css'],
});
