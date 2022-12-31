export default EditableLinkGroup;
declare class EditableLinkGroup extends PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): JSX.Element;
}
declare namespace EditableLinkGroup {
    namespace propTypes {
        const links: PropTypes.Requireable<any[]>;
        const onAdd: PropTypes.Requireable<(...args: any[]) => any>;
        const linkElement: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
    }
    namespace defaultProps {
        const links_1: never[];
        export { links_1 as links };
        export function onAdd_1(): void;
        export { onAdd_1 as onAdd };
        const linkElement_1: string;
        export { linkElement_1 as linkElement };
    }
}
import { PureComponent } from "react";
import PropTypes from "prop-types";
