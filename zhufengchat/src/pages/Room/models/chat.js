import router from 'umi/router';
import IO from 'socket.io-client';
export default {

    namespace: 'chat',

    state: {
        room: {},//当前的房间详情
        users: [],//当前房间内的用户列表
        messages: []//当前房间内的消息列表
    },

    subscriptions: {
        //  /Room/xxxx 
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                let regex = /^\/Room\/([^/]+)$/;
                let result = pathname.match(regex);//[/Room/xx,xx]
                if (result) {
                    let userStr = sessionStorage.getItem('user');
                    if (userStr) {
                        let user = JSON.parse(userStr);
                        let roomID = result[1];
                        let payload = { roomID, userID: user._id };
                        let socket = window.socket = IO('http://localhost:3000', {
                            query: payload
                        });
                        socket.on('connect', function () {
                            console.log('连接成功!');
                        });
                        socket.on('disconnect', function () {
                            socket.emit('exit', roomID);
                        });
                        //当客户端收到room消息的时候，roomInfo保存到仓库中
                        socket.on('room', function (payload) {
                            dispatch({ type: 'save', payload });
                        });
                        //客户端需要知道 房间的详情
                        socket.emit('getRoom', roomID);
                        socket.on('message', function (message) {
                            dispatch({ type: 'messageAdded', payload: message });
                        });
                    } else {
                        router.push('/User/Login');
                    }
                }
            });
        },
    },

    effects: {
        *send({ payload }) {
            window.socket.send(payload);
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        messageAdded(state, action) {
            return { ...state, messages: [...state.messages, action.payload] };
        }
    },

};
