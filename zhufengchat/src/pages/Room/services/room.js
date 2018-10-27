import request from '../../../utils/request';

export function getRooms() {
    return request('/room/list');
}

export function createRoom(name) {
    return request('/room/create', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
}