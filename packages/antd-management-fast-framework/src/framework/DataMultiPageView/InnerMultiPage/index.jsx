import { MultiPage } from '../MultiPage';

class InnerMultiPage extends MultiPage {
  restoreSearch = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      renderPageContainer: false,
    };
  }
}

export { InnerMultiPage };
