import Grid from "@material-ui/core/Grid";

export interface FieldType {
    label: string;
    name: string;
    type: string;
    xs: typeof Grid.arguments;
    sm: typeof Grid.arguments;
}

export interface FormikFormPropType {
    initialValues: any;
    schema: any;
    onSubmit: any;
    fields: FieldType[];
    state: any;
    title?: string;
    enableReinitialize?: boolean;
}
