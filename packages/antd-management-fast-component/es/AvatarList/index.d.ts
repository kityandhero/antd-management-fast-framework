export default AvatarList;
declare function AvatarList({ children, size, maxLength, excessItemsStyle, ...other }: {
    [x: string]: any;
    children: any;
    size: any;
    maxLength: any;
    excessItemsStyle: any;
}): JSX.Element;
declare namespace AvatarList {
    export { Item };
}
declare function Item({ src, size, tips, onClick }: {
    src: any;
    size: any;
    tips: any;
    onClick?: (() => void) | undefined;
}): JSX.Element;
