<!-- 团队新增编辑 -->
<template>
<div class="team-manage-edit">
    
    <div class="team-details-form">
        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">团队代码</div>
                    <el-input placeholder="请输入团队代码" v-model="teamCode"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">团队名称</div>
                    <el-input placeholder="请输入团队名称" v-model="teamName"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">团队经理</div>
                    <el-input placeholder="请输入团队经理" v-model="teamLeader"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">电话</div>
                    <el-input placeholder="请输入电话" v-model="phone"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">支公司</div>
                    <el-select v-model="subCompany" placeholder="请选择支公司">
                        <el-option
                            v-for="item in subCompanyOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="8">
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="details-form-item">
                    <div class="form-item-title">备注</div>
                    <el-input placeholder="请输入备注" v-model="remark"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>

    <div class="team-details-operate flex-center">
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
    name: 'team-manage-edit',

	data: function data() { 
        return { 
            teamCode: '', // 团队代码
            teamName: '', // 团队名称
            teamLeader: '', // 团队经理
            phone: '', // 电话
            subCompany: '', // 支公司
            subCompanyOptions: [
                {
                    value: '支公司一',
                    label: '支公司一',
                }
            ],
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

.team-manage-edit {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.team-details-form {
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

.team-details-operate {
    padding: 15px 15px 35px 15px;
}

</style>
