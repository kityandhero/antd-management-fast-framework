// import {
//   getDerivedStateFromPropsForUrlParams,
//   isFunction,
//   showRuntimeErrorMessage,
// } from './utils/tools';

export default function init(api) {
  api.logger.info('use plugin');

  api.modifyHTML(($) => {
    $('body').prepend(`<h1>hello umi plugin</h1>`);
    return $;
  });
}
