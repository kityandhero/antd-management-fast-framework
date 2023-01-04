import SinglePage from '../SinglePage';

class InnerSinglePage extends SinglePage {
  restoreSearch = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        renderPageContainer: false,
      },
    };
  }
}

export default InnerSinglePage;
