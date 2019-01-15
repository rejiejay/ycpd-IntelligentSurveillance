<!-- 预警规则设置/新增编辑 -->
<template>
<div class="rule-edit">
    <div class="rule-edit-form">
        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">预警名称</div>
                    <el-input placeholder="请输入预警名称" v-model="ruleName"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">预警指标</div>
                    <el-select v-model="ruleStandardSection" placeholder="预警指标">
                        <el-option
                            v-for="item in ruleStandardOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">预警对象</div>
                    <el-select v-model="ruleTargetSection" placeholder="预警对象">
                        <el-option
                            v-for="item in ruleTargetOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">预警范围</div>
                    <el-select v-model="ruleRangeSection" placeholder="预警范围">
                        <el-option
                            v-for="item in ruleRangeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="16">
                <div class="details-form-item">
                    <div class="form-item-title">预警通知人</div>
                    <el-select v-model="ruleInfoPeopleSection" multiple placeholder="预警通知人">
                        <el-option
                            v-for="item in ruleInfoPeopleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">通知时间<span>ps：每月1日 09:00 短信通知</span></div>
                    <el-select v-model="ruleRangeSection" placeholder="通知时间">
                        <el-option label="每天" value="每天"></el-option>
                        <el-option label="每三天" value="每三天"></el-option>
                        <el-option label="每周" value="每周"></el-option>
                        <el-option label="每月" value="每月"></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="16">
                <div class="details-form-item">
                    <div class="form-item-title">通知有效期</div>
                    <el-row>
                        <el-col :span="11">
                            <el-select v-model="ruleValiditySection" placeholder="通知有效期">
                                <el-option label="永久" value="永久"></el-option>
                                <el-option label="自定义" value="自定义"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="1"><div>&nbsp;</div></el-col>
                        <el-col :span="12">
                            <el-date-picker
                                v-model="startendTime"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="startendTimeOptions"
                            ></el-date-picker>
                        </el-col>
                    </el-row>
                </div>
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
        // 选择时间段 左边选项列表选项
        let startendTimeOptions = {
            shortcuts: [
                {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
        }

        return {
            ruleName: '', // 预警名称
            ruleStandardSection: '', // 预警指标
            ruleStandardOptions: [
                {
                    value: '预警指标一',
                    lable: '预警指标一',
                }
            ],

            ruleTargetSection: '', // 预警对象
            ruleTargetOptions: [
                {
                    value: '预警指标一',
                    lable: '预警指标一',
                }
            ],

            ruleRangeSection: '', // 预警范围
            ruleRangeOptions: [
                {
                    value: '预警指标一',
                    lable: '预警指标一',
                }
            ],

            ruleInfoPeopleSection: '', // 预警通知人
            ruleInfoPeopleOptions: [
                {
                    value: '预警指标一',
                    lable: '预警指标一',
                }
            ],

            ruleRangeSection: '', // 通知时间
            ruleValiditySection: '', // 通知有效期

            startendTime: [ // 通知有效期
                new Date(new Date().getTime() - 3600 * 1000 * 24),
                new Date(),
            ],
            startendTimeOptions: startendTimeOptions, // 通知有效期 左边选项
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

.rule-edit {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.rule-edit .rule-edit-form {
    padding: 15px;

    .details-form-item {
        padding: 7.5px;

        .form-item-title {
            padding-bottom: 10px;
            font-size: 14px;
            color: $black1;

            span {
                padding-left: 15px;
                font-size: 12px;
                color: $black4;
            }
        }
    }

    .el-range-editor,
    .el-select {
        width: 100%;
    }
}

.rule-edit .rule-edit-operate {
    padding: 15px 15px 35px 15px;
}

</style>
