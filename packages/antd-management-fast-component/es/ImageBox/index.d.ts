export default ImageBox;
declare class ImageBox extends CustomBase {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        showErrorOverlay: any;
        src: any;
        aspectRatio: any;
        showOverlay: any;
        loadingEffect: any;
        overlayText: any;
        borderRadiusDefaultStyle: {
            borderRadius: string;
        } | {
            borderRadius?: undefined;
        };
        circle: any;
        backgroundColor: {
            backgroundColor?: undefined;
        } | {
            backgroundColor: any;
        };
        showMode: any;
        imageBoxStyle: any;
        errorOverlayVisible: any;
        errorOverlayText: any;
        showErrorIcon: any;
    };
    constructor(props: any);
    state: {
        src: string;
        aspectRatio: number;
        borderRadiusDefaultStyle: {};
        imageBoxStyle: {};
        borderRadius: boolean;
        showMode: string;
        circle: boolean;
        backgroundColor: {};
        showOverlay: boolean;
        overlayText: string;
        loadingEffect: boolean;
        hide: boolean;
        loadSuccess: boolean;
        imageLoadSuccess: boolean;
        errorOverlayVisible: boolean;
        errorOverlayText: string;
        showErrorOverlay: boolean;
        showErrorIcon: boolean;
    };
    onImageLoadSuccess(): void;
    onImageError(): void;
    onImageClick(): void;
    render(): JSX.Element | null;
}
declare namespace ImageBox {
    namespace defaultProps {
        const fillHeight: boolean;
        const preview: boolean;
        const previewSimpleMask: boolean;
    }
}
import CustomBase from "../CustomBase";
