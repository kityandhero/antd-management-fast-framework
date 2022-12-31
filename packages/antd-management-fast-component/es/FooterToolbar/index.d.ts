export default class FooterToolbar extends Component<any, any, any> {
    static contextTypes: {
        isMobile: PropTypes.Requireable<boolean>;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        width: undefined;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    resizeFooterToolbar: () => void;
    render(): JSX.Element;
}
import { Component } from "react";
import PropTypes from "prop-types";
