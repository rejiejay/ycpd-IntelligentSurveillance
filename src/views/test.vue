<!-- 测试页 -->
<template>
<div :style="`width: ${clientWidth}px; height: ${clientHeight}px`">
    <div id="BaiduMap"></div>
    <div v-for="(item, key) in output" :key="key">{{item}}</div>
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

            output: [], // 
        }
    },

	mounted: function mounted() {
        let mountBaiduMap = new BMap.Map('BaiduMap'); // 创建地图实例  
        mountBaiduMap.centerAndZoom(new BMap.Point(114.059560, 22.542860), 13); // 初始化地图，设置中心点坐标(深圳福田) 和地图级别  
        mountBaiduMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        
        // this.generateData();
        /**
         * 判断是否处于中心点内
         */
        // Bounds.containsPoint(point: Point)	Boolean	如果点的地理坐标位于此矩形内，则返回true
        
        /**
         * 获取中心点 以及距离
         */
        // function getBoundsSpan() {
            // let Bounds = mountBaiduMap.getBounds(); // 获取中心点

            // let centerPoint = Bounds.getCenter(); // 矩形区域的跨度
            // let mySpan = Bounds.toSpan(); // 跨度
            // let myHalfSpan = { // 一半的跨度
            //     lng: (mySpan.lng / 2),
            //     lat: (mySpan.lat / 2),
            // };
            // let myHalfPoint = new BMap.Point( // 距离中心点一半的坐标点
            //     (centerPoint.lng + myHalfSpan.lng),
            //     (centerPoint.lat + myHalfSpan.lat)
            // );

            // /**
            //  * 屏幕的距离（米）
            //  */
            // let myHalfSpanDistance = Math.floor(mountBaiduMap.getDistance(centerPoint, myHalfPoint));
            // console.log('centerPoint', centerPoint);
            // console.log('myHalfSpanDistance', myHalfSpanDistance);

            // /**
            //  * 最小最大经纬度
            //  */
            // let minLng = centerPoint.lng - myHalfSpan.lng;
            // let maxLng = centerPoint.lng + myHalfSpan.lng;
            // let minLat = centerPoint.lat - myHalfSpan.lat;
            // let maxLat = centerPoint.lat + myHalfSpan.lat;

            // console.log('minLng:', minLng)
            // console.log('maxLng:', maxLng)
            // console.log('minLat:', minLat)
            // console.log('maxLat:', maxLat)
            
            // mountBaiduMap.addOverlay(new BMap.Marker(new BMap.Point(minLng, minLat)));
            // mountBaiduMap.addOverlay(new BMap.Marker(new BMap.Point(minLng, maxLat)));
            // mountBaiduMap.addOverlay(new BMap.Marker(new BMap.Point(maxLng, minLat)));
            // mountBaiduMap.addOverlay(new BMap.Marker(new BMap.Point(maxLng, maxLat)));
        // }

        // /**
        //  * 监听地图
        //  */
        // mountBaiduMap.addEventListener("dragend", getBoundsSpan);
        // mountBaiduMap.addEventListener("zoomend", getBoundsSpan);

        let array = [
            '深圳市罗湖区延芳路东益汽车广场二期E7',
        ];

        const _this = this;

        var myGeo = new BMap.Geocoder();
        array.map(val => {
            myGeo.getPoint(val, function(point){      
                if (point) {      
                    console.log(point)
                    _this.output.push(`${point.lat ? point.lat : 'null'}`)
                }
            }, "广东省");
        });
    },

    destroyed: function destroyed() {
        // mountBaiduMap.removeEventListener("dragend", getBoundsSpan);
        // mountBaiduMap.removeEventListener("zoomend", getBoundsSpan);
    },

	methods: {
        async generateData (){
            const _this = this;

            let myarray = [
                '龙岗街道南联社区爱南路393号',
                '南山区南山街道兴海大道沿山路荔山工业园2栋104号-106号',
                '龙岗区平湖镇高原路77号',
                '深圳市龙岗区平湖街道禾虾岭小区一排一栋一楼',
                '新秀工业区60栋3号',
                '龙岗坂田河背联光路顺兴工业区1楼',
                '园山街道安兴路15号',
                '横岗街道银海工业园银海街24号',
                '龙岗区坂田街道坂田村荣兴大厦商场一楼101、102',
                '罗湖区爱国路1036号华深大厦首层',
                '宝安区新安街道鸿昌花园1栋商铺43号',
                '深圳宝安区沙井企安路8号',
                '深圳宝安区创业二路195号',
                '笋岗街道笋西社区宝岗路11号',
                '深圳市光明新区公明办事处宏发美域花园10栋C16、C17',
                '新安街道海汇路富华花园旁小乐公寓十八号店铺',
                '自由路鸿昌花园一楼街铺',
                '福永街道白石厦西区A2栋第一层',
                '深圳市罗湖区延芳路东益汽车广场二期E7',
                '福田汽车站福安大厦南楼1/2楼',
                '福保街道保税区市花路万利工业大厦三西厂房一层',
                '新洲南路金享楼2栋1楼',
                '宝安区西乡大道227号',
                '坂田环城南金方华电商物流产业园2栋103-104',
                '布吉街道丹竹头工业区立信路16号A栋101室',
                '深圳市龙岗区龙岗街道龙西社区五联路25号',
                '深圳市南山区蛇口兴海路前海湾汽车物流园17-02',
                '银盛路20号',
                '新安街道33区上川路316号1栋1-7间一楼铺位左1栋',
                '南湾街道健民路7号南岭创新产业园F栋104号',
                '西丽街道龙珠大道82号益力工业园容器厂对面',
                '坂田街道第三工业区45栋302室',
                '宝龙街道龙新社区龙升路16号龙岗电商大厦2楼C区45号',
                '南山区新屋村工业区',
                '深圳市龙岗区布吉街道龙岗大道大都汇大厦C座809',
                '深圳市宝安区沙井街道蚝乡路壆岗盛芳园车元素汽修',
                '深圳市福田区侨香路特发小区综合楼首层西南面',
                '宝安区松岗街道锦江路',
                '深圳市宝安区沙井街道和一社区和一工业区宏科电子（深圳）有限公司厂房B栋一层',
                '光明新区民生路',
                '深圳市宝安区沙井街道共和路第三工业区A区1栋三、四、五、六号铺',
                '深圳市福田区福强路福民新村综合楼首层北侧铺面 ',
                '深圳市光明新区公明街道塘家村融域名城46号商铺',
                '坪地街道坪西社区岭背新村24号102',
                '深圳市龙岗龙城街道腾飞路龙飞商业街C栋05号（天安数码城T4对面）',
                '深圳市福田区梅林坳鸿发家禽批发市场B栋二楼东6-7号',
                '小谷围街大学城内环东路218号广州大学城体育中心综合楼三层功能房304',
                '南山区科技园北区朗山路得利园B栋一楼1016号',
                '深圳市龙华区龙华街道龙园社区龙发路227号弘诚阁丰益路39号',
                '沿河北路新秀村南区161号（现编新秀路秀东街37号）一楼',
                '深圳市福田区梅林街道下梅林北环辅道7036号金来达汽配城G区1-4号',
                '深圳市宝安区福永街道怀德社区洋田路118号',
                '深圳市坪山区坪山街道六联社区金碧路78号',
                '深圳市大鹏新区南澳办事处水头沙社区海滨北路48号',
                '深圳市坪山新区坑梓深汕路525号',
                '深圳市龙岗区坪地街道富坪北路2号',
                '深圳市龙岗区平湖街道力昌社区草铺1路85号',
                '香蜜湖华鹏汽车展易达福特店',
                '深圳市龙岗区南联碧新路（捷成龙岗店）',
                '大浪街道高峰社区三合路1号24栋1层B区',
                '福田区深圳中路福田汽车站东侧',
                '深圳市福田区福安大厦内嘉众名车中心一层3单元',
                '深圳市宝安区新安三路三十三区上合工业区2栋（第四号楼）',
                '深圳市南山区南头街道南山区宝安大道以北、双界河以东嘉进隆前海汽车城A07栋201',
                '深圳市南山区西丽湖平丽花园商贸楼4栋1栋东面',
                '东滨路86号南华印染有限公司生产厂房A103',
                '深圳市宝安区西乡街道西成工业城大门北侧49栋一楼',
                '盐田区北大道260号',
                '盐田区国际创意港园2栋',
                '盐田区盐田港后方陆域15号小区',
                '盐田区深沙路119号',
                '盐田区深沙路178号A座一楼',
                '梅林坳鸿发家禽批发市场B栋二楼东2-3号',
                '洪湖二街50号大院新南滨大楼新宇汽修厂',
                '玉塘街道田寮田湾路125号',
                '民治街道民强社区世纪春城三期8号地块115-117',
                '罗湖区莲塘街道莲塘村八巷23号3号',
                '深圳市南山区招商街道蛇口工业七路华彩花园南海阁6C一楼101',
                '龙华新区龙观西路',
                '深圳市南山区玉泉路凯虹工业区58栋1层',
                '广东省深圳市宝安区白石厦社区东区新塘工业区新园楼首层',
                '深圳市南山区中山园路1号',
                '深圳市龙岗区坂田街道梅关高速贝尔路出口桥底水斗老围盘龙工业园1栋1楼',
                '罗芳南路38号1F004',
                '侨香路4002号',
                '西乡铁岗宝田一路365号万利工业区A栋首层',
                '宝岗路笋岗商业仓库区6栋1楼北面',
                '翠竹北路凯利大厦西面北座一楼',
                '坂田街道版雪岗大道宏奕产业园G栋104',
                '西乡街道前进二路宝园工业区27栋110-113店铺',
                '南联社区爱南路383号',
                '深圳市龙岗区龙岗街道南联社区爱南路348号101',
            ];

            var myGeo = new BMap.Geocoder();
            for (let i = 0; i < myarray.length; i++) {
                await new Promise((resolve, reject) => {
                    myGeo.getPoint(myarray[i], function(point){      
                        if (point) {      
                            console.log(i, point);
                            resolve(point);
                            // _this.output.push(`${point.lat ? point.lat : 'null'}`)
                        }
                    }, "广东省");
                }).then(point => {
                    _this.output.push(`${point.lat ? point.lat : 'null'}`)
                });
            }
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

</style>
