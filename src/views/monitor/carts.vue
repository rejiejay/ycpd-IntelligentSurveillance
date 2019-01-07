<!-- 车行监控 -->
<template>
<div class="monitor-carts flex-start" :style="`height: ${clientHeight - 50}px`">
    <!-- 地图部分 -->
    <div class="monitor-carts-map flex-rest" id="BaiduMap"></div>

    <!-- 侧边栏部分 -->
    <div class="monitor-carts-sidebar">
        <!-- 筛选 -->
        <div class="carts-sidebar-filter">
            
            <div class="sidebar-filter-title">
                <i class="el-icon-search"></i>
                <span>查询条件</span>
            </div>

            <div class="sidebar-filter-main">
                <div class="sidebar-filter-container">
                    
                    <div class="filter-main-time flex-start">
                        <div class="main-time flex-rest">2019-01-07 至 2019-01-09</div>

                        <el-button type="danger" size="small">
                            <svg width="14" height="14" t="1546828811561" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1749" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path d="M595.716 972.68c-7.013 0-13.911-2.279-19.616-6.788l-178.877-142.27c-7.47-5.929-11.803-15.052-11.803-24.63v-301.706c0-1.023-0.458-1.938-1.141-2.619l-283.803-283.915c-1.14-1.14-2.222-2.341-3.137-3.591-16.023-16.822-24.521-38.031-24.521-60.446 0-47.612 38.775-86.387 86.33-86.387h703.654c47.558 0 86.331 38.775 86.331 86.387 0 22.183-8.434 43.284-23.718 59.362-0.57 0.801-1.765 2.222-2.566 2.907l-294.576 294.691c-0.682 0.686-1.14 1.657-1.14 2.684v434.962c0 12.090-6.899 23.041-17.846 28.282-4.336 2.052-9.010 3.079-13.573 3.079v0zM448.259 783.823l116.038 92.266v-369.791c0-17.846 6.899-34.494 19.386-47.098l293.664-293.664c0.912-1.085 1.77-1.997 2.684-2.967 3.877-4.109 6.211-9.863 6.211-15.853 0-12.943-10.606-23.49-23.491-23.49h-703.596c-12.941 0-23.491 10.606-23.491 23.49 0 6.047 2.341 11.865 6.557 16.196 1.537 1.597 2.909 3.308 4.22 4.903l282.318 282.373c12.372 12.372 19.504 29.535 19.504 47.098v286.539zM448.259 783.823z" p-id="1959" fill="#ffffff"></path>
                            </svg>
                        </el-button>
                    </div>

                    <div class="filter-main-subcompany">南山支公司 - 合作</div>
                </div>
            </div>
        </div>

        <!-- 合作网点 -->
        <div class="carts-sidebar-regionsite">
            
            <div class="sidebar-regionsite-title">合作网点</div>

            <div class="sidebar-regionsite-main">
                <div class="sidebar-regionsite-container">
                    <div class="regionsite-describe-content flex-start-center">
                        <div class="describe-content-item flex-rest">
                            <div style="border-right: 1px solid #ddd;">合作网点数</div>
                            <div class="content-item-money" style="border-right: 1px solid #ddd;"><span>459</span>家</div>
                        </div>
                        <div class="describe-content-item flex-rest">
                            <div>定损金额</div>
                            <div class="content-item-money"><span>1443</span>家</div>
                        </div>
                    </div>
                    <div class="regionsite-describe-tip flex-start-center">
                        <div class="flex-rest">· 新增网点：<span style="color: #67C23A;">32</span></div>
                        <div class="flex-rest">· 签约率：<span style="color: #67C23A;">22.92%</span></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 车行信息 -->
        <div class="carts-sidebar-carts">
            
            <div class="sidebar-carts-title">车行信息</div>

            <div class="sidebar-carts-main">
                <div class="sidebar-carts-container">

                    <div class="carts-main-title">深圳市龙岗区宝创汽车服务中心</div>

                    <div class="carts-main-address">广东省深圳市龙岗区宝荷大道171号</div>

                    <div class="carts-main-lable flex-start-bottom">
                        <div class="main-lable-item">已签约</div>
                        <div class="main-lable-item">4s店</div>
                        <el-rate
                            v-model="rate"
                            disabled
                            :colors="['#F56C6C', '#F56C6C', '#F56C6C']"
                            disabled-void-color="#ddd"
                        ></el-rate>
                    </div>

                    <div class="carts-main-details">
                        <div class="main-details-row flex-start">
                            <div class="details-row-left">机构：</div>
                            <div class="details-row-right">南山支公司 — 业务一部</div>
                        </div>
                        <div class="main-details-row flex-start">
                            <div class="details-row-left">送修码：</div>
                            <div class="details-row-right">4403102349422</div>
                        </div>
                        <div class="main-details-row flex-start">
                            <div class="details-row-left">联系人：</div>
                            <div class="details-row-right">张炳杰</div>
                        </div>
                        <div class="main-details-row flex-start">
                            <div class="details-row-left">电话：</div>
                            <div class="details-row-right">18927403415</div>
                        </div>
                        <div class="main-details-describe">
                            <div class="details-describe-content flex-start-center">
                                <div class="describe-content-item flex-rest">
                                    <div style="border-right: 1px solid #ddd;">保费金额</div>
                                    <div class="content-item-money" style="border-right: 1px solid #ddd; color: #67C23A;">329112</div>
                                </div>
                                <div class="describe-content-item flex-rest">
                                    <div>定损金额</div>
                                    <div class="content-item-money" style="color: #F56C6C;">168872</div>
                                </div>
                            </div>
                            <div class="details-describe-tip flex-center">· 保费/定损金额比例： <span style="color: #67C23A;">154%</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    name: 'monitor-carts',

	data: function data() { 
        return {
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度

            mountBaiduMap: new BMap.Map('BaiduMap'), // 百度地图实例 

            rate: 4, // 评分
        } 
    },

	mounted: function mounted() {
        this.initBaiduMap(); // 初始化百度地图
    },

	methods: {
        /**
         * 初始化百度地图
         */
        initBaiduMap: function initBaiduMap() {
            this.mountBaiduMap = new BMap.Map('BaiduMap'); // 创建地图实例  
            this.mountBaiduMap.centerAndZoom(new BMap.Point(114.059560, 22.542860), 13); // 初始化地图，设置中心点坐标(深圳福田) 和地图级别  
            this.mountBaiduMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
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

.monitor-carts {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 地图
.monitor-carts-map {
    height: 100%;
}

// 侧边栏
.monitor-carts-sidebar {
    width: 300px;
    background: #fff;
    height: 100%;
    overflow-y: auto;

    // 筛选
    .carts-sidebar-filter {
        padding: 15px 15px 0px 15px;

        .sidebar-filter-title i {
            color: #F56C6C;
        }

        .sidebar-filter-main {
            padding-top: 15px;

            .sidebar-filter-container {
                background: #f5f5f5;
                border-radius: 4px;
            }

            .filter-main-time {
                padding-left: 15px;
                line-height: 35.6px;
            }

            .filter-main-subcompany {
                padding-left: 15px;
                line-height: 40px;
            }
        }
    }

    // 合作网点
    .carts-sidebar-regionsite {
        padding: 15px 15px 0px 15px;

        .sidebar-regionsite-title {
            border-left: 2px solid #F56C6C;
            padding-left: 5px;
        }

        .sidebar-regionsite-main {
            padding-top: 15px;

            .sidebar-regionsite-container {
                padding: 15px;
                border-radius: 4px;
                background: #f5f5f5;
            }
        }

        .regionsite-describe-content {
            border-bottom: 1px solid #ddd;

            .describe-content-item {
                text-align: center;
                padding: 15px 0px;
            }

            .content-item-money {
                padding-top: 7.5px;
                font-size: 24px;
            }
        }

        .regionsite-describe-tip {
            padding-top: 5px;
            font-size: 12px;
            text-align: center;
        }
    }

    // 车行信息
    .carts-sidebar-carts {
        padding: 15px 15px 0px 15px;

        .sidebar-carts-title {
            border-left: 2px solid #F56C6C;
            padding-left: 5px;
        }

        .sidebar-carts-main {
            padding-top: 15px;

            .sidebar-carts-container {
                padding: 15px;
                border-radius: 4px;
                background: #f5f5f5;
            }
        }
        
        .carts-main-title {
            padding-bottom: 5px;
        }
        
        .carts-main-address {
            font-size: 12px;
            color: $black3;
            padding-bottom: 10px;
        }

        .carts-main-lable {

            .main-lable-item {
                font-size: 12px;
                padding: 0px 5px;
                margin-right: 10px;
                line-height: 20px;
                color: #fff;
                background: #67C23A;
            }

            .el-rate {
                height: 18px;
                font-size: 14px !important;

                .el-rate__icon,
                .el-icon-star-on,
                i {
                    font-size: 14px !important;
                }
            }
        }

        .carts-main-details {
            padding-top: 15px;

            .main-details-row {
                line-height: 45px;
                border-bottom: 1px solid #ddd;

                .details-row-left {
                    width: 70px;
                }
            }

            .main-details-describe {
                .details-describe-content {
                    border-bottom: 1px solid #ddd;

                    .describe-content-item {
                        text-align: center;
                        padding: 15px 0px;
                    }

                    .content-item-money {
                        padding-top: 7.5px;
                        font-size: 24px;
                    }
                }

                .details-describe-tip {
                    padding-top: 5px;
                    font-size: 12px;
                }
            }
        }
    }
}

</style>
