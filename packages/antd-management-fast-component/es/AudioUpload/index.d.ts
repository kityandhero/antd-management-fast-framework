export default AudioUpload;
declare class AudioUpload extends PureComponent<any, any, any> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        audioSource: any;
        audioUrl: any;
    } | null;
    constructor(props: any);
    state: {
        audioSource: string;
        audioUrl: string;
        audioUrlTemp: string;
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
declare namespace AudioUpload {
    namespace defaultProps {
        const action: string;
        const disabled: boolean;
        const tokenSet: {};
        const audio: string;
        const showPreview: boolean;
        function pretreatmentRemoteResponse(): void;
        function afterChangeSuccess(): void;
    }
}
import { PureComponent } from "react";
