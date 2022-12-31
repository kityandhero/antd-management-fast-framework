export default Index;
declare class Index extends React.PureComponent<any, any, any> {
    constructor(props: any);
    state: {};
    canvasContainerRef: React.RefObject<any>;
    canvasRef: React.RefObject<any>;
    canvasWidth: number;
    canvasHeight: number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getCanvasContainer: () => any;
    getCanvas: () => any;
    getCanvasContext: () => any;
    doAfterDidMount: ({ canvasContext }: {
        canvasContext: any;
    }) => void;
    resize: () => void;
    buildContainorStyle: () => {
        backgroundImage?: string | undefined;
    };
    render(): JSX.Element;
}
declare namespace Index {
    namespace defaultProps {
        const backgroundImage: string;
    }
}
import React from "react";
