import { getDocuments } from '../services/api/documents';

import { dispatcher } from '../store';

export function performGetDocuments(userId) {
    dispatcher.dispatchPromise(getDocuments, 'GET_DOCUMENTS', state => state.Documents.documents.loading, [userId]);
}
