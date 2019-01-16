<!-- 保费明细 -->
<template>
<div class="premium">
    <!-- 顶部操作按钮 -->
    <div class="premium-operate flex-start-bottom">
        <el-date-picker
            v-model="startendTime"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="startendTimeOptions"
        ></el-date-picker>

        <el-select v-model="subCompanySection" placeholder="选择支公司">
            <el-option
                v-for="item in subCompanyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="teamSection" placeholder="业务团队">
            <el-option
                v-for="item in teamOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-select v-model="regionSection" placeholder="选择网点">
            <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>

        <el-input v-model="minProportion" type="number" :clearable="true" placeholder="最低损保比"></el-input>

        <el-input v-model="maxProportion" type="number" :clearable="true" placeholder="最高损保比"></el-input>

        <el-button icon="el-icon-search" type="primary" @click="searchByConditions">查询</el-button>
        <el-button icon="el-icon-download" type="success">导出</el-button>
        <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
    </div>

    <!-- 表单部分 -->
    <div class="premium-table">
        <el-table :data="premiumlist" border>
            <el-table-column
                prop="netCode"
                label="网点编码"
            ></el-table-column>
            <el-table-column
                prop="netName"
                label="网点名称"
            ></el-table-column>
            <el-table-column
                prop="netType"
                label="网点类型"
            ></el-table-column>
            <el-table-column
                prop="netRate"
                label="网点星级"
            ></el-table-column>
            <el-table-column
                prop="subCompany"
                label="支公司"
            ></el-table-column>
            <el-table-column
                prop="team"
                label="业务团队"
            ></el-table-column>
            <el-table-column
                prop="orderTime"
                label="出单时间"
            ></el-table-column>
            <el-table-column
                prop="carNo"
                label="车牌号码"
            ></el-table-column>
            <el-table-column
                prop="policyNo"
                label="保单号"
            ></el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="premium-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="pageTotal"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>
</div>
</template>

<script>

export default {
    name: 'premium',

	data: function data() { 
        // 选择时间段 左边选项列表选项
        let startendTimeOptions = {
            shortcuts: [
                {
                    text: '今天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
        }

        return {
            startendTime: [ // 开始结束时间
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 31),
                new Date(),
            ],
            startendTimeOptions: startendTimeOptions, // 开始结束时间 左边选项

            subCompanySection: null, // 支公司
            subCompanyOptions: [
                {
                    value: '支公司一',
                    label: '支公司一',
                }
            ],
            teamSection: null, // 业务团队
            teamOptions: [
                {
                    value: '业务团队一',
                    label: '业务团队一',
                }
            ],
            regionSection: null, // 网点
            regionOptions: [
                {
                    value: '网点一',
                    label: '网点一',
                }
            ],

            minProportion: '', // 最低损保比
            maxProportion: '', // 最高损保比

            // 保费明细
            premiumlist: [
                {
                    netCode: 1, // 网店编码
                    netName: '网点一', // 网点名称
                    netType: '网点一', // 网点类型
                    netRate: 5, // 网点星级
                    subCompany: '支公司一', // 支公司
                    team: '业务团队一', // 业务团队
                    orderTime: '2019年1月10日', // 出单时间
                    carNo: '粤A12345', // 车牌号码
                    policyNo: '13123123231', // 保单号
                }
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 20, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        } 
    },

	mounted: function mounted() {},

	methods: {
        /**
         * 通过条件查询
         */
        searchByConditions: function searchByConditions() {
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.startendTime = [
                new Date(new Date().getTime() - 3600 * 1000 * 24 * 31),
                new Date(),
            ];

            this.subCompanySection = null;
            this.teamSection = null;
            this.regionSection = null;
            this.minProportion = null;
            this.maxProportion = null;
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            console.log(item);
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

.premium {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

.premium-operate {
    padding: 15px;

    .el-select {
        width: 120px;
        margin-right: 15px;
    }

    .el-date-editor {
        width: 250px;
        margin-right: 15px;
    }

    .el-input {
        width: 140px;
        margin-right: 15px;
    }
}

// 表单部分
.premium-table {
    padding: 15px;
}

// 分页部分
.premium-pagination {
    padding: 15px;
}

</style>
