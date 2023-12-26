import { Button, Divider, Space } from 'antd';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
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

import {
  carbonCopyHeaderStyle,
  styleClassPrefix,
  targetPointColor,
} from '../constant';

class CarbonCopyNode extends PureComponent {
  render() {
    const { data, size } = this.props;

    const {
      data: dataSource,
      isNext,
      canEdit,
      nodeNameKey,
      // listInLineKey,
      listApproverKey,
      personnelNameKey,
      personnelNameLabel,
      onAddApprover,
      onChange,
      onRemove,
      onRemoveApprover,
    } = {
      canEdit: false,
      multibranch: false,
      nodeNameKey: 'nodeNameKey',
      listInLineKey: 'listInLine',
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

    const listApprover = getValueByKey({
      data: dataSource,
      key: listApproverKey,
      convert: convertCollection.array,
    });

    const hasApprover = listApprover.length > 0;

    // const listInLine = getValueByKey({
    //   data: dataSource,
    //   key: listInLineKey,
    //   convert: convertCollection.array,
    // });

    // const inLineCount = listInLine.length;

    return (
      <>
        <div
          className={classNames(
            `${styleClassPrefix + '-node'}`,
            isNext ? `${styleClassPrefix + '-node-next'}` : null,
          )}
        >
          <div
            className={`${styleClassPrefix + '-node-header'}`}
            style={carbonCopyHeaderStyle}
          >
            <FlexBox
              flexAuto="left"
              miniAuto
              left={
                <VerticalBox>
                  <ColorText
                    block
                    title
                    style={{ height: '22px' }}
                    textStyle={{
                      width: '100%',
                      height: '22px',
                      lineHeight: '22px',
                      textOverflow: 'ellipsis',
                    }}
                    color={'#333'}
                    separator=" "
                    textPrefixStyle={{
                      marginRight: '6px',
                    }}
                    text={name || '抄送项'}
                  />
                </VerticalBox>
              }
              leftStyle={{ paddingRight: '5px' }}
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
                      title="点击添加抄送人"
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
            <div className={`${styleClassPrefix + '-node-content'}`}>
              <div className={`${styleClassPrefix + '-node-content-inner'}`}>
                <div className={`${styleClassPrefix + '-node-content-info'}`}>
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
                                    title="移除抄送人"
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
                        未设置抄送人
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
          style={{ left: '50%', background: targetPointColor }}
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
          id="bottom"
          position={Position.Bottom}
          style={{ left: '50%', background: targetPointColor }}
          isConnectable={true}
        />
      </>
    );
  }
}

CarbonCopyNode.defaultProps = {
  color: 'black',
  data: {},
  size: '',
};

export { CarbonCopyNode };
