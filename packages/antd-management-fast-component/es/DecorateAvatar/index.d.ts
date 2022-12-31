export function decorateAvatar(avatar: null | undefined, defaultAvatarIcon: any, showPageHeaderAvatar: boolean | undefined, dataLoading: boolean | undefined, reloading: boolean | undefined, avatarImageLoadResult: any, onImageLoadErrorCallback: any): {
    icon: any;
    src?: undefined;
    onError?: undefined;
} | {
    src: any;
    onError: () => boolean;
    icon?: undefined;
} | {
    src: any;
    icon?: undefined;
    onError?: undefined;
} | null;
export namespace avatarImageLoadResultCollection {
    const wait: number;
    const success: number;
    const fail: number;
}
export default DecorateAvatar;
declare class DecorateAvatar extends PureComponent<any, any, any> {
    constructor(props: any);
    state: {
        avatarImageLoadResult: number;
    };
    onImageLoadErrorCallback: () => void;
    render(): JSX.Element | null;
}
declare namespace DecorateAvatar {
    namespace defaultProps {
        const avatar: null;
        const defaultAvatarIcon: any;
        const showPageHeaderAvatar: boolean;
        const dataLoading: boolean;
        const reloading: boolean;
    }
}
import { PureComponent } from "react";
