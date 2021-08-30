module.exports = {
  "packages/antd-management-fast-framework/**/*.less":
    "cd packages/antd-management-fast-framework && stylelint --syntax less",
  "packages/simple-antd-management-fast-framework/**/*.less":
    "cd packages/simple-antd-management-fast-framework && stylelint --syntax less",
  "packages/antd-management-fast-framework/**/*.{js,jsx,ts,tsx}":
    "cd packages/antd-management-fast-framework && npm run lint-staged:js",
  "packages/simple-antd-management-fast-framework/**/*.{js,jsx,ts,tsx}":
    "cd packages/simple-antd-management-fast-framework && npm run lint-staged:js",
  "packages/antd-management-fast-framework/**/*.{js,jsx,tsx,ts,less,md,json}":
    "cd packages/antd-management-fast-framework && prettier --write",
  "packages/simple-antd-management-fast-framework/**/*.{js,jsx,tsx,ts,less,md,json}":
    "cd packages/simple-antd-management-fast-framework && prettier --write",
};
