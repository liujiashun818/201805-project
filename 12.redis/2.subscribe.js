let redis = require('redis');
let client1 = redis.createClient(6379, '127.0.0.1');
let client2 = redis.createClient(6379, '127.0.0.1');
//客户端1订阅了频道food 和频道drink
client1.subscribe('food');
client1.subscribe('drink');
//监听这二个频道的消息
client1.on('message', function (channel, message) {
    console.log('client1', channel, message);
    client1.unsubscribe('food');
});

client2.publish('food', '有面包1吃了');
client2.publish('drink', '有可乐1了');
setTimeout(function () {
    client2.publish('food', '有面包2吃了');
    client2.publish('drink', '有可乐2了');
}, 1000)