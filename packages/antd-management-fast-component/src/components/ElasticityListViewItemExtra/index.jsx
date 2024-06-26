import React from 'react';

import { BaseComponent } from '../../bases';
import { ImageBox } from '../ImageBox';
import { VerticalBox } from '../VerticalBox';

class ElasticityListViewItemExtra extends BaseComponent {
  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
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

ElasticityListViewItemExtra.defaultProps = {
  align: 'bottom',
  imageUrl: '',
  emptyImageUrl: '',
  width: '100px',
};

export { ElasticityListViewItemExtra };
