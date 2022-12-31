export default VideoUpload;
declare class VideoUpload extends PureComponent<any, any, any> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        videoSource: any;
        videoUrl: any;
    } | null;
    constructor(props: any);
    state: {
        videoSource: string;
        videoUrl: string;
        videoUrlTemp: string;
        uploading: boolean;
        previewVisible: boolean;
        changeUrlVisible: boolean;
    };
    handleUploadCancel: () => void;
    showPreviewModal: () => void;
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
declare namespace VideoUpload {
    namespace defaultProps {
        const action: string;
        const disabled: boolean;
        const tokenSet: {};
        const video: string;
        const showPreview: boolean;
        function pretreatmentRemoteResponse(): void;
        function afterChangeSuccess(): void;
    }
}
import { PureComponent } from "react";
