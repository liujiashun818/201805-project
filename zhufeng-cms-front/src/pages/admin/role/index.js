import React, { Component, Fragment } from 'react';
import { Transfer, Icon, Tree, Card, Table, Button, Modal, Form, Input, Radio, message, Popconfirm, Select } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
let Option = Select.Option;
const ENTITY = 'role';
@connect(
    state => ({ ...state[ENTITY], loading: state.loading.models[ENTITY] })
)
export default class Base extends Component {
    save = (payload) => {
        this.props.dispatch({
            type: `${ENTITY}/save`,
            payload
        });
    }
    handleAdd = () => {
        this.save({ editVisible: true, record: { gender: 1 }, isCreate: true });
    }
    handleSave = () => {
        //values = {name:'zfpx',email:"email",gender:1}
        this.editForm.props.form.validateFields((err, values) => {
            if (err) {
                return message.warn('你输入的表单数据不合法!');
            } else {
                this.props.dispatch({
                    type: this.props.isCreate ? `${ENTITY}/add` : `${ENTITY}/update`,
                    payload: values
                });
            }
        });
    }
    handleEdit = (record) => {
        this.save({
            editVisible: true,
            record,
            isCreate: false
        });
    }
    handleDel = (id) => {
        this.props.dispatch({
            type: `${ENTITY}/del`,
            payload: id
        });
    }
    handleDelAll = () => {
        this.props.dispatch({
            type: `${ENTITY}/delAll`,
            payload: this.props.selectedRowKeys
        });
    }
    handleSearch = () => {
        let values = this.searchForm.props.form.getFieldsValue();
        console.log('values', values);
        let where = Object.entries(values).reduce((memo, [key, val]) => {
            if (typeof val == 'undefined') {
                memo[key] = val;
            }
            return memo;
        }, {});
        this.props.dispatch({
            type: `${ENTITY}/fetch`,
            payload: { where }
        });
    }
    //开始给角色分配权限
    setResource = () => {
        let selectedRows = this.props.selectedRows;
        if (selectedRows.length == 1) {
            let record = selectedRows[0];
            this.save({ setResourceVisible: true, record, checkedKeys: record.resourceIds });
        } else {
            message.warn('请选中并且只能选中一个角色!');
        }
    }
    setResourceOk = () => {
        this.props.dispatch({
            type: `${ENTITY}/setResource`
        });
    }
    onSetResourceCheck = (checkedKeys) => {
        this.save({ checkedKeys });
    }

    //开始给角色分配用户
    setUser = () => {
        let selectedRows = this.props.selectedRows;
        if (selectedRows.length == 1) {
            let record = selectedRows[0];
            this.save({ setUserVisible: true, record, targetKeys: record.userIds });
        } else {
            message.warn('请选中并且只能选中一个角色!');
        }
    }
    setUserOk = () => {
        this.props.dispatch({
            type: `${ENTITY}/setUser`
        });
    }
    onSetUserChange = (targetKeys) => {
        this.save({ targetKeys });
    }
    render() {
        let columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                render: (val, record) => (val === 1 ? '男' : '女')
            },
            {
                title: '操作',
                render: (val, record) => {
                    return (
                        <Button.Group>
                            <Button type="warning" icon="edit" onClick={() => this.handleEdit(record)}>编辑</Button>
                            <Popconfirm title="你确定要删除吗?" okText="是" cancelText="否" onConfirm={() => this.handleDel(record.id)}>
                                <Button type="danger" icon="delete">删除</Button>
                            </Popconfirm>
                        </Button.Group>
                    )
                }
            }
        ]
        let { list, editVisible, record, isCreate, selectedRowKeys,
            pageNum, total, loading,
            setResourceVisible, checkedKeys, resources, setUserVisible, targetKeys, users
        } = this.props;
        let rowSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.save({ selectedRowKeys, selectedRows });
            }
        }
        let pagination = {
            current: pageNum,//当前页码
            pageSize: 3,
            total,//总条数
            showQuickJumper: true,
            showTotal: (total) => `共${total}条`,
            onChange: (pageNum, pageSize) => {
                //跳转路径有三种方法
                this.props.dispatch(routerRedux.push(`/admin/${ENTITY}?pageNum=${pageNum}`));
            }
        }
        return (
            <Fragment>
                <Card>
                    <SearchForm
                        wrappedComponentRef={inst => this.searchForm = inst}
                        handleSearch={this.handleSearch} />
                </Card>
                <Card>
                    <Button type="primary" icon="plus-circle" onClick={this.handleAdd}>添加</Button>
                    <Button style={{ marginLeft: 8 }} type="dashed" icon="delete" onClick={this.handleDelAll}>批量删除</Button>
                    <Button style={{ marginLeft: 8 }} type="primary" icon="plus-circle" onClick={this.setResource}>分配权限</Button>
                    <Button style={{ marginLeft: 8 }} type="primary" icon="plus-circle" onClick={this.setUser}>分配用户</Button>
                    <Table
                        columns={columns}
                        dataSource={list}
                        loading={loading}
                        rowKey={record => record.id}
                        rowSelection={rowSelection}
                        pagination={pagination}
                        onRow={record => ({
                            onClick: () => {
                                let index = selectedRowKeys.indexOf(record.id);
                                if (index == -1) {
                                    selectedRowKeys = [...selectedRowKeys, record.id];
                                } else {
                                    selectedRowKeys = selectedRowKeys.filter(key => key != record.id);
                                }
                                this.save({ selectedRowKeys });
                            }
                        })}
                    />
                    <EditModal
                        wrappedComponentRef={inst => this.editForm = inst}
                        visible={editVisible}
                        isCreate={isCreate}
                        record={record}
                        onOk={this.handleSave}
                        onCancel={() => this.save({ editVisible: false })}
                    />
                    <SetResourceModal
                        visible={setResourceVisible}
                        record={record}
                        onOk={this.setResourceOk}
                        checkedKeys={checkedKeys}
                        onCheck={this.onSetResourceCheck}
                        resources={resources}
                        onCancel={() => this.save({ setResourceVisible: false })}
                    />
                    <SetUserModal
                        visible={setUserVisible}
                        record={record}
                        onOk={this.setUserOk}
                        targetKeys={targetKeys}
                        onChange={this.onSetUserChange}
                        users={users}
                        onCancel={() => this.save({ setUserVisible: false })}
                    />
                </Card >
            </Fragment>
        )
    }
}

class SetUserModal extends Component {
    render() {
        let { visible, onOk, onCancel, record, targetKeys, onChange, users } = this.props;
        return (
            <Modal
                title={`为 ${record.name} 分配用户`}
                visible={visible}
                onOk={onOk}
                okText={"确定"}
                cancelText={"取消"}
                onCancel={onCancel}
                destroyOnClose
            >
                <Transfer
                    dataSource={users}
                    targetKeys={targetKeys}
                    titles={["待选用户", "已选用户"]}
                    onChange={onChange}
                    render={row => row.name}
                    rowKey={row => row.id}
                />
            </Modal>
        )
    }
}


class SetResourceModal extends Component {
    renderTree = (children = []) => {
        return children.map(item => {
            if (item.children && item.children.length > 0) {
                return (
                    <Tree.TreeNode title={<span><Icon type={item.type} />{item.name}</span>} key={item.id} >
                        {this.renderTree(item.children)}
                    </Tree.TreeNode>
                )
            } else {
                return <Tree.TreeNode title={<span><Icon type={item.type} />{item.name}</span>} key={item.id} />
            }
        });
    }
    render() {
        let { visible, onOk, onCancel, record, checkedKeys, onCheck, resources } = this.props;

        return (
            <Modal
                title="为角色分权限"
                visible={visible}
                onOk={onOk}
                okText={"确定"}
                cancelText={"取消"}
                onCancel={onCancel}
                destroyOnClose
            >
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    destroyOnClose
                    onCheck={onCheck}
                >
                    <Tree.TreeNode title="平台权限" key={0} disabled>
                        {this.renderTree(resources)}
                    </Tree.TreeNode>
                </Tree>
            </Modal>
        )
    }
}

@Form.create()
class SearchForm extends Component {
    render() {
        let { form: { getFieldDecorator }, handleSearch } = this.props;
        return (
            <Form layout="inline">
                <Form.Item>
                    {
                        getFieldDecorator('name', {})(<Input placeholder="用户名" />)
                    }
                </Form.Item>
                <Form.Item  >
                    {
                        getFieldDecorator('email', {})(<Input placeholder="邮箱" />)
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('gender', {})(<Select onSelect={handleSearch}>
                            <Option value={1}>男</Option>
                            <Option value={0}>女</Option>
                        </Select>)
                    }

                </Form.Item>
                <Form.Item>
                    <Button
                        onClick={handleSearch}
                        icon="search" shape="circle"></Button>
                </Form.Item>
            </Form>
        )
    }
}

//一旦用Form.create()的结果进行装饰了，那么此组件就会获取一个props.form的属性.form有很多个方法
@Form.create()
class EditModal extends Component {
    render() {
        let { visible, form: { getFieldDecorator }, onOk, onCancel, record, isCreate } = this.props;
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        }
        return (
            <Modal
                title={isCreate ? "新增用户" : "编辑用户"}
                visible={visible}
                onOk={onOk}
                okText={"确定"}
                cancelText={"取消"}
                onCancel={onCancel}
                destroyOnClose
            >
                <Form>
                    <Form.Item>
                        {
                            getFieldDecorator('id', {
                                initialValue: record.id
                            })(<Input type="hidden" />)
                        }
                    </Form.Item>
                    <Form.Item label="用户名" {...formItemLayout}>
                        {
                            getFieldDecorator('name', {
                                initialValue: record.name,
                                rules: [
                                    { required: true, message: '请输入用户名' }
                                ]
                            })(<Input placeholder="用户名" />)
                        }
                    </Form.Item>
                    <Form.Item label="邮箱" {...formItemLayout}>
                        {
                            getFieldDecorator('email', {
                                initialValue: record.email,
                                rules: [
                                    { type: 'email', message: '请输入合法的邮箱地址!' },
                                    { required: true, message: '请输入邮箱!' }
                                ]
                            })(<Input placeholder="邮箱" />)
                        }
                    </Form.Item>
                    <Form.Item label="性别" {...formItemLayout}>
                        {
                            getFieldDecorator('gender', {
                                initialValue: record.gender,
                                rules: [
                                    { required: true, message: '请选择性别' }
                                ]
                            })(
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}