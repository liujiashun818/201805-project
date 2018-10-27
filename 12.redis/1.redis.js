let redis = require('redis');
let client = redis.createClient(6379, '127.0.0.1');
client.on('error', function (err) {
    console.log('连接失败');
});
client.set('myname', 'myvalue', redis.print);
client.get('myname', redis.print);
/// let person = {name:'zfpx'};
client.hset('person', 'name', 'zfpx', redis.print);
client.hget('person', 'name', redis.print);
