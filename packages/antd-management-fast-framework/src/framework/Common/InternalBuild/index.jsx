import {
  Affix,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Layout,
  Row,
  Space,
  Spin,
  Tooltip,
} from 'antd';
import React, { Fragment } from 'react';

import {
  buildFieldDescription,
  buildTokenData,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  isArray,
  isBoolean,
  isFunction,
  isObject,
  isUndefined,
  logObject,
  refitCommonData,
  showSimpleErrorMessage,
  toDatetime,
} from 'easy-soft-utility';

import {
  cardConfig,
  contentConfig,
  copyToClipboard,
  defaultEmptyImage,
  extraBuildType,
  getTinymceApiKey,
  getTinymceImagesUploadUrl,
} from 'antd-management-fast-common';
import {
  AudioUpload,
  buildButton,
  buildButtonGroup,
  buildCustomSelect,
  buildDropdown,
  buildDropdownButton,
  buildDropdownEllipsis,
  buildFormInput,
  buildOptionItem,
  buildTree,
  buildTreeSelect,
  ColorText,
  CustomGrid,
  Editor,
  ElasticityButton,
  FadeBox,
  FileBase64Upload,
  FileUpload,
  FlexText,
  FormExtra,
  FunctionSupplement,
  HelpBox,
  HelpCard,
  HtmlBox,
  iconBuilder,
  IconInfo,
  ImageBox,
  ImageUpload,
  QueueBox,
  VideoUpload,
} from 'antd-management-fast-component';

import { InternalFlow } from '../InternalFlow';

import styles from './index.less';

const { Content, Sider } = Layout;
const { TinymceWrapper } = Editor;
const {
  SyntaxHighlighterItem,
  OnlyShowInputItem,
  TextAreaItem,
  InputNumberItem,
  ComponentItem,
  DatePickerItem,
  SelectItem,
  SwitchItem,
  TimePickerItem,
} = FormExtra;

const {
  Whether: { renderFormWhetherSelect },
} = FunctionSupplement;

class InternalBuild extends InternalFlow {
  buildToolBar = () => {
    const config = this.establishToolBarConfig();

    if ((config || null) == null) {
      return null;
    }

    const { stick, title, tools } = {
      stick: false,
      title: '工具栏',
      tools: [],
      ...config,
    };

    if (!isArray(tools)) {
      const text = '工具栏配置数据无效';

      showSimpleErrorMessage(text);

      logObject(config);

      return null;
    }

    const toolList = tools.map((o, index) => {
      return { ...o, key: `toolItem_${index}` };
    });

    const bar = (
      <div className={styles.cardContainor}>
        <Card
          title={
            <IconInfo icon={iconBuilder.tool()} text={title || '工具栏'} />
          }
          bordered={false}
          bodyStyle={{ padding: 0 }}
          extra={
            <Space split={<Divider type="vertical" />}>
              {toolList.map((o) => {
                const { hidden } = { hidden: false, ...o };

                if (hidden) {
                  return null;
                }

                return (
                  <Tooltip key={o.key} title={o.title || ''}>
                    {o.component}
                  </Tooltip>
                );
              })}
            </Space>
          }
        />
      </div>
    );

    if (isBoolean(stick) && stick) {
      return <Affix offsetTop={0}>{bar}</Affix>;
    }

    return bar;
  };

  buildToolBarWrapper = () => {
    const toolBar = this.buildToolBar();

    if ((toolBar || null) == null) {
      return null;
    }

    return toolBar;
  };

  buildHelp = () => {
    const wrapperTypeConfig = this.establishWrapperTypeConfig() || {
      mode: contentConfig.wrapperType.page,
    };

    const configData = {
      mode: contentConfig.wrapperType.page,
      ...wrapperTypeConfig,
    };
    const { mode } = configData;

    const config = this.establishHelpConfig();

    if ((config || null) == null) {
      return null;
    }

    const { title, showNumber, list } = {
      title: '操作帮助',
      showNumber: true,
      list: [],
      ...config,
    };

    if (!isArray(list)) {
      const text = '帮助条目数据无效';

      showSimpleErrorMessage(text);

      logObject(config);

      return null;
    }

    return (
      <HelpCard
        border={
          mode !== contentConfig.wrapperType.model &&
          mode !== contentConfig.wrapperType.drawer
        }
        compact={mode === contentConfig.wrapperType.model}
        helpBoxProps={{
          title: title || '操作帮助',
          showNumber: showNumber || false,
          list,
        }}
      />
    );
  };

  buildHelpWrapper = () => {
    const help = this.buildHelp();

    if ((help || null) == null) {
      return null;
    }

    return help;
  };

  buildCardCollectionArea = (config = null) => {
    if (config == null) {
      return null;
    }

    const formContentWrapperTypeConfig = {
      mode: cardConfig.wrapperType.page,
      ...this.establishWrapperTypeConfig(),
    };

    const configData = {
      mode: cardConfig.wrapperType.page,
      justify: 'start',
      align: 'top',
      ...formContentWrapperTypeConfig,
      list: [],
      ...config,
    };

    const {
      mode,
      justify: justifyGeneral,
      align: alignGeneral,
      list,
    } = configData;

    const listData = [];

    if (isArray(list)) {
      for (const [ci, co] of list.entries()) {
        listData.push(co);

        if (ci !== list.length - 1) {
          listData.push('');
        }
      }
    }

    return (
      <div
        style={{
          backgroundColor: '#f0f2f5',
        }}
      >
        <Space style={{ width: '100%' }} direction="vertical" size={24}>
          {listData.map((item, index) => {
            return this.buildCardCollectionItem({
              mode,
              justify: justifyGeneral,
              align: alignGeneral,
              config: { bordered: false, ...item },
              key: index,
            });
          })}
        </Space>
      </div>
    );
  };

  buildCardCollection = (config) => {
    const siderArea = this.renderPresetSiderArea();
    const contentArea = this.buildCardCollectionArea(config);

    const layoutSiderConfig = this.establishPageContentLayoutSiderConfig();
    let layoutConfig = this.establishPageContentLayoutConfig();

    const { position: siderPosition } = {
      position: 'left',
      ...layoutSiderConfig,
    };

    const siderConfig = {
      width: 300,
      style: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        overflowX: 'auto',
        overflowY: 'hidden',
        ...(siderPosition === 'left'
          ? { marginRight: '24px' }
          : { marginLeft: '24px' }),
      },
      ...layoutSiderConfig,
    };

    layoutConfig = {
      breakpoint: 'sm',
      style: {
        backgroundColor: '#f0f2f5',
        minHeight: 'auto',
      },
      ...layoutConfig,
    };

    const inner =
      siderArea == null ? (
        contentArea
      ) : (
        <Layout {...layoutConfig}>
          {siderPosition === 'left' ? (
            <Sider {...siderConfig}>{siderArea}</Sider>
          ) : null}

          <Content
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
            }}
          >
            {contentArea}
          </Content>

          {siderPosition === 'left' ? null : (
            <Sider {...siderConfig}>{siderArea}</Sider>
          )}
        </Layout>
      );

    const toolbar = this.buildToolBarWrapper();

    const help = this.buildHelpWrapper();

    return (
      <>
        <Space style={{ width: '100%' }} direction="vertical" size={24}>
          {toolbar}

          {inner}

          {help}
        </Space>
      </>
    );
  };

  buildCardCollectionItem = ({
    config: cardItemConfig,
    key: cardItemKey,
    mode = cardConfig.wrapperType.page,
    justify: justifyGeneral = 'start',
    align: alignGeneral = 'top',
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
      spinning,
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
          boxShadow: 'none',
          borderRadius: 0,
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
        <Spin spinning={spinning || false}>
          <>
            {this.buildCardCollectionItemContent({
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
            })}

            {otherComponent || null}

            {isObject(instruction ?? false) || isArray(instruction ?? false) ? (
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
            ) : null}
          </>
        </Spin>

        {imageVisible ? (
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
        ) : null}
      </Card>
    );

    return (
      <div key={key} className={styles.cardContainor}>
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
    gutter = 24,
    items: contentItems,
    index: contentIndex,
  }) => {
    return (
      <Row justify={justify} align={align} gutter={gutter || 24}>
        {isArray(contentItems)
          ? contentItems.map((contentItem, contentItemIndex) => {
              const contentItemKey = `formContent_key_${contentIndex}_content_${contentItemIndex}`;

              const {
                lg: lgValue,
                md,
                sm,
                xs,
                type,
                require,
                fieldData: fieldDataValue,
                hidden,
                canOperate,
                formItemLayout,
              } = {
                lg: 6,
                md: 12,
                sm: 24,
                xs: 24,
                require: false,
                type: '',
                fieldData: {
                  label: '',
                  name: '',
                  helper: '',
                },
                hidden: false,
                canOperate: true,
                formItemLayout: null,
                ...contentItem,
              };

              if (hidden) {
                return null;
              }

              const fieldData = {
                label: '',
                name: '',
                helper: '',
                ...fieldDataValue,
              };

              let lg =
                (lgValue || 6) < 12 && mode !== cardConfig.wrapperType.page
                  ? 12
                  : lgValue;

              lg = lg > 12 && mode !== cardConfig.wrapperType.page ? 24 : lg;
              lg = lg > 24 ? 24 : lg;

              if (type === cardConfig.contentItemType.placeholder) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  />
                );
              }

              if (type === cardConfig.contentItemType.divider) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  >
                    <Divider
                      {...{
                        style: {
                          margin: '4px 0',
                        },
                        ...contentItem.otherProps,
                      }}
                    >
                      {(contentItem.text || null) == null
                        ? null
                        : contentItem.text}
                    </Divider>
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.customGrid) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  >
                    <CustomGrid
                      list={isArray(contentItem.list) ? contentItem.list : []}
                      config={{
                        bordered: true,
                        column: 3,
                        emptyStyle: {
                          color: '#cccccc',
                        },
                        emptyValue: '暂无',
                        labelStyle: {
                          width: '100px',
                        },
                        ...contentItem.props,
                      }}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.tree) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  >
                    {buildTree(contentItem)}
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.tinymce) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  >
                    <TinymceWrapper
                      apiKey={
                        checkStringIsNullOrWhiteSpace(contentItem.apiKey || '')
                          ? getTinymceApiKey()
                          : contentItem.apiKey
                      }
                      content={contentItem.html || ''}
                      afterChange={contentItem.afterChange}
                      initConfig={contentItem.initConfig || null}
                      imagesUploadUrl={
                        checkStringIsNullOrWhiteSpace(
                          contentItem.imagesUploadUrl || '',
                        )
                          ? getTinymceImagesUploadUrl()
                          : contentItem.imagesUploadUrl
                      }
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.html) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  >
                    <HtmlBox
                      useEmpty={
                        (contentItem.useEmpty || null) == null
                          ? true
                          : contentItem.useEmpty || false
                      }
                      html={contentItem.html || ''}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.imageUpload) {
                const uploadProperties = {
                  icon: contentItem.icon || null,
                  title: contentItem.title || '',
                  helper: contentItem.helper || '',
                  image: contentItem.image || '',
                  action: contentItem.action || '',
                  tokenSet: buildTokenData(),
                  multiple: contentItem.multiple || false,
                  fileList: contentItem.fileList || [],
                  showUploadList: contentItem.showUploadList || false,
                  listType: contentItem.listType || 'picture-card',
                  disabled: contentItem.disabled || false,
                  ...contentItem.uploadProps,
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    <ImageUpload
                      {...uploadProperties}
                      pretreatmentRemoteResponse={
                        this.pretreatmentImageUploadRemoteResponse
                      }
                      afterUploadSuccess={(image) => {
                        if (isFunction(contentItem.afterUploadSuccess)) {
                          contentItem.afterUploadSuccess(image);
                        }
                      }}
                      onItemChange={contentItem.onItemChange || null}
                      onItemRemove={contentItem.onItemRemove || null}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.imageShow) {
                const imageBoxProperties = {
                  loadingEffect: true,
                  errorOverlayVisible: true,
                  showErrorIcon: false,
                  alt: '',
                  ...contentItem.imageBoxProps,
                };

                const imageBoxContainorStyle = {
                  width: '100px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  padding: '8px',
                  ...contentItem.imageBoxContainorStyle,
                };

                const imageBox = (
                  <ImageBox
                    src={contentItem.image || defaultEmptyImage}
                    preview={
                      !checkStringIsNullOrWhiteSpace(contentItem.image || '')
                    }
                    {...imageBoxProperties}
                  />
                );

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    <div style={imageBoxContainorStyle}>{imageBox}</div>
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.imageListShow) {
                let imageBoxListContainorStyle = null;

                const imageBoxProperties = {
                  loadingEffect: true,
                  errorOverlayVisible: true,
                  showErrorIcon: false,
                  alt: '',
                  ...contentItem.imageBoxProps,
                };

                if ((contentItem.imageBoxListContainorStyle || null) != null) {
                  imageBoxListContainorStyle =
                    contentItem.imageBoxListContainorStyle;
                }

                const imageBoxContainorStyle = {
                  width: '100px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  padding: '8px',
                  ...contentItem.imageBoxContainorStyle,
                };

                const imageItemShowList = [];

                const ignoreEmpty = contentItem.ignoreEmpty || false;

                for (const [imageIndex, imageOne] of (isArray(
                  contentItem.imageList,
                )
                  ? contentItem.imageList
                  : []
                ).entries()) {
                  const imageKey = `contentItem_${contentIndex}_imageList_item_${imageIndex}`;

                  if (ignoreEmpty) {
                    if (!checkStringIsNullOrWhiteSpace(imageOne)) {
                      imageItemShowList.push({
                        key: imageKey,
                        imageBoxContainorStyle,
                        component: (
                          <ImageBox
                            src={imageOne || defaultEmptyImage}
                            preview={
                              !checkStringIsNullOrWhiteSpace(imageOne || '')
                            }
                            {...imageBoxProperties}
                          />
                        ),
                      });
                    }
                  } else {
                    imageItemShowList.push({
                      key: imageKey,
                      imageBoxContainorStyle,
                      component: (
                        <ImageBox
                          src={imageOne || defaultEmptyImage}
                          preview={
                            !checkStringIsNullOrWhiteSpace(imageOne || '')
                          }
                          {...imageBoxProperties}
                        />
                      ),
                    });
                  }
                }

                const imageListContainor = (
                  <Space>
                    {imageItemShowList.length <= 0 ? (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    ) : (
                      imageItemShowList.map((o) => {
                        return (
                          <div key={o.key} style={o.imageBoxContainorStyle}>
                            {o.component}
                          </div>
                        );
                      })
                    )}
                  </Space>
                );

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    {imageBoxListContainorStyle == null ? (
                      imageListContainor
                    ) : (
                      <div style={imageBoxListContainorStyle}>
                        {imageListContainor}
                      </div>
                    )}
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.treeSelect) {
                const {
                  value: treeSelectValue,
                  onChangeCallback: onTreeSelectChangeCallback,
                  otherProps: otherTreeSelectProperties,
                  listData: treeSelectListData,
                  dataConvert: treeSelectDataConvertor,
                } = {
                  value: contentItem.value || '',
                  fileBase64: contentItem.fileBase64 || '',
                  onChangeCallback: contentItem.onChangeCallback || null,
                  otherProps: {
                    ...contentItem.otherProps,
                  },
                  listData: contentItem.listData || [],
                  dataConvert: contentItem.dataConvert || null,
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    <ComponentItem
                      label={fieldData.label}
                      innerComponent={buildTreeSelect({
                        value: treeSelectValue || null,
                        placeholder:
                          buildFieldDescription(fieldData.label, '选择') ||
                          '请选择',
                        onChangeCallback: onTreeSelectChangeCallback,
                        otherProps: otherTreeSelectProperties,
                        listData: treeSelectListData,
                        dataConvert: treeSelectDataConvertor,
                      })}
                      helper={fieldData.helper}
                      formItemLayout={formItemLayout}
                      requiredForShow={require}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.fileBase64Upload) {
                const uploadProperties = {
                  ...contentItem.uploadProps,

                  fileBase64: contentItem.fileBase64 || '',
                  action: contentItem.action || '',
                  tokenSet: buildTokenData(),
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    <ComponentItem
                      label={fieldData.label}
                      innerComponent={
                        <FileBase64Upload
                          {...uploadProperties}
                          pretreatmentRemoteResponse={
                            this.pretreatmentFileBase64UploadRemoteResponse
                          }
                          afterUploadSuccess={(fileBase64) => {
                            if (isFunction(contentItem.afterUploadSuccess)) {
                              contentItem.afterUploadSuccess(fileBase64);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      formItemLayout={null}
                      requiredForShow={require}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.videoUpload) {
                const uploadProperties = {
                  ...contentItem.uploadProps,

                  video: contentItem.video || '',
                  showPreview: contentItem.showPreview || false,
                  action: contentItem.action || '',
                  tokenSet: buildTokenData(),
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    <ComponentItem
                      label={fieldData.label}
                      innerComponent={
                        <VideoUpload
                          {...uploadProperties}
                          pretreatmentRemoteResponse={
                            this.pretreatmentVideoUploadRemoteResponse
                          }
                          afterChangeSuccess={(video) => {
                            if (isFunction(contentItem.afterChangeSuccess)) {
                              contentItem.afterChangeSuccess(video);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      formItemLayout={formItemLayout}
                      requiredForShow={require}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.fileUpload) {
                const uploadProperties = {
                  ...contentItem.uploadProps,

                  file: contentItem.file || '',
                  action: contentItem.action || '',
                  tokenSet: buildTokenData(),
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    <ComponentItem
                      label={fieldData.label}
                      innerComponent={
                        <FileUpload
                          {...uploadProperties}
                          pretreatmentRemoteResponse={
                            this.pretreatmentFileUploadRemoteResponse
                          }
                          afterChangeSuccess={(file) => {
                            if (isFunction(contentItem.afterChangeSuccess)) {
                              contentItem.afterChangeSuccess(file);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      formItemLayout={formItemLayout}
                      requiredForShow={require}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.audioUpload) {
                const uploadProperties = {
                  ...contentItem.uploadProps,

                  audio: contentItem.audio || '',
                  showPreview: contentItem.showPreview || false,
                  action: contentItem.action || '',
                  tokenSet: buildTokenData(),
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    <ComponentItem
                      label={fieldData.label}
                      innerComponent={
                        <AudioUpload
                          {...uploadProperties}
                          pretreatmentRemoteResponse={
                            this.pretreatmentAudioUploadRemoteResponse
                          }
                          afterChangeSuccess={(audio) => {
                            if (isFunction(contentItem.afterChangeSuccess)) {
                              contentItem.afterChangeSuccess(audio);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      formItemLayout={formItemLayout}
                      requiredForShow={require}
                    />
                  </Col>
                );
              }

              return (
                <Col key={contentItemKey} lg={lg || 6} md={md} sm={sm} xs={xs}>
                  {type === cardConfig.contentItemType.text
                    ? this.renderPresetFormText(
                        fieldData.label,
                        contentItem.value || '',
                        fieldData.helper,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.input
                    ? buildFormInput({
                        label: fieldData.label,
                        name: fieldData.name,
                        required: require,
                        helper: fieldData.helper,
                        icon: contentItem.icon || iconBuilder.form(),
                        inputProps: { ...contentItem.otherProps },
                        canOperate: canOperate,
                        formItemLayout: formItemLayout,
                        reminderPrefix: '输入',
                        hidden: false,
                      })
                    : null}

                  {type === cardConfig.contentItemType.password
                    ? this.renderPresetFormPassword(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        contentItem.icon || iconBuilder.form(),
                        { ...contentItem.otherProps },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.inputNumber ? (
                    <InputNumberItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      icon={contentItem.icon || iconBuilder.form()}
                      inputNumberProps={{ ...contentItem.otherProps }}
                      canOperate={canOperate}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.switch ? (
                    <SwitchItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      datePickerProps={{ ...contentItem.otherProps }}
                      canOperate={canOperate}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.flexText ? (
                    <FlexText
                      {...{
                        style: {
                          margin: '5px 0',
                        },
                        ...contentItem.flexTextProps,
                      }}
                    />
                  ) : null}

                  {type ===
                  cardConfig.contentItemType.onlyShowTextByFlexText ? (
                    <FlexText
                      style={{
                        margin: '5px 0',
                      }}
                      icon={null}
                      textPrefix={fieldData.label || ''}
                      text={contentItem.value || ''}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.datePicker ? (
                    <DatePickerItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      datePickerProps={{ ...contentItem.otherProps }}
                      canOperate={canOperate}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.timePicker ? (
                    <TimePickerItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      datePickerProps={{ ...contentItem.otherProps }}
                      canOperate={canOperate}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.textarea ? (
                    <TextAreaItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      datePickerProps={{
                        autoSize: { minRows: 3, maxRows: 5 },
                        ...contentItem.otherProps,
                      }}
                      canOperate={canOperate}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.onlyShowTextarea
                    ? this.renderPresetFormOnlyShowTextarea(
                        fieldData.label,
                        contentItem.value,
                        fieldData.helper || '',
                        {
                          autoSize: { minRows: 3, maxRows: 5 },
                          ...contentItem.otherProps,

                          disabled: true,
                          placeholder: `暂无${fieldData.label}信息`,
                        },
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.onlyShowInput ? (
                    <OnlyShowInputItem
                      label={fieldData.label}
                      value={contentItem.value}
                      helper={fieldData.helper || ''}
                      icon={contentItem.icon || iconBuilder.form()}
                      inputProps={{
                        ...contentItem.otherProps,
                        disabled: true,
                        placeholder: `暂无${fieldData.label}信息`,
                        ...(contentItem.canCopy || false
                          ? {
                              addonAfter: (
                                <ElasticityButton
                                  style={{
                                    border: '0px solid #d9d9d9',
                                    backgroundColor: '#fafafa',
                                    height: '30px',
                                  }}
                                  // icon={null}
                                  showIcon={false}
                                  disabled={checkStringIsNullOrWhiteSpace(
                                    contentItem.value || '',
                                  )}
                                  text="点击复制"
                                  handleClick={() => {
                                    copyToClipboard(contentItem.value || '');
                                  }}
                                />
                              ),
                            }
                          : {}),
                      }}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.onlyShowInputDatetime ? (
                    <OnlyShowInputItem
                      label={fieldData.label}
                      value={formatDatetime({
                        data: toDatetime(contentItem.value),
                        format: datetimeFormat.yearMonthDayHourMinute,
                      })}
                      helper={fieldData.helper || ''}
                      icon={contentItem.icon || iconBuilder.form()}
                      inputProps={{
                        ...contentItem.otherProps,

                        disabled: true,
                        placeholder: `暂无${fieldData.label}信息`,
                      }}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.select ? (
                    <SelectItem
                      label={fieldData.label}
                      name={fieldData.name}
                      helper={fieldData.helper}
                      renderItemFunction={() => {
                        return buildOptionItem({
                          list: refitCommonData(
                            isFunction(contentItem.pretreatmentData)
                              ? contentItem.pretreatmentData(
                                  isArray(contentItem.listData)
                                    ? contentItem.listData
                                    : [],
                                )
                              : isArray(contentItem.listData)
                              ? contentItem.listData
                              : [],
                          ),
                        });
                      }}
                      onChangeCallback={
                        isFunction(contentItem.onChangeCallback)
                          ? contentItem.onChangeCallback
                          : null
                      }
                      required={true}
                      formItemLayout={formItemLayout}
                      otherProps={{ ...contentItem.otherProps }}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.whetherSelect
                    ? renderFormWhetherSelect({
                        label: fieldData.label,
                        name: fieldData.name,
                        helper: fieldData.helper,
                        onChangeCallback: contentItem.onChangeCallback,
                        formItemLayout,
                        required: true,
                        otherProps: {
                          ...contentItem.otherProps,
                        },
                      })
                    : null}

                  {type === cardConfig.contentItemType.customSelect
                    ? contentItem.component
                    : null}

                  {type === cardConfig.contentItemType.flexSelect
                    ? buildCustomSelect(contentItem)
                    : null}

                  {type === cardConfig.contentItemType.radio ? (
                    <SelectItem
                      label={fieldData.label}
                      name={fieldData.name}
                      helper={fieldData.helper}
                      renderItemFunction={() => {
                        return this.renderPresetFormRadioCore(
                          refitCommonData(
                            isArray(contentItem.listData)
                              ? contentItem.listData
                              : [],
                          ),
                        );
                      }}
                      onChangeCallback={
                        isFunction(contentItem.onChangeCallback)
                          ? contentItem.onChangeCallback
                          : null
                      }
                      required={true}
                      formItemLayout={formItemLayout}
                      otherProps={{ ...contentItem.otherProps }}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.whetherRadio
                    ? this.renderFormWhetherRadio(
                        fieldData.label,
                        fieldData.name,
                        fieldData.helper,
                        contentItem.onChangeCallback,
                        formItemLayout,
                        true,
                        { ...contentItem.otherProps },
                      )
                    : null}

                  {type === cardConfig.contentItemType.customRadio
                    ? contentItem.component
                    : null}

                  {type === cardConfig.contentItemType.onlyShowText
                    ? this.renderPresetFormOnlyShowText(
                        fieldData.label,
                        contentItem.value,
                        (
                          isUndefined(contentItem.showHelper)
                            ? false
                            : contentItem.showHelper || false
                        )
                          ? fieldData.helper || ''
                          : '',
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.innerComponent ? (
                    <ComponentItem
                      label={fieldData.label}
                      innerComponent={contentItem.component}
                      helper={fieldData.helper}
                      formItemLayout={formItemLayout}
                      requiredForShow={require}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.save
                    ? this.renderPresetFormActionItem(
                        this.renderPresetSaveButton(contentItem.config || {}),
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.button
                    ? this.renderPresetFormButton(
                        contentItem.config || {},
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.actionList ? (
                    <Space
                      split={
                        isBoolean(contentItem.split || false) ? (
                          contentItem.split || false ? (
                            <Divider type="vertical" />
                          ) : null
                        ) : (
                          contentItem.split
                        )
                      }
                    >
                      {this.buildByExtraBuildType({
                        keyPrefix: `form_card_${contentIndex}_action_key`,
                        configList: contentItem.config || [],
                      })}
                    </Space>
                  ) : null}

                  {type === cardConfig.contentItemType.component
                    ? contentItem.component || null
                    : null}

                  {type === cardConfig.contentItemType.jsonView
                    ? this.renderPresetJsonView(contentItem.value)
                    : null}

                  {type === cardConfig.contentItemType.syntaxHighlighterView ? (
                    <SyntaxHighlighterItem
                      language={contentItem.language}
                      label={fieldData.label}
                      value={contentItem.value}
                      helper={fieldData.helper}
                      formItemLayout={formItemLayout}
                      otherProps={{ ...contentItem.otherProps }}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.nowTime
                    ? this.renderPresetFormNowTimeField({ formItemLayout })
                    : null}
                </Col>
              );
            })
          : null}
      </Row>
    );
  };

  buildByExtraBuildType = ({ keyPrefix = '', configList }) => {
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

            case cardConfig.extraBuildType.generalButton: {
              itemAdjust = buildButton(item);
              break;
            }

            case extraBuildType.flexSelect: {
              itemAdjust = buildCustomSelect(item);
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

  buildExtraBackAction = () => null;

  buildExtraAction = () => {
    const { dataLoading, reloading, refreshing, showReloadButton } = this.state;

    const { keyPrefix, list: configList } = {
      keyPrefix: '',
      list: [],
      ...this.establishExtraActionConfig(),
    };

    const keyPrefixAdjust = keyPrefix || 'extraActionItem';

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
        <Fragment key={`${keyPrefixAdjust}_dropdownEllipsis`}>
          {backAction}
        </Fragment>,
      );
    }

    if (showReloadButton) {
      listAction.push(
        <Fragment key={`${keyPrefixAdjust}_dropdownEllipsis`}>
          <Tooltip placement="top" title="刷新">
            <Button
              disabled={dataLoading || reloading || refreshing}
              type="dashed"
              onClick={() => {
                this.reloadData();
              }}
            >
              {reloading || refreshing
                ? iconBuilder.loading()
                : iconBuilder.reload()}
            </Button>
          </Tooltip>
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
}

export { InternalBuild };
