export function getStrFullLength(str?: string): number;
export function cutStrByFullLength(str: string | undefined, maxLength: any): string;
export default class EllipsisCustom extends Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    state: {
        text: string;
        targetCount: number;
    };
    componentDidMount(): void;
    componentDidUpdate(perProps: any): void;
    computeLine: () => void;
    bisection: (th: any, m: any, b: any, e: any, text: any, shadowNode: any) => any;
    handleRoot: (n: any) => void;
    root: any;
    handleContent: (n: any) => void;
    content: any;
    handleNode: (n: any) => void;
    node: any;
    handleShadow: (n: any) => void;
    shadow: any;
    handleShadowChildren: (n: any) => void;
    shadowChildren: any;
    render(): JSX.Element;
}
import { Component } from "react";
