import { PureComponent } from 'react';

class UIPoiPicker extends PureComponent {
  constructor(props) {
    super(props);

    /* eslint-disable no-underscore-dangle */
    this.map = props.__map__;

    this.loadUI();
  }

  loadUI = () => {
    window.AMapUI.loadUI(['misc/PoiPicker'], PoiPicker => {
      /* eslint-disable no-new */
      new PoiPicker({
        input: 'pickerInput',
      }).on('poiPicked', poiResult => {
        // 用户选中的poi点信息
        // console.dir(poiResult);
        this.map.setCenter(poiResult.item.location);
        this.map.setZoom(15);
      });
    });
  };

  render() {
    return null;
  }
}

export default UIPoiPicker;
