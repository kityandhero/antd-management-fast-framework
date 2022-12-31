export default Spirit;
declare class Spirit extends Core {
    circles: any[];
    doAfterDidMount: () => void;
    animate: () => void;
    createCircle: () => {
        pos: {
            x: number;
            y: number;
        };
        alpha: number;
        scale: number;
        velocity: number;
    };
    drawCircle: (ctx: any, circle: any) => void;
    buildContainorStyle: () => {
        backgroundColor: string;
    };
}
declare namespace Spirit {
    const defaultProps: {};
}
import Core from "../Core";
