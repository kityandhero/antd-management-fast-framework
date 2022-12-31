/**
 * getNearestLocalhostNotifyCache
 * @returns
 */
export function getNearestLocalhostNotifyCache(): any;
export function setNearestLocalhostNotifyCache(): void;
export function removeNearestLocalhostNotifyCache(): void;
export function getAccessWayCollectionCache(): {};
export function setAccessWayCollectionCache(o: any): void;
/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getParamsDataCache(key: any): any;
/**
 * 设置useParamsData缓存
 *
 * @export
 * @param {o} useParamsData数据
 * @returns
 */
export function setParamsDataCache(key: any, o: any): void;
/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeParamsDataCache(key: any): void;
/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getTokenKeyName(): string;
/**
 * Get Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getToken(): any;
/**
 * Set Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setToken(v: any): void;
/**
 * 移除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeToken(): void;
export function getTokenObject(): {};
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearCustomData(): void;
export namespace storageKeyCollection {
    const token: string;
    const accessWayCollection: string;
    const nearestLocalhostNotify: string;
    const authorityCollection: string;
}
