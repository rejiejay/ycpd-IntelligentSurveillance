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
                    <div class="form-item-title">员工姓名</div>
                    <el-input placeholder="请输入员工姓名" v-model="userRealName"></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">员工代码</div>
                    <el-input placeholder="请输入员工代码" v-model="userCode"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">登录名</div>
                    <!-- <el-input placeholder="请输入登录名" v-model="userName" @blur="existName"></el-input> -->
                    <el-input placeholder="请输入登录名" v-model="userName" ></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">新登录密码</div>
                    
                    <el-input placeholder="请输入新的密码" v-model="password" v-if="pageType === 'add'"></el-input>
                    <el-row v-else>
                        <el-col :span="18">
                            <el-input placeholder="请输入新的密码" v-model="password" :disabled="!isChangePassword"></el-input>

                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-button type="primary" v-if="!isChangePassword" @click="isChangePassword = true;">设置新密码</el-button>
                            <el-button type="info" v-else @click="isChangePassword = false; password = '';">取消修改</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">手机号码</div>
                    <!-- <el-input placeholder="请输入手机号码" v-model="phone" @blur="existPhone"></el-input> -->
                    <el-input placeholder="请输入手机号码" v-model="phone"></el-input>
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
                    <el-select 
                        v-model="userStatusSection" 
                        :disabled="myUserName === userName"
                        placeholder="状态"
                    >
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
            <el-button type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
// 请求类
import { queryRoleListUsingGET } from "@/api/system/user";
import { existUserUsingGET, queryUserUsingGET, addUserUsingPOST, modifyUserUsingPOST } from "@/api/system/user-edit";
import { getUserType } from "@/api/login";
import { queryTeamByBcIdUsingGET } from "@/api/team";
import { queryCompanyListUsingGET } from "@/api/subcompany";

export default {
    name: 'user-edit',

	data: function data() { 
        return {
            /**
             * 页面状态
             * @param {string} add 新增
             * @param {string} edit 编辑
             */
            pageType: 'add',

            isEditLoading: false, // 是否正在加载编辑

            userId: '', // 用户唯一标识

            userTypeSection: '', // 用户类型
            userTypeOptions: [
                // {
                //     value: '0',
                //     label: '系统管理员',
                // }, {
                //     value: '1',
                //     label: '分公司管理员',
                // }, {
                //     value: '2',
                //     label: '支公司管理员',
                // }, 
                {
                    value: '3',
                    label: '团队经理',
                }
            ],

            userBelongSection: '', // 用户归属 就是支公司
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

            userRealName: '', // 员工姓名
            userCode: '', // 员工代码
            userName: '', // 登录名
            myUserName: window.localStorage.cdimmsusername,
            password: '', // 用户密码
            isChangePassword: false, // 是否修改密码
            phone: '', // 手机号

            // 不进行校验了
            isExistUser: false, // 是否存在登录名
            isExistPhone: false, // 是否存在手机号码

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

    watch: {
        /**
         * 当用户归属 就是支公司 发生改变的时候 根据支公司唯一id获取团队列表
         */
        userBelongSection: function userBelongSection(newUserBelongSection) {
            /**
             * 如果正在加载编辑数据 不清空团队数据
             */
            if (this.isEditLoading === false) {
                this.teamSection = '';
            } else {
                this.isEditLoading = false;
            }

            this.queryTeamByBcId(newUserBelongSection);
        }
    },

	mounted: function mounted() {
        this.initPageData(); // 初始化页面数据

        this.queryCompanyList(); // 用户归属下拉框
        this.queryRoleList(); // 用户角色下拉框
        this.initUserTypeOptions(); // 初始化用户类型
    },

	methods: {
        /**
         * 初始化用户类型
         */
        initUserTypeOptions: function initUserTypeOptions() {
            const _this = this;

            getUserType()
            .then(val => {
                let data = val.data;

                /**
                 * 系统管理员
                 * 分公司管理员
                 */
                if (data == 0 || data == 1) {
                    _this.userTypeOptions = [
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
                    ];
                } else if (data == 2) {
                    /**
                     * 支公司管理员
                     */
                    _this.userTypeOptions = [
                        {
                            value: '2',
                            label: '支公司管理员',
                        }, {
                            value: '3',
                            label: '团队经理',
                        }
                    ];
                } else if (data == 3) {
                    /**
                     * 团队经理
                     */
                    _this.userTypeOptions = [
                        {
                            value: '3',
                            label: '团队经理',
                        }
                    ];
                }

            }, error => console.log(error))
        },

        /**
         * 根据支公司唯一id获取团队列表
         */
        queryTeamByBcId: function queryTeamByBcId(bcId) {
            const _this = this;

            queryTeamByBcIdUsingGET(bcId)
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.teamOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                } else {
                    _this.teamOptions = []; // 记得清空
                }

            }, error => console.log(error))
        },

        /**
         * 初始化页面数据
         * @param {object} query 携带的参数 非必填
         */
        initPageData: function initPageData() {
            const _this = this;

            // 如果 页面状态 存在 userName 表示编辑状态
            let userName = this.$route.query.userName;
            if (userName) {
                this.pageType = 'edit';
                this.isEditLoading = true;
                queryUserUsingGET(userName)
                .then(val => {
                    let data = val.data;

                    _this.userId = data.id;
                    if (data.userType === 0) {
                        _this.userTypeSection = '0';
                    } else {
                        _this.userTypeSection = `${data.userType ? data.userType : ''}`;
                    }
                    _this.userBelongSection = `${data.bcId ? data.bcId : ''}`;
                    _this.teamSection = `${data.teamId ? data.teamId : ''}`;
                    _this.userRealName = data.staffName;
                    _this.userCode = data.staffCode;
                    _this.userName = data.userName;
                    _this.phone = data.phone;
                    _this.rolesSection = `${data.roleId}`;
                    _this.userStatusSection = `${data.state}`;

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
                        value: item[0],
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
                        value: item[0],
                        label: item[1],
                    }));
                }

            }, error => console.log(error))
        },

        /**
         * 判断添加用户时 手机号 是否已注册
         */
        existPhone: function existPhone() {
            existUserUsingGET(this.phone)
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
            existUserUsingGET(this.userName)
            .then(val => {
                if (val.code === 1001) {
                    this.isExistUser = false;
                } else {
                    this.isExistUser = true;
                }
            }, error => console.log(error));
        },

        /**
         * 提交
         */
        submit: function submit() {
            const _this = this;

            if (!this.userTypeSection) {
                return this.$notify({title: '提示', message: '用户类型 不能为空！', duration: 0 });
            }

            if (this.userTypeSection === '2') {

                if (this.userBelongSection === '') {
                    return this.$notify({title: '提示', message: '用户归属 不能为空！', duration: 0 });
                }

            }

            if (this.userTypeSection === '3') {

                if (this.userBelongSection === '') {
                    return this.$notify({title: '提示', message: '用户归属 不能为空！', duration: 0 });
                }

                if (this.teamSection === '') {
                    return this.$notify({title: '提示', message: '业务团队 不能为空！', duration: 0 });
                }
            }

            if (this.userRealName === '') {
                return this.$notify({title: '提示', message: '员工姓名 不能为空！', duration: 0 });
            }

            if (this.userCode === '') {
                return this.$notify({title: '提示', message: '员工代码 不能为空！', duration: 0 });
            }

            if (this.userName === '') {
                return this.$notify({title: '提示', message: '登录名 不能为空！', duration: 0 });
            }

            if (this.isExistUser) {
                return this.$notify({title: '提示', message: '登录名已被使用', duration: 0 });
            }

            if (this.pageType === 'add') {
                if (this.password.length < 6)  {
                    return this.$notify({title: '提示', message: '密码不能小于6位！', duration: 0 });
                }

            } else {
                
                // 判断是否修改密码
                if (this.isChangePassword) {
                    if (this.password === '') {
                        return this.$notify({title: '提示', message: '密码 不能为空！', duration: 0 });
                    } else if (this.password.length < 6)  {
                        return this.$notify({title: '提示', message: '密码不能小于6位！', duration: 0 });
                    }
                }
            }

            let phone = this.phone ? this.phone.replace(/\s+/g,"") : ''; //  分管领导电话
            let cutphone = phone.replace(/-/g,"");
            if (phone === '') {
                return this.$notify({title: '提示', message: '手机号 不能为空！', duration: 0 });

            } else if (/^[0-9]*$/.test(cutphone) === false) {
                return this.$notify({title: '提示', message: '请输入正确的手机号码格式！', duration: 0 });
                
            }

            if (this.isExistPhone) {
                return this.$notify({title: '提示', message: '手机号已被使用!', duration: 0 });
            }

            if (this.rolesSection === '') {
                return this.$notify({title: '提示', message: '角色不能为空！', duration: 0 });
                return alert('手机号 不能为空！');
            }

            if (this.userStatusSection === '') {
                return this.$notify({title: '提示', message: '状态不能为空!', duration: 0 });
            }

            let userType = this.userTypeSection;
            let bcId = '';
            if (userType === '2' || userType === '3') {
                bcId = this.userBelongSection;
            }
            let teamId = '';
            if (userType === '3') {
                teamId = this.teamSection;
            }
            let staffName = this.userRealName;
            let staffCode = this.userCode;
            let userName = this.userName;
            let passwd = this.password;
            let roleId = this.rolesSection ? this.rolesSection : '';
            let state = this.userStatusSection;

            /**
             * 新增的请求
             */
            let submitAdd = () => {
                addUserUsingPOST(userType, bcId, teamId, staffName, staffCode, userName, passwd, phone, roleId, state)
                .then(val => {
                    hadndleRes(val); // 成功的处理

                }, error => {
                    console.log(error)
                    _this.$router.back(-1);
                });
            }

            /**
             * 编辑的请求
             */
            let submitEdd = () => {
                let userId = this.userId;
                modifyUserUsingPOST(userId, userType, bcId, teamId, staffName, staffCode, userName, passwd, phone, roleId, state)
                .then(val => {
                    hadndleRes(val); // 成功的处理

                }, error => {
                    console.log(error)
                    _this.$router.back(-1);
                });
            }

            /**
             * 成功
             */
            let hadndleRes = val => {
                if (val.code === 1000) {
                    _this.$message({
                        message: `请求成功!`,
                        type: 'success',
                        duration: 2.5 * 1000
                    });
                    _this.$router.back(-1);

                } else if (val.code === 1001) {
                    return alert(`${_this.pageType === 'edit' ? '修改' : '添加'}用户异常`);
                    
                } else if (val.code === 1002) {
                    return alert('用户名已注册');

                } else if (val.code === 1003) {
                    return alert('手机号已注册');

                } else if (val.code === 1004) {
                    return alert('属性不能为空');

                } else {
                    return alert(val.msg);

                }
            }

            // 判断是新增还是编辑
            if (this.pageType === 'add') {
                submitAdd();

            } else {
                submitEdd();

            }
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

    .el-button {
        width: 100%;
    }
}

.user-edit-operate {
    padding: 15px 15px 35px 15px;
}

</style>
