let reducers = {
    //reducer接收老状态和动作，返回新状态
    add(state, action) {
        return { number: state.number + 1 };
    },
    minus(state, action) {
        return { number: state.number - 1 };
    }
}

let reducers2 = (state, action) => {
    switch (action.type) {
        case 'add':
            return { number: state.number + 1 };
        case 'minus':
            return { number: state.number - 1 };
        default:
            return state;
    }
}