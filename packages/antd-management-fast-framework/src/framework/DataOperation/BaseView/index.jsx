import Base from '../Base';

class BaseView extends Base {
  afterSubmitSuccess = ({
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    this.doAfterSubmitSuccess({
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    });
  };
}

export default BaseView;
