import { Button } from 'antd';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';

import { iconCollection } from '../../utils/constants';

import styles from './index.less';

// TODO: 添加逻辑

class EditableLinkGroup extends PureComponent {
  render() {
    const { links, linkElement, onAdd } = this.props;
    return (
      <div className={styles.linkGroup}>
        {links.map((link) =>
          createElement(
            linkElement,
            {
              key: `linkGroup-item-${link.id || link.title}`,
              to: link.href,
              href: link.href,
            },
            link.title,
          ),
        )}
        <Button
          size="small"
          type="primary"
          ghost
          onClick={onAdd}
          icon={iconCollection.plus}
        >
          添加
        </Button>
      </div>
    );
  }
}

EditableLinkGroup.propTypes = {
  links: PropTypes.array,
  onAdd: PropTypes.func,
  linkElement: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

EditableLinkGroup.defaultProps = {
  links: [],
  onAdd: () => {},
  linkElement: 'a',
};

export default EditableLinkGroup;
