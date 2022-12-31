export default ConventView;
declare class ConventView extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    onAlertClick: () => void;
    render(): JSX.Element;
}
declare namespace ConventView {
    namespace defaultProps {
        const alertVisible: boolean;
        const alertAnimationType: any;
        const alertMessage: string;
        const alertDescription: string;
        const alertType: string;
        const alertIcon: boolean;
        const alertButtonText: string;
        const afterAlertClick: null;
    }
}
import { PureComponent } from "react";
