import React,{Component,Fragment} from 'react';
import Tab from '@/components/Tab';
import '@/common/global.less';
import {validate} from '@/api/session';
import store from '@/store';
import * as types from '@/store/action-types';
export default class Layout extends Component{
    componentWillMount(){
        validate().then(payload=>{
            store.dispatch({type:types.SET_SESSION,payload});
        });
    }
    render(){
        return (
            <Fragment>
                {this.props.children}
                <Tab/>
            </Fragment>
        )
    }
}