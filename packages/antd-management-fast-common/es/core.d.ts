export function getAppInitConfigData(): {
    platformName: string;
    appName: string;
    appDescription: string;
    entranceLogo: string;
    shareLogo: string;
    shareLogoName: string;
    leftBarText: string;
    companyName: string;
    copyright: string;
    apiPrefix: {
        corsTargetProduction: string;
    };
    showSelectLanguage: boolean;
    showLogoInEntrance: boolean;
    emptyLogo: string;
    leftBarLogo: string;
    apiSuccessCode: number;
    authenticationFailCode: number;
    entrancePath: string;
    showLogInConsole: boolean;
    showRequestInfo: boolean;
    useVirtualRequest: boolean;
    showUseVirtualRequestMessage: boolean;
    apiVersion: string;
    imageUploadMaxSize: number;
    audioUploadMaxSize: number;
    videoUploadMaxSize: number;
    fileUploadMaxSize: number;
    useNprogress: boolean;
    tinymceApiKey: string;
    tinymceImagesUploadUrl: string;
};
export function replace(source: any, pattern: any, replacement: any): string;
export function trim(source: any): string;
export function upperFirst(source: any): string;
export function lowerFirst(source: any): string;
export function stringIsNullOrWhiteSpace(value: any): boolean;
export function isBrowser(): boolean;
/**
 * 检测目标是否在数组址之中
 */
export function inCollection(collection: any, value: any): boolean;
/**
 * base64解码
 */
export function decodeBase64(target: any): any;
/**
 * base64编码
 */
export function encodeBase64(target: any): string;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
export function getPageQuery(): import("qs").ParsedQs;
export function getAuthorityFromRouter(router: any[] | undefined, pathname: any): any;
export function getRouteAuthority(path: any, routeData: any): undefined;
export function isComponentClass(component: any): any;
