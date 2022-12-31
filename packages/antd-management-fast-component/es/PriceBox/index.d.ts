export default PriceBox;
declare class PriceBox extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element | "";
}
declare namespace PriceBox {
    namespace defaultProps {
        const price: number;
        const prefix: string;
        const generalStyle: {};
        const prefixStyle: {};
        const integerPartStyle: {};
        const pointStyle: {};
        const decimalPartStyle: {};
    }
}
import { PureComponent } from "react";
