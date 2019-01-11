<!-- 车商管理/新增编辑 -->
<template>
<div class="carts-details">
    <div class="carts-details-form">
        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行编码</div>
                    <el-input placeholder="请输入车行编码" v-model="shopsNo"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行名称</div>
                    <el-input placeholder="请输入车行名称" v-model="shopsName"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行类型</div>
                    <el-select v-model="shopsType" placeholder="请选择车行类型">
                        <el-option
                            v-for="item in shopsTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">车行星级</div>
                    <el-select v-model="shopsRate" placeholder="请选择车行星级">
                        <el-option
                            v-for="item in shopsRateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">是否合作</div>
                    <el-select v-model="shopsRate" placeholder="请选择是否合作">
                        <el-option label="合作" value="合作"></el-option>
                        <el-option label="不合作" value="不合作"></el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">联系人</div>
                    <el-input placeholder="请输入联系人" v-model="contactName"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">联系电话</div>
                    <el-input placeholder="请输入联系电话" v-model="contactPhone"></el-input>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">品牌</div>
                    <el-input placeholder="请输入品牌" v-model="brand"></el-input>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">上级集团</div>
                    <el-input placeholder="请输入上级集团" v-model="parCompany"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">支公司</div>
                    <el-select v-model="subCompanyName" placeholder="请选择支公司">
                        <el-option
                            v-for="item in subCompanyNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">团队</div>
                    <el-select v-model="team" placeholder="请选择团队">
                        <el-option
                            v-for="item in teamOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            
            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">渠道代码</div>
                    <el-input placeholder="请输入渠道代码" v-model="linkCode"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="details-form-item">
                    <div class="form-item-title">备注</div>
                    <el-input placeholder="请输入备注" v-model="remark"></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="details-form-item">
                    <div class="form-item-title">网点地址</div>
                    <!-- 这里需要百度地图模糊地址查询的功能 -->
                    <div @click="isBaiduMapModalShow = true" :class="`form-item-map ${ (address && longitude && latitude) ? 'item-succeed-map' : 'item-search-map'}`">
                        <el-input readonly :prefix-icon="`${ (address && longitude && latitude) ? 'el-icon-circle-check-outline' : 'el-icon-search'}`" placeholder="请输入网点地址" v-model="address"></el-input>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>

    <!-- 地图选择模态框 -->
    <ModalByZindex 
        class="baidu-map-modal"
        :isShow="isBaiduMapModalShow" 
        :zindex="9999" 
        @clickShade="isBaiduMapModalShow = false"
    >
        <div class="map-modal-container">

            <div class="map-modal-title flex-center">
                <div class="modal-title-left flex-rest">选择网点地址</div>
                <div class="modal-title-right" @click="isBaiduMapModalShow = false;"><i class="el-icon-close"></i></div>
            </div>

            <div :class="`map-modal-input ${ (addressSearch && longitude && latitude) ? 'item-succeed-map' : 'item-search-map'}`">
                <el-input 
                    @focus="isInputAddress = true"
                    @blur="isInputAddress = false"
                    :prefix-icon="`${ (addressSearch && longitude && latitude) ? 'el-icon-circle-check-outline' : 'el-icon-search'}`"
                    placeholder="请输入网点地址" 
                    v-model="addressSearch"
                ></el-input>
                
                <!-- 搜索列表 -->
                <div class="input-search-list" v-if="addressSearchResult.length > 0">
                    <div class="search-list-container">
                        <div class="input-search-item"
                            v-for="(item, key) in addressSearchResult"
                            :key="key"
                            @click="selectSearchAddress(item)"
                        >
                            {{item.address}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="map-modal-main">
                <div class="map-modal-main" id="BaiduMap"></div>
            </div>

            <div class="map-modal-operate flex-start-center">
                <div class="modal-operate-left flex-rest"></div>
                <div class="modal-operate-right flex-start-center">
                    <el-button type="info" plain @click="isBaiduMapModalShow = false">取消</el-button>
                    <div style="width: 15px;"></div>
                    <el-button 
                        :type="(addressSearch && longitude && latitude) ? 'primary' : ''" 
                        @click="saveAddressHandle"
                    >保存</el-button>
                </div>
            </div>
        </div>
    </ModalByZindex>

    <div class="carts-details-operate flex-center">
        <div class="details-operate-container flex-start">
            <el-button type="info" plain>取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
// 组件类
import ModalByZindex from '@/components/ModalByZindex';

export default {
    name: 'carts-details',

    components: { ModalByZindex },

	data: function data() { 
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度

            /**
             * 页面状态
             * @param {string} add 新增
             * @param {string} edit 编辑
             */
            pageType: 'add',
            
            mountBaiduMap: new BMap.Map('BaiduMap'), // 百度地图实例 

            shopsNo: '', // 车行编码
            shopsName: '', // 车行名称
            shopsType: '', // 车行类型
            shopsTypeOptions: [
                {
                    value: '4S店',
                    label: '4S店',
                }, {
                    value: '二网',
                    label: '二网',
                }, {
                    value: '修理厂',
                    label: '修理厂',
                }, {
                    value: '二手车行',
                    label: '二手车行',
                }, {
                    value: '续保',
                    label: '续保',
                }, {
                    value: '非车险',
                    label: '非车险',
                }, {
                    value: '网络销售',
                    label: '网络销售',
                }, {
                    value: '其他',
                    label: '其他',
                }
            ],
            shopsRate: '', // 车行星级
            shopsRateOptions: [
                /**
                 * 4S店与二网：A级、B级、C级、D级、E级 
                 * 其他：一星级、二星级、三星级、四星级、五星级
                 */
                {
                    value: '车行星级一',
                    label: '车行星级一',
                }
            ],
            contactName: '汤俊猛', // 联系人
            contactPhone: '13924593603', // 联系电话
            brand: '', // 品牌
            parCompany: '', // 上级集团
            subCompanyName: '', // 支公司
            subCompanyNameOptions: [
                {
                    value: '支公司一',
                    label: '支公司一',
                }
            ],
            team: '', // 团队
            teamOptions: [
                {
                    value: '团队一',
                    label: '团队一',
                }
            ],
            linkCode: '', // 渠道代码
            remark: '', // 备注

            address: '', // 地址
            longitude: '', // 经度
            latitude: '', // 纬度
            isBaiduMapModalShow: false, // 百度地图选择模态框
            addressSearch: '', // 地址模糊搜索
            isInputAddress: false, // 是否正在输入地址
            addressSearchResult: [], // 地址模糊搜索结果列表
        }
    },

    watch: {
        /**
         * 地址搜索
         */
        addressSearch: function addressSearch(newAddressSearch, oldAddressSearch) {
            const _this = this;

            // 只有在输入的时候才进行检索
            if (this.isInputAddress === false) {
                // 否则阻止以下的执行
                return false;
            }

            // 在输入的时候，清空经纬度
            this.longitude = ''; // 经度
            this.latitude = ''; // 纬度

            // 实例化 用于位置检索、周边检索和范围检索的类
            let baiduMapLocalSearch = new BMap.LocalSearch(
                this.mountBaiduMap.getCenter(), // 检索区域, 设置为 目前的地图实例可视区域的中心
                {
                    renderOptions: { // 结果呈现设置
                        map: this.mountBaiduMap, // 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上
                    }
                }
            );

            baiduMapLocalSearch.search(newAddressSearch);
            // 因为是异步的，所以获取结果需要时间
            baiduMapLocalSearch.setSearchCompleteCallback(function() {
                let localResult = baiduMapLocalSearch.getResults();

                if (localResult && localResult.Gq) {
                    _this.addressSearchResult = localResult.Gq;
                }
            });
        },
    },

	mounted: function mounted() {
        this.initPageData(); // 初始化页面数据
        this.initBaiduMap(); // 初始化百度地图
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
         * 初始化百度地图
         */
        initBaiduMap: function initBaiduMap() {
            const _this = this;
            this.mountBaiduMap = new BMap.Map('BaiduMap'); // 创建地图实例  
            this.mountBaiduMap.centerAndZoom(new BMap.Point(114.059560, 22.542860), 13); // 初始化地图，设置中心点坐标(深圳福田) 和地图级别  
            this.mountBaiduMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

            // 绑定点击事件
            this.mountBaiduMap.addEventListener("click", function(event) {   
                let thisLongitude = event.point.lng; // 经度
                let thisLatitude = event.point.lat; // 纬度

                // 逆地址解析
                let baiduMapGeocoder = new BMap.Geocoder(); // 实例化 用于获取用户的地址解析的类。
                // 根据坐标得到地址描述 
                baiduMapGeocoder.getLocation(new BMap.Point(thisLongitude, thisLatitude), function(result){      
                    if (result) {
                        // 如果得到地址
                        _this.longitude = result.point.lng; // 设置 经度
                        _this.latitude = result.point.lat; // 设置 纬度
                        _this.addressSearch = result.address; // 设置 模糊搜索的地址
                        _this.renderMarkerBy(result.point.lng, result.point.lat, result.business, result.address); // 标注到地图位置上 并且设置为地图中心 弹出信息窗口(如果存在) 
                    }
                });
            });
        },

        /**
         * 选中搜索结果的其中一个地址
         */
        selectSearchAddress: function selectSearchAddress(item) {
            this.addressSearchResult = []; // 清空首胜结果

            this.addressSearch = item.address; // 渲染到 搜索框
            this.longitude = item.point.lng; // 设置 经度
            this.latitude = item.point.lat; // 设置 纬度
            this.renderMarkerBy(item.point.lng, item.point.lat, item.title, item.address); // 标注到地图位置上 并且设置为地图中心
        },

        /**
         * 根据 经纬度 标注到地图位置上 并且设置为地图中心 弹出信息窗口(如果存在)
         * @param {string} longitude
         */
        renderMarkerBy: function renderMarkerBy(longitude, latitude, title, address) {
            let myPoint = new BMap.Point(longitude, latitude);

            this.mountBaiduMap.setCenter(myPoint);
            this.mountBaiduMap.clearOverlays(); // 清除所有遮罩物
            this.mountBaiduMap.addOverlay(new BMap.Marker(myPoint)); // 创建标注

            if (title && address) {
                // 创建信息窗口对象    
                let infoWindow = new BMap.InfoWindow(
                    address, 
                    {    
                        width : 100,     // 信息窗口宽度 
                        height: 22,     // 信息窗口高度    
                        title : title  // 信息窗口标题   
                    }
                );
                // 打开信息窗口
                this.mountBaiduMap.openInfoWindow(infoWindow, myPoint); 
            }
        },

        /**
         * 保存选择的地址
         */
        saveAddressHandle: function saveAddressHandle() {
            if (!this.longitude || !this.latitude || !this.addressSearch) {
                // 其中一个地址不存在都不可以保存
                return alert('请选择网点地址!');
            }

            this.address = this.addressSearch;
            this.isBaiduMapModalShow = false; // 关闭 百度地图选择模态框
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
