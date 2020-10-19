import {SnackbarKey} from "notistack";
import {useDispatch} from "react-redux";
import {Button, ButtonProps} from "@material-ui/core";
import {dismissNotification} from "@actions/ui";
import React from "react";

interface Props extends ButtonProps {
    notificationKey: SnackbarKey;
}

const DismissButton: React.FC<Props> = ({notificationKey, ...buttonProps}) => {
    const dispatch = useDispatch();
    return <Button onClick={() => dispatch(dismissNotification(notificationKey))} {...buttonProps}>dismiss</Button>;
};
export default DismissButton;