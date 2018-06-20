import { getDocuments } from '../services/api/documents';

import { dispatcher } from '../store';

export function performGetDocuments(page) {
    dispatcher.dispatchPromise(getDocuments, 'GET_DOCUMENTS', state => state.Documents.documentsList.loading, [page]);
}
