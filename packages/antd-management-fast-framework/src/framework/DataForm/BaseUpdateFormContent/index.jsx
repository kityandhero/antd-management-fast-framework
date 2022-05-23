import { BackTop } from 'antd';
import BaseUpdateForm from '../BaseUpdateForm';

class BaseUpdateFormContent extends BaseUpdateForm {
  renderFurther() {
    return (
      <>
        {this.renderFormWrapper()}
        {this.renderOther()}
        <BackTop />
      </>
    );
  }
}

export default BaseUpdateFormContent;
