<!-- 预警规则设置 -->
<template>
<div class="system-rule">
    <!-- 顶部操作按钮 -->
    <div class="system-rule-operate flex-start-bottom">
        <div class="rule-operate-left flex-rest">
            <el-select v-model="warningStandardSection" placeholder="预警指标">
                <el-option
                    v-for="item in warningStandardOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-select v-model="warningTargetSection" placeholder="预警对象">
                <el-option
                    v-for="item in warningTargetOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-input v-model="search" type="text" :clearable="true" placeholder="关键字查询"></el-input>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; searchByConditions();">查询</el-button>
            <el-button icon="el-icon-download" type="success">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>
    
        <div class="rule-operate-right">
            <el-button icon="el-icon-plus" type="primary" @click="jumpToRouter('/system/rule/details')">增加预警</el-button>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="system-rule-table">
        <el-table
            :data="ruleList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="name"
                label="预警名称"
            ></el-table-column>
            <el-table-column
                prop="standard"
                label="预警指标"
            ></el-table-column>
            <el-table-column
                prop="target"
                label="预警对象"
            ></el-table-column>
            <el-table-column
                prop="range"
                label="预警范围"
            ></el-table-column>
            <el-table-column
                prop="infoPeople"
                label="通知人"
            ></el-table-column>
            <el-table-column
                prop="infoTime"
                label="通知时间"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120"
            >
                <template slot-scope="scope">
                    <el-button @click="modifierHandle(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteHandle(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="system-rule-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-count="pageCount"
            @current-change="pageChangeHandle"
            layout="prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>
// 请求类
import { queryAlarmRuleListUsingPOST } from "@/api/system/rule";

export default {
    name: 'system-rule',

	data: function data() { 
        return {
            warningStandardSection: '', // 预警指标
            warningStandardOptions: [
                {
                    value: '预警指标一',
                    label: '预警指标一',
                }
            ],

            warningTargetSection: '', // 预警对象
            warningTargetOptions: [
                {
                    value: '预警对象一',
                    label: '预警对象一',
                }
            ],

            search: '', // 关键字查询

            // 预警规则列表
            ruleList: [
                {
                    name: '', // 预警名称
                    standard: '', // 预警指标
                    target: '', // 预警对象
                    range: '', // 预警范围
                    infoPeople: '', // 通知人
                    infoTime: '', // 通知时间
                }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageCount: 1, // 一共多少页
        } 
    },

	mounted: function mounted() {
        this.queryAlarmRuleList(); // 获取告警规则列表
    },

	methods: {
        /**
         * 获取告警规则列表
         */
        queryAlarmRuleList: function queryAlarmRuleList() {
            const _this  = this;

            queryAlarmRuleListUsingPOST(this.currentPage)
            .then(val => {
                let data = val.data;
                console.log(data);

            }, error => console.log(error));
        },

        /**
         * 通过条件查询
         */
        searchByConditions: function searchByConditions() {
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.rolesCodeSection = null;
            this.rolesNameSection = null;
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            console.log(item);
        },

        /**
         * 修改 一个项目
         */
        modifierHandle: function modifierHandle(item) {
            console.log(item);
            this.jumpToRouter('/system/rule/details', {id: ''});
        },

        /**
         * 删除 一个项目
         */
        deleteHandle: function deleteHandle(item) {
            console.log(item);
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

.system-rule {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.system-rule-operate {
    padding: 15px;

    .el-select {
        margin-right: 15px;
    }

    .el-input {
        width: 140px;
        margin-right: 15px;
    }
}

// 表单部分
.system-rule-table {
    padding: 15px;
}

// 分页部分
.system-rule-pagination {
    padding: 15px;
}

</style>
