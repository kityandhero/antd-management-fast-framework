export default ImageContentPreview;
declare class ImageContentPreview extends CustomBase {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        visible: any;
        mode: any;
        imageList: any;
        listItem: any;
        htmlContent: any;
    };
    constructor(props: any);
    state: {
        visible: boolean;
        htmlContent: string;
        imageList: never[];
        listItem: never[];
        mode: any;
    };
    onClose: () => void;
    render(): JSX.Element;
}
import CustomBase from "../CustomBase";
