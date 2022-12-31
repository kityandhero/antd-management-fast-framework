export default RoughSketch;
declare class RoughSketch extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace RoughSketch {
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
