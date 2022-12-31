/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record: any, showMode: any, level?: string): void;
export function recordWarn(record: any): void;
export function recordInfo(record: any): void;
export function recordConfig(record: any): void;
export function recordTrace(record: any): void;
export function recordDebug(record: any): void;
export function recordExecute(record: any): void;
/**
 * 记录错误信息
 */
export function recordError(record: any): void;
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordText(record: any, level?: any): void;
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordObject(record: any, level?: any): void;
