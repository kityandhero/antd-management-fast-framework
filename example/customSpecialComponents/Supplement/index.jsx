import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
  isUndefined,
  isNull,
} from '../../../src/utils/tools';
import { unlimitedWithStringFlag } from '../../../src/utils/constants';

import SupplementCore from '../SupplementCore';

const unknownLabel = '未知';

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 *
 * @class Index
 * @extends {Common}
 */
class Supplement extends SupplementCore {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  rankList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.rankList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getRankName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.rankList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderRankOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.rankList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRankRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.rankList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRankSelect = (
    withUnlimited = true,
    label = '商品分类',
    name = 'rankId',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderRankOption(withUnlimited),
      helper,
    );
  };

  renderFormRankSelect = (
    helper = null,
    onChangeCallback,
    label = '商品分类',
    formItemLayout = null,
    required = true,
    name = 'rankId',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderRankOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormRankRadio = (
    helper = null,
    onChangeCallback,
    label = '商品分类',
    formItemLayout = null,
    required = true,
    name = 'rankId',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderRankRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  brandList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.brandList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getBrandName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.brandList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderBrandOption = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.brandList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderBrandRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.brandList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchBrandSelect = (
    withUnlimited = true,
    label = '商品品牌',
    name = 'brandId',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderBrandOption(withUnlimited),
      helper,
    );
  };

  renderFormBrandSelect = (
    helper = null,
    onChangeCallback,
    label = '商品品牌',
    formItemLayout = null,
    required = false,
    name = 'brandId',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderBrandOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormBrandRadio = (
    helper = null,
    onChangeCallback,
    label = '商品品牌',
    formItemLayout = null,
    required = true,
    name = 'brandId',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderBrandRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productSkuSaleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productSkuSaleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductSkuSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productSkuSaleTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductSkuSaleTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuSaleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductSkuSaleTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuSaleTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductSkuSaleTypeSelect = (
    withUnlimited = true,
    label = '大众/采购',
    name = 'saleType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductSkuSaleTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormProductSkuSaleTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '大众/采购',
    formItemLayout = null,
    required = true,
    name = 'saleType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductSkuSaleTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductSkuSaleTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '大众/采购',
    formItemLayout = null,
    required = true,
    name = 'saleType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductSkuSaleTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductStatusSelect = (
    withUnlimited = true,
    label = '商品状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormProductStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '商品状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '商品状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productSkuStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productSkuStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductSkuStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productSkuStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductSkuStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductSkuStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductSkuStatusSelect = (
    withUnlimited = true,
    label = '商品状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductSkuStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormProductSkuStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '商品状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductSkuStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductSkuStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '商品状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductSkuStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productBuyTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productBuyTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductBuyTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productBuyTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductBuyTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productBuyTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductBuyTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productBuyTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductBuyTypeSelect = (
    withUnlimited = true,
    label = '售卖方式',
    name = 'buyType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductBuyTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormProductBuyTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '售卖方式',
    formItemLayout = null,
    required = true,
    name = 'buyType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductBuyTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductBuyTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '售卖方式',
    formItemLayout = null,
    required = true,
    name = 'buyType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductBuyTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  businessModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.businessModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getBusinessModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.businessModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderBusinessModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.businessModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderBusinessModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.businessModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchBusinessModeSelect = (
    withUnlimited = true,
    label = '业务范围',
    name = 'businessMode',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderBusinessModeOption(withUnlimited),
      helper,
    );
  };

  renderFormBusinessModeSelect = (
    helper = null,
    onChangeCallback,
    label = '业务范围',
    formItemLayout = null,
    required = true,
    name = 'businessMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderBusinessModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormBusinessModeRadio = (
    helper = null,
    onChangeCallback,
    label = '业务范围',
    formItemLayout = null,
    required = true,
    name = 'businessMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderBusinessModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productSkuSaleTimeModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productSkuSaleTimeModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductSkuSaleTimeModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productSkuSaleTimeModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductSkuSaleTimeModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuSaleTimeModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductSkuSaleTimeModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuSaleTimeModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductSkuSaleTimeModeSelect = (
    withUnlimited = true,
    label = '定时上下架模式',
    name = 'saleTimeMode',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductSkuSaleTimeModeOption(withUnlimited),
      helper,
    );
  };

  renderFormProductSkuSaleTimeModeSelect = (
    helper = null,
    onChangeCallback,
    label = '定时上下架模式',
    formItemLayout = null,
    required = true,
    name = 'saleTimeMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductSkuSaleTimeModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductSkuSaleTimeModeRadio = (
    helper = null,
    onChangeCallback,
    label = '定时上下架模式',
    formItemLayout = null,
    required = true,
    name = 'saleTimeMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductSkuSaleTimeModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productMediaStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productMediaStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductMediaStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productMediaStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductMediaStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productMediaStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductMediaStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productMediaStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductMediaStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductMediaStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormProductMediaStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductMediaStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductMediaStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductMediaStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  statisticModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.statisticModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getStatisticModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.statisticModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderStatisticModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.statisticModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderStatisticModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.statisticModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchStatisticModeSelect = (
    withUnlimited = true,
    label = '统计模式',
    name = 'statisticMode',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderStatisticModeOption(withUnlimited),
      helper,
    );
  };

  renderFormStatisticModeSelect = (
    helper = null,
    onChangeCallback,
    label = '统计模式',
    formItemLayout = null,
    required = true,
    name = 'statisticMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderStatisticModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormStatisticModeRadio = (
    helper = null,
    onChangeCallback,
    label = '统计模式',
    formItemLayout = null,
    required = true,
    name = 'statisticMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderStatisticModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  payTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.payTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getPayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.payTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderPayTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.payTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderPayTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.payTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchPayTypeSelect = (
    withUnlimited = true,
    label = '支付方式',
    name = 'payType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderPayTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormPayTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '支付方式',
    formItemLayout = null,
    required = true,
    name = 'payType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderPayTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormPayTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '支付方式',
    formItemLayout = null,
    required = true,
    name = 'payType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderPayTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  clientTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.clientTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getClientTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.clientTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderClientTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.clientTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderClientTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.clientTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchClientTypeSelect = (
    withUnlimited = true,
    label = '终端类型',
    name = 'clientType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderClientTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormClientTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '终端类型',
    formItemLayout = null,
    required = true,
    name = 'clientType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderClientTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormClientTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '终端类型',
    formItemLayout = null,
    required = true,
    name = 'clientType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderClientTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  replenishmentReasonTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.replenishmentReasonTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getReplenishmentReasonTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.replenishmentReasonTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentReasonTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentReasonTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderReplenishmentReasonTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentReasonTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentReasonTypeSelect = (
    withUnlimited = true,
    label = '原因类型',
    name = 'reasonType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderReplenishmentReasonTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormReplenishmentReasonTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '原因类型',
    formItemLayout = null,
    required = true,
    name = 'reasonType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderReplenishmentReasonTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormReplenishmentReasonTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '原因类型',
    formItemLayout = null,
    required = true,
    name = 'reasonType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderReplenishmentReasonTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  replenishmentTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.replenishmentTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getReplenishmentTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.replenishmentTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderReplenishmentTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentTypeSelect = (
    withUnlimited = true,
    label = '售后类型',
    name = 'type',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderReplenishmentTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormReplenishmentTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '售后类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderReplenishmentTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormReplenishmentTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '售后类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderReplenishmentTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  replenishmentStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.replenishmentStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getReplenishmentStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.replenishmentStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderReplenishmentStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentStatusSelect = (
    withUnlimited = true,
    label = '售后状态',
    name = 'state',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderReplenishmentStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormReplenishmentStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '售后状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderReplenishmentStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormReplenishmentStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '售后状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderReplenishmentStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  genderList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.genderList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getGenderName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.genderList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderGenderOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.genderList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderGenderRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.genderList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchGenderSelect = (
    withUnlimited = true,
    label = '用户性别',
    name = 'gender',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderGenderOption(withUnlimited),
      helper,
    );
  };

  renderFormGenderSelect = (
    helper = null,
    onChangeCallback,
    label = '用户性别',
    formItemLayout = null,
    required = true,
    name = 'gender',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderGenderOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormGenderRadio = (
    helper = null,
    onChangeCallback,
    label = '用户性别',
    formItemLayout = null,
    required = true,
    name = 'gender',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderGenderRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  refundOrderHandleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.refundOrderHandleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getRefundOrderHandleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.refundOrderHandleTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderHandleTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.refundOrderHandleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRefundOrderHandleTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.refundOrderHandleTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderHandleTypeSelect = (
    withUnlimited = true,
    label = '处理类型',
    name = 'handleType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderRefundOrderHandleTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormRefundOrderHandleTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '处理类型',
    formItemLayout = null,
    required = true,
    name = 'handleType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderRefundOrderHandleTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormRefundOrderHandleTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '处理类型',
    formItemLayout = null,
    required = true,
    name = 'handleType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderRefundOrderHandleTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  refundOrderStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.refundOrderStateList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getRefundOrderStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.refundOrderStateList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.refundOrderStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRefundOrderStateRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.refundOrderStateList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderStateSelect = (
    withUnlimited = true,
    label = '是否缴费',
    name = 'whetherPay',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderRefundOrderStateOption(withUnlimited),
      helper,
    );
  };

  renderFormRefundOrderStateSelect = (
    helper = null,
    onChangeCallback,
    label = '是否缴费',
    formItemLayout = null,
    required = true,
    name = 'whetherPay',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderRefundOrderStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormRefundOrderStateRadio = (
    helper = null,
    onChangeCallback,
    label = '是否缴费',
    formItemLayout = null,
    required = true,
    name = 'whetherPay',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderRefundOrderStateRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaManagerStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.areaManagerStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getAreaManagerStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.areaManagerStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderAreaManagerStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaManagerStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAreaManagerStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaManagerStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAreaManagerStatusSelect = (
    withUnlimited = true,
    label = '账户状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderAreaManagerStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormAreaManagerStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '账户状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderAreaManagerStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAreaManagerStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '账户状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderAreaManagerStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  distributionStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.distributionStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getDistributionStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.distributionStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderDistributionStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.distributionStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderDistributionStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.distributionStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchDistributionStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderDistributionStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormDistributionStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderDistributionStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormDistributionStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderDistributionStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  orderMessageList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.orderMessageList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getOrderMessageName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.orderMessageList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderOrderMessageOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.orderMessageList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderOrderMessageRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.orderMessageList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchOrderMessageSelect = (
    withUnlimited = true,
    label = '订单消息',
    name = 'orderMessage',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderOrderMessageOption(withUnlimited),
      helper,
    );
  };

  renderFormOrderMessageSelect = (
    helper = null,
    onChangeCallback,
    label = '订单消息',
    formItemLayout = null,
    required = true,
    name = 'orderMessage',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderOrderMessageOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormOrderMessageRadio = (
    helper = null,
    onChangeCallback,
    label = '订单消息',
    formItemLayout = null,
    required = true,
    name = 'orderMessage',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderOrderMessageRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  administrationAuthorityList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.administrationAuthorityList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getAdministrationAuthorityName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.administrationAuthorityList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderAdministrationAuthorityOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.administrationAuthorityList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAdministrationAuthorityRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.administrationAuthorityList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAdministrationAuthoritySelect = (
    withUnlimited = true,
    label = '管理权限',
    name = 'authority',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderAdministrationAuthorityOption(withUnlimited),
      helper,
    );
  };

  renderFormAdministrationAuthoritySelect = (
    helper = null,
    onChangeCallback,
    label = '管理权限',
    formItemLayout = null,
    required = true,
    name = 'authority',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderAdministrationAuthorityOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAdministrationAuthorityRadio = (
    helper = null,
    onChangeCallback,
    label = '管理权限',
    formItemLayout = null,
    required = true,
    name = 'authority',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderAdministrationAuthorityRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  refundOrderReturnStoreList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.refundOrderReturnStoreList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getRefundOrderReturnStoreName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.refundOrderReturnStoreList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderRefundOrderReturnStoreOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.refundOrderReturnStoreList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRefundOrderReturnStoreRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.refundOrderReturnStoreList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRefundOrderReturnStoreSelect = (
    withUnlimited = true,
    label = '返还库存',
    name = 'returnStore',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderRefundOrderReturnStoreOption(withUnlimited),
      helper,
    );
  };

  renderFormRefundOrderReturnStoreSelect = (
    helper = null,
    onChangeCallback,
    label = '返还库存',
    formItemLayout = null,
    required = true,
    name = 'returnStore',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderRefundOrderReturnStoreOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormRefundOrderReturnStoreRadio = (
    helper = null,
    onChangeCallback,
    label = '返还库存',
    formItemLayout = null,
    required = true,
    name = 'returnStore',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderRefundOrderReturnStoreRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  accessWayTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.accessWayTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getAccessWayTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.accessWayTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderAccessWayTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.accessWayTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAccessWayTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.accessWayTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAccessWayTypeSelect = (
    withUnlimited = true,
    label = '类别',
    name = 'type',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderAccessWayTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormAccessWayTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '类别',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderAccessWayTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAccessWayTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '类别',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderAccessWayTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  replenishmentStatusModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.replenishmentStatusModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getReplenishmentStatusModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.replenishmentStatusModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderReplenishmentStatusModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentStatusModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderReplenishmentStatusModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.replenishmentStatusModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchReplenishmentStatusModeSelect = (
    withUnlimited = true,
    label = '模式',
    name = 'mode',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderReplenishmentStatusModeOption(withUnlimited),
      helper,
    );
  };

  renderFormReplenishmentStatusModeSelect = (
    helper = null,
    onChangeCallback,
    label = '模式',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderReplenishmentStatusModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormReplenishmentStatusModeRadio = (
    helper = null,
    onChangeCallback,
    label = '模式',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderReplenishmentStatusModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  showInStoreList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.showInStoreList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getShowInStoreName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.showInStoreList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderShowInStoreOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.showInStoreList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderShowInStoreRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.showInStoreList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchShowInStoreSelect = (
    withUnlimited = true,
    label = '店铺可见',
    name = 'showInStore',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderShowInStoreOption(withUnlimited),
      helper,
    );
  };

  renderFormShowInStoreSelect = (
    helper = null,
    onChangeCallback,
    label = '店铺可见',
    formItemLayout = null,
    required = true,
    name = 'showInStore',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderShowInStoreOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormShowInStoreRadio = (
    helper = null,
    onChangeCallback,
    label = '店铺可见',
    formItemLayout = null,
    required = true,
    name = 'showInStore',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderShowInStoreRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  showInAppList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.showInAppList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getShowInAppName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.showInAppList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderShowInAppOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.showInAppList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderShowInAppRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.showInAppList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchShowInAppSelect = (
    withUnlimited = true,
    label = 'App端可见',
    name = 'showInApp',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderShowInAppOption(withUnlimited),
      helper,
    );
  };

  renderFormShowInAppSelect = (
    helper = null,
    onChangeCallback,
    label = 'App端可见',
    formItemLayout = null,
    required = true,
    name = 'showInApp',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderShowInAppOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormShowInAppRadio = (
    helper = null,
    onChangeCallback,
    label = 'App端可见',
    formItemLayout = null,
    required = true,
    name = 'showInApp',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderShowInAppRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  showInWeChatList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.showInWeChatList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getShowInWeChatName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.showInWeChatList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderShowInWeChatOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.showInWeChatList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderShowInWeChatRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.showInWeChatList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchShowInWeChatSelect = (
    withUnlimited = true,
    label = '微信端可见',
    name = 'showInWeChat',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderShowInWeChatOption(withUnlimited),
      helper,
    );
  };

  renderFormShowInWeChatSelect = (
    helper = null,
    onChangeCallback,
    label = '微信端可见',
    formItemLayout = null,
    required = true,
    name = 'showInWeChat',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderShowInWeChatOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormShowInWeChatRadio = (
    helper = null,
    onChangeCallback,
    label = '微信端可见',
    formItemLayout = null,
    required = true,
    name = 'showInWeChat',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderShowInWeChatRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productSkuStockChangeTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productSkuStockChangeTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductSkuStockChangeTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productSkuStockChangeTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductSkuStockChangeTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuStockChangeTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductSkuStockChangeTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuStockChangeTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductSkuStockChangeTypeSelect = (
    withUnlimited = true,
    label = '变更类型',
    name = 'changeType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductSkuStockChangeTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormProductSkuStockChangeTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '变更类型',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductSkuStockChangeTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductSkuStockChangeTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '变更类型',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductSkuStockChangeTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  peopleAccountLogTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.peopleAccountLogTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getPeopleAccountLogTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.peopleAccountLogTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.peopleAccountLogTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderPeopleAccountLogTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.peopleAccountLogTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogTypeSelect = (
    withUnlimited = true,
    label = '变动类型',
    name = 'type',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderPeopleAccountLogTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormPeopleAccountLogTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '变动类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderPeopleAccountLogTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormPeopleAccountLogTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '变动类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderPeopleAccountLogTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  peopleAccountLogIsOutInList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.peopleAccountLogIsOutInList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getPeopleAccountLogIsOutInName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.peopleAccountLogIsOutInList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogIsOutInOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.peopleAccountLogIsOutInList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderPeopleAccountLogIsOutInRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.peopleAccountLogIsOutInList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogIsOutInSelect = (
    withUnlimited = true,
    label = '收支类行',
    name = 'isOutIn',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderPeopleAccountLogIsOutInOption(withUnlimited),
      helper,
    );
  };

  renderFormPeopleAccountLogIsOutInSelect = (
    helper = null,
    onChangeCallback,
    label = '收支类行',
    formItemLayout = null,
    required = true,
    name = 'isOutIn',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderPeopleAccountLogIsOutInOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormPeopleAccountLogIsOutInRadio = (
    helper = null,
    onChangeCallback,
    label = '收支类行',
    formItemLayout = null,
    required = true,
    name = 'isOutIn',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderPeopleAccountLogIsOutInRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  peopleAccountLogInTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.peopleAccountLogInTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getPeopleAccountLogInTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.peopleAccountLogInTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderPeopleAccountLogInTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.peopleAccountLogInTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderPeopleAccountLogInTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.peopleAccountLogInTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchPeopleAccountLogInTypeSelect = (
    withUnlimited = true,
    label = '收入来源',
    name = 'inType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderPeopleAccountLogInTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormPeopleAccountLogInTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '收入来源',
    formItemLayout = null,
    required = true,
    name = 'inType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderPeopleAccountLogInTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormPeopleAccountLogInTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '收入来源',
    formItemLayout = null,
    required = true,
    name = 'inType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderPeopleAccountLogInTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productPurchaseStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productPurchaseStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductPurchaseStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productPurchaseStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductPurchaseStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productPurchaseStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductPurchaseStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productPurchaseStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductPurchaseStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductPurchaseStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormProductPurchaseStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductPurchaseStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductPurchaseStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductPurchaseStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponScopeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponScopeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponScopeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponScopeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponScopeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponScopeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponScopeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponScopeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponScopeSelect = (
    withUnlimited = true,
    label = '适用范围',
    name = 'scope',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponScopeOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponScopeSelect = (
    helper = null,
    onChangeCallback,
    label = '适用范围',
    formItemLayout = null,
    required = true,
    name = 'scope',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponScopeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponScopeRadio = (
    helper = null,
    onChangeCallback,
    label = '适用范围',
    formItemLayout = null,
    required = true,
    name = 'scope',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponScopeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponApplicableObjectList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponApplicableObjectList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponApplicableObjectName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponApplicableObjectList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponApplicableObjectOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponApplicableObjectList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponApplicableObjectRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponApplicableObjectList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponApplicableObjectSelect = (
    withUnlimited = true,
    label = '适用对象',
    name = 'applicableObject',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponApplicableObjectOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponApplicableObjectSelect = (
    helper = null,
    onChangeCallback,
    label = '适用对象',
    formItemLayout = null,
    required = true,
    name = 'applicableObject',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponApplicableObjectOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponApplicableObjectRadio = (
    helper = null,
    onChangeCallback,
    label = '适用对象',
    formItemLayout = null,
    required = true,
    name = 'applicableObject',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponApplicableObjectRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponExpireModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponExpireModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponExpireModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponExpireModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponExpireModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponExpireModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponExpireModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponExpireModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponExpireModeSelect = (
    withUnlimited = true,
    label = '过期模式',
    name = 'expireMode',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponExpireModeOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponExpireModeSelect = (
    helper = null,
    onChangeCallback,
    label = '过期模式',
    formItemLayout = null,
    required = true,
    name = 'expireMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponExpireModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponExpireModeRadio = (
    helper = null,
    onChangeCallback,
    label = '过期模式',
    formItemLayout = null,
    required = true,
    name = 'expireMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponExpireModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponDisplayRangeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponDisplayRangeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponDisplayRangeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponDisplayRangeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponDisplayRangeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponDisplayRangeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponDisplayRangeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponDisplayRangeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponDisplayRangeSelect = (
    withUnlimited = true,
    label = '显示区域',
    name = 'displayRange',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponDisplayRangeOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponDisplayRangeSelect = (
    helper = null,
    onChangeCallback,
    label = '显示区域',
    formItemLayout = null,
    required = true,
    name = 'displayRange',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponDisplayRangeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponDisplayRangeRadio = (
    helper = null,
    onChangeCallback,
    label = '显示区域',
    formItemLayout = null,
    required = true,
    name = 'displayRange',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponDisplayRangeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponDisplayList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponDisplayList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponDisplayName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponDisplayList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponDisplayOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponDisplayList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponDisplayRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponDisplayList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponDisplaySelect = (
    withUnlimited = true,
    label = '显示/隐藏',
    name = 'display',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponDisplayOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponDisplaySelect = (
    helper = null,
    onChangeCallback,
    label = '显示/隐藏',
    formItemLayout = null,
    required = true,
    name = 'display',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponDisplayOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponDisplayRadio = (
    helper = null,
    onChangeCallback,
    label = '显示/隐藏',
    formItemLayout = null,
    required = true,
    name = 'display',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponDisplayRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponSceneList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponSceneList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponSceneName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponSceneList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponSceneOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponSceneList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponSceneRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponSceneList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponSceneSelect = (
    withUnlimited = true,
    label = '发放场景',
    name = 'scene',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponSceneOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponSceneSelect = (
    helper = null,
    onChangeCallback,
    label = '发放场景',
    formItemLayout = null,
    required = true,
    name = 'scene',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponSceneOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponSceneRadio = (
    helper = null,
    onChangeCallback,
    label = '发放场景',
    formItemLayout = null,
    required = true,
    name = 'scene',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponSceneRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponTypeSelect = (
    withUnlimited = true,
    label = '优惠券类型',
    name = 'type',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '优惠券类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '优惠券类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponGoodsUseInBusinessList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponGoodsUseInBusinessList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponGoodsUseInBusinessName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponGoodsUseInBusinessList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponGoodsUseInBusinessOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponGoodsUseInBusinessList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponGoodsUseInBusinessRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponGoodsUseInBusinessList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponGoodsUseInBusinessSelect = (
    withUnlimited = true,
    label = '商品类型',
    name = 'goodsType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponGoodsUseInBusinessOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponGoodsUseInBusinessSelect = (
    helper = null,
    onChangeCallback,
    label = '商品类型',
    formItemLayout = null,
    required = true,
    name = 'goodsType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponGoodsUseInBusinessOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponGoodsUseInBusinessRadio = (
    helper = null,
    onChangeCallback,
    label = '商品类型',
    formItemLayout = null,
    required = true,
    name = 'goodsType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponGoodsUseInBusinessRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expiredList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expiredList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpiredName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expiredList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpiredOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expiredList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpiredRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expiredList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpiredSelect = (
    withUnlimited = true,
    label = '是否过期',
    name = 'expired',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpiredOption(withUnlimited),
      helper,
    );
  };

  renderFormExpiredSelect = (
    helper = null,
    onChangeCallback,
    label = '是否过期',
    formItemLayout = null,
    required = true,
    name = 'expired',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpiredOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpiredRadio = (
    helper = null,
    onChangeCallback,
    label = '是否过期',
    formItemLayout = null,
    required = true,
    name = 'expired',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpiredRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockChangeTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponStockChangeTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponStockChangeTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponStockChangeTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponStockChangeTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockChangeTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockChangeTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockChangeTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockChangeTypeSelect = (
    withUnlimited = true,
    label = '变更类型',
    name = 'changeType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponStockChangeTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponStockChangeTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '变更类型',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponStockChangeTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockChangeTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '变更类型',
    formItemLayout = null,
    required = true,
    name = 'changeType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponStockChangeTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockCacheChangedList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponStockCacheChangedList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponStockCacheChangedName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponStockCacheChangedList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponStockCacheChangedOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockCacheChangedList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockCacheChangedRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockCacheChangedList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockCacheChangedSelect = (
    withUnlimited = true,
    label = '缓存变动',
    name = 'cacheChanged',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponStockCacheChangedOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponStockCacheChangedSelect = (
    helper = null,
    onChangeCallback,
    label = '缓存变动',
    formItemLayout = null,
    required = true,
    name = 'cacheChanged',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponStockCacheChangedOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockCacheChangedRadio = (
    helper = null,
    onChangeCallback,
    label = '缓存变动',
    formItemLayout = null,
    required = true,
    name = 'cacheChanged',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponStockCacheChangedRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockCacheChangedTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponStockCacheChangedTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponStockCacheChangedTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponStockCacheChangedTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponStockCacheChangedTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockCacheChangedTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockCacheChangedTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockCacheChangedTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockCacheChangedTypeSelect = (
    withUnlimited = true,
    label = '变动来源',
    name = 'cacheChangedType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponStockCacheChangedTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponStockCacheChangedTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '变动来源',
    formItemLayout = null,
    required = true,
    name = 'cacheChangedType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponStockCacheChangedTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockCacheChangedTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '变动来源',
    formItemLayout = null,
    required = true,
    name = 'cacheChangedType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponStockCacheChangedTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponStockModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponStockModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponStockModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponStockModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockModeSelect = (
    withUnlimited = true,
    label = '缓存变动位置',
    name = 'cacheChangedType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponStockModeOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponStockModeSelect = (
    helper = null,
    onChangeCallback,
    label = '缓存变动位置',
    formItemLayout = null,
    required = true,
    name = 'cacheChangedType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponStockModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockModeRadio = (
    helper = null,
    onChangeCallback,
    label = '缓存变动位置',
    formItemLayout = null,
    required = true,
    name = 'cacheChangedType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponStockModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  couponStockStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.couponStockStateList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getCouponStockStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.couponStockStateList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderCouponStockStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderCouponStockStateRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.couponStockStateList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchCouponStockStateSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'state',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderCouponStockStateOption(withUnlimited),
      helper,
    );
  };

  renderFormCouponStockStateSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderCouponStockStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormCouponStockStateRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'state',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderCouponStockStateRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  userCouponStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.userCouponStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getUserCouponStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.userCouponStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderUserCouponStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.userCouponStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderUserCouponStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.userCouponStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchUserCouponStatusSelect = (
    withUnlimited = true,
    label = '使用状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderUserCouponStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormUserCouponStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '使用状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderUserCouponStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormUserCouponStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '使用状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderUserCouponStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  userCouponChangeExpirationTimeModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.userCouponChangeExpirationTimeModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getUserCouponChangeExpirationTimeModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.userCouponChangeExpirationTimeModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderUserCouponChangeExpirationTimeModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.userCouponChangeExpirationTimeModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderUserCouponChangeExpirationTimeModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.userCouponChangeExpirationTimeModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchUserCouponChangeExpirationTimeModeSelect = (
    withUnlimited = true,
    label = '变更模式',
    name = 'mode',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderUserCouponChangeExpirationTimeModeOption(withUnlimited),
      helper,
    );
  };

  renderFormUserCouponChangeExpirationTimeModeSelect = (
    helper = null,
    onChangeCallback,
    label = '变更模式',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderUserCouponChangeExpirationTimeModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormUserCouponChangeExpirationTimeModeRadio = (
    helper = null,
    onChangeCallback,
    label = '变更模式',
    formItemLayout = null,
    required = true,
    name = 'mode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderUserCouponChangeExpirationTimeModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  weChatMessageRecordSendStateList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.weChatMessageRecordSendStateList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getWeChatMessageRecordSendStateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.weChatMessageRecordSendStateList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderWeChatMessageRecordSendStateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.weChatMessageRecordSendStateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderWeChatMessageRecordSendStateRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.weChatMessageRecordSendStateList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchWeChatMessageRecordSendStateSelect = (
    withUnlimited = true,
    label = '发送状态',
    name = 'sendState',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderWeChatMessageRecordSendStateOption(withUnlimited),
      helper,
    );
  };

  renderFormWeChatMessageRecordSendStateSelect = (
    helper = null,
    onChangeCallback,
    label = '发送状态',
    formItemLayout = null,
    required = true,
    name = 'sendState',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderWeChatMessageRecordSendStateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormWeChatMessageRecordSendStateRadio = (
    helper = null,
    onChangeCallback,
    label = '发送状态',
    formItemLayout = null,
    required = true,
    name = 'sendState',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderWeChatMessageRecordSendStateRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaConfigWhetherCustomOutboundNoticeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.areaConfigWhetherCustomOutboundNoticeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getAreaConfigWhetherCustomOutboundNoticeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${v}`,
      this.areaConfigWhetherCustomOutboundNoticeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderAreaConfigWhetherCustomOutboundNoticeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData =
      this.areaConfigWhetherCustomOutboundNoticeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAreaConfigWhetherCustomOutboundNoticeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData =
      this.areaConfigWhetherCustomOutboundNoticeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAreaConfigWhetherCustomOutboundNoticeSelect = (
    withUnlimited = true,
    label = '自定义配送消息',
    name = 'whetherCustom',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderAreaConfigWhetherCustomOutboundNoticeOption(withUnlimited),
      helper,
    );
  };

  renderFormAreaConfigWhetherCustomOutboundNoticeSelect = (
    helper = null,
    onChangeCallback,
    label = '自定义配送消息',
    formItemLayout = null,
    required = true,
    name = 'whetherCustom',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderAreaConfigWhetherCustomOutboundNoticeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAreaConfigWhetherCustomOutboundNoticeRadio = (
    helper = null,
    onChangeCallback,
    label = '自定义配送消息',
    formItemLayout = null,
    required = true,
    name = 'whetherCustom',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderAreaConfigWhetherCustomOutboundNoticeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  tagDisplayRangeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.tagDisplayRangeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getTagDisplayRangeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.tagDisplayRangeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderTagDisplayRangeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.tagDisplayRangeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderTagDisplayRangeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.tagDisplayRangeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchTagDisplayRangeSelect = (
    withUnlimited = true,
    label = '显示范围',
    name = 'displayRange',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderTagDisplayRangeOption(withUnlimited),
      helper,
    );
  };

  renderFormTagDisplayRangeSelect = (
    helper = null,
    onChangeCallback,
    label = '显示范围',
    formItemLayout = null,
    required = true,
    name = 'displayRange',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderTagDisplayRangeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormTagDisplayRangeRadio = (
    helper = null,
    onChangeCallback,
    label = '显示范围',
    formItemLayout = null,
    required = true,
    name = 'displayRange',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderTagDisplayRangeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  tagGoodsTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.tagGoodsTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getTagGoodsTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.tagGoodsTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderTagGoodsTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.tagGoodsTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderTagGoodsTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.tagGoodsTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchTagGoodsTypeSelect = (
    withUnlimited = true,
    label = '标签类型',
    name = 'goodsType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderTagGoodsTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormTagGoodsTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '标签类型',
    formItemLayout = null,
    required = true,
    name = 'goodsType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderTagGoodsTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormTagGoodsTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '标签类型',
    formItemLayout = null,
    required = true,
    name = 'goodsType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderTagGoodsTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  recommendList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.recommendList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getRecommendName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.recommendList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderRecommendOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.recommendList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderRecommendRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.recommendList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchRecommendSelect = (
    withUnlimited = true,
    label = '是否推荐',
    name = 'recommend',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderRecommendOption(withUnlimited),
      helper,
    );
  };

  renderFormRecommendSelect = (
    helper = null,
    onChangeCallback,
    label = '是否推荐',
    formItemLayout = null,
    required = true,
    name = 'recommend',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderRecommendOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormRecommendRadio = (
    helper = null,
    onChangeCallback,
    label = '是否推荐',
    formItemLayout = null,
    required = true,
    name = 'recommend',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderRecommendRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  statusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.statusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.statusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.statusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderStatusRadio = (withUnlimited = true, adjustListDataCallback = null) => {
    const listData = this.statusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchStatusSelect = (
    withUnlimited = true,
    label = '是否启用',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '是否启用',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '是否启用',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaCallCenterStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.areaCallCenterStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getAreaCallCenterStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.areaCallCenterStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderAreaCallCenterStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaCallCenterStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAreaCallCenterStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaCallCenterStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAreaCallCenterStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderAreaCallCenterStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormAreaCallCenterStateSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderAreaCallCenterStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAreaCallCenterStateRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderAreaCallCenterStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  areaCallCenterCategoryList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.areaCallCenterCategoryList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getAreaCallCenterCategoryName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.areaCallCenterCategoryList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderAreaCallCenterCategoryOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaCallCenterCategoryList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderAreaCallCenterCategoryRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.areaCallCenterCategoryList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchAreaCallCenterCategorySelect = (
    withUnlimited = true,
    label = '类别',
    name = 'category',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderAreaCallCenterCategoryOption(withUnlimited),
      helper,
    );
  };

  renderFormAreaCallCenterCategorySelect = (
    helper = null,
    onChangeCallback,
    label = '类别',
    formItemLayout = null,
    required = true,
    name = 'category',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderAreaCallCenterCategoryOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormAreaCallCenterCategoryRadio = (
    helper = null,
    onChangeCallback,
    label = '类别',
    formItemLayout = null,
    required = true,
    name = 'category',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderAreaCallCenterCategoryRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productSkuRecentStatisticRecentDaysStatisticStatusList = (
    withUnlimited = true,
  ) => {
    const { global } = this.props;

    const list =
      global.productSkuRecentStatisticRecentDaysStatisticStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductSkuRecentStatisticRecentDaysStatisticStatusName = (
    v,
    defaultValue = '',
  ) => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productSkuRecentStatisticRecentDaysStatisticStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductSkuRecentStatisticRecentDaysStatisticStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData =
      this.productSkuRecentStatisticRecentDaysStatisticStatusList(
        withUnlimited,
      );
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductSkuRecentStatisticRecentDaysStatisticStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData =
      this.productSkuRecentStatisticRecentDaysStatisticStatusList(
        withUnlimited,
      );

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductSkuRecentStatisticRecentDaysStatisticStatusSelect = (
    withUnlimited = true,
    label = '统计状态',
    name = 'recentDaysStatisticStatus',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductSkuRecentStatisticRecentDaysStatisticStatusOption(
        withUnlimited,
      ),
      helper,
    );
  };

  renderFormProductSkuRecentStatisticRecentDaysStatisticStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '统计状态',
    formItemLayout = null,
    required = true,
    name = 'recentDaysStatisticStatus',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductSkuRecentStatisticRecentDaysStatisticStatusOption(
          false,
        );
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductSkuRecentStatisticRecentDaysStatisticStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '统计状态',
    formItemLayout = null,
    required = true,
    name = 'recentDaysStatisticStatus',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductSkuRecentStatisticRecentDaysStatisticStatusRadio(
          false,
        );
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  productSkuRecentStatisticSortModeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.productSkuRecentStatisticSortModeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getProductSkuRecentStatisticSortModeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.productSkuRecentStatisticSortModeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderProductSkuRecentStatisticSortModeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuRecentStatisticSortModeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderProductSkuRecentStatisticSortModeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.productSkuRecentStatisticSortModeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchProductSkuRecentStatisticSortModeSelect = (
    withUnlimited = true,
    label = '排序模式',
    name = 'sortMode',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderProductSkuRecentStatisticSortModeOption(withUnlimited),
      helper,
    );
  };

  renderFormProductSkuRecentStatisticSortModeSelect = (
    helper = null,
    onChangeCallback,
    label = '排序模式',
    formItemLayout = null,
    required = true,
    name = 'sortMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderProductSkuRecentStatisticSortModeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormProductSkuRecentStatisticSortModeRadio = (
    helper = null,
    onChangeCallback,
    label = '排序模式',
    formItemLayout = null,
    required = true,
    name = 'sortMode',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderProductSkuRecentStatisticSortModeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  smsLogStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.smsLogStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getSmsLogStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.smsLogStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderSmsLogStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.smsLogStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSmsLogStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.smsLogStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchSmsLogStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderSmsLogStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormSmsLogStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderSmsLogStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormSmsLogStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderSmsLogStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  smsLogAggregateList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.smsLogAggregateList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getSmsLogAggregateName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.smsLogAggregateList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderSmsLogAggregateOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.smsLogAggregateList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSmsLogAggregateRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.smsLogAggregateList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchSmsLogAggregateSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'aggregate',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderSmsLogAggregateOption(withUnlimited),
      helper,
    );
  };

  renderFormSmsLogAggregateSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'aggregate',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderSmsLogAggregateOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormSmsLogAggregateRadio = (
    helper = null,
    onChangeCallback,
    label = '汇总',
    formItemLayout = null,
    required = true,
    name = 'aggregate',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderSmsLogAggregateRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  smsCategoryStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.smsCategoryStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getSmsCategoryStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.smsCategoryStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderSmsCategoryStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.smsCategoryStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSmsCategoryStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.smsCategoryStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchSmsCategoryStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderSmsCategoryStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormSmsCategoryStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderSmsCategoryStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormSmsCategoryStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderSmsCategoryStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressOrderStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressOrderStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressOrderStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressOrderStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressOrderStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressOrderStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressOrderStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressOrderStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressOrderStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressOrderStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressOrderStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressOrderDetailOrderTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressOrderDetailOrderTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressOrderDetailOrderTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressOrderDetailOrderTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressOrderDetailOrderTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderDetailOrderTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressOrderDetailOrderTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderDetailOrderTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressOrderDetailOrderTypeSelect = (
    withUnlimited = true,
    label = '订单类型',
    name = 'type',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressOrderDetailOrderTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressOrderDetailOrderTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '订单类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressOrderDetailOrderTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressOrderDetailOrderTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '订单类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressOrderDetailOrderTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressOrderSaleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressOrderSaleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressOrderSaleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressOrderSaleTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressOrderSaleTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderSaleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressOrderSaleTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderSaleTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressOrderSaleTypeSelect = (
    withUnlimited = true,
    label = '订单类型',
    name = 'type',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressOrderSaleTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressOrderSaleTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '订单类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressOrderSaleTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressOrderSaleTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '订单类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressOrderSaleTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressOrderDetailStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressOrderDetailStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressOrderDetailStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressOrderDetailStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressOrderDetailStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderDetailStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressOrderDetailStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressOrderDetailStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressOrderDetailStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressOrderDetailStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressOrderDetailStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressOrderDetailStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressOrderDetailStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressOrderDetailStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressOrderDetailScoreProcessingStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressOrderDetailScoreProcessingStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressOrderDetailScoreProcessingStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressOrderDetailScoreProcessingStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressOrderDetailScoreProcessingStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData =
      this.expressOrderDetailScoreProcessingStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressOrderDetailScoreProcessingStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData =
      this.expressOrderDetailScoreProcessingStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressOrderDetailScoreProcessingStatusSelect = (
    withUnlimited = true,
    label = '积分处理状态',
    name = 'scoreProcessingStatus',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressOrderDetailScoreProcessingStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressOrderDetailScoreProcessingStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '积分处理状态',
    formItemLayout = null,
    required = true,
    name = 'scoreProcessingStatus',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressOrderDetailScoreProcessingStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressOrderDetailScoreProcessingStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '积分处理状态',
    formItemLayout = null,
    required = true,
    name = 'scoreProcessingStatus',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressOrderDetailScoreProcessingStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressRefundOrderStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressRefundOrderStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressRefundOrderStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressRefundOrderStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressRefundOrderStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressRefundOrderStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressRefundOrderStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressRefundOrderStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressRefundOrderStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressRefundOrderStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressRefundOrderStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressRefundOrderStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressRefundOrderStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressRefundOrderStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressRefundOrderHandleTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressRefundOrderHandleTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressRefundOrderHandleTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressRefundOrderHandleTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressRefundOrderHandleTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressRefundOrderHandleTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressRefundOrderHandleTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressRefundOrderHandleTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressRefundOrderHandleTypeSelect = (
    withUnlimited = true,
    label = '处理模式',
    name = 'handleStatus',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressRefundOrderHandleTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressRefundOrderHandleTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '处理模式',
    formItemLayout = null,
    required = true,
    name = 'handleStatus',
    otherProps = null,
    adjustListDataCallback = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressRefundOrderHandleTypeOption(
          false,
          adjustListDataCallback,
        );
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressRefundOrderHandleTypeRadio = ({
    helper = null,
    onChangeCallback,
    label = '处理模式',
    formItemLayout = null,
    required = true,
    name = 'handleStatus',
    otherProps = null,
    adjustListDataCallback = null,
  }) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressRefundOrderHandleTypeRadio(
          false,
          adjustListDataCallback,
        );
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressReplenishmentStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressReplenishmentStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressReplenishmentStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressReplenishmentStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressReplenishmentStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressReplenishmentStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressReplenishmentStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressReplenishmentStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressReplenishmentStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressReplenishmentStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressReplenishmentStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressReplenishmentStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressReplenishmentStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressReplenishmentStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressReplenishmentTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressReplenishmentTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressReplenishmentTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressReplenishmentTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressReplenishmentTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressReplenishmentTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressReplenishmentTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressReplenishmentTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressReplenishmentTypeSelect = (
    withUnlimited = true,
    label = '类型',
    name = 'type',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressReplenishmentTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressReplenishmentTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressReplenishmentTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressReplenishmentTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '类型',
    formItemLayout = null,
    required = true,
    name = 'type',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressReplenishmentTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  expressReplenishmentReasonTypeList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.expressReplenishmentReasonTypeList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getExpressReplenishmentReasonTypeName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.expressReplenishmentReasonTypeList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderExpressReplenishmentReasonTypeOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressReplenishmentReasonTypeList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderExpressReplenishmentReasonTypeRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.expressReplenishmentReasonTypeList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchExpressReplenishmentReasonTypeSelect = (
    withUnlimited = true,
    label = '原因',
    name = 'reasonType',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderExpressReplenishmentReasonTypeOption(withUnlimited),
      helper,
    );
  };

  renderFormExpressReplenishmentReasonTypeSelect = (
    helper = null,
    onChangeCallback,
    label = '原因',
    formItemLayout = null,
    required = true,
    name = 'reasonType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderExpressReplenishmentReasonTypeOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormExpressReplenishmentReasonTypeRadio = (
    helper = null,
    onChangeCallback,
    label = '原因',
    formItemLayout = null,
    required = true,
    name = 'reasonType',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderExpressReplenishmentReasonTypeRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  settlementStatusList = (withUnlimited = true) => {
    const { global } = this.props;

    const list = global.settlementStatusList || [];

    if (withUnlimited) {
      return refitCommonData(list, unlimitedWithStringFlag);
    }

    return refitCommonData(list);
  };

  getSettlementStatusName = (v, defaultValue = '') => {
    if (isInvalid(v)) {
      return defaultValue;
    }

    const item = searchFromList(
      'flag',
      `${isNull(isUndefined(v) ? null : v) ? '' : v}`,
      this.settlementStatusList(false),
    );
    return item == null ? '未知' : item.name;
  };

  renderSettlementStatusOption = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.settlementStatusList(withUnlimited);
    return this.renderFormOptionCore(listData, adjustListDataCallback);
  };

  renderSettlementStatusRadio = (
    withUnlimited = true,
    adjustListDataCallback = null,
  ) => {
    const listData = this.settlementStatusList(withUnlimited);

    return this.renderFormRadioCore(listData, adjustListDataCallback);
  };

  renderSearchSettlementStatusSelect = (
    withUnlimited = true,
    label = '状态',
    name = 'status',
    helper = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderSearchFormSelect(
      title,
      name,
      this.renderSettlementStatusOption(withUnlimited),
      helper,
    );
  };

  renderFormSettlementStatusSelect = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormSelect(
      title,
      name,
      () => {
        return this.renderSettlementStatusOption(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };

  renderFormSettlementStatusRadio = (
    helper = null,
    onChangeCallback,
    label = '状态',
    formItemLayout = null,
    required = true,
    name = 'status',
    otherProps = null,
  ) => {
    const title = label || unknownLabel;

    return this.renderFormRadio(
      title,
      name,
      () => {
        return this.renderSettlementStatusRadio(false);
      },
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    );
  };
}

export default Supplement;
