import React, { Component } from 'react';
import './index.less';
import profile from '@/images/profile.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
@connect(state => state.session)
export default class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <img src={profile} />
                {
                    this.props.user ? <a>{this.props.user.username}</a> : <Link to="/login">登录</Link>
                }

            </div>
        )
    }
}