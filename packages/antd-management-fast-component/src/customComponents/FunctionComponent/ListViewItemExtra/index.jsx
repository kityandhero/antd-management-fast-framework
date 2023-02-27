import React from 'react';

import { logExecute } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { ImageBox } from '../../ImageBox';
import { VerticalBox } from '../../VerticalBox';

class AmfListViewItemExtra extends BaseComponent {
  renderFurther() {
    logExecute('renderFurther', 'AmfListViewItemExtra');

    const { align, imageUrl, emptyImageUrl, width } = this.props;

    return (
      <VerticalBox
        align={align || 'bottom'}
        style={{
          height: '100%',
        }}
      >
        <div
          style={{
            width,
          }}
        >
          <ImageBox
            src={imageUrl || emptyImageUrl}
            loadingEffect
            errorOverlayVisible
            showErrorIcon={false}
            fillHeight={false}
            imageBoxStyle={{
              boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset',
              padding: '4px',
            }}
            alt=""
            preview
          />
        </div>
      </VerticalBox>
    );
  }
}

AmfListViewItemExtra.defaultProps = {
  align: 'bottom',
  imageUrl: '',
  emptyImageUrl: '',
  width: '100px',
};

export { AmfListViewItemExtra };
