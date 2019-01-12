<!-- 用户/新增编辑 -->
<template>
<div class="user-edit">
    <div class="user-edit-form">
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
        return {
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

.carts-details {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.carts-details .carts-details-form {
    padding: 15px 15px 0px 15px;

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

// 地图选择模态框
.carts-details .baidu-map-modal {
    .modal-container {
        width: 70%;
    }

    .map-modal-title {
        padding: 0px 15px;
        height: 45px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;

        .modal-title-right {
            font-size: 24px;
            cursor: pointer;
        }

        .modal-title-right:hover {
            color: #F56C6C;
        }
    }

    .map-modal-main {
        padding: 15px;

        #BaiduMap {
            height: 300px;
        }
    }

    .map-modal-input {
        padding: 15px 15px 0px 15px;
    }

    .input-search-list {
        padding-top: 5px;

        .search-list-container {
            border-top: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
        }

        .input-search-item {
            border-bottom: 1px solid #ddd;
            padding-left: 15px;
            line-height: 35px;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .input-search-item:hover {
            color: #409EFF;
        }
    }

    .map-modal-operate {
        border-top: 1px solid #ddd;
        padding: 15px;
        height: 45;
    }
}

.carts-details .carts-details-operate {
    padding: 15px 15px 35px 15px;
}

</style>
