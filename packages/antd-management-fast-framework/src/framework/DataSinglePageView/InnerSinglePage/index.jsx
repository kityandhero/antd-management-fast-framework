import SinglePage from '../SinglePage';

class InnerSinglePage extends SinglePage {
  restoreSearch = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        renderPageHeaderWrapper: false,
      },
    };
  }
}

export default InnerSinglePage;
