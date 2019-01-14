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
                    v-for="item in userBelongOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-input v-model="userName" type="text" :clearable="true" placeholder="用户姓名"></el-input>
            <el-input v-model="userCode" type="text" :clearable="true" placeholder="用户代码"></el-input>

            <el-select v-model="rolesSection" placeholder="选择角色">
                <el-option
                    v-for="item in rolesOptions"
                    :key="item.value"
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

            <el-button icon="el-icon-search" type="primary" @click="searchByConditions">查询</el-button>
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
            :page-size="pageSize"
            :total="pageTotal"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>

export default {
    name: 'system-user',

	data: function data() { 
        return {
            userTypeSection: '', // 用户类型
            userTypeOptions: [
                {
                    value: '用户类型一',
                    lable: '用户类型一',
                }
            ],

            userBelongSection: '', // 用户归属
            userBelongOptions: [
                {
                    value: '用户归属一',
                    lable: '用户归属一',
                }
            ],

            userName: '', // 用户姓名
            userCode: '', // 用户代码

            rolesSection: '', // 角色
            rolesOptions: [
                {
                    value: '角色一',
                    lable: '角色一',
                }
            ],

            userStatusSection: '', // 用户状态
            userStatusOptions: [
                {
                    value: '有效',
                    lable: '有效',
                }, {
                    value: '注销',
                    lable: '注销',
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
            pageSize: 20, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        } 
    },

	mounted: function mounted() {},

	methods: {
        /**
         * 通过条件查询
         */
        searchByConditions: function searchByConditions() {
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.startendTime = [
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 31),
                new Date(),
            ];

            this.subCompanySection = null;
            this.teamSection = null;
            this.regionSection = null;
            this.minProportion = null;
            this.maxProportion = null;
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            console.log(item);
        },

        /**
         * 修改一个项
         */
        modifierHandle: function modifierHandle(item) {
            this.jumpToRouter('/system/user/details' , {
                id: null,
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
