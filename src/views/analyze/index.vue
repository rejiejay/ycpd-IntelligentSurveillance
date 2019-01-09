<!-- 统计分析 -->
<template>
<div class="analyze">
    <!-- 顶部操作按钮 -->
    <div class="analyze-operate flex-start-bottom">
        <div class="analyze-time-section">
            <el-select v-model="analyzeTimeSection" placeholder="请选择统计分析">
                <el-option label="按月分析" value="month"></el-option>
                <el-option label="按日分析" value="data"></el-option>
            </el-select>
        </div>

        <div class="analyze-operate-month flex-start" v-if="analyzeTimeSection === 'month'">
            <el-date-picker
                v-model="startMonthTime"
                type="month"
                placeholder="开始日期"
            ></el-date-picker>

            <el-date-picker
                v-model="endMonthTime"
                type="month"
                placeholder="结束日期"
            ></el-date-picker>
        </div>

        <div class="analyze-operate-date flex-start" v-if="analyzeTimeSection === 'data'">
            <el-date-picker
                v-model="startDataTime"
                type="date"
                placeholder="开始日期"
            ></el-date-picker>

            <el-date-picker
                v-model="endDataTime"
                type="date"
                placeholder="结束日期"
            ></el-date-picker>
        </div>

        <el-select v-model="subCompanySection" placeholder="请选择支公司">
            <el-option
                v-for="item in subCompanyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="teamSection" placeholder="选择业务团队">
            <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="regionSection" placeholder="请选择网点">
            <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-button icon="el-icon-search" type="primary">查询</el-button>
        <el-button icon="el-icon-download" type="success">导出</el-button>
        <el-button size="mini" type="danger" round>清空查询条件</el-button>
    </div>
</div>
</template>

<script>
// 框架类
import echarts  from 'echarts';

export default {
    name: 'analyze',

	data: function data() { 
        return {
            /**
             * 统计分时间段 
             * @param {string} month 按月分析
             * @param {string} data 按日分析
             */
            analyzeTimeSection: 'month',

            startMonthTime: '',
            endMonthTime: '',

            startDataTime: '',
            endDataTime: '',

            subCompanySection: '', // 支公司
            subCompanyOptions: [
                {
                    value: '支公司一',
                    lable: '支公司一',
                }
            ],
            teamSection: '', // 业务团队
            teamOptions: [
                {
                    value: '业务团队一',
                    lable: '业务团队一',
                }
            ],
            regionSection: '', // 网点
            regionOptions: [
                {
                    value: '网点一',
                    lable: '网点一',
                }
            ],
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

.analyze {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作按钮
.analyze-operate {
    padding: 15px;

    .el-select {
        width: 140px;
        margin-right: 15px;
    }

    .analyze-time-section .el-select {
        width: 110px;
    }

    .analyze-operate-month .el-date-editor {
        width: 120px;
        margin-right: 15px;
    }

    .analyze-operate-date .el-date-editor {
        width: 140px;
        margin-right: 15px;
    }
}

</style>
