import Axios from 'axios';
import { SESSION_API_URL } from '../../constants';

export function getItems() {
    return Axios.get(`${SESSION_API_URL}/items`);
}

export function createItem(item) {
    return Axios.post(`${SESSION_API_URL}/items`, item);
}

export function updateItem(updates) {
    return Axios.put(`${SESSION_API_URL}/items`, updates);
}

export function deleteItem(id) {
    return Axios.delete(`${SESSION_API_URL}/items/${id}`);
}
