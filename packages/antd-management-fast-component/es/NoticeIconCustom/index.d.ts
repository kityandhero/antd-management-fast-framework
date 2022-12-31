export default NoticeIcon;
declare class NoticeIcon extends React.PureComponent<any, any, any> {
    static Tab: React.FC<import("antd").TabPaneProps>;
    constructor(props: any);
    constructor(props: any, context: any);
    onItemClick: (item: any, tabProps: any) => void;
    onTabChange: (tabType: any) => void;
    getNotificationBox(): JSX.Element | null;
    render(): JSX.Element;
}
declare namespace NoticeIcon {
    namespace defaultProps {
        function onItemClick(): void;
        function onPopupVisibleChange(): void;
        function onTabChange(): void;
        function onClear(): void;
        const loading: boolean;
        namespace locale {
            const emptyText: string;
            const clear: string;
        }
        const emptyImage: string;
    }
}
import React from "react";
