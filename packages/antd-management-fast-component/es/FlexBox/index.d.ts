export default FlexBox;
declare class FlexBox extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    getDirection: () => "horizontal" | "vertical";
    triggerClick: () => void;
    render(): JSX.Element;
}
declare namespace FlexBox {
    namespace defaultProps {
        const flexAuto: string;
        const allowWrap: boolean;
        namespace vertical {
            const minHeight: string;
            const bottomHeight: string;
        }
        const left: null;
        const right: null;
        const top: null;
        const bottom: null;
        const style: null;
    }
}
import { PureComponent } from "react";
