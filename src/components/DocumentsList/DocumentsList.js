import React from 'react';
import PropTypes from 'prop-types';
import icons from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Spinner from '../Loader/Spinner';
import { formatDate } from '../../services/formatter';

import './DocumentsList.css';

class DocumentsList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    renderTableRows(documents) {
        return documents.map(document => (
            <tr key={document.id} className="document-list-row">
                <td>{formatDate(document.date)}</td>
                <td>{document.description || '-'}</td>
                <td>
                    <div className="document-download-icon">
                        <a href={document.url}>
                            <FontAwesomeIcon icon={icons.faDownload} />
                        </a>
                    </div>
                </td>
            </tr>
        ));
    }

    render() {
        const { pagination, loading, documents } = this.props;

        return (
            <div role="table" className="document-list-container">
                <table>
                    <tbody>{this.renderTableRows(documents)}</tbody>
                </table>
                {pagination && (
                    <div role="progressbar" aria-hidden={!loading} className="document-list-loader">
                        {loading && <Spinner size="sm" color="#30acc1" />}
                    </div>
                )}
            </div>
        );
    }
}

DocumentsList.propTypes = {
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.number,
            description: PropTypes.string,
            url: PropTypes.string,
            id: PropTypes.string.required
        })
    ),
    pagination: PropTypes.bool,
    loading: PropTypes.bool
};

DocumentsList.defaultProps = {
    documents: [],
    pagination: false,
    loading: false
};

export default DocumentsList;
