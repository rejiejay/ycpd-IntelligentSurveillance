<!-- 车商管理/新增编辑 -->
<template>
<div class="carts-details">
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

</style>
