import { Input } from 'antd';
import React, { PureComponent } from 'react';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';

import styles from './index.less';

class EditableItem extends PureComponent {
  constructor(properties) {
    super(properties);
    this.state = {
      value: properties.value,
      editable: false,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  check = () => {
    this.setState({ editable: false });
    const { value } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className={styles.editableItem}>
        {editable ? (
          <div className={styles.wrapper}>
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
            />
            <CheckOutlined className={styles.icon} onClick={this.check} />
          </div>
        ) : (
          <div className={styles.wrapper}>
            <span>{value || ' '}</span>
            <EditOutlined className={styles.icon} onClick={this.edit} />
          </div>
        )}
      </div>
    );
  }
}

export { EditableItem };
