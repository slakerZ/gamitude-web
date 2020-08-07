import React from "react";
// UI Core
import TextField from "@material-ui/core/TextField";

const CustomProjectName = ({ onValueChange }: { onValueChange: Function }) => {
    const [text, setText] = React.useState("");

    const handleChange = (event: { target: { value: string } }) => {
        setText(event.target.value);
    };

    const handleBlur = (event: { target: { value: string } }) => {
        onValueChange(event.target.value);
    };

    return (
        <TextField
            label="PROJECT NAME"
            variant="outlined"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
};

export default CustomProjectName;
