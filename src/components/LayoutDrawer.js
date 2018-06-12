import React from 'react';

import {Link} from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import FolderIcon from '@material-ui/icons/Folder';
import PersonIcon from '@material-ui/icons/Person';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

import {withStyles} from '@material-ui/core/styles';

import UploadDialog from "./UploadDialog";

const styles = theme => ({

    toolbarIconButton: {
        marginLeft: -16,
        color: theme.palette.primary.dark
    }
});

class LayoutDrawer extends React.Component {

    state = {
        openUpload: false
    };

    handleUpload = () => {
        this.setState({openUpload: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Toolbar>
                    <IconButton component={Link} to='/' className={classes.toolbarIconButton}>
                        <InsertDriveFile/>
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        Files Fire
                    </Typography>
                </Toolbar>
                <Divider/>
                <ListItem button onClick={() => {
                    this.setState({openUpload: true});
                }}>
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Upload File"/>
                </ListItem>
                <ListItem button component={Link} to='/'>
                    <ListItemIcon>
                        <FolderIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Files"/>
                </ListItem>
                <ListItem button component={Link} to='/settings'>
                    <ListItemIcon>
                        <PersonIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItem>
                <UploadDialog
                    open={this.state.openUpload}
                    onClose={this.handleUpload}/>
            </div>
        );
    }

}

export default withStyles(styles)(LayoutDrawer);