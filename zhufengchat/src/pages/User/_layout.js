import React, { Component } from 'react';
import styles from './User.less';
export default class Layout extends Component {
    render() {
        return (
            <div className={styles.main}>
                {this.props.children}
            </div>
        )
    }
}