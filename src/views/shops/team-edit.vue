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
            <el-button type="info" plain @click="$router.back(-1)">取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
import { queryCompanyListUsingGET } from "@/api/subcompany";
import { addTeamUsingPOST, modifierTeamUsingPOST } from "@/api/shops/team";

export default {
    name: 'team-manage-edit',

	data: function data() { 
        return { 
            /**
             * 页面状态
             * @param {string} add 新增
             * @param {string} edit 编辑
             */
            pageType: 'add',

            teamCode: '', // 团队代码
            teamName: '', // 团队名称
            teamLeader: '', // 团队经理
            phone: '', // 电话
            subCompany: '', // 支公司
            subCompanyOptions: [
                // {
                //     value: '支公司一',
                //     label: '支公司一',
                // }
            ],
            remark: '', // 备注
        } 
    },

	mounted: function mounted() {
        this.initPageData();
        this.queryCompanyList(); // 支公司下拉选项
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
                this.id = this.$route.query.id; // 团队 唯一标识
                this.teamCode = this.$route.query.teamCode; // 团队代码
                this.teamName = this.$route.query.teamName; // 团队名称
                this.teamLeader = this.$route.query.manager; // 团队经理
                this.phone = this.$route.query.phone; // 分管领导电话
                this.subCompany = this.$route.query.bcId; // 支公司名称
                this.remark = this.$route.query.remark; // 备注
            }
        },

        /**
         * 新增团队
         */
        submit: function submit() {
            const _this = this;

            if (!this.teamCode) {
                return this.$notify({title: '提示', message: '团队代码不能为空', duration: 0 });
            }
            if (!this.teamName) {
                return this.$notify({title: '提示', message: '团队名称不能为空', duration: 0 });
            }
            if (!this.teamLeader) {
                return this.$notify({title: '提示', message: '团队经理不能为空', duration: 0 });
            }

            let phone = this.phone ? this.phone.replace(/\s+/g,"") : ''; //  分管领导电话
            let cutphone = phone.replace(/-/g,"");
            if (!phone) {
                return this.$notify({title: '提示', message: '分管领导电话不能为空', duration: 0 });
            } else if (/^[0-9]*$/.test(cutphone) === false) {
                return this.$notify({title: '提示', message: '请输入正确的电话号码', duration: 0 });
            }

            if (!this.subCompany) {
                return this.$notify({title: '提示', message: '支公司不能为空', duration: 0 });
            }

            let id = this.id; //   团队 唯一标识
            let teamCode = this.teamCode; //  团队代码
            let teamName = this.teamName; //  团队名称
            let manager = this.teamLeader; //  团队经理
            let bcId = this.subCompany; //  支公司
            let remark = this.remark ? this.remark : ''; //  备注

            let addTeam = () => {

                addTeamUsingPOST( teamCode, teamName, manager, phone, bcId, remark )
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('添加团队规则异常', '添加失败');
                    } else {
                        return _this.$alert(val.msg, '添加失败');
                    }

                }, error => console.log(error));
            }

            let modifyTeam = () => {
                modifierTeamUsingPOST( id, teamCode, teamName, manager, phone, bcId, remark )
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('修改团队异常', '修改失败');
                    } else {
                        return _this.$alert(val.msg, '修改失败');
                    }

                }, error => console.log(error));
            }

            if (this.pageType === 'add') {
                addTeam()
            } else {
                modifyTeam();
            }

        },

        /**
         * 支公司下拉选项
         */
        queryCompanyList: function queryCompanyList() {
            const _this  = this;

            queryCompanyListUsingGET()
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.subCompanyOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                }

            }, error => console.log(error))
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
