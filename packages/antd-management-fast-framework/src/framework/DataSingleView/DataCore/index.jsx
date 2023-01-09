import { Avatar, Button, FloatButton, Form, Tooltip } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { pageHeaderRenderType } from 'antd-management-fast-common/es/utils/constants';
import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common/es/utils/tools';
import {
  avatarImageLoadResultCollection,
  decorateAvatar,
} from 'antd-management-fast-component/es/customComponents/DecorateAvatar';
import {
  buildPageHeaderContent,
  buildPageHeaderTagWrapper,
  buildPageHeaderTitle,
  buildTagList,
  pageHeaderExtraContent,
} from 'antd-management-fast-component/es/customComponents/FunctionComponent';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';

import BaseView from '../../DataOperation/BaseView';

import styles from './index.less';

const { BackTop } = FloatButton;

class DataCore extends BaseView {
  enableActionBack = true;

  reloadByUrlOp = false;

  actionBackProps = {};

  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      avatarImageLoadResult: avatarImageLoadResultCollection.wait,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  setFormFieldsValue = (v) => {
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetFieldsValue = (v) => {};

  getTargetForm = () => {
    return this.formRef.current;
  };

  onPageHeaderAvatarLoadErrorCallback = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  establishPageHeaderAvatarConfig = () => {
    return null;
  };

  establishPageHeaderContentGridConfig = () => {
    return [];
  };

  establishPageHeaderContentCollectionGridConfig = () => {
    return {
      type: pageHeaderRenderType.descriptionGrid,
      list: this.establishPageHeaderContentGridConfig(),
    };
  };

  establishPageHeaderContentParagraphCollectionConfig = () => {
    return [];
  };

  establishPageHeaderContentParagraphConfig = () => {
    return {
      type: pageHeaderRenderType.paragraph,
      list: this.establishPageHeaderContentParagraphCollectionConfig(),
    };
  };

  establishPageHeaderContentActionCollectionConfig = () => {
    return [];
  };

  establishPageHeaderContentActionConfig = () => {
    return {
      type: pageHeaderRenderType.action,
      list: this.establishPageHeaderContentActionCollectionConfig(),
    };
  };

  establishPageHeaderContentConfig = () => {
    return {
      list: [
        this.establishPageHeaderContentCollectionGridConfig(),
        this.establishPageHeaderContentParagraphConfig(),
        this.establishPageHeaderContentActionConfig(),
      ],
    };
  };

  establishPageHeaderTagCollectionConfig = () => [];

  establishPageHeaderExtraContentConfig = () => null;

  establishPageHeaderTitlePrefix = () => {
    return '';
  };

  establishPageHeaderTagConfig = () => {
    return buildTagList({
      list: this.establishPageHeaderTagCollectionConfig(),
    });
  };

  buildPageHeaderSubTitle = () => null;

  pageHeaderLogo = () => <Avatar shape="square" icon={iconBuilder.plus()} />;

  getPageName = () => {
    const { pageName } = this.state;

    return pageName;
  };

  buildExtraBackAction = () => {
    const { backPath } = this.state;

    if (!this.enableActionBack) {
      return null;
    }

    if ((backPath || '') === '') {
      return null;
    }

    const props = {
      ...{ icon: iconBuilder.rollback(), type: 'dashed' },
      ...(this.actionBackProps || {}),
    };

    return (
      <Tooltip placement="top" title="返回列表页">
        <Button
          {...props}
          onClick={(e) => {
            this.backToList(e);
          }}
        >
          列表页
        </Button>
      </Tooltip>
    );
  };

  buildFormLayout = () => {
    return 'vertical';
  };

  getFormClassName = () => {
    return null;
  };

  renderMainTitleIcon = () => {
    return iconBuilder.contacts();
  };

  renderMainTitleText = () => {
    return '基本信息';
  };

  renderMainTitle = () => {
    return (
      <>
        {this.renderMainTitleIcon()}
        <span className={styles.cardTitle}> {this.renderMainTitleText()}</span>
      </>
    );
  };

  renderFormWrapper = () => {
    return this.renderForm();
  };

  renderForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    const otherFormProps = this.establishFormAdditionalConfig();

    return (
      <Form
        ref={this.formRef}
        initialValues={initialValues}
        className={this.getFormClassName()}
        layout={this.buildFormLayout()}
        {...otherFormProps}
      >
        {this.formContent()}
      </Form>
    );
  };

  establishCardCollectionConfig = () => {
    return null;
  };

  renderPageHeaderContent = () => {
    return buildPageHeaderContent(
      this.establishPageHeaderContentConfig() || {},
    );
  };

  renderPageHeaderExtraContent = () => {
    return pageHeaderExtraContent(this.establishPageHeaderExtraContentConfig());
  };

  formContent = () => {
    return this.buildCardCollection(this.establishCardCollectionConfig());
  };

  renderFurther() {
    const {
      defaultAvatarIcon,
      showPageHeaderAvatar,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;

    const avatarProps = showPageHeaderAvatar
      ? decorateAvatar(
          this.establishPageHeaderAvatarConfig(),
          defaultAvatarIcon,
          showPageHeaderAvatar,
          dataLoading,
          reloading,
          avatarImageLoadResult,
          () => {
            this.onPageHeaderAvatarLoadErrorCallback();
          },
        )
      : null;

    return (
      <PageContainer
        logo={this.pageHeaderLogo()}
        avatar={avatarProps}
        title={buildPageHeaderTitle(
          this.getPageName(),
          this.establishPageHeaderTitlePrefix(),
        )}
        subTitle={this.buildPageHeaderSubTitle()}
        tags={buildPageHeaderTagWrapper(this.establishPageHeaderTagConfig())}
        extra={this.buildExtraAction()}
        content={this.renderPageHeaderContent()}
        extraContent={this.renderPageHeaderExtraContent()}
      >
        <div className={styles.containorBox} style={{ overflowX: 'hidden' }}>
          {this.renderFormWrapper()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageContainer>
    );
  }
}

export default DataCore;
