export default TagSelect;
declare class TagSelect extends React.Component<any, any, any> {
    static getDerivedStateFromProps(nextProps: any): {
        value: any;
    } | null;
    constructor(props: any);
    state: {
        expand: boolean;
        value: any;
    };
    onChange: (value: any) => void;
    onSelectAll: (checked: any) => void;
    getAllTags(): any;
    handleTagChange: (value: any, checked: any) => void;
    handleExpand: () => void;
    isTagSelectOption: (node: any) => any;
    render(): JSX.Element;
}
declare namespace TagSelect {
    export namespace defaultProps {
        const hideCheckAll: boolean;
    }
    export { TagSelectOption as Option };
}
import React from "react";
declare function TagSelectOption({ children, checked, onChange, value }: {
    children: any;
    checked: any;
    onChange: any;
    value: any;
}): JSX.Element;
declare namespace TagSelectOption {
    const isTagSelectOption: boolean;
}
