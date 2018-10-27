import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Layout, Menu, Card, Form, Input, Row, Col, Avatar, Button, List } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
@connect(({ chat }) => ({ chat }))
@Form.create()
export default class Chat extends Component {
    send = () => {
        let content = this.props.form.getFieldValue('content');
        this.props.dispatch({
            type: 'chat/send',
            payload: content
        });
    }
    render() {
        let { form: { getFieldDecorator }, chat: { messages, users } } = this.props;
        return (
            <Layout>
                <Header>
                    <a style={{ float: 'left' }}>珠峰聊天室</a>
                    <Menu
                        style={{ lineHeight: '64px' }}
                        theme={"dark"}
                        mode={"horizontal"}
                        defaultSelectedKeys={[]}
                    >
                        <Menu.Item key="/Room">
                            <Link to="/Room">房间列表</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider>
                        <List
                            dataSource={users}
                            renderItem={item => (
                                <List.Item style={{ padding: 14 }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<span style={{ color: '#FFF' }}>{item.email}</span>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Sider>
                    <Content style={{ height: 500 }}>
                        <Card>
                            <List
                                dataSource={messages}
                                renderItem={item => (
                                    <List.Item >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.user.avatar} />}
                                            title={<span>{item.user.email}</span>}
                                            description={item.content}
                                        />
                                        <div>{item.createAt.toLocaleString()}</div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                        <Card>
                            <Row gutter={18}>
                                <Col span={22}>
                                    {
                                        getFieldDecorator('content')(<Input placeholder="请输入聊天内容" />)
                                    }
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" onClick={this.send}>发言</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}