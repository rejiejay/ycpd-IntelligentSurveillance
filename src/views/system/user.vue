<!-- 用户设置 -->
<template>
<div class="system-user">
    <!-- 顶部操作按钮 -->
    <div class="system-user-operate flex-start-bottom">

        <div class="user-operate-left flex-rest">
            <el-select v-model="userTypeSection" placeholder="用户类型">
                <el-option
                    v-for="item in userTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-select v-model="userBelongSection" placeholder="用户归属">
                <el-option
                    v-for="(item, key) in userBelongOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-input v-model="userName" type="text" :clearable="true" placeholder="用户姓名"></el-input>
            <el-input v-model="userCode" type="text" :clearable="true" placeholder="用户代码"></el-input>

            <el-select v-model="rolesSection" placeholder="选择角色">
                <el-option
                    v-for="(item, key) in rolesOptions"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-select v-model="userStatusSection" placeholder="用户状态">
                <el-option
                    v-for="item in userStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryUserList();">查询</el-button>
            <el-button icon="el-icon-download" type="success">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>
    
        <div class="user-operate-right">
            <el-button icon="el-icon-plus" type="primary" @click="jumpToRouter('/system/user/details')">添加用户</el-button>
        </div>
    </div>
    
    <!-- 表单部分 -->
    <div class="system-user-table">
        <el-table
            :data="userList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="userType"
                label="用户类型"
            ></el-table-column>
            <el-table-column
                prop="userBelong"
                label="用户归属"
            ></el-table-column>
            <el-table-column
                prop="userRealName"
                label="用户姓名"
            ></el-table-column>
            <el-table-column
                prop="userCode"
                label="员工代码"
            ></el-table-column>
            <el-table-column
                prop="userName"
                label="用户姓名"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="手机号"
            ></el-table-column>
            <el-table-column
                prop="roles"
                label="角色"
            ></el-table-column>
            <el-table-column
                prop="status"
                label="状态"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
            >
                <template slot-scope="scope">
                    <el-button @click="modifierHandle(scope.row)" type="text" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
    <!-- 分页部分 -->
    <div class="system-user-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-count="pageCount"
            :page-size="pageSize"
            @size-change="pageSizeChangeHandle"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>
// 请求类
import { queryUserListUsingPOST, queryRoleListUsingGET } from "@/api/system/user";
import { queryCompanyListUsingGET } from "@/api/subcompany";

export default {
    name: 'system-user',

	data: function data() { 
        return {
            userTypeSection: '', // 用户类型
            userTypeOptions: [
                {
                    value: '0',
                    label: '系统管理员',
                }, {
                    value: '1',
                    label: '分公司管理员',
                }, {
                    value: '2',
                    label: '支公司管理员',
                }, {
                    value: '3',
                    label: '团队经理',
                }
            ],

            userBelongSection: '', // 用户归属
            userBelongOptions: [
                // {
                //     value: '用户归属一',
                //     label: '用户归属一',
                // }
            ],

            userName: '', // 用户姓名
            userCode: '', // 用户代码

            rolesSection: '', // 角色
            rolesOptions: [
                // {
                //     value: '角色一',
                //     label: '角色一',
                // }
            ],

            userStatusSection: '', // 用户状态
            userStatusOptions: [
                {
                    value: '0',
                    label: '有效',
                }, {
                    value: '1',
                    label: '注销',
                }
            ],


            // 用户表单列表
            userList: [
                {
                    userType: '', // 用户类型
                    userBelong: '', // 用户归属
                    userRealName: '', // 用户姓名
                    userCode: '', // 员工代码
                    userName: '', // 用户姓名
                    phone: '', // 手机号
                    roles: '', // 角色
                    status: '', // 状态
                }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageCount: 1, // 一共多少页
            pageSize: 10, // 页码大小
        } 
    },

	mounted: function mounted() {
        this.queryUserList(); // 获取用户列表
        this.queryCompanyList(); // 用户归属下拉框
        this.queryRoleList(); // 用户角色下拉框
    },

	methods: {
        /**
         * 获取用户列表
         */
        queryUserList: function queryUserList() {
            const _this  = this;

            let currentPage = this.currentPage;
            let pageCount = this.pageSize;
            let userType = this.userTypeSection ? this.userTypeSection : ''; // 用户类型
            let bcName = this.userBelongSection ? this.userBelongSection : ''; // 用户归属
            let staffName = this.userName ? this.userName : ''; // 用户姓名
            let staffCode = this.userCode ? this.userCode : ''; // 用户代码
            let roleName = this.rolesSection ? this.rolesSection : ''; // 角色
            let state = this.userStatusSection ? this.userStatusSection : ''; // 状态

            queryUserListUsingPOST(currentPage, pageCount, userType, bcName, staffName, staffCode, roleName, state)
            .then(val => {
                if (val.code === 1001) {
                    return alert('查询数据为空');
                }
                if (val.code === 1002) {
                    return alert('当前页码查询为空');
                }
                if (val.code === 1003) {
                    return alert('查询用户列表异常');
                }

                if (val.code !== 1000) {
                    return alert(val.msg);
                }

                let data = val.data;

                // 初始化一共多少条数据
                _this.pageCount = data.pageSize; 

                // 初始化用户列表
                if (data.users && data.users instanceof Array && data.users.length > 0) {
                    _this.userList = data.users.map(item => {
                        let newItem = {};

                        // 初始化用户类型
                        if (item.userType === 0) {
                            newItem.userType = '系统管理员';
                        } else if (item.userType === 1) {
                            newItem.userType = '分公司管理员';
                        } else if (item.userType === 2) {
                            newItem.userType = '支公司管理员';
                        } else if (item.userType === 3) {
                            newItem.userType = '团队经理';
                        }

                        newItem.userBelong = item.bcName; // 用户归属
                        newItem.userRealName = item.staffName; // 用户姓名
                        newItem.userCode = item.staffCode; // 员工代码
                        newItem.userName = item.userName; // 用户姓名
                        newItem.phone = item.phone; // 手机号
                        newItem.roles = item.roleName; // 角色
                        newItem.status = item.state === 0 ? '正常' : '禁用'; // 状态

                        return newItem;
                    });

                } else {
                    _this.userList = [];

                }

            }, error => console.log(error));
        },

        /**
         * 用户归属下拉框
         */
        queryCompanyList: function queryCompanyList() {
            const _this  = this;

            queryCompanyListUsingGET()
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.userBelongOptions = data.map(item => ({
                        value: item[1],
                        label: item[1],
                    }));
                }

            }, error => console.log(error))
        },

        /**
         * 用户归属下拉框
         */
        queryRoleList: function queryRoleList() {
            const _this  = this;

            queryRoleListUsingGET()
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.rolesOptions = data.map(item => ({
                        value: item[1],
                        label: item[1],
                    }));
                }

            }, error => console.log(error))
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.userTypeSection = null;
            this.userBelongSection = null;
            this.userName = null;
            this.userCode = null;
            this.rolesSection = null;
            this.userStatusSection = null;
            this.currentPage = 1;
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.queryUserList();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryUserList();
        },

        /**
         * 修改一个项
         */
        modifierHandle: function modifierHandle(item) {
            this.jumpToRouter('/system/user/details' , {
                userName: item.userName,
            })
        },

        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        jumpToRouter: function jumpToRouter(url, query) {
            let routerConfig = {
                path: url,
            }

            query ? routerConfig.query = query : null; // 初始化携带的参数 非必填

            this.$router.push(routerConfig);
        },
    },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

.system-user {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.system-user-operate {
    padding: 15px;

    .el-select {
        width: 120px;
        margin-right: 15px;
    }

    .el-date-editor {
        width: 250px;
        margin-right: 15px;
    }

    .el-input {
        width: 140px;
        margin-right: 15px;
    }
}

// 表单部分
.system-user-table {
    padding: 15px;
}

// 分页部分
.system-user-pagination {
    padding: 15px;
}

</style>
