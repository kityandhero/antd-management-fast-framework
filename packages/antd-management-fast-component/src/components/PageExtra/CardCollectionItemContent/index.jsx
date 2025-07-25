import { Col, Divider, Empty, Row, Space } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildTokenData,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  isArray,
  isBoolean,
  isFunction,
  toBoolean,
  toDatetime,
} from 'easy-soft-utility';

import {
  adjustUploadUrl,
  cardConfig,
  contentConfig,
  copyToClipboard,
  defaultEmptyImage,
  getTinymceApiKey,
  getTinymceImagesUploadUrl,
  getTinymceLanguage,
  getTinymceScriptSource,
} from 'antd-management-fast-common';

import { AudioUpload } from '../../AudioUpload';
import { CustomGrid } from '../../CustomGrid';
import { TinymceWrapper } from '../../Editor/TinymceWrapper';
import { ElasticityButton } from '../../ElasticityButton';
import { ElasticityTree } from '../../ElasticityTree';
import { ElasticityTreeSelect } from '../../ElasticityTreeSelect';
import { FileBase64Upload } from '../../FileBase64Upload';
import { FileUpload } from '../../FileUpload';
import { FlexSelect } from '../../FlexSelect';
import { FlexText } from '../../FlexText';
import { FormExtra } from '../../FormExtra';
import { buildFormButton, buildFormInput } from '../../FunctionComponent';
import { FunctionSupplement } from '../../FunctionSupplement';
import { HtmlBox } from '../../HtmlBox';
import { iconBuilder } from '../../Icon';
import { ImageBox } from '../../ImageBox';
import { ImageUpload } from '../../ImageUpload';
import { JsonView } from '../../JsonView';
import { VideoUpload } from '../../VideoUpload';

const {
  Whether: { renderFormWhetherSelect, renderFormWhetherRadio },
} = FunctionSupplement;

const {
  ActionItem,
  ColorPickerItem,
  ComponentItem,
  DatePickerItem,
  InputNumberItem,
  NowTimeItem,
  OnlyShowInputItem,
  OnlyShowTextareaItem,
  PasswordItem,
  RadioItem,
  SelectItem,
  SwitchItem,
  SyntaxHighlighterItem,
  TextAreaItem,
  TextItem,
  TimePickerItem,
} = FormExtra;

class CardCollectionItemContent extends PureComponent {
  render() {
    const {
      wrapperType: mode,
      justify,
      align,
      gutter,
      items: contentItems,
      index: contentIndex,
      pretreatmentImageUploadResponse,
      pretreatmentFileBase64UploadResponse,
      pretreatmentVideoUploadResponse,
      pretreatmentFileUploadResponse,
      pretreatmentAudioUploadResponse,
      saveButtonBuilder,
      extraBuilder,
    } = this.props;

    if (!isArray(contentItems) || contentItems.length <= 0) {
      return null;
    }

    return (
      <Row justify={justify} align={align} gutter={gutter || 14}>
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
                        ...contentItem.innerProps,
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
                const {
                  onSelect: onSelectCallback,
                  innerProps: otherTreeSelectProperties,
                  listData: treeSelectListData,
                  dataConvert: treeSelectDataConvertor,
                } = {
                  onSelect: contentItem.onSelect || null,
                  innerProps: {
                    ...contentItem.innerProps,
                  },
                  listData: contentItem.listData || [],
                  dataConvert: contentItem.dataConvert || null,
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  >
                    <ElasticityTree
                      onSelect={onSelectCallback}
                      innerProps={otherTreeSelectProperties}
                      listData={[...treeSelectListData]}
                      dataConvert={treeSelectDataConvertor}
                    />
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
                      scriptSrc={
                        checkStringIsNullOrWhiteSpace(
                          contentItem.scriptSrc || '',
                        )
                          ? getTinymceScriptSource()
                          : contentItem.scriptSrc
                      }
                      language={
                        checkStringIsNullOrWhiteSpace(
                          contentItem.language || '',
                        )
                          ? getTinymceLanguage()
                          : contentItem.language
                      }
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

                uploadProperties.action = adjustUploadUrl(
                  uploadProperties.action,
                );

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
                        pretreatmentImageUploadResponse
                      }
                      afterUploadSuccess={(image, data) => {
                        if (isFunction(contentItem.afterUploadSuccess)) {
                          contentItem.afterUploadSuccess(image, data);
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
                  onChange: onTreeSelectChangeCallback,
                  innerProps: otherTreeSelectProperties,
                  listData: treeSelectListData,
                  dataConvert: treeSelectDataConvertor,
                } = {
                  value: contentItem.value || '',
                  onChange: contentItem.onChange || null,
                  innerProps: {
                    ...contentItem.innerProps,
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
                      innerComponent={
                        <ElasticityTreeSelect
                          value={treeSelectValue || null}
                          placeholder={
                            buildFieldDescription(fieldData.label, '选择') ||
                            '请选择'
                          }
                          onChange={onTreeSelectChangeCallback}
                          innerProps={otherTreeSelectProperties}
                          listData={treeSelectListData}
                          dataConvert={treeSelectDataConvertor}
                        />
                      }
                      helper={fieldData.helper}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
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

                uploadProperties.action = adjustUploadUrl(
                  uploadProperties.action,
                );

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
                            pretreatmentFileBase64UploadResponse
                          }
                          afterUploadSuccess={(fileBase64, data) => {
                            if (isFunction(contentItem.afterUploadSuccess)) {
                              contentItem.afterUploadSuccess(fileBase64, data);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
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

                uploadProperties.action = adjustUploadUrl(
                  uploadProperties.action,
                );

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
                            pretreatmentVideoUploadResponse
                          }
                          afterUploadSuccess={(video, data) => {
                            if (isFunction(contentItem.afterUploadSuccess)) {
                              contentItem.afterUploadSuccess(video, data);
                            }
                          }}
                          afterChangeSuccess={(video) => {
                            if (isFunction(contentItem.afterChangeSuccess)) {
                              contentItem.afterChangeSuccess(video);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
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

                uploadProperties.action = adjustUploadUrl(
                  uploadProperties.action,
                );

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
                            pretreatmentFileUploadResponse
                          }
                          afterUploadSuccess={(file, data) => {
                            if (isFunction(contentItem.afterUploadSuccess)) {
                              contentItem.afterUploadSuccess(file, data);
                            }
                          }}
                          afterChangeSuccess={(file) => {
                            if (isFunction(contentItem.afterChangeSuccess)) {
                              contentItem.afterChangeSuccess(file);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
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

                uploadProperties.action = adjustUploadUrl(
                  uploadProperties.action,
                );

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
                            pretreatmentAudioUploadResponse
                          }
                          afterUploadSuccess={(audio, data) => {
                            if (isFunction(contentItem.afterUploadSuccess)) {
                              contentItem.afterUploadSuccess(audio, data);
                            }
                          }}
                          afterChangeSuccess={(audio) => {
                            if (isFunction(contentItem.afterChangeSuccess)) {
                              contentItem.afterChangeSuccess(audio);
                            }
                          }}
                        />
                      }
                      helper={fieldData.helper}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                      requiredForShow={require}
                    />
                  </Col>
                );
              }

              return (
                <Col key={contentItemKey} lg={lg || 6} md={md} sm={sm} xs={xs}>
                  {type === cardConfig.contentItemType.text ? (
                    <TextItem
                      label={fieldData.label}
                      value={contentItem.value || ''}
                      helper={fieldData.helper}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.input
                    ? buildFormInput({
                        label: fieldData.label,
                        name: fieldData.name,
                        required: require,
                        helper: fieldData.helper,
                        icon: contentItem.icon || iconBuilder.form(),
                        innerProps: { ...contentItem.innerProps },
                        canOperate: canOperate,
                        addonBefore: contentItem.addonBefore || null,
                        addonBeforeStyle: contentItem.addonBeforeStyle || null,
                        addonAfter: contentItem.addonAfter || null,
                        addonAfterStyle: contentItem.addonAfterStyle || null,
                        formItemLayout: formItemLayout,
                        reminderPrefix: '输入',
                        hidden: false,
                      })
                    : null}

                  {type === cardConfig.contentItemType.password ? (
                    <PasswordItem
                      label={fieldData.label}
                      name={fieldData.name}
                      helper={fieldData.helper}
                      required={require}
                      icon={contentItem.icon || iconBuilder.form()}
                      innerProps={{ ...contentItem.innerProps }}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.inputNumber ? (
                    <InputNumberItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      icon={contentItem.icon || iconBuilder.form()}
                      innerProps={{ ...contentItem.innerProps }}
                      canOperate={canOperate}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.colorPicker ? (
                    <ColorPickerItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      innerProps={{ ...contentItem.innerProps }}
                      canOperate={canOperate}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                      onChange={
                        isFunction(contentItem.onChange)
                          ? contentItem.onChange
                          : null
                      }
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.switch ? (
                    <SwitchItem
                      label={fieldData.label}
                      name={fieldData.name}
                      checked={contentItem.checked || false}
                      required={require}
                      helper={fieldData.helper}
                      innerProps={{ ...contentItem.innerProps }}
                      canOperate={canOperate}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
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
                      innerProps={{ ...contentItem.innerProps }}
                      canOperate={canOperate}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.timePicker ? (
                    <TimePickerItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      innerProps={{ ...contentItem.innerProps }}
                      canOperate={canOperate}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.textarea ? (
                    <TextAreaItem
                      label={fieldData.label}
                      name={fieldData.name}
                      required={require}
                      helper={fieldData.helper}
                      innerProps={{
                        autoSize: { minRows: 3, maxRows: 5 },
                        ...contentItem.innerProps,
                      }}
                      canOperate={canOperate}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.onlyShowTextarea ? (
                    <OnlyShowTextareaItem
                      label={fieldData.label}
                      value={contentItem.value}
                      helper={fieldData.helper}
                      innerProps={{
                        autoSize: { minRows: 3, maxRows: 5 },
                        ...contentItem.innerProps,
                      }}
                      actionBar={contentItem.actionBar || null}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.onlyShowInput ? (
                    <OnlyShowInputItem
                      label={fieldData.label}
                      value={contentItem.value}
                      helper={fieldData.helper || ''}
                      icon={contentItem.icon || iconBuilder.form()}
                      innerProps={{
                        ...contentItem.innerProps,
                        disabled: true,
                        placeholder: `暂无${fieldData.label}信息`,
                        ...(contentItem.canCopy || false
                          ? {
                              addonAfter: (
                                <ElasticityButton
                                  style={{
                                    border: '0px solid #d9d9d9',
                                    backgroundColor: '#f5f5f5',
                                    height: '30px',
                                  }}
                                  // icon={iconBuilder.copy()}
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
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
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
                      innerProps={{
                        ...contentItem.innerProps,

                        disabled: true,
                        placeholder: `暂无${fieldData.label}信息`,
                      }}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.select ? (
                    <SelectItem
                      label={fieldData.label}
                      name={fieldData.name}
                      helper={fieldData.helper}
                      list={
                        isArray(contentItem.listData)
                          ? contentItem.listData
                          : []
                      }
                      dataConvert={
                        isFunction(contentItem.dataConvert)
                          ? contentItem.dataConvert
                          : null
                      }
                      renderItem={
                        isFunction(contentItem.renderItem)
                          ? contentItem.renderItem
                          : null
                      }
                      onChange={
                        isFunction(contentItem.onChange)
                          ? contentItem.onChange
                          : null
                      }
                      required={require}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                      innerProps={{ ...contentItem.innerProps }}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.whetherSelect
                    ? renderFormWhetherSelect({
                        label: fieldData.label,
                        name: fieldData.name,
                        helper: fieldData.helper,
                        onChange: contentItem.onChange,
                        formItemLayout,
                        required: true,
                        innerProps: {
                          ...contentItem.innerProps,
                        },
                      })
                    : null}

                  {type === cardConfig.contentItemType.customSelect
                    ? contentItem.component
                    : null}

                  {type === cardConfig.contentItemType.flexSelect ? (
                    <FlexSelect {...contentItem} />
                  ) : null}

                  {type === cardConfig.contentItemType.radio ? (
                    <RadioItem
                      label={fieldData.label}
                      name={fieldData.name}
                      helper={fieldData.helper}
                      list={
                        isArray(contentItem.listData)
                          ? contentItem.listData
                          : []
                      }
                      dataConvert={
                        isFunction(contentItem.dataConvert)
                          ? contentItem.dataConvert
                          : null
                      }
                      renderItem={
                        isFunction(contentItem.renderItem)
                          ? contentItem.renderItem
                          : null
                      }
                      onChange={
                        isFunction(contentItem.onChange)
                          ? contentItem.onChange
                          : null
                      }
                      button={toBoolean(contentItem.button || false)}
                      required={require}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                      innerProps={{ ...contentItem.innerProps }}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.whetherRadio
                    ? renderFormWhetherRadio({
                        label: fieldData.label,
                        name: fieldData.name,
                        helper: fieldData.helper,
                        onChange: contentItem.onChange,
                        formItemLayout,
                        required: true,
                        innerProps: { ...contentItem.innerProps },
                      })
                    : null}

                  {type === cardConfig.contentItemType.customRadio
                    ? contentItem.component
                    : null}

                  {type === cardConfig.contentItemType.onlyShowText ? (
                    <TextItem
                      label={fieldData.label}
                      value={contentItem.value}
                      helper={
                        contentItem.showHelper ? fieldData.helper || '' : ''
                      }
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.innerComponent ? (
                    <ComponentItem
                      label={fieldData.label}
                      innerComponent={contentItem.component}
                      helper={fieldData.helper}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                      requiredForShow={require}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.save ? (
                    <ActionItem
                      action={
                        isFunction(saveButtonBuilder)
                          ? saveButtonBuilder(contentItem.config || {})
                          : null
                      }
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      formItemLayout={formItemLayout}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.button
                    ? buildFormButton({
                        config: contentItem.config || {},
                        formItemLayout,
                      })
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
                      {isFunction(extraBuilder)
                        ? extraBuilder({
                            keyPrefix: `form_card_${contentIndex}_action_key`,
                            configList: contentItem.config || [],
                          })
                        : null}
                    </Space>
                  ) : null}

                  {type === cardConfig.contentItemType.component
                    ? contentItem.component || null
                    : null}

                  {type === cardConfig.contentItemType.jsonView ? (
                    <JsonView value={contentItem.value} />
                  ) : null}

                  {type === cardConfig.contentItemType.syntaxHighlighterView ? (
                    <SyntaxHighlighterItem
                      language={contentItem.language}
                      label={fieldData.label}
                      value={contentItem.value}
                      helper={fieldData.helper}
                      formItemLayout={formItemLayout}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                      innerProps={{ ...contentItem.innerProps }}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.nowTime ? (
                    <NowTimeItem
                      formItemLayout={formItemLayout}
                      addonBefore={contentItem.addonBefore || null}
                      addonBeforeStyle={contentItem.addonBeforeStyle || null}
                      addonAfter={contentItem.addonAfter || null}
                      addonAfterStyle={contentItem.addonAfterStyle || null}
                    />
                  ) : null}
                </Col>
              );
            })
          : null}
      </Row>
    );
  }
}

CardCollectionItemContent.defaultProps = {
  wrapperType: contentConfig.wrapperType.page,
  justify: 'start',
  align: 'top',
  gutter: 14,
  items: [],
  index: 0,
  pretreatmentImageUploadResponse: null,
  pretreatmentFileBase64UploadResponse: null,
  pretreatmentVideoUploadResponse: null,
  pretreatmentFileUploadResponse: null,
  pretreatmentAudioUploadResponse: null,
  saveButtonBuilder: null,
  extraBuilder: null,
};

export { CardCollectionItemContent };
