<!-- 车行管理 -->
<template>
<div class="carts-manage">
    <!-- 顶部操作按钮 -->
    <div class="carts-manage-operate flex-start-bottom">
        <div class="manage-operate-left flex-rest">

            <el-select v-model="subCompanySection" placeholder="选择支公司">
                <el-option
                    v-for="item in subCompanyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-select v-model="teamSection" :disabled="!subCompanySection" placeholder="业务团队">
                <el-option
                    v-for="item in teamOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-select v-model="regionSection"  placeholder="网点类型">
                <el-option
                    v-for="item in regionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryAllStore();">查询</el-button>
            <el-button icon="el-icon-download" type="success" @click="exportStore">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>

        <div class="manage-operate-right">
            <el-button icon="el-icon-download" type="text" @click="getStoreTemplate">下载模板</el-button>
            <el-button icon="el-icon-tickets" type="primary" plain>上传清单</el-button>
            <el-button icon="el-icon-plus" type="primary" @click="addHandle">新增</el-button>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="carts-manage-table">
        <el-table
            :data="cartsList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="shopsNo"
                label="车行编码"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="shopsName"
                label="车行名称"
                width="180"
            ></el-table-column>
            <el-table-column
                prop="shopsType"
                label="车行类型"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="shopsRate"
                label="车行星级"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="isCooperate"
                label="是否合作"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="address"
                label="地址"
                width="240"
            ></el-table-column>
            <el-table-column
                prop="contactName"
                label="联系人"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="contactPhone"
                label="联系电话"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="brand"
                label="品牌"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="parCompany"
                label="上级集团"
                width="160"
            ></el-table-column>
            <el-table-column
                prop="subCompanyName"
                label="支公司名称"
                width="160"
            ></el-table-column>
            <el-table-column
                prop="subCompanyCode"
                label="支公司代码"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="linkCode"
                label="渠道代码"
                width="140"
            ></el-table-column>
            <el-table-column
                prop="team"
                label="团队名称"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="teamManager"
                label="团队经理"
                width="120"
            ></el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                width="240"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
            >
                <template slot-scope="scope">
                    <el-button @click="modifierHandle(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteHandle(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="carts-manage-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="pageTotal"
            @size-change="pageSizeChangeHandle"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>
import { findAllStoreUsingPOST, exportStoreUsingGET, getStoreTemplateUsingGET, removeStoreUsingGET } from "@/api/shops/carts";
import { queryTeamByBcIdUsingGET } from "@/api/team";
import { queryCompanyListUsingGET } from "@/api/subcompany";
import { queryStoreSelectUsingPOST } from "@/api/store";

export default {
    name: 'carts-manage',

	data: function data() { 
        return {
            subCompanySection: null, // 支公司
            subCompanyOptions: [
                // {
                //     value: '支公司一',
                //     label: '支公司一',
                // }
            ],
            teamSection: null, // 业务团队
            teamOptions: [
                // {
                //     value: '业务团队一',
                //     label: '业务团队一',
                // }
            ],
            regionSection: null, // 网点
            regionOptions: [
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

            // 车行列表
            cartsList: [
                // {
                //     shopsNo: '122', // 车行编码
                //     shopsName: '车行一', // 车行名称
                //     shopsType: '车行类型一', // 车行类型
                //     shopsRate: '一星', // 车行星级
                //     isCooperate: '合作', // 是否合作
                //     address: '深圳市龙岗区龙岗街道新生社区深惠路1420号J', // 地址
                //     contactName: '汤俊猛', // 联系人
                //     contactPhone: '13924593603', // 联系电话
                //     brand: '东风日产', // 品牌
                //     parCompany: '东风南方集团', // 上级集团
                //     subCompanyName: '新洲支公司', // 支公司名称
                //     subCompanyCode: '440327', // 支公司代码
                //     linkCode: '44033H100011、440321100126', // 渠道代码
                //     team: '团队一', // 团队名称
                //     teamManager: '团队经理', // 团队经理
                //     remark: '', // 备注
                // }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 10, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        }
    },

    watch: {
        /**
         * 就是支公司 发生改变的时候 根据支公司唯一id获取团队列表
         */
        subCompanySection: function subCompanySection(newsubcompany) {
            this.queryTeamByBcId(newsubcompany);
        },
    },

	mounted: function mounted() {
        this.queryAllStore(); // 初始化 获取团队列表
        this.queryCompanyList(); // 支公司下拉选项
    },

	methods: {
        /**
         * 通过条件查询
         */
        queryAllStore: function queryAllStore() {
            const _this = this;

            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            let companyId = this.subCompanySection ? this.subCompanySection : '';
            let storeId = this.shopNetSection ? this.shopNetSection : '';
            let teamId = this.teamSection ? this.teamSection : '';

            findAllStoreUsingPOST(currentPage, pageSize, companyId, storeId, teamId)
            .then(val => {
                let data = val.data;

                _this.pageTotal = data.totalPages;

                if (!data || !data.objs || data.objs instanceof Array === false || data.objs.length <= 0) {
                    _this.cartsList = []; // 记得清空
                    return false;
                }

                _this.cartsList = data.objs.map(val => {
                    let newItem = {};

                    newItem.original = val; // 后端返的原始数据
                    newItem.id = val.id; // 唯一标识
                    newItem.shopsNo = val.networkNo; // 车行编码
                    newItem.shopsName = val.networkName; // 车行名称
                    if ( val.shopsType === 0 ) {
                        newItem.shopsType = '4S店';
                    } else if ( val.shopsType === 1 ) {
                        newItem.shopsType = '修理厂';
                    } else if ( val.shopsType === 2 ) {
                        newItem.shopsType = '二网';
                    } else if ( val.shopsType === 3 ) {
                        newItem.shopsType = '二手车行';
                    } else if ( val.shopsType === 4 ) {
                        newItem.shopsType = '续保';
                    } else if ( val.shopsType === 5 ) {
                        newItem.shopsType = '非车险';
                    } else if ( val.shopsType === 6 ) {
                        newItem.shopsType = '网络销售';
                    } else if ( val.shopsType === 7 ) {
                        newItem.shopsType = '其他';
                    }
                    newItem.shopsRate = val.star; // 车行星级
                    newItem.isCooperate = val.isJoin === 0 ? '未合作' : '合作'; // 是否合作
                    newItem.address = val.address; // 地址
                    newItem.contactName = val.contact; // 联系人
                    newItem.contactPhone = val.phone; // 联系电话
                    newItem.brand = val.brand; // 品牌
                    newItem.parCompany = val.superiorGroup; // 上级集团
                    newItem.subCompanyName = val.bcName; // 支公司名称
                    newItem.subCompanyCode = val.bcCode; // 支公司代码
                    newItem.linkCode = val.channelCode; // 渠道代码
                    newItem.team = val.teamName; // 团队名称
                    newItem.teamManager = val.teamManager; // 团队经理
                    newItem.remark = val.remark; // 备注
                    
                    return newItem;
                });

            }, error => console.log(error));
        },

        /**
         * 数据导出
         */
        exportStore: function exportStore() {
            let companyId = this.subCompanySection ? this.subCompanySection : '';
            let storeId = this.shopNetSection ? this.shopNetSection : '';
            let teamId = this.teamSection ? this.teamSection : '';
            
            exportStoreUsingGET(companyId, storeId, teamId);
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
                    _this.subCompanyOptions = data.map(item => ({
                        value: item[0],
                        label: item[1],
                    }));
                }

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
         * 下载车行导入模板
         */
        getStoreTemplate: () => getStoreTemplateUsingGET(),

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.subCompanySection = null;
            this.teamSection = null;
            this.regionSection = null;
        },

        /**
         * 新增一个车行
         */
        addHandle: function addHandle() {
            this.jumpToRouter('/shops/carts/details');
        },

        /**
         * 修改一个项
         */
        modifierHandle: function modifierHandle(item) {
            this.jumpToRouter('/shops/carts/details', item.original);
        },

        /**
         * 删除一个项
         */
        deleteHandle: function deleteHandle(item) {
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.queryAllStore();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryAllStore();
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

.carts-manage {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作部分
.carts-manage-operate {
    padding: 15px;

    .el-select {
        width: 120px;
        margin-right: 15px;
    }
}

// 表单部分
.carts-manage-table {
    padding: 15px;
}

// 分页部分
.carts-manage-pagination {
    padding: 15px;
}

</style>
