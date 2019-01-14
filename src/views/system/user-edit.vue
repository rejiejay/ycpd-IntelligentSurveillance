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
                            v-for="item in userTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">用户归属</div>
                    <el-input placeholder="请输入用户归属" v-model="userBelong"></el-input>
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
                    <el-input placeholder="请输入登录名" v-model="userName"></el-input>
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
                    <el-input placeholder="请输入手机号码" v-model="phone"></el-input>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="details-form-item">
                    <div class="form-item-title">角色</div>
                    <el-select v-model="rolesSection" placeholder="角色">
                        <el-option
                            v-for="item in rolesOptions"
                            :key="item.value"
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
            <el-button type="info" plain>取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'user-edit',

	data: function data() { 
        return {
            userTypeSection: '', // 用户类型
            userTypeOptions: [
                {
                    value: '用户类型一',
                    lable: '用户类型一',
                }
            ],

            userBelong: '', // 用户归属

            userRealName: '', // 用户姓名
            userCode: '', // 用户代码
            userName: '', // 登录名
            password: '', // 用户密码
            phone: '', // 手机号

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

        }
    },

	mounted: function mounted() {
        this.initPageData(); // 初始化页面数据
    },

	methods: {
        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        initPageData: function initPageData() {
            // 如果 页面状态 存在 id 表示编辑状态
            if (this.$route.query.id) {
                this.pageType = 'edit';
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
}

.user-edit-operate {
    padding: 15px 15px 35px 15px;
}

</style>
