<!-- 支公司监控 -->
<template>
<div class="monitor-subsidiary-company">
    <!-- 顶部操作按钮 -->
    <div class="subsidiary-company-operate flex-start-center">
        <div class="company-operate-left flex-rest">
            <el-date-picker
                v-model="startendTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="startendTimeOptions"
            ></el-date-picker>
            <el-button icon="el-icon-download" type="primary">导出</el-button>
        </div>

        <div class="company-operate-right">
            <el-input class="carts-search-main"
                placeholder="安装支公司搜索" 
                v-model="search" 
                clearable
            >
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'monitor-subsidiary-company',

	data: function data() { 
        // 选择时间段 左边选项列表选项
        let startendTimeOptions = {
            shortcuts: [
                {
                    text: '今天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
        }

        return {
            startendTime: [
                new Date(new Date().getTime() - 3600 * 1000 * 24),
                new Date(),
            ], // 开始结束时间
            startendTimeOptions: startendTimeOptions, // 开始结束时间 左边选项

            search: '', // 搜索
        } 
    },

	mounted: function mounted() {

    },

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

// 顶部操作按钮
.subsidiary-company-operate {
    padding: 15px;
}

</style>
