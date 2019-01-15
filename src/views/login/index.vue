<!-- 登录 -->
<template>
<div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <div class="banner flex-center"><img :src="img.picc" alt="picc"></div>

        <h3 class="title">PICC智慧监控管理系统</h3>

        <!-- 账号 -->
        <el-form-item prop="username">
            <span class="svg-container">
                <svg-icon icon-class="user" />
            </span>
            <el-input 
                v-model="loginForm.username" 
                name="username" 
                type="text" 
                auto-complete="on" 
                placeholder="请输入手机号" 
            ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
            <span class="svg-container">
                <svg-icon icon-class="password" />
            </span>
            <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                auto-complete="on"
                placeholder="请输入密码"
                @keyup.enter.native="handleLogin" 
            ></el-input>
            <span class="show-pwd" @click="showPwd">
                <svg-icon v-if="pwdType === 'password'" icon-class="eye" />
                <svg v-else t="1546657974741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3181" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16">
                    <path d="M512 209.403241c-201.731514 0-374.009206 125.476783-443.808922 302.596759 69.798692 177.119977 242.077408 302.596759 443.808922 302.596759 201.933105 0 374.010229-125.476783 443.808922-302.596759C886.009206 334.880023 713.933105 209.403241 512 209.403241zM512 713.731514c-111.355157 0-201.731514-90.375334-201.731514-201.731514s90.375334-201.731514 201.731514-201.731514 201.731514 90.375334 201.731514 201.731514S623.355157 713.731514 512 713.731514zM512 390.961296c-66.772776 0-121.038704 54.265928-121.038704 121.038704s54.265928 121.038704 121.038704 121.038704 121.038704-54.265928 121.038704-121.038704S578.772776 390.961296 512 390.961296z" p-id="3182" fill="#ffffff"></path>
                </svg>
            </span>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                登录
            </el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import axios from 'axios';
// 组件类
import { getBaseToken, postLogin } from '@/api/login';
// 资源类
import picc from '@/assets/picc.png';

export default {
    name: 'Login',

	data: function data() { 
        /**
         * 用户名校验的方法
         */
        const validateUsername = (rule, value, callback) => {
            callback(); // 暂时无校验规则
        }

        /**
         * 密码校验的方法
         */
        const validatePass = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位'));

            } else {
                callback();

            }
        }

        return {
            img: {
                picc: picc,
            },

            baseToken: '', // 登录的token （登录之前的 token 都是用到这个，例如：滑动图片的高度）

            loginForm: {
                username: window.sessionStorage.loginFormUsername ? window.sessionStorage.loginFormUsername : '',
                password: window.sessionStorage.loginFormPassword ? window.sessionStorage.loginFormPassword : '',
            },

            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },

            loading: false, // 登录加载
            pwdType: 'password',
            redirect: undefined, // 这个是重定向页面
        }
    },

    watch: {
        /**
         * 监听路由改变
         */
        $route: {
            handler: function handler(route) {
                // 如果路由发生改变则赋值到重定向页面
                this.redirect = route.query && route.query.redirect;
            },

            immediate: true,
        }
    },

    mounted: function () {
        this.getToken(); // 获取登录用的token
    },

    methods: {
        /**
         * 获取登录用的token
         */
        getToken: function getToken() {
            const _this = this;

            getBaseToken()
            .then(res => {
                // 判断是否登录
                if (res.data.data.user) {
                    // 页面页面跳转， 如果存在 重定向页面优先跳转到重定向页面
                    window.sessionStorage.setItem('cdimmstoken', res.data.data.token);
                    window.localStorage.setItem('cdimmsusername', res.data.data.user.userName);

                    _this.$router.push({ path: _this.redirect || '/' });

                } else {
                    _this.baseToken = res.data.data.token;

                }

            }).catch(error => console.error(error)); // 一般都不会报错
        },

        /**
         * 显示密码的方法
         */
        showPwd: function showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = '';

            } else {
                this.pwdType = 'password';

            }
        },

        /**
         * 点击登录
         */
        handleLogin() {
            const _this = this;

            this.$refs.loginForm.validate(valid => {
                // 判断校验是否成功
                if (valid) {
                    this.loading = true; // 将按钮 设置为 登录中 防止重复提交
                    window.sessionStorage.setItem('loginFormUsername', _this.loginForm.username);
                    window.sessionStorage.setItem('loginFormPassword', _this.loginForm.password);

                    postLogin( _this.loginForm.username, _this.loginForm.password, _this.baseToken)
                    .then(res => {
                        _this.loading = false; // 将按钮 设置为 登录中 防止重复提交
                        let response = res.data;
                            
                        if (response.code === 1000) {
                            // 验证通过!
                            let data = response.data;

                            window.sessionStorage.setItem('cdimmstoken', data.token);
                            window.localStorage.setItem('cdimmsusername', data.user.userName);

                            /**
                             * 初始化权限
                             */
                            let roles = [];
                            if (data.trees) {
                                data.trees.map(val => {
                                    // 监控预警
                                    if (val.urlName === '监控预警' && val.children.length > 0) {
                                        roles.push('/monitor');
                                        val.children.map(chil => {
                                            if (chil === '车行监控') {
                                                roles.push('/monitor/carts');
                                            }
                                            if (chil === '团队监控') {
                                                roles.push('/monitor/team');
                                            }
                                            if (chil === '支公司监控') {
                                                roles.push('/monitor/subcompany');
                                            }
                                        });
                                    }
                                    
                                    // 统计分析
                                    if (val.urlName === '统计分析') {
                                        roles.push('/analyze');
                                        roles.push('/analyze/index');
                                    }

                                    // 清单明细
                                    if (val.urlName === '清单明细' && val.children.length > 0) {
                                        roles.push('/detailedlist');

                                        val.children.map(chil => {
                                            if (chil === '保费明细') {
                                                roles.push('/detailedlist/comparison');
                                            }
                                            if (chil === '定损明细') {
                                                roles.push('/detailedlist/premium');
                                            }
                                            if (chil === '产保比明细') {
                                                roles.push('/detailedlist/loss');
                                            }
                                        });
                                    }

                                    // 车商管理
                                    if (val.urlName === '车商管理' && val.children.length > 0) {
                                        roles.push('/shops');

                                        val.children.map(chil => {
                                            if (chil === '车行管理') {
                                                roles.push('/shops/carts');
                                            }
                                            if (chil === '支公司管理') {
                                                roles.push('/shops/subcompany');
                                            }
                                            if (chil === '团队管理') {
                                                roles.push('/shops/team');
                                            }
                                        });
                                    }

                                    // 预测设置
                                    if (val.urlName === '预测设置' && val.children.length > 0) {
                                        roles.push('/predict');

                                        val.children.map(chil => {
                                            if (chil === '支公司数据设置') {
                                                roles.push('/predict/subcompany');
                                            }
                                            if (chil === '团队数据设置') {
                                                roles.push('/predict/team');
                                            }
                                        });
                                    }
                                    
                                    // 预警日志
                                    if (val.urlName === '预警日志') {
                                        roles.push('/consolelog');
                                        roles.push('/consolelog/index');
                                    }

                                    // 系统设置
                                    if (val.urlName === '系统设置' && val.children.length > 0) {
                                        roles.push('/system');

                                        val.children.map(chil => {
                                            if (chil === '用户管理') {
                                                roles.push('/system/user');
                                            }
                                            if (chil === '角色设置') {
                                                roles.push('/system/roles');
                                            }
                                            if (chil === '预警规则设置') {
                                                roles.push('/system/rule');
                                            }
                                        });
                                    }
                                });
                            }

                            window.localStorage.setItem('cdimmsroles', JSON.stringify(roles));

                            // 页面页面跳转， 如果存在 重定向页面优先跳转到重定向页面
                            _this.$router.push({ path:  '/' });

                        } else if (response.code === 1001) {
                            alert('非法请求，跳转到登陆页!');
                            _this.getToken(); // 获取登录用的token

                        } else if (response.code === 1002) {
                            alert('用户名不能为空!');
                            _this.getToken();

                        } else if (response.code === 1003) {
                            alert('密码不能为空!');
                            _this.getToken();

                        } else if (response.code === 1004) {
                            alert('登陆异常,请重新登陆!');
                            _this.getToken();

                        } else if (response.code === 1005) {
                            alert('该用户不是系统用户!');
                            _this.getToken();

                        } else if (response.code === 1006) {
                            alert('登陆异常,请重新登陆!');
                            _this.getToken();

                        }
                    })
                    .catch(error => alert(`请求登录失败, 原因：${JSON.stringify(error)}`));

                } else {
                    console.log('error submit!!');
                    return false

                }
            });
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {

    .banner {
        margin: 0px auto;
        padding-bottom: 35px;
        width: 140px;

        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
                }
            }
        }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

</style>
