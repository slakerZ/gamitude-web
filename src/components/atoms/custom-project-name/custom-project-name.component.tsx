import React from "react";
// UI Core
import TextField from "@material-ui/core/TextField";

const CustomProjectName = ({ onValueChange }) => {
    const [text, setText] = React.useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleBlur = (event) => {
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
