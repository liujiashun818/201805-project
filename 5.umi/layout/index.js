import React, { Fragment } from 'react';
import Link from 'umi/link';
import 'bootstrap/dist/css/bootstrap.css'
export default class Layout extends React.Component {
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">用户管理系统</a>
                        </div>
                        <div>
                            <ul className="nav navbar-nav">
                                <li><Link to="/">首页</Link></li>
                                <li><Link to="/users/list">用户管理</Link></li>
                                <li><Link to="/profile">个人设置</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

