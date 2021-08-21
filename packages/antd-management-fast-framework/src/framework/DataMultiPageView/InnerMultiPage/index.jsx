import MultiPage from '../MultiPage';

class InnerMultiPage extends MultiPage {
  useParamsKey = false;

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

export default InnerMultiPage;
