import React from 'react';
import PropTypes from 'prop-types';
import icons from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Spinner from '../Loader/Spinner';

import './DocumentsList.css';
import { SESSION_API_URL } from '../../constants';

class DocumentsList extends React.Component {
    renderTableRows(documents) {
        return documents.map(document => (
            <tr key={document.id} className="document-list-row">
                <td>{document.dateOfCreation || '-'}</td>
                <td>{document.Name || '-'}</td>
                <td>
                    <div className="document-download-icon">
                        <a href={`${SESSION_API_URL}${document.link}`} download target="_blank">
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
            <div className="document-list-container">
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
            dateOfCreation: PropTypes.string,
            Name: PropTypes.string,
            link: PropTypes.string,
            id: PropTypes.number.required
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
