export default TimeLineCustom;
declare class TimeLineCustom extends CustomBase {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        list: any;
        pagination: any;
    };
    constructor(props: any);
    currentTime: any;
    currentPageStart: boolean;
    state: {
        list: never[];
        pagination: {};
    };
    doWhenGetSnapshotBeforeUpdate: (preProps: any, preState: any) => null;
    getCreateTimeDatePart: (v: any) => any;
    getCreateTimeTimePart: (v: any) => any;
    handleTableChange: (pageNo: any, pageSize: any) => void;
    renderDateLabel: (v: any) => false | JSX.Element;
    renderInfo: (item: any) => JSX.Element;
    render(): JSX.Element;
}
declare namespace TimeLineCustom {
    namespace defaultProps {
        const showPagination: boolean;
        const iconStyle: {};
        const links: never[];
        function getIcon(): any;
        function getBackgroundColorKey(): string;
        function getDateLabel(): string;
        function getTime(): string;
        function getTitle(): string;
        function getDescription(): string;
        function getBottomLeft(): string;
        function getBottomRight(): string;
    }
}
import CustomBase from "../CustomBase";
