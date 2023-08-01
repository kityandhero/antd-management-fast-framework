import { Input, Space } from 'antd';

import { getModelRemoteData } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig, layoutCollection } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { keyValueEditModeCollection } from '../customConfig';

export const themeToken = {
  // colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
  // colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
  // colorTextAppListIcon: 'rgba(255,255,255,0.85)',
  // sider: {
  //   colorBgCollapsedButton: '#fff',
  //   colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
  //   colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
  //   colorMenuBackground: '#004FD9',
  //   colorBgMenuItemCollapsedHover: 'rgba(0,0,0,0.06)',
  //   colorBgMenuItemCollapsedSelected: 'rgba(0,0,0,0.15)',
  //   colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
  //   colorMenuItemDivider: 'rgba(255,255,255,0.15)',
  //   colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
  //   colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
  //   colorTextMenuSelected: '#fff',
  //   colorTextMenuItemHover: 'rgba(255,255,255,0.75)',
  //   colorTextMenu: 'rgba(255,255,255,0.75)',
  //   colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
  //   colorTextMenuTitle: 'rgba(255,255,255,0.95)',
  //   colorTextMenuActive: 'rgba(255,255,255,0.95)',
  //   colorTextSubMenuSelected: '#fff',
  // },
};

export function getSexName(value) {
  let result = '未知';

  switch (`${value}`) {
    case '1': {
      result = '男';
      break;
    }

    case '2': {
      result = '女';
      break;
    }

    default: {
      break;
    }
  }

  return result;
}

export function getLogo() {
  const { data } = {
    data: {},
    ...getModelRemoteData('currentAccount'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { logo } = {
    logo: '',
    ...platform,
  };

  return logo;
}

export function getTitle() {
  const { data } = {
    data: {},
    ...getModelRemoteData('currentAccount'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { shortName } = {
    shortName: '',
    ...platform,
  };

  if (checkStringIsNullOrWhiteSpace(shortName)) {
    return '';
  }

  return shortName;
}

export function buildActionItems() {
  return [
    ({ layout: layoutValue }) => {
      if (layoutValue === layoutCollection.side) {
        return iconBuilder.search({
          style: {
            color: '#868686',
          },
        });
      }
      return (
        <Input
          style={{
            borderRadius: 4,
            marginInlineEnd: 12,
            backgroundColor: 'rgba(0,0,0,0.03)',
          }}
          prefix={iconBuilder.search({
            style: {
              color: '#868686',
            },
          })}
          placeholder="搜索方案"
          bordered={false}
        />
      );
    },
    iconBuilder.infoCircle(
      {
        style: {
          color: '#868686',
        },
      },
      true,
    ),
  ];
}

export function buildSiderMenuExtra() {
  return (
    <div
      style={{
        paddingTop: '5px',
      }}
    >
      <Space align="center">
        <Input
          style={{
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.03)',
          }}
          prefix={iconBuilder.search({
            style: {
              color: 'rgba(0, 0, 0, 0.15)',
            },
          })}
          placeholder="搜索方案"
          bordered={false}
        />

        {iconBuilder.search({
          style: {
            color: 'var(--ant-primary-color)',
            fontSize: 18,
          },
        })}
      </Space>
    </div>
  );
}

export function buildSiderMenuFooter() {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingBlockStart: 12,
      }}
    >
      <div>Menu Footer</div>
    </div>
  );
}

export function buildKeyTag(key) {
  return `${key}Tag`;
}

export function buildInputItem({
  firstLoadSuccess,
  handleData,
  fieldData: f,
  hidden = false,
  editMode = keyValueEditModeCollection.string,
  // eslint-disable-next-line no-unused-vars
  handleClick: handleClickSimple = ({ fieldData, editMode }) => {},
}) {
  return {
    lg: 24,
    type: cardConfig.contentItemType.onlyShowInput,
    icon: iconBuilder.read(),
    fieldData: f,
    value: getValueByKey({
      data: handleData,
      key: f.name,
      convertBuilder: (v) => {
        let result = v;
        switch (editMode) {
          case keyValueEditModeCollection.time: {
            result = formatDatetime({
              data: v,
              format: datetimeFormat.hourMinute,
              defaultValue: '--',
            });
            break;
          }

          default: {
            result = v;
            break;
          }
        }

        return result;
      },
    }),
    hidden,
    innerProps: {
      addonAfter: buildButton({
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
        },
        icon: iconBuilder.form(),
        text: '更改配置',
        disabled: !firstLoadSuccess,
        handleClick: () => {
          handleClickSimple({ fieldData: f, editMode });
        },
      }),
    },
  };
}
