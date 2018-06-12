import React from 'react';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Google from '../assets/icons/Google';
import SyncImage from '../assets/images/Sync.svg';

import {withRouter} from "react-router-dom";
import {withUserContext} from '../contexts/User';
import {withStyles} from '@material-ui/core/styles';

import Firebase from '../services/Firebase';

const styles = theme => ({
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        margin: 0
    },
    image: {
        maxWidth: 300,
        display: 'block',
        margin: '32px auto'
    },
    side: {
        height: '100%',
    },
    leftSide: {},
    rightSide: {
        backgroundColor: theme.palette.primary.dark
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: "white",
        paddingRight: theme.spacing.unit * 2,
        minWidth: 200
    },
    buttonIcon: {
        fontSize: 32,
        marginLeft: theme.spacing.unit,
        paddingTop: 5
    },
    text: {
        color: theme.palette.primary.contrastText
    }
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
    }

    onSignIn() {
        const {history, user} = this.props;
        if (user) {
            return history.push("/")
        }
        const provider = new Firebase.auth.GoogleAuthProvider();
        Firebase.auth().signInWithPopup(provider).then();
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.root} container>
                <Grid item xs={false} sm={6} className={classes.leftSide}>
                    <Hidden xsDown>
                        <Grid container justify="center" alignItems="center" className={classes.side}>
                            <Grid item>
                                <img className={classes.image} src={SyncImage} alt="Logo"/>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.rightSide}>
                    <Grid container justify="center" alignItems="center" className={classes.side} direction="column"
                          spacing={8}>
                        <Grid>
                            <Typography align="center" gutterBottom variant="display1" className={classes.text}>
                                Let's store your files
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="small" className={classes.button} onClick={this.onSignIn}>
                                <Google
                                    className={classes.buttonIcon}/>
                                Sign in with Google
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

export default withUserContext(withRouter(withStyles(styles)(SignIn)));