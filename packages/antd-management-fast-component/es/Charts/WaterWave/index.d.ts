export default WaterWave;
declare class WaterWave extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        radio: number;
    };
    timer: number;
    root: null;
    node: null;
    componentDidMount(): void;
    componentDidUpdate(props: any): void;
    componentWillUnmount(): void;
    resize: () => void;
    renderChart(type: any): void;
    render(): JSX.Element;
}
import { Component } from "react";
