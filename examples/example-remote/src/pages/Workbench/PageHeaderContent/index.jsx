import { Avatar } from 'antd';

import { defaultUserAvatar } from 'antd-management-fast-common';
import { BaseComponent, FlexBox } from 'antd-management-fast-component';

class PageHeaderContent extends BaseComponent {
  renderFurther() {
    const { avatar, name } = this.props;

    return (
      <>
        <FlexBox
          flexAuto="right"
          style={{
            paddingTop: '6px',
          }}
          left={
            <Avatar
              size="small"
              style={{
                width: '70px',
                height: '70px',
              }}
              // className={styles.avatar}
              src={avatar || defaultUserAvatar}
              alt="avatar"
            />
          }
          leftStyle={{
            paddingRight: '30px',
          }}
          right={
            <FlexBox
              flexAuto="top"
              top={
                <div
                  style={{
                    fontSize: '20px',
                    paddingTop: '4px',
                  }}
                >{`早安，${name}，祝你开心每一天！`}</div>
              }
              bottom={
                <div
                  style={{
                    fontSize: '14px',
                    color: '#333',
                    paddingBottom: '4px',
                  }}
                >
                  河南省驻马店市委宣传部 — 驻马店官方发布CMS平台
                </div>
              }
            />
          }
        />
      </>
    );
  }
}

export { PageHeaderContent };
