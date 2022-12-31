export default TagCloud;
declare class TagCloud extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        dv: null;
        height: number;
        width: number;
    };
    isUnmount: boolean;
    requestRef: number;
    root: undefined;
    imageMask: undefined;
    componentDidMount(): void;
    componentDidUpdate(preProps: any): void;
    componentWillUnmount(): void;
    resize: () => void;
    saveRootRef: (node: any) => void;
    initTagCloud: () => void;
    renderChart: any;
    render(): JSX.Element;
}
import { Component } from "react";
