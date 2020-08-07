import React from "react";
// UI Core
import Grid from "@material-ui/core/Grid";
// Components
import FormikField from "../formik-field/formik-field.component";

const SignInUpGroup = ({
    field1,
    field2,
}: {
    field1: { label: string; name: string; type: any };
    field2: { label: string; name: string; type: any };
}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <FormikField
                    label={field1.label}
                    name={field1.name}
                    type={field1.type}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormikField
                    label={field2.label}
                    name={field2.name}
                    type={field2.type}
                />
            </Grid>
        </Grid>
    );
};
export default SignInUpGroup;
