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
                    <el-select 
                        v-model="ruleInfoPeopleSection" 
                        multiple 
                        placeholder="预警通知人"
                        :disabled="ruleRangeSection !== '1'"
                    >
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
                    <el-select v-model="ruleFrequencySection" placeholder="通知时间">
                        <el-option label="每天" value="0"></el-option>
                        <el-option label="每三天" value="1"></el-option>
                        <el-option label="每周" value="2"></el-option>
                        <el-option label="每月" value="3"></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="16">
                <div class="details-form-item">
                    <div class="form-item-title">通知有效期</div>
                    <el-row>
                        <el-col :span="11">
                            <el-select v-model="ruleValiditySection" placeholder="通知有效期">
                                <el-option label="永久" value="0"></el-option>
                                <el-option label="自定义" value="1"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="1"><div>&nbsp;</div></el-col>
                        <el-col :span="12">
                            <el-date-picker
                                :disabled="ruleValiditySection !== '1'"
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
            <el-button type="info" plain @click="$router.back(-1)">取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
// 请求类
import { addAlarmRuleUsingPOST, queryUserNameUsingGET, modifyAlarmRuleUsingPOST, queryAlarmRuleUsingGET } from "@/api/system/rule-edit";
// 组件类
import TimeConver from '@/utils/TimeConver';

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
            /**
             * 页面状态
             * @param {string} add 新增
             * @param {string} edit 编辑
             */
            pageType: 'add',
            
            ruleId: '', // 预警唯一标识
            ruleName: '', // 预警名称
            ruleStandardSection: '', // 预警指标
            ruleStandardOptions: [
                {
                    value: '0',
                    label: '保费',
                }, {
                    value: '1',
                    label: '定损',
                }, {
                    value: '2',
                    label: '产保比',
                }
            ],

            ruleTargetSection: '', // 预警对象
            ruleTargetOptions: [
                {
                    value: '0',
                    label: '支公司',
                }, {
                    value: '1',
                    label: '车行',
                }
            ],

            ruleRangeSection: '', // 预警范围
            ruleRangeOptions: [
                {
                    value: '0',
                    label: '全部',
                }, {
                    value: '1',
                    label: '自定义',
                }
            ],

            ruleInfoPeopleSection: '', // 预警通知人
            ruleInfoPeopleOptions: [
                // {
                //     value: '预警通知人',
                //     label: '预警通知人',
                // },
            ],

            ruleFrequencySection: '', // 通知时间
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
        this.queryUserName(); // 初始化 预警通知人
    },

	methods: {
        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        initPageData: function initPageData() {
            const _this = this;

            // 如果 页面状态 存在 id 表示编辑状态
            let ruleId = this.$route.query.id
            if (ruleId) {
                this.pageType = 'edit';
                this.ruleId = ruleId;

                queryAlarmRuleUsingGET(ruleId)
                .then(val => {
                    console.log('查询单个告警规则信息', val);

                    if (val && val.data && val.data.alarmRule) {
                        let alarmRule = val.data.alarmRule;

                        _this.ruleName = alarmRule.alarmName ? alarmRule.alarmName : ''; //  预警名称
                        _this.ruleStandardSection = alarmRule.indicatorType ? `${alarmRule.indicatorType}` : '0'; //  预警指标
                        _this.ruleTargetSection = alarmRule.objType ? `${alarmRule.objType}` : '0'; //  预警对象
                        _this.ruleRangeSection = alarmRule.areaType ? `${alarmRule.areaType}` : '0'; //  预警范围
                        _this.ruleFrequencySection = alarmRule.frequency ? `${alarmRule.frequency}` : '0'; //  通知时间
                        _this.ruleValiditySection = alarmRule.activeType ? `${alarmRule.activeType}` : '0'; //  通知有效期
                        if (alarmRule.startDate && alarmRule.endDate) {
                            _this.startendTime[0] = new Date(TimeConver.YYYYmmDDToTimestamp(alarmRule.startDate)); //  通知有效期
                            _this.startendTime[1] = new Date(TimeConver.YYYYmmDDToTimestamp(alarmRule.endDate)); //  通知有效期
                        }

                    }

                    // 预警通知人 [id, id, id, id]
                    if (val && val.data && val.data.userNames) { 
                        let userNames = val.data.userNames;

                        _this.ruleInfoPeopleSection = userNames ? userNames.map(item => item[0]) : [];
                    }


                }, error => console.log(error));
            }
        },

        /**
         * 预警通知人
         */
        queryUserName: function queryUserName() {
            const _this  = this;

            queryUserNameUsingGET()
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.ruleInfoPeopleOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                }

            }, error => console.log(error))
        },
        
        /**
         * 新增预警
         */
        submit: function submit() {
            const _this = this;

            if (!this.ruleName) {
                return this.$notify({title: '提示', message: '预警名称不能为空', duration: 0 });
            }
            if (!this.ruleStandardSection) {
                return this.$notify({title: '提示', message: '预警指标不能为空', duration: 0 });
            }
            if (!this.ruleTargetSection) {
                return this.$notify({title: '提示', message: '预预警对象不能为空', duration: 0 });
            }
            if (!this.ruleRangeSection) {
                return this.$notify({title: '提示', message: '预警范围不能为空', duration: 0 });
            }
            if (this.ruleRangeSection === '1' && !this.ruleInfoPeopleSection) {
                return this.$notify({title: '提示', message: '预警通知人不能为空', duration: 0 });
            }
            if (!this.ruleFrequencySection) {
                return this.$notify({title: '提示', message: '通知时间不能为空', duration: 0 });
            }
            if (!this.ruleValiditySection) {
                return this.$notify({title: '提示', message: '通知有效期不能为空', duration: 0 });
            }
            if (this.ruleValiditySection === '1' && !this.startendTime[0] && !this.startendTime[1]) {
                return this.$notify({title: '提示', message: '通知有效期不能为空', duration: 0 });
            }

            let id = this.ruleId; // 预警唯一标识
            let alarmName = this.ruleName; //  预警名称
            let indicatorType = this.ruleStandardSection; //  预警指标
            let objType = this.ruleTargetSection; //  预警对象
            let areaType = this.ruleRangeSection; //  预警范围
            let frequency = this.ruleFrequencySection; //  通知时间
            let activeType = this.ruleValiditySection; //  通知有效期

            // 自定义的情况下
            let startDate = ''; // 通知有效期
            let endDate = ''; // 通知有效期
            if (activeType === '1') {
                startDate = `${TimeConver.dateToFormat(this.startendTime[0])} 00:00:00`; // 通知有效期
                endDate = `${TimeConver.dateToFormat(this.startendTime[1])} 00:00:00`; // 通知有效期
            }
            let userIds = this.ruleInfoPeopleSection; // 预警通知人 [id, id, id, id]

            let addAlarmRule = () => {

                addAlarmRuleUsingPOST(alarmName, indicatorType, objType, areaType, frequency, activeType, startDate, endDate, userIds)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('添加告警规则异常', '添加失败');
                    } else {
                        return _this.$alert(val.msg, '添加失败');
                    }

                }, error => console.log(error));
            }

            let modifyAlarmRule = () => {
                modifyAlarmRuleUsingPOST(id, alarmName, indicatorType, objType, areaType, frequency, activeType, startDate, endDate, userIds)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('修改告警规则异常', '修改失败');
                    } else {
                        return _this.$alert(val.msg, '修改失败');
                    }

                }, error => console.log(error));
            }

            if (this.pageType === 'add') {
                addAlarmRule()
            } else {
                modifyAlarmRule();
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
