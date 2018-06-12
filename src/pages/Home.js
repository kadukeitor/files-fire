import React from 'react';

import Layout from '../components/Layout';
import FilesTable from '../components/FilesTable';

class Home extends React.Component {

    render() {
        return (
            <Layout>
                <FilesTable/>
            </Layout>
        );
    }

}

export default Home;