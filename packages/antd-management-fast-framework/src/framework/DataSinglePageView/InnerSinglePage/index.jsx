import { SinglePage } from '../SinglePage';

class InnerSinglePage extends SinglePage {
  restoreSearch = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      renderPageContainer: false,
    };
  }
}

export { InnerSinglePage };
