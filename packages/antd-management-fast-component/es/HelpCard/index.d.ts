export default HelpCard;
declare class HelpCard extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace HelpCard {
    namespace defaultProps {
        const border: boolean;
        const compact: boolean;
        namespace helpBoxProps {
            const title: string;
            const showNumber: boolean;
            const list: never[];
        }
    }
}
import { PureComponent } from "react";
