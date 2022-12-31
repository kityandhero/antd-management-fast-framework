export default RadarScanning;
declare class RadarScanning extends Core {
    orbs: any[];
    getTrail: () => boolean;
    turnOnMove: () => void;
    turnOffMove: () => void;
    orbGo: (e: any) => void;
    clear: () => void;
    loop: () => void;
    createOrb: (mx: any, my: any) => void;
    drawOrb: (ctx: any, orb: any) => void;
    createOrbByExist: (o: any) => any;
}
declare namespace RadarScanning {
    namespace defaultProps {
        const number: number;
        const trail: boolean;
    }
}
import Core from "../Core";
