export default FileUpload;
declare class FileUpload extends PureComponent<any, any, any> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        fileSource: any;
        fileUrl: any;
    } | null;
    constructor(props: any);
    state: {
        fileSource: string;
        fileUrl: string;
        fileUrlTemp: string;
        uploading: boolean;
        changeUrlVisible: boolean;
    };
    showChangeUrlModal: () => void;
    handleUrlChange: (e: any) => void;
    handleChangeUrlOk: () => void;
    handleChangeUrlCancel: () => void;
    clearUrl: () => void;
    beforeUpload: (file: any) => boolean;
    handleUploadChange: (info: any) => void;
    handleMenuClick: (e: any) => void;
    render(): JSX.Element;
}
declare namespace FileUpload {
    namespace defaultProps {
        const action: string;
        const disabled: boolean;
        const tokenSet: {};
        const file: string;
        function pretreatmentRemoteResponse(): void;
        function afterChangeSuccess(): void;
    }
}
import { PureComponent } from "react";
