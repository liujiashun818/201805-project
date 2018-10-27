import React, { Component, Fragment } from 'react';
import { Form, Icon, Input, Row, Col, Button, Popover, Progress, Alert, message } from 'antd';
import Link from 'umi/link';
import styles from './Register.less';
import { connect } from 'dva';
const FormItem = Form.Item;

@connect(({ register }) => ({ register }))
@Form.create()
export default class Register extends Component {
    state = {
        count: 0
    }
    onSubmit = (e) => {
        e.preventDefault();//阻止默认事件
        //检验所有的字段输入是否合法
        this.props.form.validateFields((err, values) => {
            if (err) {
                message.error(err);
            } else {
                console.log('values', values);
                this.props.dispatch({
                    type: 'register/submit',
                    payload: values
                });
            }
        });
    }
    getPasswordStatus = () => {
        let password = this.props.form.getFieldValue('password');
        let status = <Alert message="密码强度: 弱" type="error" />;
        if (password && password.length > 0) {
            if (password.length >= 9) {
                status = <Alert message="密码强度: 强" type="success" />;
            } else if (password.length >= 6) {
                status = <Alert message="密码强度: 中" type="warning" />;
            }
        }
        return status;
    }
    getPasswordBar = () => {
        let password = this.props.form.getFieldValue('password') || '';
        return (
            <Progress percent={password.length * 10} showInfo={true} />
        )
    }
    checkRepassword = (rule, value, callback) => {
        let password = this.props.form.getFieldValue('password') || '';
        if (password == value) {
            callback();
        } else {
            callback('两次输入的密码不一致!');
        }
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

        let number = 5;
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
                <h3 className={styles.title}>用户注册</h3>
                <Form onSubmit={this.onSubmit} style={{ width: '400px' }} >
                    <FormItem>
                        {
                            getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: '邮箱必须输入!'
                                    },
                                    {
                                        type: 'email',
                                        message: '请输入合法的邮箱地址'
                                    }
                                ]
                            })(
                                <Input size="large" prefix={<Icon type="mail" />} placeholder="请输入邮箱" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Popover placement="right" content={
                            <div>
                                {this.getPasswordStatus()}
                                {this.getPasswordBar()}
                                <p style={{ marginTop: 10 }}>请尽量输入六位以上的密码!</p>
                            </div>
                        } >
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码必须输入!'
                                        }
                                    ]
                                })(
                                    <Input size="large" prefix={<Icon type="lock" />} placeholder="请输入密码" />
                                )
                            }
                        </Popover>
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('repassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: '确认密码必须输入!'
                                    },
                                    {
                                        validator: this.checkRepassword
                                    }
                                ]
                            })(
                                <Input size="large" prefix={<Icon type="lock" />} placeholder="请输入确认密码" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('mobile', {
                                rules: [
                                    {
                                        required: true,
                                        message: '手机号必须输入!'
                                    }
                                ]
                            })(
                                <Input size="large" prefix={<Icon type="mobile" />} placeholder="请输入手机号" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Row gutter={10}>
                            <Col span={14}>
                                {
                                    getFieldDecorator('captcha', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '手机号必须输入!'
                                            }
                                        ]
                                    })(
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
                    <FormItem>
                        <Button type="primary" htmlType="submit">注册</Button>
                        <Link className={styles.login} to="/User/Login">前往登录</Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}