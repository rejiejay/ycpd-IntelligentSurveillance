<!-- 用户/新增编辑 -->
<template>
<div class="user-edit">
    <div class="user-edit-form">
        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">用户类型</div>
                    <el-select v-model="userTypeSection" placeholder="用户类型">
                        <el-option
                            v-for="(item, key) in userTypeOptions"
                            :key="key"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">用户归属</div>

                    <el-input v-if="!userTypeSection || userTypeSection === '0' ||  userTypeSection === '1'" placeholder="请输入用户归属" disabled></el-input>
                    
                    <el-select v-else-if="userTypeSection === '2'" v-model="userBelongSection" placeholder="用户归属">
                        <el-option
                            v-for="(item, key) in userBelongOptions"
                            :key="key"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>

                    <el-row v-else-if="userTypeSection === '3'">
                        <el-col :span="12">
                            <el-select v-model="userBelongSection" placeholder="用户归属">
                                <el-option
                                    v-for="(item, key) in userBelongOptions"
                                    :key="key"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="11">
                            <el-select v-model="teamSection" placeholder="业务团队" :disabled="userBelongSection === ''">
                                <el-option
                                    v-for="(item, key) in teamOptions"
                                    :key="key"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">用户姓名</div>
                    <el-input placeholder="请输入用户姓名" v-model="userRealName"></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">用户代码</div>
                    <el-input placeholder="请输入用户代码" v-model="userCode"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">登录名</div>
                    <el-input placeholder="请输入登录名" v-model="userName" @blur="existName"></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">登录密码</div>
                    <el-input placeholder="请输入登录密码" v-model="password"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">手机号码</div>
                    <el-input placeholder="请输入手机号码" v-model="phone" @blur="existPhone"></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">角色</div>
                    <el-select v-model="rolesSection" placeholder="角色">
                        <el-option
                            v-for="(item, key) in rolesOptions"
                            :key="key"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">状态</div>
                    <el-select v-model="userStatusSection" placeholder="状态">
                        <el-option
                            v-for="item in userStatusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item"></div>
            </el-col>
        </el-row>
    </div>

    <div class="user-edit-operate flex-center">
        <div class="details-operate-container flex-start">
            <el-button type="info" plain @click="$router.back(-1)">取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
// 请求类
import { queryCompanyListUsingGET, queryRoleListUsingGET } from "@/api/system/user";
import { existUserUsingGET, queryUserUsingGET } from "@/api/system/user-edit";

export default {
    name: 'user-edit',

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

            teamSection: '', // 业务团队
            teamOptions: [
                // {
                //     value: '业务团队一',
                //     label: '业务团队一',
                // }
            ],

            userRealName: '', // 用户姓名
            userCode: '', // 用户代码
            userName: '', // 登录名
            isExistUser: true, // 是否存在登录名
            password: '', // 用户密码
            phone: '', // 手机号
            isExistPhone: true, // 是否存在手机号码

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

        }
    },

	mounted: function mounted() {
        this.initPageData(); // 初始化页面数据

        this.queryCompanyList(); // 用户归属下拉框
        this.queryRoleList(); // 用户角色下拉框
    },

	methods: {
        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        initPageData: function initPageData() {
            // 如果 页面状态 存在 userName 表示编辑状态
            let userName = this.$route.query.userName;
            if (userName) {
                this.pageType = 'edit';
                queryUserUsingGET(userName)
                .then(val => {
                    console.log(val)

                }, error => {
                    console.log(error)
                    _this.$router.back(-1);
                });
            }
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
                        value: item,
                        label: item,
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
                        value: item,
                        label: item,
                    }));
                }

            }, error => console.log(error))
        },

        /**
         * 判断添加用户时 手机号 是否已注册
         */
        existPhone: function existPhone() {
            existUserUsingGET(this.userName)
            .then(val => {
                if (val.code === 1001) {
                    this.isExistPhone = false;
                } else {
                    this.isExistPhone = true;
                }
            }, error => console.log(error));
        },

        /**
         * 判断添加用户时 用户名 是否已注册
         */
        existName: function existName() {
            existUserUsingGET(this.phone)
            .then(val => {
                if (val.code === 1001) {
                    this.isExistUser = false;
                } else {
                    this.isExistUser = true;
                }
            }, error => console.log(error));
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

<style rel="stylesheet/scss" lang="scss">
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

.user-edit {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.user-edit-form {
    padding: 15px 15px 0px 15px;

    .details-form-item {
        padding: 7.5px;

        .form-item-title {
            padding-bottom: 10px;
            font-size: 14px;
            color: $black1;
        }
    }

    .el-select {
        width: 100%;
    }
}

.user-edit-operate {
    padding: 15px 15px 35px 15px;
}

</style>
