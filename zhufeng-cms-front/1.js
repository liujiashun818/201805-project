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
            "children": [{
                "id": 5,
                "name": "新增角色",
                "key": "/admin/role/add",
                "parent_id": 4,
                "type": "gold",
                "children": []
            }]
        }]
    }]
)