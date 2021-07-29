// ref:
// - https://umijs.org/plugins/api

export default function(api) {
  api.logger.info('use plugin');

  api.modifyHTML($ => {
    $('body').prepend(`<h1>hello umi plugin</h1>`);
    return $;
  });
}
