export default FileBase64Upload;
declare class FileBase64Upload extends PureComponent<any, any, any> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        base64: any;
    };
    constructor(props: any);
    state: {
        uploading: boolean;
        base64: string;
    };
    handleUploadCancel: () => void;
    beforeUpload: (file: any) => boolean;
    handleUploadChange: (info: any) => void;
    render(): JSX.Element;
}
declare namespace FileBase64Upload {
    namespace defaultProps {
        const action: string;
        const disabled: boolean;
        const tokenSet: {};
        const fileBase64: string;
        const uploadText: string;
        function pretreatmentRemoteResponse(): void;
        function afterUploadSuccess(): void;
    }
}
import { PureComponent } from "react";
