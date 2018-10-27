import React, { Fragment } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
export default class UserDetail extends React.Component {
    back = () => {
        //router.push('/users/list');
        //router.go(-1);
        router.goBack();
    }
    render() {
        return (
            <div>
                id:{this.props.match.params.id}
                <button className="btn btn-primary" onClick={this.back}>返回</button>
            </div>
        )
    }
}