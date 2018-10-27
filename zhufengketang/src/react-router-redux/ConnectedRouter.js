import React,{Component} from 'react';
import {Router} from 'react-router';
import PropTypes from 'prop-types';
import {LOCATION_CHANGE} from './reducer';
export default class ConnectedRouter extends Component{
    //this.context.store
    static contextTypes = {
        store: PropTypes.object
      };    
    handleLocationChange = (location)=>{
        this.context.store.dispatch({
            type:LOCATION_CHANGE,
            payload:location// pathname
        });
    }
    componentWillMount(){
        this.props.history.listen(this.handleLocationChange);
    }
    render(){
        return <Router {...this.props}/>
    }
}