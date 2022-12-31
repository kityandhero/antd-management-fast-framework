export default class EditableItem extends PureComponent<any, any, any> {
    constructor(props: any);
    state: {
        value: any;
        editable: boolean;
    };
    handleChange: (e: any) => void;
    check: () => void;
    edit: () => void;
    render(): JSX.Element;
}
import { PureComponent } from "react";
