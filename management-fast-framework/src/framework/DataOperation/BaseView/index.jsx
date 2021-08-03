import Base from '../Base';

class BaseView extends Base {
  afterSubmitSuccess = (
    singleData,
    listData,
    extraData,
    responseOriginalData,
    submitData,
  ) => {
    this.doAfterSubmitSuccess(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    );
  };
}

export default BaseView;
