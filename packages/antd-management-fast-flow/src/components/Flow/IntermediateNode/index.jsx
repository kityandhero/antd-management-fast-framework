import { Button, Divider, Space } from 'antd';
import classNames from 'classnames';
import { PureComponent } from 'react';
// eslint-disable-next-line import/named
import { Handle, Position } from 'reactflow';

import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isFunction,
} from 'easy-soft-utility';

import {
  ColorText,
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import { sourcePointColor, targetPointColor } from '../constant';

import styles from '../node.less';

class IntermediateNode extends PureComponent {
  render() {
    const { data, size } = this.props;

    const {
      data: dataSource,
      isNext,
      canEdit,
      nodeNameKey,
      listApproverKey,
      personnelNameKey,
      personnelNameLabel,
      onAddApprover,
      onChange,
      onRemove,
      onRemoveApprover,
    } = {
      canEdit: false,
      nodeNameKey: 'nodeNameKey',
      listApproverKey: 'listApprover',
      personnelNameKey: 'personnelName',
      personnelNameLabel: '',
      ...data,
    };

    const name = getValueByKey({
      data: dataSource,
      key: nodeNameKey,
      defaultValue: '暂无',
    });

    console.log({ dataSource, nodeNameKey });

    const listApprover = getValueByKey({
      data: dataSource,
      key: listApproverKey,
      convert: convertCollection.array,
    });

    const hasApprover = listApprover.length > 0;

    return (
      <>
        <div
          className={classNames(styles.node, isNext ? styles.node_next : null)}
        >
          <div className={styles.header}>
            <FlexBox
              flexAuto="left"
              left={
                <VerticalBox>
                  <ColorText
                    style={{}}
                    color={'#333'}
                    separator=" "
                    textPrefixStyle={{
                      marginRight: '6px',
                    }}
                    text={name || '流程项'}
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
                      title="点击添加审批人"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (isFunction(onAddApprover)) {
                          onAddApprover(dataSource);
                        }
                      }}
                    >
                      {iconBuilder.plusCircle()}
                    </button>

                    <button
                      style={{
                        padding: '1px 4px',
                        fontSize: '12px',
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        borderColor: '#fff',
                      }}
                      title="点击编辑节点"
                      onClick={(event) => {
                        event.stopPropagation();

                        if (isFunction(onChange)) {
                          onChange(dataSource);
                        }
                      }}
                    >
                      {iconBuilder.edit()}
                    </button>

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
                  <Space
                    direction="vertical"
                    style={{ width: '100%' }}
                    split={<Divider style={{ margin: '0' }} />}
                  >
                    {hasApprover &&
                      listApprover.map((o, index) => {
                        const userRealName = getValueByKey({
                          data: o,
                          key: personnelNameKey,
                          defaultValue: '',
                        });

                        return (
                          <FlexBox
                            key={`user_${index}`}
                            flexAuto="left"
                            left={
                              <ColorText
                                textPrefix={personnelNameLabel}
                                text={userRealName || '未设置'}
                                separatorStyle={{
                                  paddingRight: '3px',
                                }}
                                textPrefixStyle={{
                                  color: '#333',
                                }}
                                color={
                                  checkStringIsNullOrWhiteSpace(userRealName)
                                    ? '#ccc'
                                    : ''
                                }
                              />
                            }
                            right={
                              canEdit ? (
                                <Space
                                  split={
                                    <Divider
                                      type="vertical"
                                      style={{
                                        marginLeft: '1px',
                                        marginRight: '1px',
                                      }}
                                    />
                                  }
                                >
                                  <Button
                                    size="small"
                                    style={{
                                      padding: '0.5px 5px',
                                      fontSize: '12px',
                                    }}
                                    title="移除审批人"
                                    onClick={(event) => {
                                      event.stopPropagation();

                                      if (isFunction(onRemoveApprover)) {
                                        onRemoveApprover(o);
                                      }
                                    }}
                                  >
                                    {iconBuilder.delete()}
                                  </Button>
                                </Space>
                              ) : null
                            }
                          />
                        );
                      })}

                    {hasApprover ? null : (
                      <div>
                        未设置审批人
                        {canEdit ? '，点击 ' : ''}
                        {canEdit ? iconBuilder.plusCircle() : ''}
                        {canEdit ? ' 按钮添加' : ''}。
                      </div>
                    )}
                  </Space>
                </div>
              </div>
            </div>
          )}
        </div>

        <Handle
          type="target"
          id="top"
          position={Position.Top}
          style={{ left: '45%', background: targetPointColor }}
          isConnectable={true}
        />

        <Handle
          type="source"
          id="top"
          position={Position.Top}
          style={{ left: '55%', background: sourcePointColor }}
          isConnectable={true}
        />

        <Handle
          type="target"
          position={Position.Left}
          id="left"
          style={{ top: '33%', background: targetPointColor }}
          isConnectable={true}
        />

        <Handle
          type="source"
          position={Position.Left}
          id="left"
          style={{ top: '66%', background: sourcePointColor }}
          isConnectable={true}
        />

        <Handle
          type="target"
          position={Position.Right}
          id="right"
          style={{ top: '66%', background: targetPointColor }}
          isConnectable={true}
        />

        <Handle
          type="source"
          position={Position.Right}
          id="right"
          style={{ top: '33%', background: sourcePointColor }}
          isConnectable={true}
        />

        <Handle
          type="target"
          id="bottom"
          position={Position.Bottom}
          style={{ left: '55%', background: targetPointColor }}
          isConnectable={true}
        />

        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          style={{ left: '45%', background: sourcePointColor }}
          isConnectable={true}
        />
      </>
    );
  }
}

IntermediateNode.defaultProps = {
  color: 'black',
};

export { IntermediateNode };
