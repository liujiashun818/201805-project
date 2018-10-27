import React, { Component, Fragment } from 'react';
import { Form, Icon, Input, Row, Col, Button, Popover, Progress, Alert, message, Tabs } from 'antd';
import Link from 'umi/link';
import styles from './Login.less';
import { connect } from 'dva';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
@connect(({ login }) => ({ login }))
@Form.create()
export default class Login extends Component {
    state = {
        count: 0,
        type: 'account'
    }
    onSubmit = (e) => {
        e.preventDefault();//阻止默认事件
        let values = this.props.form.getFieldsValue();
        if (this.state.type == 'account') {
            if (!(values.email && values.password)) {
                return message.error('账号和密码必须输入');
            }
        } else {
            if (!(values.mobile && values.captcha)) {
                return message.error('手机号和验证码必须输入');
            }
        }
        this.props.dispatch({
            type: 'login/submit',
            payload: {
                ...values,
                type: this.state.type
            }
        });
    }
    changeLoginMethod = (type) => {
        this.setState({ type });
    }
    getCaptcha = () => {
        //在此调用接口向用户填 写的手机号发送验证码
        let mobile = this.props.form.getFieldValue('mobile');
        if (mobile && /^1\d{10}$/.test(mobile)) {
            this.props.dispatch({
                type: 'register/getCaptcha',
                payload: mobile
            });
        } else {
            return message.error('手机号没有填写或者格式不合法!');
        }

        let number = 59;
        this.setState({
            count: number
        });
        this.timer = setInterval(() => {
            this.setState({
                count: --number
            });
            if (number == 0) {
                clearInterval(this.timer);
            }
        }, 1000);
    }
    render() {
        let { form: { getFieldDecorator } } = this.props;
        return (
            <div className={styles.form}>
                <h3 className={styles.title}>用户登录</h3>
                <Form onSubmit={this.onSubmit} style={{ width: '400px' }} >
                    <Tabs defaultActiveKey="account" onChange={this.changeLoginMethod}>
                        <TabPane tab="账号密码登录" key="account">
                            <FormItem>
                                {
                                    getFieldDecorator('email')(
                                        <Input size="large" prefix={<Icon type="mail" />} placeholder="请输入邮箱" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('password')(
                                        <Input size="large" prefix={<Icon type="lock" />} placeholder="请输入密码" />
                                    )
                                }
                            </FormItem>
                        </TabPane>
                        <TabPane tab="手机号登录" key="mobile">
                            <FormItem>
                                {
                                    getFieldDecorator('mobile')(
                                        <Input size="large" prefix={<Icon type="mobile" />} placeholder="请输入手机号" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                <Row gutter={10}>
                                    <Col span={14}>
                                        {
                                            getFieldDecorator('captcha')(
                                                <Input size="large" placeholder="请输入验证码" />
                                            )
                                        }
                                    </Col>
                                    <Col span={10}>
                                        <Button style={{ width: '100%', display: 'block' }} type="primary" disabled={this.state.count} onClick={this.getCaptcha}>
                                            {
                                                this.state.count ? `${this.state.count} s` : '获取验证码'
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </TabPane>
                    </Tabs>,
                    <FormItem>
                        <Button type="primary" htmlType="submit">登录</Button>
                        <Link className={styles.register} to="/User/Register">前往注册</Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}