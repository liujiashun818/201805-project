const DOMAIN = 'http://localhost:3000';
export function get(url){
   //json方法是把响应体转成json
  return fetch(DOMAIN+url,{
    method:'GET',
    //必须指定参数才能发送cookie
    credentials:'include',
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
  }).then(response=>response.json());
}

export function post(url,data){
  return fetch(DOMAIN+url,{
      method:'POST',
      credentials:'include',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
      },
      body:JSON.stringify(data)
  }).then(response=>response.json());
}