import { AutoComplete, Input } from 'antd';
import classNames from 'classnames';
import { useRef } from 'react';
import useMergeValue from 'use-merge-value';
import { SearchOutlined } from '@ant-design/icons';

import styles from './index.less';

const HeaderSearch = (properties) => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    defaultOpen,
    ...restProperties
  } = properties;
  const inputReference = useRef(null);
  const [value, setValue] = useMergeValue(defaultValue, {
    value: properties.value,
    onChange: properties.onChange,
  });
  const [searchMode, setSearchMode] = useMergeValue(defaultOpen || false, {
    value: properties.open,
    onChange: onVisibleChange,
  });
  const inputClass = classNames(styles.input, {
    [styles.show]: searchMode,
  });
  return (
    <div
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);

        if (searchMode && inputReference.current) {
          inputReference.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode && onVisibleChange) {
          onVisibleChange(searchMode);
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        style={{
          height: 28,
          marginTop: -6,
        }}
        options={restProperties.options}
        onChange={setValue}
      >
        <Input
          ref={inputReference}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && restProperties.onSearch) {
              restProperties.onSearch(value);
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
