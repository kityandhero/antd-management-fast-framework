export default FadeBox;
declare class FadeBox extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace FadeBox {
    namespace defaultProps {
        const show: boolean;
        const style: null;
        const bodyStyle: null;
    }
}
import { PureComponent } from "react";
