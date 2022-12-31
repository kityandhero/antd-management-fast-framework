export default IconInfo;
declare class IconInfo extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    copyDataToClipboard: () => void;
    render(): JSX.Element | null;
}
declare namespace IconInfo {
    export { defaultValue as defaultProps };
}
import { PureComponent } from "react";
declare namespace defaultValue {
    const direction: string;
    const responsive: boolean;
    const tooltip: boolean;
    const tooltipColor: null;
    const ellipsis: boolean;
    const icon: null;
    const iconPosition: string;
    const iconTooltip: string;
    const canCopy: boolean;
    const copyData: null;
    const textPrefix: string;
    const textPrefixStyle: null;
    const text: string;
    const textStyle: null;
    const textFormat: null;
    const separator: string;
    const separatorStyle: null;
    const style: null;
    const ellipsisMaxWidth: number;
}
