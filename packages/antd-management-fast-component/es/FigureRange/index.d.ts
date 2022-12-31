export namespace figureRangeType {
    namespace unlimited {
        const flag: number;
        const text: string;
    }
    namespace zero {
        const flag_1: number;
        export { flag_1 as flag };
        const text_1: string;
        export { text_1 as text };
    }
    namespace eq {
        const flag_2: number;
        export { flag_2 as flag };
        const text_2: string;
        export { text_2 as text };
    }
    namespace gt {
        const flag_3: number;
        export { flag_3 as flag };
        const text_3: string;
        export { text_3 as text };
    }
    namespace gte {
        const flag_4: number;
        export { flag_4 as flag };
        const text_4: string;
        export { text_4 as text };
    }
    namespace le {
        const flag_5: number;
        export { flag_5 as flag };
        const text_5: string;
        export { text_5 as text };
    }
    namespace lte {
        const flag_6: number;
        export { flag_6 as flag };
        const text_6: string;
        export { text_6 as text };
    }
    namespace between {
        const flag_7: number;
        export { flag_7 as flag };
        const text_7: string;
        export { text_7 as text };
    }
    namespace except {
        const flag_8: number;
        export { flag_8 as flag };
        const text_8: string;
        export { text_8 as text };
    }
}
export default FigureRange;
declare class FigureRange extends PureComponent<any, any, any> {
    static getDerivedStateFromProps(nextProps: any, prevState: any): {
        type: any;
        min: any;
        max: any;
        value: any;
    };
    constructor(props: any);
    rangeType: {
        unlimited: {
            flag: number;
            text: string;
        };
        zero: {
            flag: number;
            text: string;
        };
        eq: {
            flag: number;
            text: string;
        };
        gt: {
            flag: number;
            text: string;
        };
        gte: {
            flag: number;
            text: string;
        };
        le: {
            flag: number;
            text: string;
        };
        lte: {
            flag: number;
            text: string;
        };
        between: {
            flag: number;
            text: string;
        };
        except: {
            flag: number;
            text: string;
        };
    };
    state: {
        type: number;
        min: null;
        max: null;
        value: null;
    };
    onDataChange: (type: any, min: any, max: any, value: any) => void;
    onTypeChange: (v: any) => void;
    onValueChange: (e: any) => void;
    onMinChange: (e: any) => void;
    onMaxChange: (e: any) => void;
    render(): JSX.Element;
}
declare namespace FigureRange {
    namespace defaultProps {
        export const minText: string;
        export const maxText: string;
        export const valueText: string;
        export const splitText: string;
        import type = flag;
        export { type };
        export const min: null;
        export const max: null;
        export const value: null;
    }
}
import { PureComponent } from "react";
