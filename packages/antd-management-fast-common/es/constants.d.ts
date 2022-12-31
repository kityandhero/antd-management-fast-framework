/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
export const unknownLabel: "未知";
export namespace animalType {
    const none: string;
    const fade: string;
    const queue: string;
}
export const zeroString: "0";
export const zeroInt: 0;
/**
 * 鉴权失败码
 */
export const authenticationFailCode: 2001;
/**
 * Api请求成功码
 */
export const apiSuccessCode: 200;
/**
 * 1970-01-01 00:00
 */
export const emptyDatetime: "1970-01-01 00:00";
/**
 * 用户默认图
 */
export const defaultUserAvatar: "/user.png";
export const defaultEmptyImage: "/noImageSmall.png";
export const emptyLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAIsSURBVHic7ZqxaoNQFIb/lL7EHYUU8gB3yih06OATmLlDhm7O4uxQyNDBWZ8gQ4eAYyYfIJDCHe9jtEMtRKPNvY3lh/Z84OTx5L9f9HgDmVlr3/GPuWEHYCMC2AHYiAB2ADYigB2AjQhgB2AjAtgB2IgAdgA2IoAdgI0IYAdgIwLYAdiIAHYANiKAHYCNCGAHYCMCfC8wRQSlEtSXCusESqnOERXmuwuQ9OpVMvIp3r3H+YU7wKCIFFR8QLa3sPbrqLBIl1BRgX7UT6kxUJ3WW9iH154E/96XuL1ytWeY4glps0Jlc4SdMyFyWwEqxjKZw+bt2TrBMgWyvcVj0GsW5rAnTbx7OzDxHVDjJW2gszWGI4RYZxooX9tHyKB4LqGzzfnir+7txrQCzBsO0Ijux1cT3EfQOODNADA7bBtgMb+4ev/ejkws4IjGqbDB0XzVa9x11tQfhu3A9e3tyLQCgjtop8J20YP1IfJ2uO2zk7O+vR2ZWMAcCzTY7sa/ArPbosEC88Ct/se9HZl4CIZ4WAFN+jIyiPqD7HNwjddf09uNyfcBYb5HpkvEZ5ulGomKUeoMm5ORHzxu2voI/b2MOXafet/eLsx8/yRligjLdGAcrarO+3eoblVZjL6i6wQqLvtNB975P+j9Dd4C/hryY4gdgI0IYAdgIwLYAdiIAHYANiKAHYCNCGAHYCMC2AHYiAB2ADYigB2AjQhgB2AjAtgB2IgAdgA2/17AB0T0+YJa7nadAAAAAElFTkSuQmCC";
export namespace appInitDefault {
    export const platformName: string;
    export const appName: string;
    export const appDescription: string;
    export const entranceLogo: string;
    export const shareLogo: string;
    export const shareLogoName: string;
    export const leftBarText: string;
    export const companyName: string;
    export const copyright: string;
    export namespace apiPrefix {
        const corsTargetProduction: string;
    }
    export const showSelectLanguage: boolean;
    export const showLogoInEntrance: boolean;
    export { emptyLogo };
    export { emptyLogo as leftBarLogo };
    export { apiSuccessCode };
    export { authenticationFailCode };
    export const entrancePath: string;
    export const showLogInConsole: boolean;
    export const showRequestInfo: boolean;
    export const useVirtualRequest: boolean;
    export const showUseVirtualRequestMessage: boolean;
    export const apiVersion: string;
    export const imageUploadMaxSize: number;
    export const audioUploadMaxSize: number;
    export const videoUploadMaxSize: number;
    export const fileUploadMaxSize: number;
    export const useNprogress: boolean;
    export const tinymceApiKey: string;
    export const tinymceImagesUploadUrl: string;
}
export namespace accessWaySpecialCollection {
    export namespace _super {
        const permission: string;
    }
    export { _super as super };
}
export namespace formNameCollection {
    namespace createTime {
        const label: string;
        const name: string;
        const helper: string;
    }
    namespace customOperate {
        const label_1: string;
        export { label_1 as label };
        const name_1: string;
        export { name_1 as name };
        const helper_1: string;
        export { helper_1 as helper };
    }
}
export namespace convertCollection {
    const number: string;
    const datetime: string;
    const string: string;
    const moment: string;
    const money: string;
    const array: string;
}
export namespace formatCollection {
    const money_1: string;
    export { money_1 as money };
    const datetime_1: string;
    export { datetime_1 as datetime };
    export const chineseMoney: string;
    export const percentage: string;
}
export namespace dropdownExpandItemType {
    const divider: string;
    const item: string;
}
export namespace imageContentPreviewMode {
    const html: number;
    const listItem: number;
    const imageList: number;
}
export namespace datetimeFormat {
    const yearMonthDayHourMinuteSecond: string;
    const yearMonthDayHourMinute: string;
    const yearMonthDay: string;
    const yearMonth: string;
    const year: string;
    const monthDayHourMinuteSecond: string;
    const monthDayHourMinute: string;
    const monthDay: string;
    const hourMinute: string;
    const hourMinuteSecond: string;
}
export namespace selectModeCollection {
    const drawer: number;
    const modal: number;
}
export namespace columnFacadeMode {
    export const ellipsis: string;
    export const image: string;
    const datetime_2: string;
    export { datetime_2 as datetime };
    export const badge: string;
    const money_2: string;
    export { money_2 as money };
    export const dropdown: string;
}
export namespace columnPlaceholder {
    const placeholder: boolean;
    const title: string;
    const dataIndex: null;
    const align: string;
    function render(): string;
}
export namespace contentConfig {
    namespace wrapperType {
        export const page: string;
        export const model: string;
        const drawer_1: string;
        export { drawer_1 as drawer };
    }
}
export namespace pageHeaderRenderType {
    const descriptionGrid: string;
    const paragraph: string;
    const action: string;
}
export namespace listViewConfig {
    namespace dataContainerExtraActionBuildType {
        export const generalButton: string;
        export const button: string;
        const dropdown_1: string;
        export { dropdown_1 as dropdown };
        export const dropdownButton: string;
        export const dropdownEllipsis: string;
        export const iconInfo: string;
        export const component: string;
    }
    namespace viewMode {
        const table: number;
        const list: number;
        const cardCollectionView: number;
    }
    namespace tableSize {
        const middle: string;
        const small: string;
        const large: string;
    }
    namespace expandAnimalType {
        import none_1 = animalType.none;
        export { none_1 as none };
        import fade_1 = animalType.fade;
        export { fade_1 as fade };
        import queue_1 = animalType.queue;
        export { queue_1 as queue };
    }
}
export namespace sortOperate {
    const moveUp: string;
    const moveDown: string;
}
export namespace extraBuildType {
    export const refresh: string;
    export const save: string;
    const generalButton_1: string;
    export { generalButton_1 as generalButton };
    const iconInfo_1: string;
    export { iconInfo_1 as iconInfo };
    export const colorText: string;
    export const flexSelect: string;
    const button_1: string;
    export { button_1 as button };
    const dropdownButton_1: string;
    export { dropdownButton_1 as dropdownButton };
    const dropdownEllipsis_1: string;
    export { dropdownEllipsis_1 as dropdownEllipsis };
    const dropdown_2: string;
    export { dropdown_2 as dropdown };
    const component_1: string;
    export { component_1 as component };
}
export namespace drawerConfig {
    export { extraBuildType };
    export namespace bottomBarBuildType {
        export const close: string;
        const refresh_1: string;
        export { refresh_1 as refresh };
        const save_1: string;
        export { save_1 as save };
        const generalButton_2: string;
        export { generalButton_2 as generalButton };
        const iconInfo_2: string;
        export { iconInfo_2 as iconInfo };
        const button_2: string;
        export { button_2 as button };
        const dropdownButton_2: string;
        export { dropdownButton_2 as dropdownButton };
        const dropdownEllipsis_2: string;
        export { dropdownEllipsis_2 as dropdownEllipsis };
        const dropdown_3: string;
        export { dropdown_3 as dropdown };
        const component_2: string;
        export { component_2 as component };
    }
}
export namespace cardConfig {
    export namespace renderType {
        const normal: string;
        const help: string;
    }
    export namespace animalType_1 {
        import none_2 = animalType.none;
        export { none_2 as none };
        import fade_2 = animalType.fade;
        export { fade_2 as fade };
        import queue_2 = animalType.queue;
        export { queue_2 as queue };
    }
    export { animalType_1 as animalType };
    export namespace extraBuildType_1 { }
    export { extraBuildType_1 as extraBuildType };
    export namespace contentItemType {
        const placeholder_1: string;
        export { placeholder_1 as placeholder };
        export const text: string;
        export const input: string;
        export const password: string;
        export const inputNumber: string;
        export const textarea: string;
        const _switch: string;
        export { _switch as switch };
        export const select: string;
        export const whetherSelect: string;
        export const customSelect: string;
        const flexSelect_1: string;
        export { flexSelect_1 as flexSelect };
        export const radio: string;
        export const whetherRadio: string;
        export const customRadio: string;
        export const onlyShowTextarea: string;
        export const onlyShowInput: string;
        export const onlyShowInputDatetime: string;
        export const onlyShowText: string;
        export const imageUpload: string;
        export const imageShow: string;
        export const imageListShow: string;
        export const fileBase64Upload: string;
        export const videoUpload: string;
        export const fileUpload: string;
        export const audioUpload: string;
        export const innerComponent: string;
        const save_2: string;
        export { save_2 as save };
        const button_3: string;
        export { button_3 as button };
        export const actionList: string;
        const component_3: string;
        export { component_3 as component };
        export const nowTime: string;
        export const datePicker: string;
        export const timePicker: string;
        export const jsonView: string;
        export const syntaxHighlighterView: string;
        export const flexText: string;
        export const onlyShowTextByFlexText: string;
        const divider_1: string;
        export { divider_1 as divider };
        const html_1: string;
        export { html_1 as html };
        export const customGrid: string;
        export const tree: string;
        export const tinymce: string;
        export const treeSelect: string;
    }
}
export namespace searchCardConfig {
    export namespace contentItemType_1 {
        const input_1: string;
        export { input_1 as input };
        const inputNumber_1: string;
        export { inputNumber_1 as inputNumber };
        const customSelect_1: string;
        export { customSelect_1 as customSelect };
        const flexSelect_2: string;
        export { flexSelect_2 as flexSelect };
        const customRadio_1: string;
        export { customRadio_1 as customRadio };
        const onlyShowInput_1: string;
        export { onlyShowInput_1 as onlyShowInput };
        const innerComponent_1: string;
        export { innerComponent_1 as innerComponent };
        const component_4: string;
        export { component_4 as component };
        const datePicker_1: string;
        export { datePicker_1 as datePicker };
        export const customRangePicker: string;
        const divider_2: string;
        export { divider_2 as divider };
    }
    export { contentItemType_1 as contentItemType };
}
export namespace whetherString {
    const no: string;
    const yes: string;
}
export namespace whetherNumber {
    const no_1: number;
    export { no_1 as no };
    const yes_1: number;
    export { yes_1 as yes };
}
export namespace unlimitedWithStringFlag {
    export const key: string;
    const name_2: string;
    export { name_2 as name };
    export const flag: string;
}
export namespace unlimitedWithNumberFlag {
    const key_1: number;
    export { key_1 as key };
    const name_3: string;
    export { name_3 as name };
    const flag_1: number;
    export { flag_1 as flag };
}
export namespace logLevel {
    const debug: string;
    const warn: string;
    const error: string;
}
export namespace logShowMode {
    export const unknown: string;
    const text_1: string;
    export { text_1 as text };
    export const object: string;
}
export namespace dataTypeCollection {
    export namespace unknown_1 {
        const flag_2: number;
        export { flag_2 as flag };
        const name_4: string;
        export { name_4 as name };
    }
    export { unknown_1 as unknown };
    export namespace jsonObject {
        const flag_3: number;
        export { flag_3 as flag };
        const name_5: string;
        export { name_5 as name };
    }
    export namespace jsonObjectList {
        const flag_4: number;
        export { flag_4 as flag };
        const name_6: string;
        export { name_6 as name };
    }
    export namespace commonValue {
        const flag_5: number;
        export { flag_5 as flag };
        const name_7: string;
        export { name_7 as name };
    }
    export namespace html_2 {
        const flag_6: number;
        export { flag_6 as flag };
        const name_8: string;
        export { name_8 as name };
    }
    export { html_2 as html };
}
export namespace notificationTypeCollection {
    export const success: string;
    const error_1: string;
    export { error_1 as error };
    export const info: string;
    export const warning: string;
    const warn_1: string;
    export { warn_1 as warn };
    export const open: string;
}
export namespace messageTypeCollection {
    const success_1: string;
    export { success_1 as success };
    const error_2: string;
    export { error_2 as error };
    const info_1: string;
    export { info_1 as info };
    const warning_1: string;
    export { warning_1 as warning };
    const warn_2: string;
    export { warn_2 as warn };
    export const loading: string;
    const open_1: string;
    export { open_1 as open };
}
export namespace tabBarCollection {
    export { extraBuildType };
}
export namespace mobileTypeCollection {
    namespace roughSketch {
        const label_2: string;
        export { label_2 as label };
        const name_9: string;
        export { name_9 as name };
        const helper_2: string;
        export { helper_2 as helper };
    }
    namespace iphoneX {
        const label_3: string;
        export { label_3 as label };
        const name_10: string;
        export { name_10 as name };
        const helper_3: string;
        export { helper_3 as helper };
    }
    namespace iphone8plus {
        const label_4: string;
        export { label_4 as label };
        const name_11: string;
        export { name_11 as name };
        const helper_4: string;
        export { helper_4 as helper };
    }
    namespace iphone8 {
        const label_5: string;
        export { label_5 as label };
        const name_12: string;
        export { name_12 as name };
        const helper_5: string;
        export { helper_5 as helper };
    }
    namespace iPhone5S {
        const label_6: string;
        export { label_6 as label };
        const name_13: string;
        export { name_13 as name };
        const helper_6: string;
        export { helper_6 as helper };
    }
    namespace galaxyNote8 {
        const label_7: string;
        export { label_7 as label };
        const name_14: string;
        export { name_14 as name };
        const helper_7: string;
        export { helper_7 as helper };
    }
}
export namespace iconCollection {
    const help_1: JSX.Element;
    export { help_1 as help };
    export const add: JSX.Element;
    export const plus: JSX.Element;
    export const addCircle: JSX.Element;
    export const plusCircle: JSX.Element;
    export const reload: JSX.Element;
    export const edit: JSX.Element;
    export const enable: JSX.Element;
    export const disable: JSX.Element;
    export const playCircle: JSX.Element;
    export const pauseCircle: JSX.Element;
    const _delete: JSX.Element;
    export { _delete as delete };
    export const clock: JSX.Element;
    const close_1: JSX.Element;
    export { close_1 as close };
    export const closeCircle: JSX.Element;
    export const copy: JSX.Element;
    export const eye: JSX.Element;
    const _export: JSX.Element;
    export { _export as export };
    export const home: JSX.Element;
    const _import: JSX.Element;
    export { _import as import };
    export const idCard: JSX.Element;
    export const search: JSX.Element;
    export const setting: JSX.Element;
    export const tag: JSX.Element;
    export const tags: JSX.Element;
    export const upload: JSX.Element;
    export const user: JSX.Element;
    export const video: JSX.Element;
    export const videoCameraAdd: JSX.Element;
    const loading_1: JSX.Element;
    export { loading_1 as loading };
    export const users: JSX.Element;
    export const tool: JSX.Element;
    export const sync: JSX.Element;
    export const sound: JSX.Element;
    export const shop: JSX.Element;
    export const shoppingCart: JSX.Element;
    export const shopping: JSX.Element;
    export const schedule: JSX.Element;
    export const scan: JSX.Element;
    export const read: JSX.Element;
    export const qrCode: JSX.Element;
    export const powerOff: JSX.Element;
    export const phone: JSX.Element;
    export const profile: JSX.Element;
    export const project: JSX.Element;
    export const message: JSX.Element;
    export const lock: JSX.Element;
    export const unlock: JSX.Element;
    export const mail: JSX.Element;
    export const line: JSX.Element;
    const key_2: JSX.Element;
    export { key_2 as key };
    export const history: JSX.Element;
    export const gift: JSX.Element;
    export const folder: JSX.Element;
    export const filter: JSX.Element;
    export const download: JSX.Element;
    const ellipsis_1: JSX.Element;
    export { ellipsis_1 as ellipsis };
    export const desktop: JSX.Element;
    export const dashboard: JSX.Element;
    export const contacts: JSX.Element;
    export const clear: JSX.Element;
    export const bell: JSX.Element;
    export const undo: JSX.Element;
    export const redo: JSX.Element;
    export const form: JSX.Element;
    const warning_2: JSX.Element;
    export { warning_2 as warning };
    export const question: JSX.Element;
    export const logout: JSX.Element;
    export const login: JSX.Element;
    export const arrowUp: JSX.Element;
    export const arrowDown: JSX.Element;
    export const arrowLeft: JSX.Element;
    export const arrowRight: JSX.Element;
    export const swap: JSX.Element;
    export const online: JSX.Element;
    export const offline: JSX.Element;
    export const up: JSX.Element;
    export const upCircle: JSX.Element;
    export const down: JSX.Element;
    export const downCircle: JSX.Element;
    export const left: JSX.Element;
    export const leftCircle: JSX.Element;
    export const right: JSX.Element;
    export const rightCircle: JSX.Element;
    export const picture: JSX.Element;
    export const link: JSX.Element;
    export const checkCircle: JSX.Element;
    export const warningCircle: JSX.Element;
    export const sortAscending: JSX.Element;
    export const sortDescending: JSX.Element;
    export const infoCircle: JSX.Element;
    export const instagram: JSX.Element;
    export const disconnect: JSX.Element;
    export const insertRowAbove: JSX.Element;
    export const insertRowBelow: JSX.Element;
    export const insertRowLeft: JSX.Element;
    export const insertRowRight: JSX.Element;
    export const rollback: JSX.Element;
    export const snippets: JSX.Element;
    export const compress: JSX.Element;
    export const minusCircle: JSX.Element;
    const select_1: JSX.Element;
    export { select_1 as select };
    export const plusSquare: JSX.Element;
    export const unorderedList: JSX.Element;
    export const fork: JSX.Element;
    export const bug: JSX.Element;
    export const cloudDownload: JSX.Element;
    export const reconciliation: JSX.Element;
    export const apartment: JSX.Element;
    export const dingDing: JSX.Element;
    export const macCommand: JSX.Element;
    export const inbox: JSX.Element;
    const save_3: JSX.Element;
    export { save_3 as save };
    export const file: JSX.Element;
    export const mobile: JSX.Element;
    export const borderOuter: JSX.Element;
    export const columnHeight: JSX.Element;
    export const verticalAlignMiddle: JSX.Element;
    export const caretUp: JSX.Element;
    export const caretDown: JSX.Element;
    export const retweet: JSX.Element;
    export const exclamationCircle: JSX.Element;
}
export namespace iconBuilder {
    export function help_2(props?: null): JSX.Element;
    export { help_2 as help };
    export function add_1(props?: null): JSX.Element;
    export { add_1 as add };
    export function plus_1(props?: null): JSX.Element;
    export { plus_1 as plus };
    export function addCircle_1(props?: null): JSX.Element;
    export { addCircle_1 as addCircle };
    export function plusCircle_1(props?: null): JSX.Element;
    export { plusCircle_1 as plusCircle };
    export function reload_1(props?: null): JSX.Element;
    export { reload_1 as reload };
    export function edit_1(props?: null): JSX.Element;
    export { edit_1 as edit };
    export function enable_1(props?: null): JSX.Element;
    export { enable_1 as enable };
    export function disable_1(props?: null): JSX.Element;
    export { disable_1 as disable };
    export function playCircle_1(props?: null): JSX.Element;
    export { playCircle_1 as playCircle };
    export function pauseCircle_1(props?: null): JSX.Element;
    export { pauseCircle_1 as pauseCircle };
    export function _delete_1(props?: null): JSX.Element;
    export { _delete_1 as delete };
    export function clock_1(props?: null): JSX.Element;
    export { clock_1 as clock };
    export function close_2(props?: null): JSX.Element;
    export { close_2 as close };
    export function closeCircle_1(props?: null): JSX.Element;
    export { closeCircle_1 as closeCircle };
    export function copy_1(props?: null): JSX.Element;
    export { copy_1 as copy };
    export function eye_1(props?: null): JSX.Element;
    export { eye_1 as eye };
    export function _export_1(props?: null): JSX.Element;
    export { _export_1 as export };
    export function home_1(props?: null): JSX.Element;
    export { home_1 as home };
    export function _import_1(props?: null): JSX.Element;
    export { _import_1 as import };
    export function idCard_1(props?: null): JSX.Element;
    export { idCard_1 as idCard };
    export function search_1(props?: null): JSX.Element;
    export { search_1 as search };
    export function setting_1(props?: null): JSX.Element;
    export { setting_1 as setting };
    export function tag_1(props?: null): JSX.Element;
    export { tag_1 as tag };
    export function tags_1(props?: null): JSX.Element;
    export { tags_1 as tags };
    export function upload_1(props?: null): JSX.Element;
    export { upload_1 as upload };
    export function user_1(props?: null): JSX.Element;
    export { user_1 as user };
    export function video_1(props?: null): JSX.Element;
    export { video_1 as video };
    export function videoCameraAdd_1(props?: null): JSX.Element;
    export { videoCameraAdd_1 as videoCameraAdd };
    export function loading_2(props?: null): JSX.Element;
    export { loading_2 as loading };
    export function users_1(props?: null): JSX.Element;
    export { users_1 as users };
    export function tool_1(props?: null): JSX.Element;
    export { tool_1 as tool };
    export function sync_1(props?: null): JSX.Element;
    export { sync_1 as sync };
    export function sound_1(props?: null): JSX.Element;
    export { sound_1 as sound };
    export function shop_1(props?: null): JSX.Element;
    export { shop_1 as shop };
    export function shoppingCart_1(props?: null): JSX.Element;
    export { shoppingCart_1 as shoppingCart };
    export function shopping_1(props?: null): JSX.Element;
    export { shopping_1 as shopping };
    export function schedule_1(props?: null): JSX.Element;
    export { schedule_1 as schedule };
    export function scan_1(props?: null): JSX.Element;
    export { scan_1 as scan };
    export function read_1(props?: null): JSX.Element;
    export { read_1 as read };
    export function qrCode_1(props?: null): JSX.Element;
    export { qrCode_1 as qrCode };
    export function powerOff_1(props?: null): JSX.Element;
    export { powerOff_1 as powerOff };
    export function phone_1(props?: null): JSX.Element;
    export { phone_1 as phone };
    export function profile_1(props?: null): JSX.Element;
    export { profile_1 as profile };
    export function project_1(props?: null): JSX.Element;
    export { project_1 as project };
    export function message_1(props?: null): JSX.Element;
    export { message_1 as message };
    export function lock_1(props?: null): JSX.Element;
    export { lock_1 as lock };
    export function unlock_1(props?: null): JSX.Element;
    export { unlock_1 as unlock };
    export function mail_1(props?: null): JSX.Element;
    export { mail_1 as mail };
    export function line_1(props?: null): JSX.Element;
    export { line_1 as line };
    export function key_3(props?: null): JSX.Element;
    export { key_3 as key };
    export function history_1(props?: null): JSX.Element;
    export { history_1 as history };
    export function gift_1(props?: null): JSX.Element;
    export { gift_1 as gift };
    export function folder_1(props?: null): JSX.Element;
    export { folder_1 as folder };
    export function filter_1(props?: null): JSX.Element;
    export { filter_1 as filter };
    export function download_1(props?: null): JSX.Element;
    export { download_1 as download };
    export function ellipsis_2(props?: null): JSX.Element;
    export { ellipsis_2 as ellipsis };
    export function desktop_1(props?: null): JSX.Element;
    export { desktop_1 as desktop };
    export function dashboard_1(props?: null): JSX.Element;
    export { dashboard_1 as dashboard };
    export function contacts_1(props?: null): JSX.Element;
    export { contacts_1 as contacts };
    export function clear_1(props?: null): JSX.Element;
    export { clear_1 as clear };
    export function bell_1(props?: null): JSX.Element;
    export { bell_1 as bell };
    export function undo_1(props?: null): JSX.Element;
    export { undo_1 as undo };
    export function redo_1(props?: null): JSX.Element;
    export { redo_1 as redo };
    export function form_1(props?: null): JSX.Element;
    export { form_1 as form };
    export function warning_3(props?: null): JSX.Element;
    export { warning_3 as warning };
    export function question_1(props?: null): JSX.Element;
    export { question_1 as question };
    export function logout_1(props?: null): JSX.Element;
    export { logout_1 as logout };
    export function login_1(props?: null): JSX.Element;
    export { login_1 as login };
    export function arrowUp_1(props?: null): JSX.Element;
    export { arrowUp_1 as arrowUp };
    export function arrowDown_1(props?: null): JSX.Element;
    export { arrowDown_1 as arrowDown };
    export function arrowLeft_1(props?: null): JSX.Element;
    export { arrowLeft_1 as arrowLeft };
    export function arrowRight_1(props?: null): JSX.Element;
    export { arrowRight_1 as arrowRight };
    export function swap_1(props?: null): JSX.Element;
    export { swap_1 as swap };
    export function online_1(props?: null): JSX.Element;
    export { online_1 as online };
    export function offline_1(props?: null): JSX.Element;
    export { offline_1 as offline };
    export function up_1(props?: null): JSX.Element;
    export { up_1 as up };
    export function upCircle_1(props?: null): JSX.Element;
    export { upCircle_1 as upCircle };
    export function down_1(props?: null): JSX.Element;
    export { down_1 as down };
    export function downCircle_1(props?: null): JSX.Element;
    export { downCircle_1 as downCircle };
    export function left_1(props?: null): JSX.Element;
    export { left_1 as left };
    export function leftCircle_1(props?: null): JSX.Element;
    export { leftCircle_1 as leftCircle };
    export function right_1(props?: null): JSX.Element;
    export { right_1 as right };
    export function rightCircle_1(props?: null): JSX.Element;
    export { rightCircle_1 as rightCircle };
    export function picture_1(props?: null): JSX.Element;
    export { picture_1 as picture };
    export function link_1(props?: null): JSX.Element;
    export { link_1 as link };
    export function checkCircle_1(props?: null): JSX.Element;
    export { checkCircle_1 as checkCircle };
    export function warningCircle_1(props?: null): JSX.Element;
    export { warningCircle_1 as warningCircle };
    export function sortAscending_1(props?: null): JSX.Element;
    export { sortAscending_1 as sortAscending };
    export function sortDescending_1(props?: null): JSX.Element;
    export { sortDescending_1 as sortDescending };
    export function infoCircle_1(props?: null): JSX.Element;
    export { infoCircle_1 as infoCircle };
    export function instagram_1(props?: null): JSX.Element;
    export { instagram_1 as instagram };
    export function disconnect_1(props?: null): JSX.Element;
    export { disconnect_1 as disconnect };
    export function insertRowAbove_1(props?: null): JSX.Element;
    export { insertRowAbove_1 as insertRowAbove };
    export function insertRowBelow_1(props?: null): JSX.Element;
    export { insertRowBelow_1 as insertRowBelow };
    export function insertRowLeft_1(props?: null): JSX.Element;
    export { insertRowLeft_1 as insertRowLeft };
    export function insertRowRight_1(props?: null): JSX.Element;
    export { insertRowRight_1 as insertRowRight };
    export function rollback_1(props?: null): JSX.Element;
    export { rollback_1 as rollback };
    export function snippets_1(props?: null): JSX.Element;
    export { snippets_1 as snippets };
    export function compress_1(props?: null): JSX.Element;
    export { compress_1 as compress };
    export function minusCircle_1(props?: null): JSX.Element;
    export { minusCircle_1 as minusCircle };
    export function select_2(props?: null): JSX.Element;
    export { select_2 as select };
    export function plusSquare_1(props?: null): JSX.Element;
    export { plusSquare_1 as plusSquare };
    export function unorderedList_1(props?: null): JSX.Element;
    export { unorderedList_1 as unorderedList };
    export function fork_1(props?: null): JSX.Element;
    export { fork_1 as fork };
    export function bug_1(props?: null): JSX.Element;
    export { bug_1 as bug };
    export function cloudDownload_1(props?: null): JSX.Element;
    export { cloudDownload_1 as cloudDownload };
    export function reconciliation_1(props?: null): JSX.Element;
    export { reconciliation_1 as reconciliation };
    export function apartment_1(props?: null): JSX.Element;
    export { apartment_1 as apartment };
    export function dingDing_1(props?: null): JSX.Element;
    export { dingDing_1 as dingDing };
    export function macCommand_1(props?: null): JSX.Element;
    export { macCommand_1 as macCommand };
    export function inbox_1(props?: null): JSX.Element;
    export { inbox_1 as inbox };
    export function save_4(props?: null): JSX.Element;
    export { save_4 as save };
    export function file_1(props?: null): JSX.Element;
    export { file_1 as file };
    export function mobile_1(props?: null): JSX.Element;
    export { mobile_1 as mobile };
    export function borderOuter_1(props?: null): JSX.Element;
    export { borderOuter_1 as borderOuter };
    export function columnHeight_1(props?: null): JSX.Element;
    export { columnHeight_1 as columnHeight };
    export function verticalAlignMiddle_1(props?: null): JSX.Element;
    export { verticalAlignMiddle_1 as verticalAlignMiddle };
    export function caretUp_1(props?: null): JSX.Element;
    export { caretUp_1 as caretUp };
    export function caretDown_1(props?: null): JSX.Element;
    export { caretDown_1 as caretDown };
    export function retweet_1(props?: null): JSX.Element;
    export { retweet_1 as retweet };
    export function exclamationCircle_1(props?: null): JSX.Element;
    export { exclamationCircle_1 as exclamationCircle };
}
