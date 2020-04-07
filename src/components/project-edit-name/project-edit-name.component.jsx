import React, { useState } from "react";
import { connect } from "react-redux";
// Actions
import { setName } from "../../redux/projects/projects.actions";
// UI Core
import TextField from "@material-ui/core/TextField";

const ProjectEditName = ({ index, setName }) => {
    const [text, setText] = useState("");

    const syncWithRedux = event => {
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
            onChange={event => setText(event.target.value)}
            onBlur={syncWithRedux}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    setName: value => dispatch(setName(value)),
});
export default connect(null, mapDispatchToProps)(ProjectEditName);
