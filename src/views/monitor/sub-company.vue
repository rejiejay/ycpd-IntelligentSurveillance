<!-- 支公司监控 -->
<template>
<div class="monitor-subsidiary-company">
</div>
</template>

<script>

export default {
    name: 'monitor-subsidiary-company',

	data: function data() { 
        return { } 
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

</style>
