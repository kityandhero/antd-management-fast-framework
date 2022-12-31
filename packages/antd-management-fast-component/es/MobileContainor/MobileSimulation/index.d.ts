export default MobileSimulation;
declare class MobileSimulation extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    buildMobileTypeArray: () => any[];
    renderInnerView: () => any;
    renderInnerViewWrapper: () => any;
    render(): JSX.Element;
}
declare namespace MobileSimulation {
    namespace defaultProps {
        const alertVisible: boolean;
        const alertAnimationType: any;
        const alertMessage: string;
        const alertDescription: string;
        const alertType: string;
        const alertIcon: boolean;
        const alertButtonText: string;
        const mobileType: any;
        const afterAlertClick: null;
    }
}
import { PureComponent } from "react";
