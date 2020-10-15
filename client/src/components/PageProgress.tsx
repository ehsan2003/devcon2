import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {dispatchType} from "@shared/utils";
import {makeStyles} from "@material-ui/styles";
import {LinearProgress, Theme} from "@material-ui/core";
import uiConfiguration from "@conf/ui";

export interface OwnProps {

}

const mapDispatchToProps = {};
const mapStateToProps = (state: RootState) => ({
    progress: state.ui.mainProgress.data.value,
    visible: state.ui.mainProgress.data.visible
});

export interface Props extends ReturnType<typeof mapStateToProps>, OwnProps, dispatchType<typeof mapDispatchToProps> {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        width: '100vw',
        zIndex: theme.zIndex.modal + 1
    }, hidden: {
        backgroundColor: 'transparent'
    }
}));

const PageProgress: React.FC<Props> = (props => {
    const classes = useStyles();
    return props.visible ? <LinearProgress
        className={classes.root} classes={{colorSecondary: classes.hidden}}
        variant={uiConfiguration.pageProgress.variant} color={'secondary'}
        value={props.progress}/> : null;
});

export default connect(mapStateToProps, mapDispatchToProps)(PageProgress);