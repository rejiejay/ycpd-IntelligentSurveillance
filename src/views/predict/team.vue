<!-- 车商管理 -->
<template>
<div class="predict-team">
    <!-- 顶部操作按钮 -->
    <div class="predict-team-operate flex-start-bottom">
        <div class="manage-operate-left flex-rest">

            <el-select v-model="subCompanySection" placeholder="选择支公司">
                <el-option
                    v-for="item in subCompanyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>

            <el-select v-model="teamSection" :disabled="!subCompanySection" placeholder="选择业务团队">
                <el-option
                    v-for="item in teamOptions"
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

            <el-button icon="el-icon-search" type="primary" @click="currentPage = 1; queryAllTeamPrediction();">查询</el-button>
            <el-button icon="el-icon-download" type="success" @click="exportTeamPrediction">导出</el-button>
            <el-button size="mini" type="danger" round @click="clearConditions">清空查询条件</el-button>
        </div>

        <div class="manage-operate-right">
            <el-button icon="el-icon-download" type="text" @click="getTeamPreTemplate">下载模板</el-button>
            <el-button icon="el-icon-tickets" type="primary" plain @click="$refs.uploadFile.click()">上传清单</el-button>
            <el-button icon="el-icon-tickets" type="primary" @click="$refs.uploadFile.click()">数据设置</el-button>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="predict-team-table">
        <el-table
            :data="teamList"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="teamCode"
                label="团队代码"
            ></el-table-column>
            <el-table-column
                prop="teamName"
                label="团队名称"
            ></el-table-column>
            <el-table-column
                prop="teamLeader"
                label="团队领导"
            ></el-table-column>
            <el-table-column
                prop="subCompany"
                label="支公司"
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
    <div class="predict-team-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-count="pageTotal"
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
                <el-progress :percentage="isUploadSuccess ? 100 : 0"></el-progress>
                <div class="modal-succeed-tip" v-if="isUploadSuccess">
                    <div class="succeed-tip-container">
                        <div class="succeed-tip-title flex-start-center">
                            <i class="el-icon-success"></i>
                            <span>文件上传完成</span>
                        </div>
                        <div class="succeed-tip-main">
                            <span>成功{{uploadSuccessNum}}条，失败{{uploadErrorNum}}条</span>
                            <el-button icon="el-icon-download" type="text">下载失败清单</el-button>
                        </div>
                    </div>
                </div>
                <div class="modal-failure-tip" v-if="!isUploadSuccess">
                    <div class="failure-tip-container">
                        <div class="failure-tip-title flex-start-center">
                            <i class="el-icon-error"></i>
                            <span>文件上传失败</span>
                        </div>
                        <div class="failure-tip-main">
                            <span>失败原因：{{uploadErrMsg}}</span>
                        </div>
                        <el-button icon="el-icon-upload" type="text" @click="$refs.uploadFile.click()">重新上传</el-button>
                    </div>
                </div>
            </div>
            <div class="upload-modal-operate flex-center">
                <el-button type="primary" @click="isUploadModalShow = false;">确定</el-button>
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
import { queryAllTeamPredictionUsingPOST, exportTeamPredictionUsingGET, getTeamPreTemplateUsingGET, importTeamPredictionUsingFormData } from "@/api/predict/team";
import { queryCompanyListUsingGET } from "@/api/subcompany";
import { queryTeamByBcIdUsingGET } from "@/api/team";


export default {
    name: 'predict-team',

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

            teamSection: null, // 业务团队
            teamOptions: [
                // {
                //     value: '业务团队一',
                //     label: '业务团队一',
                // }
            ],

            monthSection: null, // 选择月份

            /**
             * 表单上传
             */
            isUploadModalShow: false, // 是否显示上传模态框
            isUploadSuccess: false, // 是否上传成功
            uploadSuccessNum: '', // 成功条数
            uploadErrorNum: '', // 失败条数
            uploadErrMsg: '', // 错误信息

            teamList: [
                // {
                //     teamCode: '', // 团队代码
                //     teamName: '', // 团队名称
                //     teamLeader: '', // 团队领导
                //     subCompany: '', // 支公司
                //     month: '', // 月份
                //     premium: '', // 定损支出
                //     loss: '', // 定损支出
                //     proportion: '', // 产保比
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
            this.teamSection = '';
            this.queryTeamByBcId(newsubcompany);
        },
    },

	mounted: function mounted() {
        this.queryAllTeamPrediction(); // 通过条件查询
        this.queryCompanyList(); // 支公司下拉选项
        this.uploadImportTeamPrediction(); // 导入团队数据设置信息
    },

	methods: {
        /**
         * 通过条件查询
         */
        queryAllTeamPrediction: function queryAllTeamPrediction() {
            const _this = this;

            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            let bcId = this.subCompanySection ? this.subCompanySection : '';
            let teamId = this.teamSection ? this.teamSection : '';
            let month = this.monthSection ? TimeConver.dateToFormat(this.monthSection) : '';

            queryAllTeamPredictionUsingPOST(currentPage, pageSize, bcId, teamId, month)
            .then(val => {
                console.log(val)

                let data = val.data;

                _this.pageTotal = data.totalPages;

                if (!data || !data.objs || data.objs instanceof Array === false || data.objs.length <= 0) {
                    _this.teamList = []; // 记得清空
                    return false;
                }

                _this.teamList = data.objs.map(val => {
                    let newItem = {};

                    newItem.original = val; // 后端返的原始数据
                    newItem.id = val.id; // 唯一标识
                    newItem.teamCode = val.teamCode; // 团队代码
                    newItem.teamName = val.teamName; // 团队名称
                    newItem.teamLeader = val.manager; // 团队领导
                    newItem.subCompany = val.bcName; // 支公司
                    newItem.month = val.predictionDate; // 月份
                    newItem.premium = val.income; // 定损支出
                    newItem.loss = val.expense; // 定损支出
                    newItem.proportion = val.ratio; // 产保比
                    newItem.remark = val.remark; // 备注
                    
                    return newItem;
                });

            }, error => console.log(error));
        },

        /**
         * 导出团队模板
         */
        exportTeamPrediction: function exportTeamPrediction() {
            let bcId = this.subCompanySection ? this.subCompanySection : '';
            let teamId = this.teamSection ? this.teamSection : '';
            let month = this.monthSection ? TimeConver.dateToFormat(this.monthSection) : '';

            exportTeamPredictionUsingGET(bcId, teamId, month);
        },

        /**
         * 下载团队模板
         */
        getTeamPreTemplate: () => getTeamPreTemplateUsingGET(),

        /**
         * 导入团队数据设置信息
         */
        uploadImportTeamPrediction: function uploadImportTeamPrediction() {
            const _this = this;

            this.$refs.uploadFile.onchange = event => {
                _this.isUploadModalShow = false; // 关闭上传模态框

                let formData = new FormData();
                formData.append("file", event.target.files[0]);

                importTeamPredictionUsingFormData(formData)
                .then(res => {
                    let response = res.data;
                    _this.$refs.uploadFile.value = ''; // 因为考虑到用户会重复上传, 重复上传不会触发 onchange 所以要清空一下

                    // 判断是否上传成功
                    if (response.code === 1000) {
                        _this.isUploadModalShow = true; // 显示上传模态框
                        _this.isUploadSuccess = true; // 上传成功
                        _this.uploadErrMsg = response.data.successNum; // 成功提示
                        _this.uploadErrMsg = response.data.errorNum; // 成功提示

                    } else {
                        _this.isUploadModalShow = true; // 显示上传模态框
                        _this.isUploadSuccess = false; // 上传失败
                        _this.uploadErrMsg = response.data.errMsg; // 失败提示

                    }
                    console.log(res);

                }, error => {
                    _this.$refs.uploadFile.value = '';
                    console.error(error);
                });
            }
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
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            this.currentPage = item;
            this.queryAllTeamPrediction();
        },

        /**
         * 前页页码大小时候处理函数
         */
        pageSizeChangeHandle: function pageSizeChangeHandle(item) {
            this.pageSize = item;
            this.queryAllTeamPrediction();
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

.predict-team {
    position: relative;
    color: $black2;
    font-size: 14px;
    font-weight: normal;
}

// 顶部操作部分
.predict-team-operate {
    padding: 15px;

    .el-date-editor,
    .el-select {
        margin-right: 15px;
    }
}

// 表单部分
.predict-team-table {
    padding: 15px;
}

// 分页
.predict-team-pagination {
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
