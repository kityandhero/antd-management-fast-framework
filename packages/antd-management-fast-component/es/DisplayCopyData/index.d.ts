export default DisplayCopyData;
declare class DisplayCopyData extends CustomBase {
    static defaultProps: {
        label: string;
        data: null;
        copyMode: string;
    };
    render(): JSX.Element;
}
import CustomBase from "../CustomBase";
