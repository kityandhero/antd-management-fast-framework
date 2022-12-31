export default StandardTableCustom;
declare class StandardTableCustom extends PureComponent<any, any, any> {
    static getDerivedStateFromProps(nextProps: any): {
        selectedRowKeys: never[];
        needTotalList: any[];
    } | null;
    constructor(props: any);
    state: {
        selectedRowKeys: never[];
        needTotalList: any[];
    };
    handleRowSelectChange: (selectedRowKeys: any, selectedRows: any) => void;
    handleTableChange: (pagination: any, filters: any, sorter: any) => void;
    cleanSelectedKeys: () => void;
    render(): JSX.Element;
}
declare namespace StandardTableCustom {
    namespace defaultProps {
        const showPagination: boolean;
    }
}
import { PureComponent } from "react";
