import { Divider, Popover, theme } from 'antd';
import { css } from '@emotion/css';

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '24px',
          paddingTop: 8,
          height: '307px',
          borderRadius: '0 0 6px 6px',
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <List title="金融解决方案" />
              <List
                title="其他解决方案"
                style={{
                  marginBlockStart: 32,
                }}
              />
            </div>

            <div
              style={{
                width: '308px',
                borderInlineStart: '1px solid ' + token.colorBorder,
                paddingInlineStart: 16,
              }}
            >
              <div
                className={css`
                  font-size: 14px;
                  color: ${token.colorText};
                  line-height: 22px;
                `}
              >
                热门产品
              </div>
              {Array.from({ length: 3 })
                .fill(1)
                .map((name, index) => {
                  return (
                    <div
                      key={index}
                      className={css`
                        border-radius: 4px;
                        padding: 16px;
                        margin-top: 4px;
                        display: flex;
                        cursor: pointer;
                        &:hover {
                          background-color: ${token.colorBgTextHover};
                        }
                      `}
                    >
                      <img src="https://gw.alipayobjects.com/zos/antfincdn/6FTGmLLmN/bianzu%25252013.svg" />
                      <div
                        style={{
                          marginInlineStart: 14,
                        }}
                      >
                        <div
                          className={css`
                            font-size: 14px;
                            color: ${token.colorText};
                            line-height: 22px;
                          `}
                        >
                          Ant Design
                        </div>
                        <div
                          className={css`
                            font-size: 12px;
                            color: ${token.colorTextSecondary};
                            line-height: 20px;
                          `}
                        >
                          杭州市较知名的 UI 设计语言
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center',
          }}
          className={css`
            &:hover {
              background-color: ${token.colorBgTextHover};
            }
          `}
        >
          <span> 企业级资产中心</span>
          {/* <CaretDownFilled /> */}
        </div>
      </Popover>
    </div>
  );
};

const Item = (properties) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: '33.33%',
      }}
    >
      {properties.children}
      {/* <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      /> */}
    </div>
  );
};

const List = (properties) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...properties.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {properties.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Array.from({ length: 6 })
          .fill(1)
          .map((_, index) => {
            return <Item key={index}>具体的解决方案-{index}</Item>;
          })}
      </div>
    </div>
  );
};

export { MenuCard };
