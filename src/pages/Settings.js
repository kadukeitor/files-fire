import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Layout from '../components/Layout';

import {withUserContext} from "../contexts/User";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        textAlign: 'center',
        padding: theme.spacing.unit * 2
    },
});

class Settings extends React.Component {

    render() {
        const {user, classes} = this.props;
        return (
            <Layout>
                <div className={classes.root}>
                    <Toolbar>
                        <Typography variant="headline" component="h1">
                            Settings
                        </Typography>
                    </Toolbar>
                    <List>
                        <ListItem>
                            <ListItemText primary="Name" secondary={user.displayName}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Personal email" secondary={user.email}/>
                        </ListItem>
                    </List>
                </div>
            </Layout>
        );
    }

}

export default withUserContext(withStyles(styles)(Settings));