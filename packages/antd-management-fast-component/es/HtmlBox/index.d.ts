export default HtmlBox;
/**
 * 减少使用 dangerouslySetInnerHTML
 */
declare class HtmlBox extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    componentDidMount(): void;
    componentDidUpdate(): void;
    renderToHtml: () => void;
    render(): JSX.Element;
    main: HTMLSpanElement | null | undefined;
}
declare namespace HtmlBox {
    namespace defaultProps {
        const useEmpty: boolean;
        const html: string;
    }
}
import { PureComponent } from "react";
