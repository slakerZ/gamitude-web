export interface CustomDialogPropType {
    open: boolean;
    setOpen: (value: boolean) => null;
    title: string;
    onSubmit: () => null;
}
