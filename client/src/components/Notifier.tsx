import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/index";
import {SnackbarKey, useSnackbar} from "notistack";
import {removeNotification} from "@actions/ui";

let displayed: SnackbarKey[] = [];

const Notifier: React.FC = (() => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: RootState) => state.ui.notifications.data);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const storeDisplayed = (key: SnackbarKey) =>
        displayed = [...displayed, key];
    const removeDisplayed = (removeKey: SnackbarKey) =>
        displayed = displayed.filter(key => key !== removeKey);
    useEffect(() => {
        notifications.forEach(({message, key, options, dismissed}) => {
            if (dismissed) {
                closeSnackbar(key);
                return;
            }
            if (displayed.includes(key)) return;
            enqueueSnackbar(message, {
                ...options,
                key,
                onClose: ((event, reason, key1) => options?.onClose?.(event, reason, key1)),
                onExit: (node, myKey) => {
                    dispatch(removeNotification(myKey));
                    removeDisplayed(myKey);
                }
            });
            storeDisplayed(key);
        });
    }, [notifications, dispatch, enqueueSnackbar, closeSnackbar]);
    return null;
});

export default Notifier;