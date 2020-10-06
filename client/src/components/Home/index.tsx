import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core";


export interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: 'red'
    }
}));

const Home: React.FC<Props> = (props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            home
        </div>
    );
});

export default Home;