import classNames from 'classnames';
import { Button, Form } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;

const EntranceSubmit = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button
        size="large"
        className={clsString}
        type="primary"
        htmlType="submit"
        {...rest}
      />
    </FormItem>
  );
};

export default EntranceSubmit;
