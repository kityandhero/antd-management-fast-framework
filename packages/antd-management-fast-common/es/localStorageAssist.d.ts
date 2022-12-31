/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key: any): any;
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key: any): any;
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key: any, value: any): void;
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key: any, json: any): void;
/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
export function removeLocalStorage(key: any): void;
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearLocalStorage(): void;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
