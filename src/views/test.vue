<!-- 测试页 -->
<template>
<div  :style="`width: ${clientWidth}px; height: ${clientHeight}px`" id="BaiduMap">

</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'preview',

	data: function data() { 
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度

        }
    },

	mounted: function mounted() {
        let mountBaiduMap = new BMap.Map('BaiduMap'); // 创建地图实例  
        mountBaiduMap.centerAndZoom(new BMap.Point(114.059560, 22.542860), 13); // 初始化地图，设置中心点坐标(深圳福田) 和地图级别  
        mountBaiduMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        mountBaiduMap.addControl(new BMap.NavigationControl({
            offset: new BMap.Size(10, 65),
        }));

        // Bounds.containsPoint(point: Point)	Boolean	如果点的地理坐标位于此矩形内，则返回true

        let Bounds = mountBaiduMap.getBounds(); // 获取中心点

        let centerPoint = Bounds.getCenter(); // 矩形区域的跨度
        let mySpan = Bounds.toSpan(); // 跨度
        let myHalfSpan = { // 一半的跨度
            lng: (mySpan.lng / 2),
            lat: (mySpan.lat / 2),
        };
        let myHalfPoint = new BMap.Point( // 距离中心点一半的坐标点
            (centerPoint.lng + myHalfSpan.lng),
            (centerPoint.lat + myHalfSpan.lat)
        );

        /**
         * 屏幕的距离（米）
         */
        let myHalfSpanDistance = mountBaiduMap.getDistance(centerPoint, myHalfPoint);
    },

	methods: {
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

</style>
