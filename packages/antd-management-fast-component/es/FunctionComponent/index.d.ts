export function buildPageHeaderTitle(pageName: any, headerTitlePrefix: any): JSX.Element;
/**
 * 构建按钮
 */
export function buildButton({ key: keySource, type: typeSource, size: sizeSource, text: textSource, icon: iconSource, handleClick: handleClickSource, hidden: hiddenSource, danger: dangerSource, disabled: disabledSource, confirm: confirmSource, handleData: handleDataSource, processing: processingSource, iconProcessing: iconProcessingSource, style: styleSource, showIcon: showIconSource, }: {
    key?: null | undefined;
    type?: string | undefined;
    size?: string | undefined;
    text?: string | undefined;
    icon?: any;
    handleClick?: (() => void) | undefined;
    hidden?: boolean | undefined;
    danger?: boolean | undefined;
    disabled?: boolean | undefined;
    confirm?: boolean | undefined;
    handleData?: null | undefined;
    processing?: boolean | undefined;
    iconProcessing?: any;
    style?: null | undefined;
    showIcon?: boolean | undefined;
}): JSX.Element | null;
export function buildDropdownButton({ key, tooltip, placement, type: typeSource, size, text, icon, handleData: r, arrow, disabled, hidden, confirm, handleButtonClick, handleMenuClick, items, itemPanelTitle, }: {
    key?: any;
    tooltip?: boolean | undefined;
    placement?: string | undefined;
    type?: string | undefined;
    size?: string | undefined;
    text?: string | undefined;
    icon?: any;
    handleData: any;
    arrow?: boolean | undefined;
    disabled?: boolean | undefined;
    hidden?: boolean | undefined;
    confirm?: boolean | undefined;
    handleButtonClick?: null | undefined;
    handleMenuClick?: (() => void) | undefined;
    items?: any[] | undefined;
    itemPanelTitle?: string | undefined;
}): JSX.Element | null;
export function buildDropdownEllipsis({ key, tooltip, type: typeSource, size, icon, arrow, disabled, hidden, handleData: r, handleMenuClick, items, itemPanelTitle, }: {
    key?: any;
    tooltip?: {
        placement: string;
        title: string;
    } | undefined;
    type?: string | undefined;
    size?: string | undefined;
    icon?: JSX.Element | undefined;
    arrow?: boolean | undefined;
    disabled?: boolean | undefined;
    hidden?: boolean | undefined;
    handleData: any;
    handleMenuClick?: (() => void) | undefined;
    items?: any[] | undefined;
    itemPanelTitle?: string | undefined;
}): JSX.Element | null;
export function buildDropdown({ key, tooltip: tooltipSource, type: typeSource, placement: placementDropdown, size, text, icon, handleData: r, arrow, disabled, hidden, handleButtonClick, handleMenuClick, items, itemPanelTitle, confirm, processing, iconProcessing, }: {
    key?: any;
    tooltip?: boolean | undefined;
    type?: string | undefined;
    placement?: string | undefined;
    size?: string | undefined;
    text?: string | undefined;
    icon?: any;
    handleData: any;
    arrow?: boolean | undefined;
    disabled?: boolean | undefined;
    hidden?: boolean | undefined;
    handleButtonClick?: null | undefined;
    handleMenuClick?: (() => void) | undefined;
    items?: any[] | undefined;
    itemPanelTitle?: string | undefined;
    confirm?: boolean | undefined;
    processing?: boolean | undefined;
    iconProcessing?: any;
}, ...args: any[]): JSX.Element | null;
export function buildMenu({ handleData: r, handleMenuClick, items, }: {
    handleData: any;
    handleMenuClick?: (() => void) | undefined;
    items?: any[] | undefined;
}): JSX.Element;
export function buildTree(props: any): JSX.Element;
export function buildAlert(props: any): JSX.Element;
export function buildCustomGrid({ key, list, props }: {
    key?: null | undefined;
    list: any;
    props: any;
}): JSX.Element | null;
export function buildDescriptionGrid({ key, list, props }: {
    key?: null | undefined;
    list: any;
    props: any;
}): JSX.Element | null;
export function buildPageHeaderContent({ list }: {
    list: any;
}): JSX.Element | null;
export function buildPageHeaderTagWrapper(Tags: any): JSX.Element;
export function pageHeaderExtraContent(data: any): JSX.Element | null;
export function buildMenuHeaderRender({ logoDom, collapsed, navTheme, shortName, }: {
    logoDom: any;
    collapsed: any;
    navTheme: any;
    shortName: any;
}): JSX.Element;
export function buildButtonGroup({ buttons }: {
    buttons?: any[] | undefined;
}): JSX.Element | null;
export function buildListViewItemExtra({ align, index, imageUrl, emptyImageUrl, width, }: {
    align: any;
    index: any;
    imageUrl: any;
    emptyImageUrl: any;
    width?: string | undefined;
}): JSX.Element;
export function buildTagList({ list }: {
    list?: any[] | undefined;
}): JSX.Element | null;
export function buildIconInfoList({ list }: {
    list?: any[] | undefined;
}): JSX.Element[];
export function buildListViewItemActionSelect({ index, confirm, selectData, selectCallback, }: {
    index: any;
    confirm?: boolean | undefined;
    selectData: any;
    selectCallback: any;
}): JSX.Element | null;
export function buildRadioGroup({ value, defaultValue, style, button, buttonStyle, list, adjustListDataCallback, onChange, }: {
    value?: null | undefined;
    defaultValue?: null | undefined;
    style?: null | undefined;
    button?: boolean | undefined;
    buttonStyle?: null | undefined;
    list: any;
    adjustListDataCallback?: null | undefined;
    onChange?: null | undefined;
}): JSX.Element;
export function buildRadioItem({ button, list, adjustListDataCallback, }: {
    button?: boolean | undefined;
    list: any;
    adjustListDataCallback?: null | undefined;
}): any[] | null;
/**
 *build custom radio group
 */
export function buildCustomRadio({ label, value, separator, size, renderItemFunction, onChangeCallback, otherProps, }: {
    label: any;
    value?: null | undefined;
    separator?: string | undefined;
    size?: string | undefined;
    renderItemFunction: any;
    onChangeCallback?: null | undefined;
    otherProps?: null | undefined;
}): JSX.Element;
export function buildFormRadio({ label, name, renderItemFunction, helper, onChangeCallback, formItemLayout, required, otherProps, }: {
    label: any;
    name: any;
    renderItemFunction: any;
    helper?: null | undefined;
    onChangeCallback?: null | undefined;
    formItemLayout?: null | undefined;
    required?: boolean | undefined;
    otherProps?: null | undefined;
}): JSX.Element;
export function buildOptionItem({ list, adjustListDataCallback }: {
    list: any;
    adjustListDataCallback?: null | undefined;
}): any[] | null;
export function buildCustomSelect({ label, value, separator, size, renderItemFunction, onChangeCallback, otherProps, }: {
    label: any;
    value?: null | undefined;
    separator?: string | undefined;
    size?: string | undefined;
    renderItemFunction: any;
    onChangeCallback?: null | undefined;
    otherProps?: null | undefined;
}): JSX.Element;
export function buildTreeSelect({ value: v, placeholder, onChangeCallback, otherProps, listData, dataConvert, }: {
    value: any;
    placeholder?: string | undefined;
    onChangeCallback?: null | undefined;
    otherProps?: {} | undefined;
    listData?: any[] | undefined;
    dataConvert?: null | undefined;
}): JSX.Element;
export function buildFormSelect({ label, name, renderItemFunction, helper, onChangeCallback, formItemLayout, required, otherProps, }: {
    label: any;
    name: any;
    renderItemFunction: any;
    helper?: null | undefined;
    onChangeCallback?: null | undefined;
    formItemLayout?: null | undefined;
    required?: boolean | undefined;
    otherProps?: null | undefined;
}): JSX.Element;
export function buildSearchFormSelect({ label, name, options, helper }: {
    label: any;
    name: any;
    options: any;
    helper?: null | undefined;
}): JSX.Element;
export function buildFormNowTimeField({ label, helper, formItemLayout, }: {
    label?: string | undefined;
    helper?: string | undefined;
    formItemLayout?: null | undefined;
}): JSX.Element;
export function buildFormCreateTimeField({ name, helper, label, formItemLayout, }: {
    name?: string | undefined;
    helper?: string | undefined;
    label?: string | undefined;
    formItemLayout?: null | undefined;
}): JSX.Element;
export function buildFormUpdateTimeField({ name, helper, label, formItemLayout, }: {
    name?: string | undefined;
    helper?: string | undefined;
    label?: string | undefined;
    formItemLayout?: null | undefined;
}): JSX.Element;
export function buildSearchInput({ label, name, helper, icon, inputProps, canOperate, formItemLayout, }: {
    label: any;
    name: any;
    helper?: null | undefined;
    icon?: any;
    inputProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildSearchInputNumber({ label, name, helper, icon, inputProps, canOperate, formItemLayout, }: {
    label: any;
    name: any;
    helper?: null | undefined;
    icon?: any;
    inputProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormDisplay({ label, content, formItemLayout, useDisplayBoxStyle, }: {
    label: any;
    content: any;
    formItemLayout?: {} | undefined;
    useDisplayBoxStyle?: boolean | undefined;
}): JSX.Element;
export function buildFormHiddenWrapper({ children, hidden }: {
    children: any;
    hidden?: boolean | undefined;
}): JSX.Element;
export function buildFormInputFieldData({ fieldData, required, icon, inputProps, canOperate, formItemLayout, reminderPrefix, hidden, }: {
    fieldData: any;
    required?: boolean | undefined;
    icon?: any;
    inputProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
    reminderPrefix?: string | undefined;
    hidden?: boolean | undefined;
}): JSX.Element;
export function buildFormInput({ label, name, required, helper, icon, inputProps, canOperate, formItemLayout, reminderPrefix, hidden, }: {
    label: any;
    name: any;
    required?: boolean | undefined;
    helper?: null | undefined;
    icon?: any;
    inputProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
    reminderPrefix?: string | undefined;
    hidden?: boolean | undefined;
}): JSX.Element;
export function buildFormSwitch({ label, name, required, helper, otherProps, canOperate, formItemLayout, hidden, }: {
    label: any;
    name: any;
    required?: boolean | undefined;
    helper?: null | undefined;
    otherProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
    hidden?: boolean | undefined;
}): JSX.Element;
export function buildFormPassword({ label, name, required, helper, icon, inputProps, canOperate, formItemLayout, }: {
    label: any;
    name: any;
    required?: boolean | undefined;
    helper?: null | undefined;
    icon?: any;
    inputProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormOnlyShowText({ label, value, helper, formItemLayout, requiredForShow, }: {
    label: any;
    value: any;
    helper?: null | undefined;
    formItemLayout?: {} | undefined;
    requiredForShow?: boolean | undefined;
}): JSX.Element;
export function buildSyntaxHighlighter({ language, value, other }: {
    language: any;
    value: any;
    other?: {} | undefined;
}): JSX.Element;
export function buildJsonView({ value, theme }: {
    value: any;
    theme?: string | undefined;
}): JSX.Element;
export function buildFormInnerComponent({ label, innerComponent, helper, formItemLayout, requiredForShow, }: {
    label: any;
    innerComponent: any;
    helper?: null | undefined;
    formItemLayout?: {} | undefined;
    requiredForShow?: boolean | undefined;
}): JSX.Element;
export function buildFormActionItem({ component, formItemLayout }: {
    component: any;
    formItemLayout?: {} | undefined;
}): JSX.Element | null;
export function buildFormButton({ config, formItemLayout }: {
    config: any;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormOnlyShowSyntaxHighlighter({ language, label, value, helper, formItemLayout, requiredForShow, otherProps, }: {
    language: any;
    label: any;
    value: any;
    helper?: null | undefined;
    formItemLayout?: {} | undefined;
    requiredForShow?: boolean | undefined;
    otherProps?: {} | undefined;
}): JSX.Element;
export function buildFormOnlyShowTextarea({ label, value, helper, textAreaProps, formItemLayout, }: {
    label: any;
    value: any;
    helper?: null | undefined;
    textAreaProps?: {
        disabled: boolean;
    } | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormText({ label, value, helper, formItemLayout, }: {
    label: any;
    value: any;
    helper?: null | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormOnlyShowInput({ label, value, helper, icon, inputProps, formItemLayout, }: {
    label: any;
    value: any;
    helper?: null | undefined;
    icon?: any;
    inputProps?: {
        disabled: boolean;
    } | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormInputNumber({ label, name, required, helper, icon, inputNumberProps, canOperate, formItemLayout, }: {
    label: any;
    name: any;
    required?: boolean | undefined;
    helper?: null | undefined;
    icon?: any;
    inputNumberProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormTextArea({ label, name, required, helper, textAreaProps, canOperate, formItemLayout, }: {
    label: any;
    name: any;
    required?: boolean | undefined;
    helper?: null | undefined;
    textAreaProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormDatePicker({ label, name, required, helper, datePickerProps, canOperate, formItemLayout, }: {
    label: any;
    name: any;
    required?: boolean | undefined;
    helper?: null | undefined;
    datePickerProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildFormTimePicker({ label, name, required, helper, timePickerProps, canOperate, formItemLayout, }: {
    label: any;
    name: any;
    required?: boolean | undefined;
    helper?: null | undefined;
    timePickerProps?: {} | undefined;
    canOperate?: boolean | undefined;
    formItemLayout?: {} | undefined;
}): JSX.Element;
export function buildColumnList({ columnList, attachedTargetName }: {
    columnList: any;
    attachedTargetName?: string | undefined;
}): any[];
export function buildColumnItem({ column: columnConfig, attachedTargetName, }: {
    column: any;
    attachedTargetName?: string | undefined;
}): any;
export function buildPlayer({ url, width, height, controls, }: {
    url: any;
    width?: string | undefined;
    height?: string | undefined;
    controls?: boolean | undefined;
}): JSX.Element;
/**
 * 构建彩色文本
 */
export function buildColorText({ canCopy, randomSeed, seedOffset, randomColor, color, textPrefix, textPrefixStyle, text, separator, separatorStyle, wrapperBuilder, }: {
    canCopy?: boolean | undefined;
    randomSeed?: number | undefined;
    seedOffset?: number | undefined;
    randomColor?: boolean | undefined;
    color?: string | undefined;
    textPrefix?: null | undefined;
    textPrefixStyle?: null | undefined;
    text?: string | undefined;
    separator?: string | undefined;
    separatorStyle?: null | undefined;
    wrapperBuilder?: null | undefined;
}): any;
export function adjustTableExpandConfig({ list, config }: {
    list: any;
    config: any;
}): {
    rowExpandable: any;
    expandIcon: ({ expandable: canExpand, expanded, onExpand, record, }: {
        expandable: any;
        expanded: any;
        onExpand: any;
        record: any;
    }) => any;
    expandedRowRender: ((record: any, index: any, indent: any, expanded: any) => JSX.Element) | null;
} | {
    rowExpandable?: undefined;
    expandIcon?: undefined;
    expandedRowRender?: undefined;
} | null;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
