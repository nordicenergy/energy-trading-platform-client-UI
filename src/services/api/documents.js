import Axios from 'axios';
import { SESSION_API_URL, LIMIT, DOCUMENT_TYPES } from '../../constants';

export function getDocuments(page = 0) {
    const generateUrl = (document = {}) => {
        const { INVOICE, ARCHIVED } = DOCUMENT_TYPES;

        let url = `${SESSION_API_URL}/documents/download`;
        if (document.type === INVOICE) {
            url += `?invoiceID=${document.id}`;
        }
        if (document.type === ARCHIVED) {
            url += `?archivedDocumentID=${document.id}`;
        }
        return url;
    };

    return Axios.get(`${SESSION_API_URL}/documents`, {
        params: { limit: LIMIT, offset: page * LIMIT }
    }).then(response => {
        const { documents = [] } = response.data;
        response.data.documents = documents.map(d => ({ ...d, url: generateUrl(d) }));
        return response;
    });
}
