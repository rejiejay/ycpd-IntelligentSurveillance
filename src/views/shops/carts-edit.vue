<!-- 车商管理/新增编辑 -->
<template>
<div class="carts-details">
    <div class="carts-details-form">
        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行编码</div>
                    <el-input placeholder="请输入车行编码" v-model="shopsNo"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行名称</div>
                    <el-input placeholder="请输入车行名称" v-model="shopsName"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行类型</div>
                    <el-select v-model="shopsType" placeholder="请选择车行类型">
                        <el-option
                            v-for="item in shopsTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行星级</div>
                    <el-select v-model="shopsRate" placeholder="请选择车行星级">
                        <el-option
                            v-for="item in shopsRateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">是否合作</div>
                    <el-select v-model="shopsRate" placeholder="请选择是否合作">
                        <el-option label="合作" value="合作"></el-option>
                        <el-option label="不合作" value="不合作"></el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">联系人</div>
                    <el-input placeholder="请输入联系人" v-model="contactName"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">联系电话</div>
                    <el-input placeholder="请输入联系电话" v-model="contactPhone"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">品牌</div>
                    <el-input placeholder="请输入品牌" v-model="brand"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">上级集团</div>
                    <el-input placeholder="请输入上级集团" v-model="parCompany"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">支公司</div>
                    <el-select v-model="subCompanyName" placeholder="请选择支公司">
                        <el-option
                            v-for="item in subCompanyNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">团队</div>
                    <el-select v-model="team" placeholder="请选择团队">
                        <el-option
                            v-for="item in teamOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">渠道代码</div>
                    <el-input placeholder="请输入渠道代码" v-model="linkCode"></el-input>
                </div>
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

        <el-row>
            <el-col :span="24">
                <div class="details-form-item">
                    <div class="form-item-title">网点地址</div>
                    <el-input placeholder="请输入网点地址" v-model="address"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>

export default {
    name: 'carts-details',

	data: function data() { 
        return {
            /**
             * 页面状态
             * @param {string} add 新增
             * @param {string} edit 编辑
             */
            pageType: 'add',

            shopsNo: '', // 车行编码
            shopsName: '', // 车行名称
            shopsType: '', // 车行类型
            shopsTypeOptions: [
                {
                    value: '4S店',
                    label: '4S店',
                }, {
                    value: '二网',
                    label: '二网',
                }, {
                    value: '修理厂',
                    label: '修理厂',
                }, {
                    value: '二手车行',
                    label: '二手车行',
                }, {
                    value: '续保',
                    label: '续保',
                }, {
                    value: '非车险',
                    label: '非车险',
                }, {
                    value: '网络销售',
                    label: '网络销售',
                }, {
                    value: '其他',
                    label: '其他',
                }
            ],
            shopsRate: '', // 车行星级
            shopsRateOptions: [
                /**
                 * 4S店与二网：A级、B级、C级、D级、E级 
                 * 其他：一星级、二星级、三星级、四星级、五星级
                 */
                {
                    value: '车行星级一',
                    label: '车行星级一',
                }
            ],
            contactName: '汤俊猛', // 联系人
            contactPhone: '13924593603', // 联系电话
        }
    },

	mounted: function mounted() {
        this.initPageData();
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

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

.carts-details {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.carts-details-form {
    padding: 15px;

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

</style>
