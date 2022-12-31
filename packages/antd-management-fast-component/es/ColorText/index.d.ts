export default ColorText;
declare class ColorText extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    copyText: () => void;
    render(): JSX.Element;
}
declare namespace ColorText {
    namespace defaultProps {
        const canCopy: boolean;
        const randomSeed: number;
        const seedOffset: number;
        const randomColor: boolean;
        const color: string;
        const textPrefix: null;
        const textPrefixStyle: null;
        const text: string;
        const separator: string;
        const separatorStyle: null;
    }
}
import { PureComponent } from "react";
