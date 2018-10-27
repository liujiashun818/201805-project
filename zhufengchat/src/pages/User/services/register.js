import request from '../../../utils/request';

export function getCaptcha(mobile) {
  return request(`/user/getCaptcha?mobile=${mobile}`);
}

export function submit(values) {
  return request(`/user/register`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
}