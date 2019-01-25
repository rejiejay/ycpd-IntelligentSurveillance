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
                    <el-select 
                        v-model="shopsRate" 
                        :disabled="!shopsType"
                        placeholder="请选择车行星级"
                    >
                        <el-option  v-if="shopsType === '0' || shopsType === '1' || shopsType === '2'"
                            label="A级"
                            value="A级"
                        ></el-option>
                        <el-option  v-if="shopsType === '0' || shopsType === '1' || shopsType === '2'"
                            label="B级"
                            value="B级"
                        ></el-option>
                        <el-option  v-if="shopsType === '0' || shopsType === '1' || shopsType === '2'"
                            label="C级"
                            value="C级"
                        ></el-option>
                        <el-option  v-if="shopsType === '0' || shopsType === '1' || shopsType === '2'"
                            label="D级"
                            value="D级"
                        ></el-option>
                        <el-option  v-if="shopsType === '0' || shopsType === '1' || shopsType === '2'"
                            label="E级"
                            value="E级"
                        ></el-option>
                        <el-option  v-if="shopsType !== '0' && shopsType !== '1' && shopsType !== '2'"
                            label="一星级"
                            value="一星级"
                        ></el-option>
                        <el-option  v-if="shopsType !== '0' && shopsType !== '1' && shopsType !== '2'"
                            label="二星级"
                            value="二星级"
                        ></el-option>
                        <el-option  v-if="shopsType !== '0' && shopsType !== '1' && shopsType !== '2'"
                            label="三星级"
                            value="三星级"
                        ></el-option>
                        <el-option  v-if="shopsType !== '0' && shopsType !== '1' && shopsType !== '2'"
                            label="四星级"
                            value="四星级"
                        ></el-option>
                        <el-option  v-if="shopsType !== '0' && shopsType !== '1' && shopsType !== '2'"
                            label="五星级"
                            value="五星级"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="8">
                <div class="details-form-item">
                    <div class="form-item-title">是否合作</div>
                    <el-select v-model="isJoin" placeholder="请选择是否合作">
                        <el-option label="合作" value="1"></el-option>
                        <el-option label="不合作" value="0"></el-option>
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
                    <el-select 
                        v-model="team" 
                        placeholder="请选择团队"
                        :disabled="!subCompanyName"
                    >
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
            <el-button type="info" plain @click="$router.back(-1)">取消</el-button>
            <div style="width: 45px;"></div>
            <el-button type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
// 组件类
import ModalByZindex from '@/components/ModalByZindex';
// 请求类
import { addStoreUsingPOST, modifyStoreUsingPOST } from "@/api/shops/carts";
import { queryTeamByBcIdUsingGET } from "@/api/team";
import { queryCompanyListUsingGET } from "@/api/subcompany";

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
                    value: '0',
                    label: '4S店',
                }, {
                    value: '1',
                    label: '修理厂',
                }, {
                    value: '2',
                    label: '二网',
                }, {
                    value: '3',
                    label: '二手车行',
                }, {
                    value: '4',
                    label: '续保',
                }, {
                    value: '5',
                    label: '非车险',
                }, {
                    value: '6',
                    label: '网络销售',
                }, {
                    value: '7',
                    label: '其他',
                }
            ],
            /**
             * 4S店与二网：A级、B级、C级、D级、E级 
             * 其他：一星级、二星级、三星级、四星级、五星级
             */
            shopsRate: '', // 车行星级
            isJoin: '', // 是否合作
            contactName: '', // 联系人
            contactPhone: '', // 联系电话
            brand: '', // 品牌
            parCompany: '', // 上级集团
            subCompanyName: '', // 支公司
            subCompanyNameOptions: [
                // {
                //     value: '支公司一',
                //     label: '支公司一',
                // }
            ],
            team: '', // 团队
            teamOptions: [
                // {
                //     value: '团队一',
                //     label: '团队一',
                // }
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

        /**
         * 就是支公司 发生改变的时候 根据支公司唯一id获取团队列表
         */
        subCompanyName: function subCompanyName(newsubcompany) {
            this.team = '';
            this.queryTeamByBcId(newsubcompany);
        },
    },

	mounted: function mounted() {
        this.initBaiduMap(); // 初始化百度地图
        this.queryCompanyList(); // 初始化 支公司下拉
    },

	methods: {
        /**
         * 初始化页面数据
         */
        initPageData: function initPageData() {
            // 如果 页面状态 存在 id 表示编辑状态
            let query = this.$route.query;
            let id = query.id;
            if (id) {
                console.log(query)
                this.pageType = 'edit';
                this.id = query.id; // 车行唯一标识
                this.shopsNo = query.networkNo; // 车行编码
                this.shopsName = query.networkName; // 车行名称
                
                // 初始化 车行类型
                if (query.networkType === '4S店') {
                    this.shopsType = '0';
                } else if (query.networkType === '修理厂') {
                    this.shopsType = '1';
                } else if (query.networkType === '二网') {
                    this.shopsType = '2';
                } else if (query.networkType === '二手车行') {
                    this.shopsType = '3';
                } else if (query.networkType === '续保') {
                    this.shopsType = '4';
                } else if (query.networkType === '非车险') {
                    this.shopsType = '5';
                } else if (query.networkType === '网络销售') {
                    this.shopsType = '6';
                } else if (query.networkType === '其他') {
                    this.shopsType = '7';
                }

                this.shopsRate = `${query.star}`; // 车行星级
                this.isJoin = `${query.isJoin}`; // 是否合作
                this.contactName = `${query.contact}`; // 联系人
                this.contactPhone = `${query.phone}`; // 联系电话
                this.brand = `${query.brand}`; // 品牌
                this.parCompany = query.superiorGroup; // 上级集团
                this.subCompanyName = `${query.bcCode}`; // 支公司代码
                this.team = `${query.teamId}`; // 团队
                this.linkCode = query.channelCode; // 渠道代码
                this.remark = query.remark; // 备注
                this.address = query.address; // 地址
                this.addressSearch = query.address; // 地址
                this.longitude = query.longitude; // 经度
                this.latitude = query.latitude; // 纬度
            }
        },

        /**
         * 新增预警
         */
        submit: function submit() {
            const _this = this;

            if (!this.shopsNo) {
                return this.$notify({title: '提示', message: '车行编码不能为空', duration: 0 });
            }
            if (!this.shopsName) {
                return this.$notify({title: '提示', message: '车行名称不能为空', duration: 0 });
            }
            if (!this.shopsType) {
                return this.$notify({title: '提示', message: '请选择车行类型', duration: 0 });
            }
            if (!this.shopsRate) {
                return this.$notify({title: '提示', message: '请选择车行星级', duration: 0 });
            }
            if (!this.isJoin) {
                return this.$notify({title: '提示', message: '请选择是否合作', duration: 0 });
            }
            if (!this.contactName) {
                return this.$notify({title: '提示', message: '联系人不能为空', duration: 0 });
            }

            let phone = this.contactPhone ? this.contactPhone.replace(/\s+/g,"") : ''; // 联系电话
            if (!phone) {
                return this.$notify({title: '提示', message: '联系电话不能为空', duration: 0 });
            } else if (/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(phone) === false) {
                return this.$notify({title: '提示', message: '请输入正确的电话号码', duration: 0 });
            }

            if (!this.brand) {
                return this.$notify({title: '提示', message: '品牌不能为空', duration: 0 });
            }
            if (!this.parCompany) {
                return this.$notify({title: '提示', message: '上级集团不能为空', duration: 0 });
            }
            if (!this.subCompanyName) {
                return this.$notify({title: '提示', message: '请选择支公司', duration: 0 });
            }
            if (!this.team) {
                return this.$notify({title: '提示', message: '请选择团队', duration: 0 });
            }
            if (!this.linkCode) {
                return this.$notify({title: '提示', message: '渠道代码不能为空', duration: 0 });
            }
            if (!this.address || !this.longitude || !this.latitude ) {
                return this.$notify({title: '提示', message: '请选择地址', duration: 0 });
            }

            let id = this.id; // 车行唯一标识
            let networkNo = this.shopsNo; // 车行编码
            let networkName = this.shopsName; // 车行名称
            let networkType = this.shopsType; // 车行类型
            let star = this.shopsRate; // 车行星级
            let isJoin = this.isJoin; // 是否合作
            let contact = this.contactName; // 联系人
            let brand = this.brand; // 品牌
            let superiorGroup = this.parCompany; // 上级集团
            let bcId = this.subCompanyName; // 支公司
            let teamId = this.team; // 团队
            let channelCode = this.linkCode; // 渠道代码
            let remark = this.remark; // 备注
            let address = this.address; // 地址
            let longitude = this.longitude; // 经度
            let latitude = this.latitude; // 纬度

            let addStore = () => {

                addStoreUsingPOST(networkNo, networkName, networkType, star, isJoin, contact, phone, brand, superiorGroup, bcId, teamId, channelCode, remark, address, longitude, latitude)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('添加支公司规则异常', '添加失败');
                    } else {
                        return _this.$alert(val.msg, '添加失败');
                    }

                }, error => console.log(error));
            }

            let modifyStore = () => {
                modifyStoreUsingPOST(id, networkNo, networkName, networkType, star, isJoin, contact, phone, brand, superiorGroup, bcId, teamId, channelCode, remark, address, longitude, latitude)
                .then(val => {
                    if (val.code === 1000) {
                        _this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        _this.$router.back(-1);
                        
                    } else if (val.code === 1001) {
                        return _this.$alert('修改支公司异常', '修改失败');
                    } else {
                        return _this.$alert(val.msg, '修改失败');
                    }

                }, error => console.log(error));
            }

            if (this.pageType === 'add') {
                addStore()
            } else {
                modifyStore();
            }

        },
        
        /**
         * 支公司下拉选项
         */
        queryCompanyList: function queryCompanyList() {
            const _this  = this;

            queryCompanyListUsingGET()
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.subCompanyNameOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                }
                
                _this.initPageData(); // 初始化页面数据

            }, error => console.log(error))
        },

        /**
         * 根据支公司唯一id获取团队列表
         */
        queryTeamByBcId: function queryTeamByBcId(bcId) {
            const _this = this;

            queryTeamByBcIdUsingGET(bcId)
            .then(val => {
                let data = val.data;

                if (data && data instanceof Array && data.length > 0) {
                    _this.teamOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                } else {
                    _this.teamOptions = []; // 记得清空
                }

            }, error => console.log(error))
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
