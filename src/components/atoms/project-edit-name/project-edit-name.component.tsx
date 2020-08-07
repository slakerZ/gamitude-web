import React, { useState } from "react";
import { connect } from "react-redux";
// Actions
import { setName } from "../../../redux/projects/projects.actions";
// UI Core
import TextField from "@material-ui/core/TextField";

const ProjectEditName = ({
    index,
    setName,
}: {
    index: number;
    setName: Function;
}) => {
    const [text, setText] = useState("");

    const syncWithRedux = (event: any) => {
        setName({
            index: index,
            name: event.target.value,
        });
    };

    return (
        <TextField
            label="PROJECT NAME"
            variant="outlined"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onBlur={syncWithRedux}
        />
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setName: (value: any) => dispatch(setName(value)),
});
export default connect(null, mapDispatchToProps)(ProjectEditName);
