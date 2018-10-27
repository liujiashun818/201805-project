import React,{Component} from 'react';
import './index.less';
import profile from '@/images/profile.png';
import NavHeader from '@/components/NavHeader';
import Alert from '@/components/Alert';
import {Link} from 'react-router-dom';
import actions from '@/store/actions/session';
import {connect} from 'react-redux';
@connect(
    state=>state.session,
    actions
)
export default class Reg extends Component{
    handleSubmit = (event)=>{
        let username = this.username.value;
        let password = this.password.value;
        this.props.login({username,password});
    }
    render(){
        return (
            <div className="login">
                <NavHeader title="登录"/>
                <div className="login-bg">
                    <img src={profile}/>
                </div>
                <input ref={ref=>this.username=ref} type="text" placeholder="手机号"/>
                <input  ref={ref=>this.password=ref}type="text"  placeholder="密码"/>
                <Link to="/reg">前往注册</Link>
                <button onClick={this.handleSubmit}>登&nbsp;&nbsp;录</button>
                {
                    (this.props.success||this.props.error)&&(
                        <Alert
                        type={this.props.success?'success':'error'}
                        message={this.props.success||this.props.error}
                       />
                    )
                }
            </div>
        )
    }
}