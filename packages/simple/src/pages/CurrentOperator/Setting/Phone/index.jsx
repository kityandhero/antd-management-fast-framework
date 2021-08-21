import React, { PureComponent } from 'react';
import { Input } from 'antd';
import styles from './index.less';

class PhoneView extends PureComponent {
  render() {
    const { value, onChange } = this.props;
    let values = ['', ''];
    if (value) {
      values = value.split('-');
    }
    return (
      <>
        <Input
          className={styles.area_code}
          value={values[0]}
          onChange={(e) => {
            onChange(`${e.target.value}-${values[1]}`);
          }}
        />
        <Input
          className={styles.phone_number}
          onChange={(e) => {
            onChange(`${values[0]}-${e.target.value}`);
          }}
          value={values[1]}
        />
      </>
    );
  }
}

export default PhoneView;
