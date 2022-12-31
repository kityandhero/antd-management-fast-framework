export default HelpBox;
declare class HelpBox extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element | null;
}
declare namespace HelpBox {
    namespace defaultProps {
        const title: string;
        const showTitle: boolean;
        const showNumber: boolean;
        const labelWidth: null;
        const list: never[];
        const useBackground: boolean;
        const hidden: boolean;
    }
}
import { PureComponent } from "react";
