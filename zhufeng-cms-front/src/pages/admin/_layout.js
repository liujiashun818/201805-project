import React, { Component } from 'react';
import { Layout } from 'antd';
import AdminHeader from '@/components/AdminHeader';
import NavLeft from '@/components/NavLeft';
const { Sider, Content, Footer } = Layout;
export default class AdminLayout extends Component {
    render() {
        return (
            <Layout>
                <AdminHeader />
                <Layout>
                    <Sider>
                        <NavLeft />
                    </Sider>
                    <Content>{this.props.children}</Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    珠峰培训 @2018
                </Footer>
            </Layout>
        )
    }
}