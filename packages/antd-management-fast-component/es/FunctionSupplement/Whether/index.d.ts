export function refitWhetherList({ withUnlimited }: {
    withUnlimited?: boolean | undefined;
}): any;
export function getWhetherName({ value, defaultValue }: {
    value: any;
    defaultValue?: string | undefined;
}): any;
export function renderWhetherOption({ withUnlimited, adjustListDataCallback, }: {
    withUnlimited?: boolean | undefined;
    adjustListDataCallback?: null | undefined;
}): any[] | null;
export function renderWhetherRadio({ withUnlimited, adjustListDataCallback, }: {
    withUnlimited?: boolean | undefined;
    adjustListDataCallback?: null | undefined;
}): any[] | null;
export function renderSearchWhetherSelect({ withUnlimited, label, name, helper, }: {
    withUnlimited?: boolean | undefined;
    label?: string | undefined;
    name?: string | undefined;
    helper?: null | undefined;
}): JSX.Element;
export function renderFormWhetherSelect({ helper, onChangeCallback, label, formItemLayout, required, name, otherProps, }: {
    helper?: null | undefined;
    onChangeCallback: any;
    label?: string | undefined;
    formItemLayout?: null | undefined;
    required?: boolean | undefined;
    name?: string | undefined;
    otherProps?: null | undefined;
}): JSX.Element;
export function renderFormWhetherRadio({ helper, onChangeCallback, label, formItemLayout, required, name, otherProps, }: {
    helper?: null | undefined;
    onChangeCallback: any;
    label?: string | undefined;
    formItemLayout?: null | undefined;
    required?: boolean | undefined;
    name?: string | undefined;
    otherProps?: null | undefined;
}): JSX.Element;
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty(): {};
