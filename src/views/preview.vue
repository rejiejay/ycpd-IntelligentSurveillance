<!-- 预览页 -->
<template>
<div class="preview flex-center"  :style="`height: ${clientHeight - 50}px`">
    <div class="preview-container">
        <h3 class="title flex-center">欢迎登录车商智慧监控管理系统</h3>
    </div>
</div>
</template>

<script>
// 资源类
import picc from '@/assets/picc.png';
import { Loading } from 'element-ui';

export default {
    name: 'preview',

	data: function data() { 
        return {
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度

            img: {
                picc: picc,
            },
        }
    },

	mounted: function mounted() {},

	methods: {
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

.preview {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.title {
    padding-top: 25px;
    font-size: 24px;
    color:  $black1;
}

</style>
