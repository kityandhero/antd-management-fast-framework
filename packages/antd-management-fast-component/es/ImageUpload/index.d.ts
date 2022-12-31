export default ImageUpload;
declare class ImageUpload extends PureComponent<any, any, any> {
    constructor(props: any);
    state: {
        uploading: boolean;
        previewVisible: boolean;
        previewImage: string;
    };
    handleUploadCancel: () => void;
    handleFilePreview: (file: any) => void;
    handleImagePreview: () => void;
    beforeUpload: (file: any, fileList: any) => boolean;
    handleUploadChange: (info: any) => void;
    clearImage: () => void;
    render(): JSX.Element;
}
declare namespace ImageUpload {
    namespace defaultProps {
        export const action: string;
        export const listType: string;
        export const showUploadList: boolean;
        export const disabled: boolean;
        export const multiple: boolean;
        export const tokenSet: {};
        export const image: string;
        export const fileList: never[];
        export namespace singleMode {
            const width: string;
            const emptyImage: string;
        }
        export const icon: null;
        export const title: string;
        export const helper: string;
        export function pretreatmentRemoteResponse(): void;
        export function afterUploadSuccess(): void;
        export function onItemChange({ file, fileList }: {
            file: any;
            fileList: any;
        }): void;
        export function onItemRemove(file: any): void;
        export { defaultCapacity as fileListCapacity };
    }
}
import { PureComponent } from "react";
declare const defaultCapacity: 8;
