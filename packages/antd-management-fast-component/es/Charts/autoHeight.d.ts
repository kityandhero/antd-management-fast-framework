export default AutoHeightComponent;
declare class AutoHeightComponent extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        computedHeight: number;
    };
    root: undefined;
    componentDidMount(): void;
    handleRoot: (node: any) => void;
    render(): JSX.Element;
}
import React from "react";
