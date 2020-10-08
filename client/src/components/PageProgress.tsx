import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {dispatchType} from "@shared/utils";
import {makeStyles} from "@material-ui/styles";
import {LinearProgress, Theme} from "@material-ui/core";

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
        position:'fixed',
        width:'100vw'
    },
}));

const PageProgress: React.FC<Props> = (props => {
    const classes = useStyles();
    return props.visible ? <LinearProgress  className={classes.root} variant='determinate' color={'secondary'} value={props.progress}/> : null;
});

export default connect(mapStateToProps, mapDispatchToProps)(PageProgress);