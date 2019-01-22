<!-- 支公司数据设置 -->
<template>
<div class="predict-sub-company">
    <!-- 顶部操作按钮 -->
    <div class="predict-subcompany-operate flex-start-bottom">
        <div class="manage-operate-left flex-rest">

            <el-select v-model="subCompanySection" placeholder="选择支公司">
                <el-option
                    v-for="item in subCompanyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            
            <el-date-picker
                v-model="monthSection"
                type="date"
                placeholder="选择月份">
            </el-date-picker>

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryAllCompanyPrediction();">查询</el-button>
            <el-button icon="el-icon-download" type="success" @click="exportCompanyPrediction">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>

        <div class="manage-operate-right">
            <el-button icon="el-icon-download" type="text" @click="getBcPreTemplate">下载模板</el-button>
            <el-button icon="el-icon-tickets" type="primary">数据设置</el-button>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="predict-subcompany-table">
        <el-table
            :data="subCompanyList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="subCompanyCode"
                label="支公司代码"
            ></el-table-column>
            <el-table-column
                prop="subCompanyName"
                label="支公司名称"
            ></el-table-column>
            <el-table-column
                prop="month"
                label="月份"
            ></el-table-column>
            <el-table-column
                prop="premium"
                label="预计保费收入"
            ></el-table-column>
            <el-table-column
                prop="loss"
                label="预计定损支出"
            ></el-table-column>
            <el-table-column
                prop="proportion"
                label="预计产保比"
            ></el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
            ></el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="predict-subcompany-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="pageTotal"
            @size-change="pageSizeChangeHandle"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>

    <!-- 上传进度模态框 -->
    <ModalByZindex 
        class="upload-modal"
        :isShow="isUploadModalShow" 
        :zindex="9999" 
    >
        <div class="upload-modal-container">
            <div class="upload-modal-title">数据设置</div>
            <div class="upload-modal-main">
                <el-progress :percentage="uploadPercentage"></el-progress>
                <div class="modal-succeed-tip" v-if="false">
                    <div class="succeed-tip-container">
                        <div class="succeed-tip-title flex-start-center">
                            <i class="el-icon-success"></i>
                            <span>文件上传完成</span>
                        </div>
                        <div class="succeed-tip-main">
                            <span>成功**条，失败**条</span>
                            <el-button icon="el-icon-download" type="text">下载失败清单</el-button>
                        </div>
                    </div>
                </div>
                <div class="modal-failure-tip" v-if="false">
                    <div class="failure-tip-container">
                        <div class="failure-tip-title flex-start-center">
                            <i class="el-icon-error"></i>
                            <span>文件上传失败</span>
                        </div>
                        <div class="failure-tip-main">
                            <span>失败原因：xxxxxx</span>
                        </div>
                        <el-button icon="el-icon-upload" type="text">重新上传</el-button>
                    </div>
                </div>
            </div>
            <div class="upload-modal-operate flex-center" v-if="uploadPercentage >= 100">
                <el-button type="primary">确定</el-button>
            </div>
        </div>
    </ModalByZindex>
</div>
</template>

<script>
// 组件类
import ModalByZindex from '@/components/ModalByZindex';
import TimeConver from '@/utils/TimeConver';
// 请求类
import { queryAllCompanyPredictionUsingPOST, exportCompanyPredictionUsingGET, getBcPreTemplateUsingGET } from "@/api/predict/sub-company";
import { queryCompanyListUsingGET } from "@/api/subcompany";

export default {
    name: 'predict-sub-company',

    components: { ModalByZindex },

	data: function data() { 
        return {
            subCompanySection: null, // 支公司
            subCompanyOptions: [
                // {
                //     value: '支公司一',
                //     label: '支公司一',
                // }
            ],

            monthSection: null, // 选择月份

            subCompanyList: [
                // {
                //     subCompanyCode: '', // 支公司代码
                //     subCompanyName: '', // 支公司名称
                //     month: '', // 月份
                //     premium: '', // 保费收入
                //     loss: '', // 定损支出
                //     proportion: '', // 产保比
                //     remark: '', // 备注
                // }
            ],

            uploadPercentage: 100, // 上传的百分比

            isUploadModalShow: false, // 是否显示上传模态框

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 10, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        } 
    },

	mounted: function mounted() {
        this.queryAllCompanyPrediction(); // 获取支公司预测信息列表
        this.queryCompanyList(); // 支公司下拉选项
    },

	methods: {
        /**
         * 通过条件查询
         */
        queryAllCompanyPrediction: function queryAllCompanyPrediction() {
            const _this = this;

            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            let bcId = this.subCompanySection ? this.subCompanySection : '';
            let month = this.monthSection ? TimeConver.dateToFormat(this.monthSection) : '';

            queryAllCompanyPredictionUsingPOST(currentPage, pageSize, bcId, month)
            .then(val => {
                console.log(val)

                let data = val.data;

                _this.pageTotal = data.totalPages;

                if (!data || !data.objs || data.objs instanceof Array === false || data.objs.length <= 0) {
                    _this.subCompanyList = []; // 记得清空
                    return false;
                }

                _this.subCompanyList = data.objs.map(val => {
                    let newItem = {};

                    newItem.original = val; // 后端返的原始数据
                    newItem.id = val.id; // 唯一标识
                    newItem.subCompanyCode = val.bcCode; // 支公司代码
                    newItem.subCompanyName = val.bcName; // 支公司名称
                    newItem.month = val.predictionDate; // 月份
                    newItem.premium = val.income; // 保费收入
                    newItem.loss = val.expense; // 定损支出
                    newItem.proportion = val.ratio; // 产保比
                    newItem.remark = val.remark; // 备注
                    
                    return newItem;
                });

            }, error => console.log(error));
        },

        /**
         * 导出支公司模板
         */
        exportCompanyPrediction: function exportCompanyPrediction() {
            let bcId = this.subCompanySection ? this.subCompanySection : '';
            let month = this.monthSection ? TimeConver.dateToFormat(this.monthSection) : '';
            exportCompanyPredictionUsingGET(bcId, month);
        },

        /**
         * 清空查询条件
         */
        clearConditions: function clearConditions() {
            this.subCompanySection = null;
            this.monthSection = null;
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
         * 下载支公司模板
         */
        getBcPreTemplate: () => getBcPreTemplateUsingGET(),

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.queryAllCompanyPrediction();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryAllCompanyPrediction();
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

.predict-sub-company {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作部分
.predict-subcompany-operate {
    padding: 15px;

    .el-date-editor,
    .el-select {
        margin-right: 15px;
    }
}

// 表单部分
.predict-subcompany-table {
    padding: 15px;
}

// 分页
.predict-subcompany-pagination {
    padding: 15px 15px 35px 15px;
}

// 上传进度模态框
.upload-modal {
    .upload-modal-container {
        width: 480px;
    }

    .upload-modal-title {
        padding-left: 15px;
        font-weight: bold;
        line-height: 45px;
        border-bottom: 1px solid #ddd;
    }

    .upload-modal-main {
        padding: 35px 15px;
    }

    .upload-modal-operate {
        border-top: 1px solid #ddd;
        padding: 15px;
    }

    .modal-succeed-tip {
        padding-top: 15px;

        .succeed-tip-container {
            border-radius: 5px;
            padding: 15px;
            color: #409eff;
            background: #ecf5ff;
            border-color: #b3d8ff;
        }

        .succeed-tip-title {
            font-size: 16px;
        }

        .succeed-tip-main {
            padding: 5px;
        }

        span {
            padding: 0 10px;
        }
    }

    .modal-failure-tip {
        padding-top: 15px;

        .failure-tip-container {
            border-radius: 5px;
            padding: 15px;
            color: #f56c6c;
            background: #fef0f0;
            border-color: #fbc4c4;
        }

        .failure-tip-title {
            font-size: 16px;
        }

        .failure-tip-main {
            padding: 15px 15px 5px 5px;
        }

        span {
            padding: 0 10px;
        }
    }
}

</style>
