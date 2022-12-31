export default MobileHtmlPreviewBox;
declare class MobileHtmlPreviewBox {
    constructor(props: any);
    loadDataAfterMount: boolean;
    resetDataAfterLoad: boolean;
    state: any;
    buildContent: () => JSX.Element;
    renderInnerView: () => JSX.Element;
}
declare namespace MobileHtmlPreviewBox {
    namespace defaultProps {
        const html: string;
    }
}
