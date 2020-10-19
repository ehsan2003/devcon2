import {SnackbarKey} from "notistack";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";
import {dismissNotification} from "@actions/ui";
import React from "react";

const DismissButton = (key: SnackbarKey) => {
    const dispatch = useDispatch();
    return <Button onClick={() => dispatch(dismissNotification(key))}>dismiss</Button>;
};
export default DismissButton;