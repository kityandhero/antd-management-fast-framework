/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromSessionStorage(key: any): any;
/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromSessionStorage(key: any): any;
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToSessionStorage(key: any, value: any): void;
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToSessionStorage(key: any, json: any): void;
/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */
export function removeSessionStorage(key: any): void;
/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
export function clearSessionStorage(): void;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
