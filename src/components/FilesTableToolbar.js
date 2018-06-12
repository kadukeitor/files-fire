import React from 'react';

import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Input from '@material-ui/core/Input';

import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
    flex: {
        flex: 1,
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    primary: {
        color: theme.palette.primary.dark
    }
});

class FilesTableToolbar extends React.Component {

    state = {
        search: ''
    };

    handleSearch(search) {
        this.setState({search: search});
        this.props.onSearch(search);
    }

    render() {
        const {classes} = this.props;
        return (
            <Toolbar className={classes.root}>
                <Typography variant="headline" component="h1">
                    Files
                </Typography>
                <div className={classes.flex}/>
                <FormControl>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <SearchIcon className={classes.primary}/>
                        </Grid>
                        <Grid item>
                            <Input
                                type="search"
                                placeholder="Search File"
                                value={this.state.search}
                                onChange={(event) => {
                                    this.handleSearch(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormControl>
            </Toolbar>
        );
    }

}

export default withStyles(styles)(FilesTableToolbar);
