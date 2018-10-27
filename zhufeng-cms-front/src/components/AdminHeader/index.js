import React, { Component } from 'react';
import { Layout } from 'antd';
import logo from '@/assets/logo.png';
import styles from './index.css';//css modules
const { Header } = Layout;
export default class AdminHeader extends Component {
    render() {
        return (
            <Header>
                <img src={logo} alt="logo" />
                <span className={styles.welcome}>欢迎光临 张三</span>
            </Header>
        )
    }
}