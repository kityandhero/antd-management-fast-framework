import { Affix, Card, Col, Divider, Row, Space } from 'antd';
import React, { Fragment } from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isBoolean,
  isEmptyArray,
  isEmptyObject,
  isNull,
  isObject,
  logObject,
  toString,
} from 'easy-soft-utility';

import {
  cardConfig,
  contentConfig,
  emptyLogic,
  extraBuildType,
} from 'antd-management-fast-common';
import {
  buildButton,
  buildButtonGroup,
  buildDropdown,
  buildDropdownButton,
  buildDropdownEllipsis,
  buildFlexSelect,
  ColorText,
  FadeBox,
  FlexText,
  HelpBox,
  iconBuilder,
  IconInfo,
  ImageBox,
  PageExtra,
  QueueBox,
} from 'antd-management-fast-component';

import { buildExtraButton } from '../../../components/FunctionComponent';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { InternalSwitchoverFlow } from '../InternalSwitchoverFlow';
import { ReloadActionButton } from '../ReloadActionButton';

import styles from './index.less';

const { HelpContent, CardCollectionItemContent } = PageExtra;

const primaryCallName = 'Common::InternalBuild';

function adjustListData(listData) {
  if (!isArray(listData)) {
    return [];
  }

  const list = [];

  let listTemplate = [];

  for (const value of Object.values(listData)) {
    if (isNull(value) || isEmptyObject(value)) {
      list.push([...listTemplate]);

      listTemplate = [];

      continue;
    }

    const { fullLine } = {
      fullLine: true,
      ...value,
    };

    if (fullLine) {
      if (listTemplate.length > 0) {
        list.push([...listTemplate]);

        listTemplate = [];
      }

      list.push({
        ...value,
        fullLine,
      });
    } else {
      listTemplate.push({
        ...value,
        fullLine,
      });
    }
  }

  if (listTemplate.length > 0) {
    list.push([...listTemplate]);

    listTemplate = [];
  }

  return list;
}

class InternalBuild extends InternalSwitchoverFlow {
  buildCardCollectionArea = (config = null) => {
    this.logCallTrack(
      {
        parameter: config,
      },
      primaryCallName,
      'buildCardCollectionArea',
    );

    if (config == null) {
      return null;
    }

    const configData = {
      mode: this.contentWrapperType,
      justify: 'start',
      align: 'top',
      list: [],
      ...config,
    };

    const {
      mode,
      justify: justifyGeneral,
      align: alignGeneral,
      list,
    } = configData;

    const listData = adjustListData(list);

    const helpConfig =
      this.contentWrapperType === contentConfig.wrapperType.page
        ? null
        : this.establishHelpConfig();

    const backgroundColorStyle = checkInCollection(
      [contentConfig.wrapperType.page, contentConfig.wrapperType.drawer],
      this.contentWrapperType,
    )
      ? {
          backgroundColor: '#f0f2f5',
        }
      : {};

    const inner =
      listData.length > 1 ? (
        <Space style={{ width: '100%' }} direction="vertical" size={16}>
          {listData.map((item, index) => {
            if (React.isValidElement(item)) {
              return (
                <Fragment key={`item_component_${index}`}>{item}</Fragment>
              );
            }

            if (isArray(item) && !isEmptyArray(item)) {
              return (
                <Row key={`flex_row_${index}`} gutter={[16, 16]} wrap={false}>
                  {item.map((one, n) => {
                    const { width: widthOne } = { width: '', ...one };

                    const oneProperties = checkStringIsNullOrWhiteSpace(
                      widthOne,
                    )
                      ? { flex: 'auto' }
                      : { flex: toString(widthOne) };

                    return (
                      <Col
                        key={`flex_row_${index}_col_${n}`}
                        {...oneProperties}
                      >
                        {this.buildCardCollectionItem({
                          mode,
                          justify: justifyGeneral,
                          align: alignGeneral,
                          config: { bordered: false, ...one },
                          key: `flex_row_${index}_col_${n}_inner`,
                          style: {
                            height: '100%',
                          },
                        })}
                      </Col>
                    );
                  })}
                </Row>
              );
            }

            return this.buildCardCollectionItem({
              mode,
              justify: justifyGeneral,
              align: alignGeneral,
              config: { bordered: false, ...item },
              key: index,
            });
          })}

          {helpConfig == null ? null : (
            <HelpContent
              wrapperType={this.contentWrapperType}
              {...this.establishHelpConfig()}
            />
          )}
        </Space>
      ) : (
        <>
          {listData.map((item, index) => {
            if (React.isValidElement(item)) {
              return (
                <Fragment key={`item_component_${index}`}>{item}</Fragment>
              );
            }

            return this.buildCardCollectionItem({
              mode,
              justify: justifyGeneral,
              align: alignGeneral,
              config: { bordered: false, ...item },
              key: index,
            });
          })}

          {helpConfig == null ? null : (
            <HelpContent
              wrapperType={this.contentWrapperType}
              {...this.establishHelpConfig()}
            />
          )}
        </>
      );

    return (
      <div
        style={{
          ...backgroundColorStyle,
        }}
      >
        {inner}
      </div>
    );
  };

  buildCardCollectionItem = ({
    config: cardItemConfig,
    key: cardItemKey,
    mode = cardConfig.wrapperType.page,
    justify: justifyGeneral = 'start',
    align: alignGeneral = 'top',
    style: cardStyle = null,
  }) => {
    const key = `cardCollectionItem_key_${cardItemKey}`;

    if ((cardItemConfig || null) == null) {
      return null;
    }

    const {
      title,
      size,
      bordered,
      useAnimal,
      animalType,
      extra,
      hidden,
      cardType,
      cardBodyStyle,
      items: contentItems,
      otherComponent,
      formItemLayout,
      instruction,
      justify: justifyRow,
      align: alignRow,
    } = {
      title: '',
      size: 'default',
      bordered: false,
      useAnimal: false,
      animalType: cardConfig.animalType.none,
      extra: null,
      hidden: false,
      cardType: cardConfig.renderType.normal,
      cardBodyStyle: {},
      items: [],
      otherComponent: null,
      formItemLayout: null,
      instruction: null,
      justify: 'start',
      align: 'top',
      ...cardItemConfig,
    };

    if (hidden || false) {
      return null;
    }

    const {
      image,
      imageCircle,
      icon,
      hideIcon,
      hideIconWhenShowImage,
      text,
      textEllipsisMaxWidth,
      subText,
      addonBefore: titleAddonBefore,
      addonAfter: titleAddonAfter,
    } = {
      image: '',
      imageCircle: true,
      icon: null,
      hideIcon: false,
      hideIconWhenShowImage: true,
      text: '',
      textEllipsisMaxWidth: 0,
      subText: '',
      addonBefore: null,
      addonAfter: null,
      ...title,
    };

    const {
      affix,
      split,
      list: extraItemList,
    } = {
      affix: false,
      split: false,
      list: [],
      ...extra,
    };

    const imageVisible = !checkStringIsNullOrWhiteSpace(image);

    const iconAdjust = hideIcon
      ? null
      : imageVisible
        ? hideIconWhenShowImage
          ? null
          : icon
        : icon || iconBuilder.read();

    const extraListData = [];

    if (isArray(extraItemList)) {
      for (const [ei, eo] of extraItemList.entries()) {
        if ((eo || null) != null) {
          extraListData.push(eo);

          if (ei !== extraItemList.length - 1) {
            extraListData.push('');
          }
        }
      }
    }

    const extraItems = this.buildByExtraBuildType({
      keyPrefix: `formContent_key_${cardItemKey}_extra`,
      configList: extraListData,
    });

    const hasExtraItems = extraItems.length > 0;

    let cardTypeBodyStyle = {};

    if (cardType === cardConfig.renderType.help) {
      cardTypeBodyStyle = {
        paddingTop: '12px',
        paddingBottom: '12px',
      };
    }

    const cardContent = this.buildCardCollectionItemContent({
      mode,
      justify: justifyRow || justifyGeneral,
      align: alignRow || alignGeneral,
      items: isArray(contentItems)
        ? contentItems.map((o) => {
            return {
              ...o,
              formItemLayout: formItemLayout || null,
            };
          })
        : [],
      index: cardItemKey,
    });

    const helpArea =
      isObject(instruction ?? false) || isArray(instruction ?? false) ? (
        isArray(instruction ?? false) ? (
          instruction.map((o, indexHelpBox) => {
            if ((o ?? null) == null) {
              return null;
            }

            const keyHelpBox = `${key}_HelpBox_$${indexHelpBox}`;

            return <HelpBox key={keyHelpBox} {...o} />;
          })
        ) : (
          <HelpBox {...instruction} />
        )
      ) : null;

    const imageArea = imageVisible ? (
      <div
        style={{
          position: 'absolute',
          width: '32px',
          left: '22px',
          top: '15px',
        }}
      >
        <ImageBox
          src={image}
          circle={imageCircle}
          lazyLoad
          errorOverlayVisible
          showErrorOverlay
          loadingEffect
          preview
          previewSimpleMask
        />
      </div>
    ) : null;

    if (
      !hasExtraItems &&
      cardContent == null &&
      otherComponent == null &&
      helpArea == null &&
      imageArea == null
    ) {
      return null;
    }

    const card = (
      <Card
        title={
          cardItemKey === 0 &&
          mode !== cardConfig.wrapperType.page ? null : (text || '') === '' &&
            (subText || '') === '' ? null : (
            <>
              <FlexText
                icon={iconAdjust || null}
                text={text || ''}
                textEllipsisMaxWidth={textEllipsisMaxWidth}
                subText={subText || ''}
                addonBefore={
                  (titleAddonBefore || null) == null ? null : titleAddonBefore
                }
                addonAfter={
                  (titleAddonAfter || null) == null ? null : titleAddonAfter
                }
              />
            </>
          )
        }
        style={{
          // boxShadow: 'none',
          // borderRadius: 0,
          ...cardStyle,
          ...(imageVisible ? { position: 'relative' } : {}),
        }}
        headStyle={
          imageVisible
            ? {
                paddingLeft: '64px',
              }
            : {}
        }
        size={size || 'default'}
        bordered={bordered}
        extra={
          hasExtraItems ? (
            mode === cardConfig.wrapperType.page && affix ? (
              <Affix offsetTop={20}>
                <Space
                  split={
                    isBoolean(split) ? (
                      split ? (
                        <Divider type="vertical" />
                      ) : null
                    ) : (
                      split
                    )
                  }
                >
                  {extraItems}
                </Space>
              </Affix>
            ) : (
              <>
                <Space
                  split={
                    isBoolean(split) ? (
                      split ? (
                        <Divider type="vertical" />
                      ) : null
                    ) : (
                      split
                    )
                  }
                >
                  {extraItems}
                </Space>
              </>
            )
          ) : null
        }
        bodyStyle={
          mode === cardConfig.wrapperType.model
            ? {
                ...cardBodyStyle,
                ...cardTypeBodyStyle,
                paddingBottom: 0,
              }
            : {
                ...cardBodyStyle,
                ...cardTypeBodyStyle,
              }
        }
      >
        {cardContent == null &&
        otherComponent == null &&
        helpArea == null ? null : (
          <LoadingOverlay
            flag={[
              this.viewLoadingFlag,
              this.viewReloadingFlag,
              this.viewRefreshingFlag,
              this.viewProcessingFlag,
            ]}
          >
            {cardContent}
            {otherComponent || null}
            {helpArea}
          </LoadingOverlay>
        )}

        {imageArea}
      </Card>
    );

    return (
      <div key={key} className={styles.cardContainor} style={cardStyle}>
        {isBoolean(useAnimal) && animalType === cardConfig.animalType.fade ? (
          <FadeBox>{card}</FadeBox>
        ) : null}

        {isBoolean(useAnimal) && animalType === cardConfig.animalType.queue ? (
          <QueueBox>{card}</QueueBox>
        ) : null}

        {!isBoolean(useAnimal) ||
        (isBoolean(useAnimal) &&
          !checkInCollection(
            [cardConfig.animalType.fade, cardConfig.animalType.queue],
            animalType,
          ))
          ? card
          : null}
      </div>
    );
  };

  buildCardCollectionItemContent = ({
    mode,
    justify,
    align,
    gutter = 14,
    items: contentItems,
    index: contentIndex,
  }) => {
    if (!isArray(contentItems) || contentItems.length <= 0) {
      return null;
    }

    return (
      <CardCollectionItemContent
        wrapperType={mode}
        justify={justify}
        align={align}
        gutter={gutter}
        items={contentItems}
        index={contentIndex}
        pretreatmentImageUploadResponse={
          this.pretreatmentImageUploadRemoteResponse
        }
        pretreatmentFileBase64UploadResponse={
          this.pretreatmentFileBase64UploadRemoteResponse
        }
        pretreatmentVideoUploadResponse={
          this.pretreatmentVideoUploadRemoteResponse
        }
        pretreatmentFileUploadResponse={
          this.pretreatmentFileUploadRemoteResponse
        }
        pretreatmentAudioUploadResponse={
          this.pretreatmentAudioUploadRemoteResponse
        }
        saveButtonBuilder={this.renderPresetSaveButton}
        extraBuilder={this.buildByExtraBuildType}
      />
    );
  };

  buildByExtraBuildType = ({ keyPrefix = '', configList = [] }) => {
    const list = [];

    for (const [index, item] of (isArray(configList)
      ? configList
      : []
    ).entries()) {
      if ((item || null) != null) {
        const {
          hidden,
          buildType,
          component: componentSource,
        } = {
          hidden: false,
          buildType: null,
          icon: null,
          text: '',
          component: null,
          ...item,
        };

        if (!hidden) {
          const itemKey = `${keyPrefix}_${index}`;

          let itemAdjust = item;

          switch (buildType) {
            case extraBuildType.refresh: {
              itemAdjust = this.renderPresetRefreshButton(item);
              break;
            }

            case extraBuildType.save: {
              itemAdjust = this.renderPresetSaveButton(item);
              break;
            }

            case extraBuildType.generalButton: {
              itemAdjust = buildButton(item);
              break;
            }

            case extraBuildType.generalExtraButton: {
              itemAdjust = buildExtraButton({
                flag: [
                  this.viewLoadingFlag,
                  this.viewReloadingFlag,
                  this.viewRefreshingFlag,
                  this.viewProcessingFlag,
                ],
                ...item,
              });
              break;
            }

            case extraBuildType.flexSelect: {
              itemAdjust = buildFlexSelect(item);
              break;
            }

            case extraBuildType.button: {
              itemAdjust = buildButton(item);
              break;
            }

            case extraBuildType.dropdown: {
              itemAdjust = buildDropdown(item);
              break;
            }

            case extraBuildType.dropdownButton: {
              itemAdjust = buildDropdownButton(item);
              break;
            }

            case extraBuildType.dropdownEllipsis: {
              itemAdjust = buildDropdownEllipsis(item);
              break;
            }

            case extraBuildType.iconInfo: {
              itemAdjust = (
                <div style={{ padding: '0 8px' }}>
                  <IconInfo {...item} />
                </div>
              );
              break;
            }

            case extraBuildType.colorText: {
              itemAdjust = (
                <div style={{ padding: '0 8px' }}>
                  <ColorText {...item} />
                </div>
              );
              break;
            }

            case extraBuildType.divider: {
              itemAdjust = <Divider type="vertical" />;
              break;
            }

            case extraBuildType.component: {
              itemAdjust = componentSource || null;
              break;
            }

            default: {
              logObject({
                message: '未找到匹配的构建模式',
                buildType: extraBuildType.component,
                config: item,
              });

              itemAdjust = null;
              break;
            }
          }

          list.push(<Fragment key={itemKey}>{itemAdjust}</Fragment>);
        }
      }
    }

    return list;
  };

  buildExtraBackAction = () => {
    this.logCallTrack({}, primaryCallName, 'buildExtraBackAction', emptyLogic);

    return null;
  };

  buildExtraAction = () => {
    this.logCallTrack({}, primaryCallName, 'buildExtraAction');

    const { keyPrefix, list: configList } = {
      keyPrefix: '',
      list: [],
      ...this.establishExtraActionConfig(),
    };

    const keyPrefixAdjust = keyPrefix || 'extraActionItem';

    const that = this;

    const listAction = this.buildByExtraBuildType({
      keyPrefix: keyPrefixAdjust,
      configList,
    });

    const buttonGroupData = this.establishExtraActionGroupConfig();

    if ((buttonGroupData || null) != null) {
      const buttonGroup = buildButtonGroup(buttonGroupData);

      if ((buttonGroup || null) != null) {
        listAction.push(
          <Fragment key={`${keyPrefixAdjust}_buttonGroup`}>
            {buttonGroup}
          </Fragment>,
        );
      }
    }

    const ellipsisActionData = this.establishExtraActionEllipsisConfig();

    if ((ellipsisActionData || null) != null) {
      const dropdownEllipsis = buildDropdownEllipsis(ellipsisActionData);

      if ((dropdownEllipsis || null) != null) {
        listAction.push(
          <Fragment key={`${keyPrefixAdjust}_dropdownEllipsis`}>
            {dropdownEllipsis}
          </Fragment>,
        );
      }
    }

    const backAction = this.buildExtraBackAction();

    if ((backAction || null) != null) {
      listAction.push(
        <Fragment key={`${keyPrefixAdjust}_backAction`}>{backAction}</Fragment>,
      );
    }

    if (this.showReloadButton) {
      listAction.push(
        <Fragment key={`${keyPrefixAdjust}_reloadButton`}>
          <ReloadActionButton
            flag={[this.viewLoadingFlag, this.viewReloadingFlag]}
            onReload={() => {
              that.reloadData({});
            }}
          />
        </Fragment>,
      );
    }

    return (
      <Space
        split={
          !!this.showExtraActionDivider || false ? (
            <Divider type="vertical" />
          ) : null
        }
      >
        {listAction.map((o) => o)}
      </Space>
    );
  };

  buildPageHeaderSubTitle = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildPageHeaderSubTitle',
      emptyLogic,
    );

    return null;
  };
}

export { InternalBuild };
