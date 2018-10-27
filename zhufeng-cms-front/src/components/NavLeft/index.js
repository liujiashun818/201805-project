import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import styles from './index.css';
export default class NavLeft extends Component {
    renderMenus = (children) => {
        return children.map(item => {
            if (item.children.length > 0) {
                return (
                    <Menu.SubMenu key={item.key} title={<span><Icon type={item.type} />{item.name}</span>}>
                        {this.renderMenus(item.children)}
                    </Menu.SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}><Icon type={item.type} />{item.name}</Link>
                    </Menu.Item>
                )
            }
        });
    }
    render() {
        let menus = (
            [{
                "id": 1,
                "name": "权限管理",
                "key": "/admin/permission",
                "parent_id": 0,
                "type": "read",
                "children": [{
                    "id": 2,
                    "name": "用户管理",
                    "key": "/admin/user",
                    "parent_id": 1,
                    "type": "read",
                    "children": []
                }, {
                    "id": 3,
                    "name": "资源管理",
                    "key": "/admin/resource",
                    "parent_id": 1,
                    "type": "read",
                    "children": []
                }, {
                    "id": 4,
                    "name": "角色管理",
                    "key": "/admin/role",
                    "parent_id": 1,
                    "type": "read",
                    "children": []
                }]
            }]
        )
        return (
            <Menu
                className={styles.menus}
                mode="inline"
                theme="dark"
                defaultOpenKeys={['/admin/permission']}
                defaultSelectedKeys={[]}
            >
                {
                    this.renderMenus(menus)
                }
            </Menu>
        )
    }
}