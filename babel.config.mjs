/**
generate by easy-soft-develop
*/

export default function buildConfig(api) {
  api.cache(true);

  return {
    babelrcRoots: ['.', 'packages/*', 'examples/*'],
  };
}
