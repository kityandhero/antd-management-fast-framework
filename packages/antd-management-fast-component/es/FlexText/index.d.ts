export default FlexText;
declare class FlexText extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace FlexText {
    namespace defaultProps {
        const flexAuto: string;
        const icon: null;
        const textPrefix: null;
        const text: string;
        const ellipsis: boolean;
        const textEllipsisMaxWidth: number;
        const subText: string;
        const subTextStyle: null;
        const extra: null;
        const style: null;
    }
}
import { PureComponent } from "react";
