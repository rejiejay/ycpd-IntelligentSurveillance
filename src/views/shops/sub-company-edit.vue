<!-- 支公司新增编辑 -->
<template>
<div class="subsidiary-company-edit">
    <div class="company-details-form">
        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">支公司代码</div>
                    <el-input placeholder="请输入支公司代码" v-model="subCompanyCode"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">支公司名称</div>
                    <el-input placeholder="请输入支公司名称" v-model="subCompanyName"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">分管领导代码</div>
                    <el-input placeholder="请输入分管领导代码" v-model="leadershipCode"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
    
    <div class="company-details-form">
        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">分管领导姓名</div>
                    <el-input placeholder="请输入分管领导姓名" v-model="leadershipName"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">分管领导电话</div>
                    <el-input placeholder="请输入分管领导电话" v-model="leadershipPhone"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">管理员代码</div>
                    <el-input placeholder="请输入管理员代码" v-model="adminCode"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
    
    <div class="company-details-form">
        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">管理员姓名</div>
                    <el-input placeholder="请输入管理员姓名" v-model="adminName"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">管理员电话</div>
                    <el-input placeholder="请输入管理员电话" v-model="adminPhone"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
            </el-col>
        </el-row>
    </div>
    
    <div class="company-details-form">
        <el-row>
            <el-col :span="24">
                <div class="details-form-item">
                    <div class="form-item-title">备注</div>
                    <el-input placeholder="请输入备注" v-model="remark"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>

    <div class="company-details-operate flex-center">
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
import { addCompanyUsingPOST, modifierCompanyUsingPOST } from "@/api/shops/sub-company";

export default {
    name: 'subsidiary-company-edit',

	data: function data() { 
        return { 
            /**
             * 页面状态
             * @param {string} add 新增
             * @param {string} edit 编辑
             */
            pageType: 'add',

            id: '', // 支公唯一标识
            subCompanyCode: '', // 支公司代码
            subCompanyName: '', // 支公司名称
            leadershipCode: '', // 分管领导代码
            leadershipName: '', // 分管领导姓名
            leadershipPhone: '', // 分管领导电话
            adminCode: '', // 管理员代码
            adminName: '', // 管理员姓名
            adminPhone: '', // 管理员电话
            remark: '', // 备注
        } 
    },

	mounted: function mounted() {
        this.initPageData(); // 初始化页面数据
    },

	methods: {
        /**
         * 初始化页面数据
         */
        initPageData: function initPageData() {
            const _this = this;

            // 如果 页面状态 存在 id 表示编辑状态
            let id = this.$route.query.id;
            if (id) {
                this.pageType = 'edit';
                console.log(this.$route.query)
                this.id = this.$route.query.id; // 支公唯一标识
                this.subCompanyCode = this.$route.query.bcCode; // 支公司代码
                this.subCompanyName = this.$route.query.bcName; // 支公司名称
                this.leadershipCode = this.$route.query.leaderCode; // 分管领导代码
                this.leadershipName = this.$route.query.leaderName; // 分管领导姓名
                this.leadershipPhone = this.$route.query.leaderPhone; // 分管领导电话
                this.adminCode = this.$route.query.adminCode; // 管理员代码
                this.adminName = this.$route.query.adminName; // 管理员姓名
                this.adminPhone = this.$route.query.adminPhone; // 管理员电话
                this.remark = this.$route.query.remark; // 备注
            }
        },

        /**
         * 新增预警
         */
        submit: function submit() {
            const _this = this;

            if (!this.subCompanyCode) {
                return this.$notify({title: '提示', message: '支公司代码不能为空', duration: 0 });
            }
            if (!this.subCompanyName) {
                return this.$notify({title: '提示', message: '支公司名称不能为空', duration: 0 });
            }
            if (!this.leadershipCode) {
                return this.$notify({title: '提示', message: '分管领导代码不能为空', duration: 0 });
            }
            if (!this.leadershipName) {
                return this.$notify({title: '提示', message: '分管领导姓名不能为空', duration: 0 });
            }
            
            let leaderPhone = this.leadershipPhone ? this.leadershipPhone.replace(/\s+/g,"") : ''; //  分管领导电话
            if (!leaderPhone) {
                return this.$notify({title: '提示', message: '分管领导电话不能为空', duration: 0 });
            } else if (/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(leaderPhone) === false) {
                return this.$notify({title: '提示', message: '请输入正确的分管领导电话号码', duration: 0 });
            }


            if (!this.adminCode) {
                return this.$notify({title: '提示', message: '管理员代码不能为空', duration: 0 });
            }
            if (!this.adminName) {
                return this.$notify({title: '提示', message: '管理员姓名不能为空', duration: 0 });
            }
            
            let adminPhone = this.adminPhone ? this.adminPhone.replace(/\s+/g,"") : ''; //  管理员电话
            if (!adminPhone) {
                return this.$notify({title: '提示', message: '管理员电话不能为空', duration: 0 });
            } else if (/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(adminPhone) === false) {
                return this.$notify({title: '提示', message: '请输入正确的管理员电话号码', duration: 0 });
            }

            let id = this.id; // 支公司唯一标识
            let bcCode = this.subCompanyCode; //  预警名称
            let bcName = this.subCompanyName; //  支公司名称
            let leaderCode = this.leadershipCode; //  分管领导代码
            let leaderName = this.leadershipName; //  分管领导姓名
            let adminCode = this.adminCode; //  管理员代码
            let adminName = this.adminName; //  管理员姓名
            let remark = this.remark ? this.remark : ''; //  管理员电话

            let addCompany = () => {

                addCompanyUsingPOST(bcCode, bcName, leaderCode, leaderName, leaderPhone, adminCode, adminName, adminPhone, remark)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('添加支公司规则异常', '添加失败');
                    } else {
                        return _this.$alert(val.msg, '添加失败');
                    }

                }, error => console.log(error));
            }

            let modifyCompany = () => {
                modifierCompanyUsingPOST(id, bcCode, bcName, leaderCode, leaderName, leaderPhone, adminCode, adminName, adminPhone, remark)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('修改支公司异常', '修改失败');
                    } else {
                        return _this.$alert(val.msg, '修改失败');
                    }

                }, error => console.log(error));
            }

            if (this.pageType === 'add') {
                addCompany()
            } else {
                modifyCompany();
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

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

.subsidiary-company-edit {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.company-details-form {
    padding: 15px 15px 0px 15px;

    .details-form-item {
        padding: 7.5px;

        .form-item-title {
            padding-bottom: 10px;
            font-size: 14px;
            color: $black1;
        }
    }
}

.company-details-operate {
    padding: 15px 15px 35px 15px;
}

</style>
