// eslint-disable-next-line import/named
import { Space } from 'antd';
// eslint-disable-next-line import/named
import { Handle, Position } from 'reactflow';

import { getValueByKey, isFunction } from 'easy-soft-utility';

import {
  ColorText,
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import { endNodeHeaderStyle, targetPointColor } from '../constant';

import styles from '../node.less';

const EndNode = (properties) => {
  const { size, data, onClick: click } = properties;

  const {
    data: dataSource,
    canEdit,
    onRemove,
  } = {
    canEdit: false,
    ...data,
  };

  const name = getValueByKey({
    data: dataSource,
    key: 'name',
  });

  const description = getValueByKey({
    data: dataSource,
    key: 'description',
  });

  return (
    <>
      <div className={styles.node} onClick={click} title={description || ''}>
        <div className={styles.header} style={endNodeHeaderStyle}>
          <FlexBox
            flexAuto="left"
            left={
              <VerticalBox>
                <ColorText
                  style={{ color: '#ffe4c4' }}
                  color={'#333'}
                  separator=" "
                  textPrefixStyle={{
                    marginRight: '6px',
                  }}
                  text={name || '终止点'}
                />
              </VerticalBox>
            }
            right={
              canEdit ? (
                <Space>
                  <button
                    style={{
                      padding: '1px 4px',
                      fontSize: '12px',
                      backgroundColor: 'transparent',
                      borderRadius: '5px',
                      borderColor: '#fff',
                    }}
                    title="点击移除节点"
                    onClick={(event) => {
                      event.stopPropagation();

                      if (isFunction(onRemove)) {
                        onRemove(dataSource);
                      }
                    }}
                  >
                    {iconBuilder.delete()}
                  </button>
                </Space>
              ) : null
            }
          />
        </div>

        {size !== 'small' && (
          <div className={styles.content}>
            <div className={styles.inner}>
              <div className={styles.info}>
                <ColorText text={'此节点为终止节点，代表流程结束。'} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: targetPointColor }}
        isConnectable={true}
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ top: '50%', background: targetPointColor }}
        isConnectable={true}
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{ top: '50%', background: targetPointColor }}
        isConnectable={true}
      />

      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{ top: '100%', background: targetPointColor }}
        isConnectable={true}
      />
    </>
  );
};

EndNode.defaultProps = {};

export { EndNode };
