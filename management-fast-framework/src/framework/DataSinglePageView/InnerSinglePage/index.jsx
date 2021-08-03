import SinglePage from '../SinglePage';

class InnerSinglePage extends SinglePage {
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

export default InnerSinglePage;
