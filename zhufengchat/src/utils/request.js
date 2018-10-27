import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
//响应体里code=0成功code!=0失败
function checkCode(data) {
  if (data.code == 0) {
    return data;
  }

  const error = new Error(data.error);
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const API_HOST = 'http://localhost:3000';
export default function request(url, options) {
  return fetch(API_HOST + url, {
    ...options,
    credentials: 'include'//只有加上了这个参数的话，客户端才能给服务器端发送cookie
  }).then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch(err => ({ err }));
  //{ code: 0, data: '验证码发送成功' }
  // '验证码发送成功'
}
