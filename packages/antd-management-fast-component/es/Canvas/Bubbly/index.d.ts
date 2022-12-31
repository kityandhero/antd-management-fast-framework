export default CanvasRibbon;
declare class CanvasRibbon extends Core {
    bubbleList: any[];
    draw: () => void;
}
declare namespace CanvasRibbon {
    namespace defaultProps {
        const shadowColor: string;
        const blur: number;
        const colorStart: string;
        const colorStop: string;
        const animate: boolean;
        const compose: string;
        const bubbleFunc: null;
        const radiusFunc: null;
        const angleFunc: null;
        const velocityFunc: null;
    }
}
import Core from "../Core";
