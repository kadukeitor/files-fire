import React from 'react';

import ImageIcon from '@material-ui/icons/Image';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class FileIcon extends React.Component {
    render() {
        const {type} = this.props;
        let icon = (<InsertDriveFileIcon/>);

        if (type.indexOf('image') > -1) {
            icon = (<ImageIcon/>);
        }

        if (type.indexOf('text') > -1) {
            icon = (<FontDownloadIcon/>);
        }
        return (
            icon
        )
    }
}

export default FileIcon;