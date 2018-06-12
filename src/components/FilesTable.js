import React from 'react';

import PropTypes from 'prop-types';
import bytes from 'bytes';

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import LinearProgress from '@material-ui/core/LinearProgress';

import FileMenu from "./FileMenu";
import FileIcon from "./FileIcon";
import FilesAddButton from "./FilesAddButton";
import FilesTableToolbar from "./FilesTableToolbar";

import {withStyles} from '@material-ui/core/styles';

import Firebase, {firestore} from "../services/Firebase";

const styles = theme => ({
    root: {
        width: '100%',
    },
    table: {},
    tableWrapper: {
        overflowX: 'auto',
    },
    tableRowName: {
        paddingRight: 0
    },
    tableRowNameIcon: {
        paddingRight: 16,
        color: theme.palette.primary.dark
    },
    tableRowNameText: {
        paddingTop: 5
    },
    notFound: {
        paddingTop: 32
    },
    notFoundImage: {
        width: 320,
        opacity: 0.5
    }
});

class FilesTable extends React.Component {

    state = {
        files: [],
        filesSource: [],
        ready: false,
        search: ''
    };

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        const currentUser = Firebase.auth().currentUser;
        this.unsubscribe = firestore().collection(`users/${currentUser.uid}/files`).orderBy("created", "desc")
            .onSnapshot((querySnapshot) => {
                let files = [];
                querySnapshot.forEach((doc) => {
                    let file = doc.data();
                    file.sizeHuman = bytes(file.size, {unitSeparator: ' '});
                    file.modifiedHuman = new Date(file.modified).toLocaleString();
                    files.push(Object.assign({id: doc.id}, file));
                });
                this.setState({files: files, filesSource: files, ready: true});
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSearch(search) {
        if (search) {
            this.setState({
                files: this.state.filesSource.filter(file => {
                    return file.name.indexOf(search) > -1
                })
            });
        } else {
            this.setState({files: this.state.filesSource});
        }
    }

    render() {
        const {classes} = this.props;
        return (
            this.state.ready ?
                <div className={classes.root}>
                    <FilesTableToolbar onSearch={this.handleSearch}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <Hidden xsDown smDown>
                                        <TableCell>Last modified</TableCell>
                                    </Hidden>
                                    <Hidden xsDown>
                                        <TableCell>File size</TableCell>
                                    </Hidden>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.files.map(file => {
                                    return (
                                        <TableRow key={file.id}>
                                            <TableCell className={classes.tableRowName}>
                                                <Grid container direction={'row'}>
                                                    <Grid item className={classes.tableRowNameIcon}>
                                                        <FileIcon type={file.type}/>
                                                    </Grid>
                                                    <Grid item
                                                          className={classes.tableRowNameText}>{file.name}</Grid>
                                                </Grid>
                                            </TableCell>
                                            <Hidden xsDown smDown>
                                                <TableCell>{file.modifiedHuman}</TableCell>
                                            </Hidden>
                                            <Hidden xsDown>
                                                <TableCell>{file.sizeHuman}</TableCell>
                                            </Hidden>
                                            <TableCell numeric>
                                                <FileMenu file={file}/>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <FilesAddButton/>
                </div>
                :
                <LinearProgress/>
        );
    }

}

FilesTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilesTable);