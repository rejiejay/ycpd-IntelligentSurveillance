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
            <el-button type="info" plain>取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'subsidiary-company-edit',

	data: function data() { 
        return { 
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

	mounted: function mounted() {},

	methods: {
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
