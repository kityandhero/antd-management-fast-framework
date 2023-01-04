import MultiPage from '../MultiPage';

class InnerMultiPage extends MultiPage {
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

export default InnerMultiPage;
