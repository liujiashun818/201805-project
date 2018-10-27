import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Layout, Menu, Card, Form, Input, Row, Col, Avatar, Button, Modal } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
@connect(({ room, login }) => ({ room, login }))
@Form.create()
export default class Room extends Component {
    state = {
        src: '',
        cropperVisible: false //控制剪切窗口的显示与隐藏
    }
    //创建房间
    createRoom = () => {
        let keyword = this.props.form.getFieldValue('keyword');
        this.props.dispatch({
            type: 'room/createRoom',
            payload: keyword
        });
    }
    changeAvatar = (userID) => {
        let that = this;
        let $input = document.createElement('input');
        $input.style.display = 'none';//并不会页面中显示 
        $input.setAttribute('type', 'file');//input类型是文件 
        $input.setAttribute('accept', '*/*');//可以接收的文件类型
        $input.onchange = function (event) {
            let file = event.target.files[0];//得到刚刚选中的文件
            //需要拿到文件的内容，并且把文件内容更新服务器上此用户的头像
            let reader = new FileReader();
            reader.onloadend = function () {
                let src = reader.result;//base64
                //把读取的base64字符串放到状态中，并且弹出模态窗口
                that.setState({ src, cropperVisible: true });
            }
            reader.readAsDataURL(file);//base64字符串
        }
        $input.click();//调用此方法相当于点击了此输入框
    }
    confirmCropper = () => {
        //把裁剪好的图片转成一个base64字符串
        let data = this.cropper.getCroppedCanvas().toDataURL();
        this.props.dispatch({ type: 'login/changeAvatar', payload: { userID: this.props.login.user._id, avatar: data } });
        this.setState({ cropperVisible: false });
    }
    render() {
        let { form: { getFieldDecorator }, room: { list }, login: { user } } = this.props;
        let keyword = this.props.form.getFieldValue('keyword');
        let rooms = list;
        if (keyword && keyword.length > 0)
            rooms = list.filter(item => item.name.indexOf(keyword) != -1);
        return (
            <Layout>
                <Header>
                    <a>珠峰聊天室</a>
                    <span style={{ float: 'right' }}>
                        {
                            user && <Avatar onClick={() => this.changeAvatar(user._id)} src={user.avatar} />
                        }
                    </span>
                </Header>
                <Content>
                    <Card>
                        <Row>
                            <Col span={8} offset={8}>
                                {
                                    getFieldDecorator('keyword')(
                                        <Input placeholder="关键字" />
                                    )
                                }
                            </Col>
                        </Row>
                    </Card>
                    <Card>
                        <Row gutter={18}>
                            {
                                rooms.length > 0 ? rooms.map(room => (
                                    <Col span={6} key={room._id}>
                                        <Card
                                            title={room.name}
                                            extra={<Link to={`/Room/${room._id}`}>进入</Link>}
                                        >
                                            {room.users.map(item => <Avatar src={item.avatar} />)}
                                        </Card>
                                    </Col>
                                )) : <Button onClick={this.createRoom} type="primary">创建房间</Button>
                            }
                        </Row>
                    </Card>
                </Content>
                <Footer>
                    <h3 style={{ textAlign: 'center' }}>珠峰聊天室 @2018</h3>
                </Footer>
                <Modal
                    visible={this.state.cropperVisible}
                    onOk={this.confirmCropper}
                    onCancel={() => this.setState({ cropperVisible: false })}
                >
                    <Cropper
                        ref={instance => this.cropper = instance}
                        src={this.state.src}
                        style={{ height: 400, width: '100%' }}
                        guides={true} />
                    );
                </Modal>
            </Layout>
        )
    }
}