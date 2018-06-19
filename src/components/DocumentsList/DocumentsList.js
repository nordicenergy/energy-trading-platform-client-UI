import React from 'react';
import PropTypes from 'prop-types';
import icons from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Spinner from '../Loader/Spinner';
import { formatDate } from '../../services/formatter';

import './DocumentsList.css';
import { SESSION_API_URL } from '../../constants';

class DocumentsList extends React.Component {
    renderTableRows(documents) {
        return documents.map(document => {
            // TODO: Build correct url
            const link = `${SESSION_API_URL}/documents/download/${document.id}`;
            return (
                <tr key={document.id} className="document-list-row">
                    <td>{document.date ? formatDate(document.date) : '-'}</td>
                    <td>
                        <a href={link} download target="_blank">
                            {document.name || '-'}
                        </a>
                    </td>
                    <td>
                        <a href={link} download target="_blank">
                            <div className="document-download-icon">
                                <FontAwesomeIcon icon={icons.faDownload} />
                            </div>
                        </a>
                    </td>
                </tr>
            );
        });
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
            date: PropTypes.number,
            name: PropTypes.string,
            description: PropTypes.string,
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
