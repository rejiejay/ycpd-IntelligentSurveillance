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

                        <el-button type="danger" size="small" @click="isFilterModalShow = true">
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

    <!-- 搜索框 -->
    <div class="monitor-carts-search">
        <el-input class="carts-search-main"
            placeholder="请输入内容" 
            v-model="search" 
            clearable
        >
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <div class="carts-search-results" v-if="searchResults.length > 0">
            <div class="search-results-container">
                <div 
                    class="search-results-item flex-start-center"
                    v-for="(item, key) in searchResults" 
                    :style="`${key !== (searchResults.length - 1) ? 'border-bottom: 1px solid #ddd;' : ''}`"
                    :key="key"
                >
                    <div class="results-item-left flex-rest">
                        <div class="item-left-title">{{item.title}}</div>
                        <div class="item-left-address">{{item.address}}</div>
                        <div class="item-left-lable flex-start-bottom">
                            <div :class="`left-lable-item ${item.isSigned ? 'signed-contract' : 'not-signed-contract'}`">{{item.isSigned ? "已签约" : "未签约"}}</div>
                            <el-rate
                                v-model="item.rate"
                                disabled
                                :colors="['#F56C6C', '#F56C6C', '#F56C6C']"
                                disabled-void-color="#ddd"
                            ></el-rate>
                        </div>
                    </div>
                    <div class="results-item-img">
                        <img src="https://ycpd-assets.oss-cn-shenzhen.aliyuncs.com/pingan-wechatapplets/home/banner/001image001.jpg" alt="resultsitemimg" />
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- 筛选模态框 -->
    <ModalByZindex 
        class="filter-modal"
        :isShow="isFilterModalShow" 
        :zindex="3" 
        @clickShade="isFilterModalShow = false"
    >
        <div class="modal-main-content">
            <div class="modal-main-title flex-start">
                <div class="main-title-left flex-rest">请选择筛选条件</div>
                <div class="main-title-right" @click="isFilterModalShow = false"><i class="el-icon-close"></i></div>
            </div>

            <div class="modal-main-time flex-start">
                <el-date-picker
                    v-model="startTime"
                    type="date"
                    placeholder="开始日期"
                ></el-date-picker>
                <div style="width: 15px;"></div>
                <el-date-picker
                    v-model="endTime"
                    type="date"
                    placeholder="结束日期"
                ></el-date-picker>
            </div>

            <div class="modal-main-select flex-start">
                <el-select v-model="subcompany" placeholder="请选择支公司">
                    <el-option
                        v-for="item in subcompanyList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <div style="width: 15px;"></div>
                <el-select v-model="team" placeholder="请选择团队">
                    <el-option
                        v-for="item in teamList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <div style="width: 15px;"></div>
                <el-select v-model="salesman" placeholder="请选择业务员">
                    <el-option
                        v-for="item in salesmanList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div>

            <div class="modal-main-select flex-start">
                <el-select v-model="carts" placeholder="请选择车行">
                    <el-option
                        v-for="item in cartsList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <div style="width: 15px;"></div>
                <el-select v-model="cooperation" placeholder="请选择是否合作">
                    <el-option
                        v-for="item in cooperationList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <div style="width: 15px;"></div>
                <el-select v-model="regionType" placeholder="请选择网点类型">
                    <el-option
                        v-for="item in regionTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </div>

            <div class="modal-main-switch">
                <el-switch
                    v-model="isFilterParticularCase"
                    active-color="#13ce66"
                    inactive-color="#909399">
                </el-switch>
                <span>过滤特殊案件（人伤大货车事故等）</span>
            </div>

            <div class="modal-main-district">
                <div class="main-district-title">保费区间</div>
                <div class="main-district-content flex-start">
                    <el-input
                        placeholder="最低保费"
                        v-model="minPremium"
                        type="number"
                        clearable
                    ></el-input>
                    <div style="width: 30px;"></div>
                    <el-input
                        placeholder="最高保费"
                        v-model="maxPremium"
                        type="number"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="modal-main-district">
                <div class="main-district-title">定损金额区间</div>
                <div class="main-district-content flex-start">
                    <el-input
                        placeholder="最低定损金额"
                        v-model="minLoss"
                        type="number"
                        clearable
                    ></el-input>
                    <div style="width: 30px;"></div>
                    <el-input
                        placeholder="最高定损金额"
                        v-model="maxLoss"
                        type="number"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="modal-main-district">
                <div class="main-district-title">保费/定损金额占比</div>
                <div class="main-district-content flex-start">
                    <el-input
                        placeholder="最低占比"
                        v-model="minProportion"
                        type="number"
                        clearable
                    ></el-input>
                    <div style="width: 30px;"></div>
                    <el-input
                        placeholder="最高占比"
                        v-model="maxProportion"
                        type="number"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="modal-main-operate flex-start">
                <div class="main-operate-item flex-rest flex-center">
                    <el-button type="success" icon="el-icon-search">查询</el-button>
                </div>
                <div class="main-operate-item flex-rest flex-center">
                    <el-button type="info" icon="el-icon-close" @click="isFilterModalShow = false">关闭</el-button>
                </div>
            </div>
        </div>
    </ModalByZindex>
</div>
</template>

<script>
// 组件类
import ModalByZindex from '@/components/ModalByZindex';

export default {
    name: 'monitor-carts',

    components: { ModalByZindex },

	data: function data() { 
        let thisFullYear = new Date().getFullYear(); // 今年
        let thisMonth = new Date().getMonth(); // 这个月 - 1
        // 初始化 筛选的开始时间
        let initStartTime = new Date(thisFullYear, thisMonth, 1);
        // 下个月初的时间戳
        let nextMonthTimestamp = new Date(thisFullYear, thisMonth + 1, 1).getTime();
        // 初始化 筛选的结束时间
        let initEndTime = new Date(thisFullYear, thisMonth, new Date(nextMonthTimestamp - (1000 * 60 * 60 * 24)).getDate());

        return {
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度

            mountBaiduMap: new BMap.Map('BaiduMap'), // 百度地图实例 

            rate: 4, // 评分

            /**
             * 搜索
             */
            search: '', // 搜索内容
            searchResults: [ // 搜索结果
                // {
                //     title: '深圳市宝创汽车贸易有限公司',
                //     address: '广东省深圳市龙岗区宝荷大道171号',
                //     isSigned: false,
                //     lable: '已签约',
                //     rate: 4,
                // }, {
                //     title: '深圳市宝创汽车贸易有限公司',
                //     address: '广东省深圳市龙岗区宝荷大道171号',
                //     isSigned: true,
                //     lable: '已签约',
                //     rate: 3,
                // }
            ],

            /**
             * 筛选
             */
            isFilterModalShow: false, // 是否显示筛选模态框
            startTime: initStartTime, // 开始日期
            endTime: initEndTime, // 结束日期
            subcompany: '', // 支公司
            subcompanyList: [
                {
                    value: '支公司一',
                    lable: '支公司一',
                }
            ],
            team: '', // 团队
            teamList: [
                {
                    value: '团队一',
                    lable: '团队一',
                }
            ],
            salesman: '', // 业务员
            salesmanList: [
                {
                    value: '业务员一',
                    lable: '业务员一',
                }
            ],
            carts: '', // 车行
            cartsList: [
                {
                    value: '车行一',
                    lable: '车行一',
                }
            ],
            cooperation: '', // 是否合作
            cooperationList: [
                {
                    value: '合作',
                    lable: '合作',
                }, {
                    value: '不合作',
                    lable: '不合作',
                }
            ],
            regionType: '', // 网点类型
            regionTypeList: [
                {
                    value: '网点类型一',
                    lable: '网点类型一',
                }
            ],
            isFilterParticularCase: false, // 是否过滤特殊案件
            minPremium: '', // 最低保费
            maxPremium: '', // 最高保费
            minLoss: '', // 最低定损金额
            maxLoss: '', // 最高定损金额
            minProportion: '', // 最低定占比
            maxProportion: '', // 最高定占比
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

// 搜索框
.monitor-carts-search {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 300px;

    .carts-search-results {
        padding-top: 15px;
        
        .search-results-container {
            background: #fff;
            padding: 0px 10px 0px 10px;
        }

        .search-results-item {
            padding-top: 10px;
            padding-bottom: 10px;
            cursor: pointer;
        }

        .results-item-left {
            padding-right: 15px;
            font-size: 12px;

            .item-left-title {
                color: $black1;
                padding-bottom: 2.5px;
            }

            .item-left-address {
                color: $black3;
                padding-bottom: 5px;
            }

            .item-left-lable {

                .left-lable-item {
                    font-size: 12px;
                    padding: 0px 5px;
                    margin-right: 10px;
                    line-height: 20px;
                    color: #fff;
                }

                .signed-contract {
                    background: #67C23A;
                }

                .not-signed-contract {
                    background: #F56C6C;
                }
            }
        }

        .results-item-img {
            width: 70px;
            height: 50px;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
}

// 筛选模态框
.filter-modal {
    .modal-main-content {
        padding: 15px;
        min-width: 660px;
    }

    .modal-main-title {
        color: $black1;
        font-size: 16px;

        .main-title-right {
            font-size: 18px;
            color: #F56C6C;
            cursor: pointer;
        }
    }

    .modal-main-time {
        padding-top: 15px;

        .el-date-editor {
            width: 307px;
        }
    }

    .modal-main-select {
        padding-top: 15px;

        .el-select {
            width: 200px;
        }
    }

    .modal-main-switch {
        padding-top: 15px;

    }

    .modal-main-operate {
        padding-top: 15px;

        .el-button {
            width: 120px;
        }
    }

    .modal-main-district {
        padding-top: 15px;
        
        .main-district-title {
            padding-bottom: 15px;
        }
    }
}

</style>
