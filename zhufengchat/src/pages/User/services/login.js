import request from '../../../utils/request';

export function submit(values) {
  return request(`/user/login`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
}

export function changeAvatar(values) {
  return request(`/user/changeAvatar`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
}
