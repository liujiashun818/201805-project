import React from 'react';
import { connect } from 'dva';
import './App.css';
//css modules
//import { connect } from 'react-redux';
class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="highest">
                    最高记录 {this.props.highest}
                </div>
                <div className="current">
                    当前记录:{this.props.current}
                </div>
                <div className="addButton">
                    <button onClick={() => this.props.dispatch({ type: 'counter/add' })}>+</button>
                    <button onClick={() => this.props.dispatch({ type: 'counter/minus' })}>+</button>
                </div>
            </div>
        )
    }
}
export default connect(
    state => {
        console.log('connect');
        return state.counter;
    }
)(App);