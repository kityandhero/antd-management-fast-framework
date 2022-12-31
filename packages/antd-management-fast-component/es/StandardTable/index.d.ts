export default StandardTable;
declare class StandardTable extends PureComponent<any, any, any> {
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
import { PureComponent } from "react";
