export default Base;
declare class Base extends Component<any, any, any> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): null;
    constructor(props: any);
    mounted: boolean;
    /**
     *显示render次数开关，用于开发时候调试页面渲染性能
     */
    showRenderCountInConsole: boolean;
    renderCount: number;
    /**
     * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
     */
    keyPrefix: string;
    state: any;
    componentDidMount(): void;
    getSnapshotBeforeUpdate(preProps: any, preState: any): null;
    componentDidUpdate(preProps: any, preState: any, snapshot: any): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentWillUnmount(): void;
    doDidMountTask: () => void;
    doOtherCheckComponentUpdate: (nextProps: any, nextState: any) => null;
    doWhenGetSnapshotBeforeUpdate: (preProps: any, preState: any) => null;
    doWorkWhenDidUpdate: (preProps: any, preState: any, snapshot: any) => void;
    beforeDidMount: () => void;
    afterDidMount: () => void;
    beforeUnmount: () => void;
    afterUnmount: () => void;
    getDispatch: () => any;
    getDispatchWrapper: () => any;
    dispatchApi: ({ type, payload }: {
        type: any;
        payload: any;
    }) => any;
    goToPath: (path: any) => void;
    redirectToPath: (path: any) => void;
    checkHasMore: (pageNo: any, pageSize: any, total: any) => boolean;
    showRenderCount(): void;
    /**
     * check loading progress,if loading or load fail,return false,else return true
     * @returns bool
     */
    checkLoadingProgress(): any;
    /**
     * check operability,if loading or or processing or load fail,return false,else return true
     * @returns bool
     */
    checkOperability(): any;
    /**
     * check in progress,if loading or or processing,return false,else return true
     * @returns bool
     */
    checkInProgress(): any;
    renderFurther(): null;
    render(): null;
}
import { Component } from "react";
