import request from '@/utils/request';
import querystring from 'querystring';
const ENTITY = 'role';
export function list(pageNum, pageSize, where) {
    let wherestring = querystring.stringify(where);
    return request(`/api/${ENTITY}?pageNum=${pageNum}&pageSize=${pageSize}&${wherestring}`);
}
export function getResource() {
    return request(`/api/${ENTITY}/getResource`);
}
export function getUser() {
    return request(`/api/${ENTITY}/getUser`);
}

export function add(values) {
    return request(`/api/${ENTITY}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
}
export function setResource(values) {
    return request(`/api/${ENTITY}/setResource`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
}
export function setUser(values) {
    return request(`/api/${ENTITY}/setUser`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
}
export function update(values) {
    return request(`/api/${ENTITY}/${values.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    });
}

export function del(id) {
    return request(`/api/${ENTITY}/${id}`, {
        method: 'DELETE'
    });
}

export function delAll(ids) {
    return request(`/api/${ENTITY}/${ids[0]}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ids)
    });
}