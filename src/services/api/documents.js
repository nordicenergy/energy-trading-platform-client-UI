import Axios from 'axios';
import { SESSION_API_URL, LIMIT } from '../../constants';

export function getDocuments(page = 0) {
    // TODO: Remove contractId & invoiceNumber from params and do correct url
    const generateUrl = (document = {}) => {
        if (!['invoice', 'archivedDocument'].includes(document.type)) {
            return null;
        }
        let url = `${SESSION_API_URL}/documents/download?contractId=700`;
        if (document.type === 'invoice') {
            url += `&invoiceNumber=${document.id}`;
        }
        if (document.type === 'archivedDocument') {
            url += `&archivedDocumentID=${document.id}`;
        }
        return url;
    };

    return Axios.get(`${SESSION_API_URL}/documents`, {
        params: { limit: LIMIT, offset: page * LIMIT, contractId: 700 }
    }).then(response => {
        const { documents = [] } = response.data;
        response.data.documents = documents.map(d => ({ ...d, url: generateUrl(d) }));
        return response;
    });
}
