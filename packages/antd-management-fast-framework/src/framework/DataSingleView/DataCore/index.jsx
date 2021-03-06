import { Avatar, BackTop, Button, Form, Tooltip } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  avatarImageLoadResultCollection,
  decorateAvatar,
} from '../../../customComponents/DecorateAvatar';
import {
  buildPageHeaderContent,
  buildPageHeaderTagWrapper,
  buildPageHeaderTitle,
  buildTagList,
  pageHeaderExtraContent,
} from '../../../customComponents/FunctionComponent';
import { iconCollection, pageHeaderRenderType } from '../../../utils/constants';
import { getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';
import BaseView from '../../DataOperation/BaseView';

import styles from './index.less';

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

  pageHeaderLogo = () => <Avatar shape="square" icon={iconCollection.plus} />;

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
      ...{ icon: iconCollection.rollback, type: 'dashed' },
      ...(this.actionBackProps || {}),
    };

    return (
      <Tooltip placement="top" title="???????????????">
        <Button
          {...props}
          onClick={(e) => {
            this.backToList(e);
          }}
        >
          ?????????
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
    return iconCollection.contacts;
  };

  renderMainTitleText = () => {
    return '????????????';
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
      <PageHeaderWrapper
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
      </PageHeaderWrapper>
    );
  }
}

export default DataCore;
