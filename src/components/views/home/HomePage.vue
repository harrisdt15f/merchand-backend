<template>
    <div class="contain">
        <ul class="row1">
            <!-- 今日盈利 -->
            <li>
                <div class="head bg-red">
                    <span>今日盈利</span>
                </div>
                <div class="cont">
                    <div>
                        <span class="number">{{profit_amount}}</span>
                    </div>
                    <div class="bottom-10">
                        <span>日环比:</span>
                        <span>{{profit_percent}}</span>
                        <!-- <span>人</span> -->
                    </div>
                </div>
            </li>
            <!-- 今日首充 -->
            <li>
                <div class="head bg-blue">
                    <span>今日首充</span>
                </div>
                <div class="cont">
                    <div>
                        <span class="number">{{top_up_amount}}</span>
                    </div>
                    <div class="fcharge-pic">
                        <div id="first_recharge" class="row1-3"></div>
                    </div>

                    <div class="bottom-10">
                        <span>充值人数:</span>
                        <span>{{top_up_people}}</span>
                        <span>人</span>
                    </div>
                </div>
            </li>
            <!-- 今日提现 -->
            <li>
                <div class="head bg-green">
                    <span>今日提现</span>
                </div>
                <div class="cont">
                    <div>
                        <span class="number">{{withdrawal_amount}}</span>
                    </div>
                    <div class="bottom-10">
                        <span>提现人数:</span>
                        <span>{{withdrawal_people}}</span>
                        <span>人</span>
                    </div>
                </div>
            </li>
            <!-- 今日彩金优惠 -->
            <li>
                <div class="head bg-orange">
                    <span>今日彩金优惠</span>
                </div>
                <div class="cont">
                    <div>
                        <span class="number">{{gifts_amount}}</span>
                    </div>

                    <div class="bottom-10">
                        <span>领取人数:</span>
                        <span>{{gifts_people}}</span>
                        <span>人</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="row2 game">
            <div class="header">
                <button
                    :class="['mr8',game_act_index===index?'btn-active':'btn-plain-white']"
                    v-for="(item,index) in ['昨日','本周','本月','全年']"
                    :key="index"
                    @click="searchGame(index)"
                >{{item}}</button>
                <!-- <button class="btn">本周</button>
                <button class="btn">本月</button>
                <button class="btn">全年</button>-->
                <!-- <Date style="width:200px;" /> -->
            </div>
            <div class="contain">
                <div class="game-data">
                    <div class="title">
                        <span>游戏数据</span>
                    </div>
                    <Table class="table" :headers="game_data_headers" :column="game_data_list">
                        <template v-slot:item="{row}">
                            <td>{{row.plant_form}}</td>
                            <td :class="row.value>0?'text-green':'text-red'">{{row.value}}</td>
                        </template>
                    </Table>
                </div>
                <!-- 平台排名 -->
                <div class="plant-rank">
                    <div>
                        <div class="title">平台排名</div>
                    </div>
                    <div class="smallTable">
                        <Table
                            class="table"
                            :headers="game_plant_headers"
                            :column="game_plant_list"
                        >
                            <template v-slot:item="{row}">
                                <td>{{row.plant_form}}</td>
                                <td>{{row.rank}}</td>
                                <td>{{row.number}}</td>
                            </template>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 优惠活动数据 -->
        <div class="row3">
            <div class="data">
                <div class="header">
                    <span>优惠活动数据</span>
                </div>
                <div class="contain">
                    <div class="row3-number">
                        <div class="act-people-number">
                            <div class="number-title">参与活动人数</div>
                            <div class="number">{{'0'}}</div>
                        </div>
                        <div clss="today-active-bonus">
                            <div class="number-title">参与活动人数</div>
                            <div class="number">{{'0'}}</div>
                        </div>
                    </div>
                    <div class="row3-tab">
                        <Table class="table" :headers="promotion_headers" :column="promotion_list">
                            <template v-slot:item="{row}">
                                <td>{{row.plant_form}}</td>
                                <td>{{row.rank}}</td>
                                <td>{{row.rank}}</td>
                                <td>{{row.rank}}</td>
                            </template>
                        </Table>
                        <!-- <Page></Page> -->
                        <Page
                            style="margin-top:8px;"
                            :total="total"
                            :pageNo.sync="pageNo"
                            :pageSize.sync="pageSize"
                            @updateNo="updateNo"
                            @updateSize="updateSize"
                        />
                    </div>
                </div>
            </div>
            <!-- 登录统计 --人数统计 -->
            <div class="graph">
                <div class="graph-head header">
                    <button
                        style="margin:0;"
                        :class="[is_show_login?'btn-active':'btn-plain-white']"
                        @click="is_show_login=true"
                    >登录统计</button>
                    <button
                        :class="[is_show_login?'btn-plain-white':'btn-active']"
                        @click="is_show_login=false"
                    >注册统计</button>
                </div>
                <div class="contain">
                    <div class="login" v-show="is_show_login">
                        <div>人数统计</div>
                        <div id="login_num"></div>
                        <div class="data">
                            <ul>
                                <li>
                                    <span class="dot blue"></span>
                                    <span>安卓</span>
                                    <span>{{online_apk_percent}}</span>
                                    <span>{{online_apk_people}}人</span>
                                </li>
                                <li>
                                    <span class="dot green"></span>
                                    <span>苹果</span>
                                    <span>{{online_app_percent}}</span>
                                    <span>{{online_app_people}}人</span>
                                </li>
                                <li>
                                    <span class="dot orange"></span>
                                    <span>H5</span>
                                    <span>{{online_h5_percent}}</span>
                                    <span>{{online_h5_people}}人</span>
                                </li>
                                <li>
                                    <span class="dot red"></span>
                                    <span>PC</span>
                                    <span>{{online_pc_percent}}</span>
                                    <span>{{online_pc_people}}人</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="regist" v-show="!is_show_login">
                        <div>注册统计</div>
                        <div id="regist_num"></div>
                        <div class="data">
                            <ul>
                                <li>
                                    <span class="dot blue"></span>
                                    <span>安卓</span>
                                    <span>{{sign_up_apk_percent}}</span>
                                    <span>{{sign_up_apk_people}}人</span>
                                </li>
                                <li>
                                    <span class="dot green"></span>
                                    <span>苹果</span>
                                    <span>{{sign_up_app_percent}}</span>
                                    <span>{{sign_up_app_people}}人</span>
                                </li>
                                <li>
                                    <span class="dot orange"></span>
                                    <span>H5</span>
                                    <span>{{sign_up_h5_percent}}</span>
                                    <span>{{sign_up_h5_people}}人</span>
                                </li>
                                <li>
                                    <span class="dot red"></span>
                                    <span>PC</span>
                                    <span>{{sign_up_pc_percent}}</span>
                                    <span>{{sign_up_pc_people}}人</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 充提统计 -->
        <div class="row4">
            <div class="header">
                <span>充提统计</span>
            </div>
            <div class="contain">
                <div id="recharge"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // name: 'HomePage',
    name: 'Home',
    data() {
        return {
            profit_amount: 0,
            profit_percent: '0%',
            top_up_amount: 0,
            top_up_people: 0,
            withdrawal_amount: 0,
            withdrawal_people: 0,
            gifts_amount: 0,
            gifts_people: 0,
            // 登录
            online_apk_people: 0,
            online_apk_percent: '0%',
            online_app_people: 0,
            online_app_percent: '0%',
            online_h5_people: 0,
            online_h5_percent: '0%',
            online_pc_people: 0,
            online_pc_percent: '0%',

            // 注册
            sign_up_apk_people: 0,
            sign_up_apk_percent: '0%',
            sign_up_app_people: 0,
            sign_up_app_percent: '0%',
            sign_up_h5_people: 0,
            sign_up_h5_percent: '0%',
            sign_up_pc_people: 0,
            sign_up_pc_percent: '0%',
            
            is_show_login: true,

            // 游戏数据
            game_act_index: '',
            game_data_headers: ['游戏平台', '今日盈亏'],
            game_data_list: [],
            game_data_obj: {
                yesterday: undefined,
                thisWeek: undefined,
                thisMonth: undefined,
                allYear: undefined
            },
            // 游戏平台
            game_plant_headers: ['平台名称', '平台排行', '游戏人数'],
            game_plant_list: [
                { plant_form: '开元棋牌', rank: '1', number: '100' },
                { plant_form: '龙城棋牌', rank: '2', number: '60' }
            ],
            // 优惠活动数据
            promotion_headers: ['排名', '热门活动', '参与人数', '彩金'],
            promotion_list: [
                { plant_form: '开元棋牌', rank: '1', number: '100' },
                { plant_form: '龙城棋牌', rank: '2', number: '60' }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            
            // 充提统计
            top_up_and_withdrawal: {
                yesterday_top_up: 0,
                before_yesterday_top_up: 0,
                today_top_up: 0,
                before_yesterday_withdraw: 0,
                yesterday_withdraw: 0,
                today_withdraw: 0,
            }
        }
    },
    created() {},
    methods: {
        // 今日首充 曲线图
        todatyFirstRechargeChartDraw() {
            let echarts = window.all.echarts
            let first_recharge_chart = echarts.init(
                document.getElementById('first_recharge')
            )
            first_recharge_chart.setOption({
                xAxis: {
                    type: 'category',
                    // data: ['', '', '', '', '', '', ''],
                    splitLine: {
                        //去掉网格
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        // 去掉刻度线
                        show: false
                    },
                    splitLine: {
                        // 去掉网格
                        show: false
                    }
                },
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        symbol: 'none', //去掉折点
                        // itemStyle : {
                        //     color:'#67b5fd'
                        // },
                        lineStyle: {
                            color: '#67b5fd'
                        },

                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: '#accfef' },
                                        { offset: 1, color: '#fff' }
                                    ]
                                )
                            }
                        },
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            })
        },
        // 游戏数据 row2
        searchGame(index) {
            let table_header_arr = ['昨日盈亏','本周盈亏','本月盈亏','全年盈亏']
            this.game_data_headers[1] = table_header_arr[index]
            if (this.game_act_index === index) return
            // 昨日','本周','本月','全年

            this.game_act_index = index
            var now = new Date() //当前日期
            var nowYear = now.getFullYear() // 当前年
            var nowMonth = now.getMonth() // 当前月
            var nowDay = now.getDate() // 当前日

            var nowDayOfWeek = now.getDay() // 今天是本周的第几天
            // (周日获取的是第0天,设置为7天)
            if (nowDayOfWeek === 0) {
                nowDayOfWeek = 7
            }
            // 昨天
            function getYesterday() {
                let yesterday = new Date().valueOf() - 1000 * 60 * 60 * 24
                let start = new Date(yesterday)
                let end = new Date()
                return [start, end]
            }
            // 本周
            function getThisweek() {
                let start = new Date(
                    nowYear,
                    nowMonth,
                    nowDay - nowDayOfWeek + 1
                )
                // let end = new Date(
                //     nowYear,
                //     nowMonth,
                //     nowDay + (7 - nowDayOfWeek) + 1
                // )
                let end = new Date().valueOf() + 1000 * 60 * 60 * 24
                return [start, end]
            }
            // 本月
            function getThismonth() {
                let start = new Date(nowYear, nowMonth, 1)
                // let end = new Date(nowYear, nowMonth + 1, 1)
                let end = new Date().valueOf() + 1000 * 60 * 60 * 24
                return [start, end]
            }
            // 全年
            function getAllYear() {
                let start = new Date(nowYear, 1, 1)
                let end = new Date().valueOf() + 1000 * 60 * 60 * 24
                return [start, end]
            }
            let date_arr = ['yesterday', 'thisWeek', 'thisMonth', 'allYear']

            let time = [
                getYesterday(),
                getThisweek(),
                getThismonth(),
                getAllYear()
            ]
            let date_start = window.all.tool.formatDate(time[index][0])
            let date_end = window.all.tool.formatDate(time[index][1])
            this.getGameDataList([date_start, date_end], date_arr[index])
        },
        // 登录统计 --人数统计
        loginChartDraw() {
            let echart_data = [
                { value: this.online_apk_people, name: '安卓' },
                { value: this.online_app_people, name: '苹果' },
                { value: this.online_h5_people, name: 'h5' },
                { value: this.online_pc_people, name: 'pc' }
            ]

            let echarts = window.all.echarts
            let login_chart = echarts.init(document.getElementById('login_num'))
            login_chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: [
                        '直接访问',
                        '邮件营销',
                        '联盟广告',
                        '视频广告',
                        '搜索引擎'
                    ]
                },
                series: [
                    {
                        name: '登录人数',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: true,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        //  右侧图标
                        legend: {
                            type: 'scroll',
                            orient: 'vertical',
                            right: 30,
                            top: 20,
                            bottom: 20,
                            data: ['安卓', '苹果', 'H5', 'PC'],

                            selected: [true, true, true, true]
                        },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colors = [
                                        '#4c8bfd',
                                        '#4cc013',
                                        '#faab08',
                                        '#fc4c4c'
                                    ]
                                    return colors[params.dataIndex]
                                }
                            }
                        },
                        // 格式[ { value: 335, name: '安卓' }, { value: 335, name: '苹果' }]
                        data: echart_data
                    }
                ]
            })
        },

        // 注册统计
        registChartDraw() {
            // let device = { apk: '安卓', app: '苹果', h5: 'H5', pc: 'PC' }
            let echart_data = [
                {
                    value: this.sign_up_apk_people,
                    name: '安卓'
                },
                {
                    value: this.sign_up_app_people,
                    name: '苹果'
                },
                { value: this.sign_up_h5_people, name: 'h5' },
                { value: this.sign_up_pc_people, name: 'pc' }
            ]

            let echarts = window.all.echarts
            let regist_chart = echarts.init(
                document.getElementById('regist_num')
            )
            regist_chart.setOption({
                // title: {
                //     text: "某站点用户访问来源",
                //     subtext: "纯属虚构",
                //     x: "center"
                // },
                // tooltip: {
                //     trigger: "item",
                //     formatter: "{a} <br/>{b} : {c} ({d}%)"
                // },
                // legend: {
                //     orient: "vertical",
                //     left: "left",
                //     data: [
                //         "直接访问",
                //         "邮件营销",
                //         "联盟广告",
                //         "视频广告",
                //         "搜索引擎"
                //     ]
                // },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: echart_data,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colors = [
                                        '#4c8bfd',
                                        '#4cc013',
                                        '#faab08',
                                        '#fc4c4c'
                                    ]
                                    return colors[params.dataIndex]
                                }
                            }
                        },
                        data: echart_data
                    }
                ]
            })
        },

        // 充提统计表
        rechargeChartDraw() {
            let datas = this.top_up_and_withdrawal || {}
            let echart_data = {
                /** 前日, 昨日, 今日 */
                topUp: [datas.yesterday_top_up, datas.before_yesterday_top_up, datas.today_top_up], // 充值
                withdraw: [datas.before_yesterday_withdraw, datas.yesterday_withdraw, datas.today_withdraw] // 提款
            }
            let echarts = window.all.echarts
            let recharge_chart = echarts.init(
                document.getElementById('recharge')
            )
            recharge_chart.setOption({
                // title: {
                //     text: '充提统计'
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['前日充值', '前日提款']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['前日', '昨日', '今日']
                },
                yAxis: {
                    type: 'value',
                    // boundaryGap: [0, 0.01],
                    axisTick: {
                        // 去掉刻度线
                        show: false
                    },
                    splitLine: {
                        // 去掉网格
                        show: false
                    }
                },
                series: [
                    {
                        name: '充值',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#70a1fd'
                            }
                        },
                        label: {
                            normal: {
                                position: 'top',
                                show: true
                            }
                        },
                        data: echart_data.topUp
                    },
                    {
                        name: '提款',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#ffbf41'
                            }
                        },
                        label: {
                            normal: {
                                position: 'top',
                                show: true
                            }
                        },
                        data: echart_data.withdraw
                    }
                ]
            })
        },
        // 游戏数据 游戏报表
        getGameDataList(dates, selectDate) {
            // console.log('🥐 selectDate: ', selectDate);
             // 已经请求过 ,就不在请求, 直接获取
            if (this.game_data_obj[selectDate]) {
                this.game_data_list = this.game_data_obj[selectDate]
            } else {
                let data = {
                    project_day: JSON.stringify(dates)
                }

                let { url, method } = this.$api.game_report_list
                this.$http({ method, url, data }).then(res => {
                    if (res && res.code === '200') {
                        let dataList = (res.data && res.data.data) || []
                        this.game_data_list = []
                        this.game_data_list = dataList.map(item => {
                            return {
                                plant_form: item.game_vendor_name,
                                value: item.win_money - item.bet_money
                            }
                        })
                        this.game_data_obj[selectDate] = JSON.parse(
                            JSON.stringify(this.game_data_list)
                        )
                    }
                })
            }
        },
        getList() {
            // let para = {
            //     // pageSize: this.pageSize,
            //     // page: this.pageNo
            // }
            // let params = window.all.tool.rmEmpty(para)
            let { url, method } = this.$api.home_page_list
            this.$http({ method, url }).then(res => {
                // console.log('列表👌👌👌👌: ', res)
                if (res && res.code === '200') {
                    let data = res.data || {}
                    this.profit_amount = data.profit_amount, // 盈利
                    this.profit_percent = data.profit_percent,
                    this.top_up_amount = data.top_up_amount, // 首充
                    this.top_up_people = data.top_up_people,
                    this.withdrawal_amount = data.withdrawal_amount, // 今日提现
                    this.withdrawal_people = data.withdrawal_people,
                    this.gifts_amount = data.gifts_amount, // 彩金
                    this.gifts_people = data.gifts_people,
                    // 登录
                    this.online_apk_people = data.online_apk_people,
                    this.online_apk_percent = data.online_apk_percent,
                    this.online_app_people = data.online_app_people,
                    this.online_app_percent = data.online_app_percent,
                    this.online_h5_people = data.online_h5_people,
                    this.online_h5_percent = data.online_h5_percent,
                    this.online_pc_people = data.online_pc_people,
                    this.online_pc_percent = data.online_pc_percent,
                    this.loginChartDraw() // 登录统计

                    // 注册
                    this.sign_up_apk_people = data.sign_up_apk_people,
                    this.sign_up_apk_percent = data.sign_up_apk_percent,
                    this.sign_up_app_people = data.sign_up_app_people,
                    this.sign_up_app_percent = data.sign_up_app_percent,
                    this.sign_up_h5_people = data.sign_up_h5_people,
                    this.sign_up_h5_percent = data.sign_up_h5_percent,
                    this.sign_up_pc_people = data.sign_up_pc_people,
                    this.sign_up_pc_percent = data.sign_up_pc_percent,
                    this.registChartDraw() // 登录统计

                    this.top_up_and_withdrawal = data.top_up_and_withdrawal
                    this.rechargeChartDraw() // 充提统计

                }
            })
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {
        this.getList()
        this.searchGame(0) // 游戏数据

        // let echarts = window.all.echarts;
        // this.todatyFirstRechargeChartDraw() // 今日首冲
        // this.loginChartDraw()
        // this.registChartDraw() // 注册统计
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    width: 1040px;
}

.table >>> table thead th {
    background: #e6e6e6;
    color: #666666;
    border: 1px solid #e6e6e6;
}
.table >>> table td {
    border: 1px solid #e6e6e6;
}
.game-data .v-table {
    min-height: 0;
}
.smallTable .v-table {
    min-height: 0;
}
.row3-tab .v-table {
    min-height: 0;
}
.row1 {
    width: 100%;
    /* height: 150px; */
    height: 12rem;
    display: flex;
    justify-content: space-between;
}
.row1 li {
    position: relative;
    width: 20rem;
    height: 100%;
    /* padding: 10px; */
    /* border-radius: 5px; */
    background: #fff;
}
.row1 li:first-child {
    border: 1px solid #f44;
}
.row1 li:nth-child(2) {
    border: 1px solid #48f;
}
.row1 li:nth-child(3) {
    border: 1px solid #4c1;
}
.row1 li:nth-child(4) {
    border: 1px solid #fa0;
}
/* 设置4个框里面,每个li的头,但不设置颜色, */
.row1 > li .head {
    padding-top: 5px;
    padding-bottom: 5px;
    /* background: #f44; */
    /* border-top-left-radius: 3px; */
    /* border-top-right-radius: 3px; */
    color: #fff;
    text-indent: 17px;
}
.bg-orange {
    background: #ff9900;
}
.bg-blue {
    background: #4c8bfd;
}
.bg-light-blue {
    background: #70a1fd;
}
.bg-green {
    background: #4dc213;
}
.bg-red {
    background: #f44;
}
.row1 .cont {
    padding: 10px;
}
/* 隐藏echart 外面样式 */
.row1 .fcharge-pic {
    position: relative;
    left: 2px;
    top: -56px;
    width: 224px;
    height: 100px;
    overflow: hidden;
}
.row1 #first_recharge {
    position: relative;
    top: -37px;
    left: -48px;
    width: 317px;
    height: 200px;
}
.row1 .right {
    float: right;
    margin-right: 10px;
}
.row1 .number {
    font-size: 20px;
    /* position: relative; */
}
.row1 .bottom-10 {
    width: 93%;
    position: absolute;
    bottom: 10px;
    padding-top: 4px;
    border-top: 1px solid #ccc;
    font-size: 14px;
}

.row2,
.row4 {
    margin-top: 20px;
    background: #fff;
    /* border-radius: 5px; */
}
/* .row2 {
    height: 180px;
} */
/* row2,3,4 头颜色及样式 */
.row2 .header,
.row3 .header,
.row4 .header {
    box-shadow: 1px 2px 3px #f0eded;
    /* height: 45px; */
    line-height: 45px;
    padding-left: 20px;
    /* border-top-left-radius: 3px; */
    /* border-top-right-radius: 3px; */
    background: #70a1fd;
    color: #fff;
}

.row2 .contain {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    /* margin-top: 15px; */
}
.row2 .game-data {
    /* width: 450px; */
    width: 42rem;
    padding-right: 20px;
    /* margin-right: 80px; */
}
.row2 .contain .title {
    width: 4em;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 3px solid #4c8bfd;
}
.row2 .plant-rank {
    /* width: 450px; */
    width: 42rem;
    /* margin-right: 40px; */
}
.mr8 {
    margin-right: 8px;
}
.row2 .btn-active:hover,
.row3 .btn-active:hover {
    /* box-shadow: none; */
    background: #f9fafc;
    color: #4c8bfd;
    border: 1px solid #f9fafc;
}
.row2 .btn-active,
.row3 .btn-active {
    padding: 5px 10px;
    line-height: 15px;
    border-radius: 3px;
    background: #fff;
    color: #4c8bfd;
    border: 1px solid #fff;
}

.btn-plain-white {
    padding: 5px 10px;
    line-height: 15px;
    border: 1px solid #fff;
    color: #fff;
    background: #70a2fd;
}
.btn-plain-white:hover {
    background: #82abf8;
}
/* 优惠活动 */

.row3 .data,
.row3 .graph {
    /* width: 510px; */
    width: 43rem;
    /* padding: 10px; */
    background: #fff;
}

/* .row3 .contain {
    padding-left: 20px;
    padding-right: 20px;
} */
.row3 .number-title {
    color: #4c8bfd;
}
.row3-number .number {
    font-size: 24px;
}

.row3 .graph .contain {
    padding: 10px;
    position: relative;
}

.row3 .graph .contain .login #login_num {
    height: 230px;
    transform: translateX(-90px);
    /* border: 1px solid #000; */
}
.row3 .graph .contain .regist #regist_num {
    width: 370px;
    height: 240px;
    position: relative;
    left: -30px;
    top: -30px;
}
.row3 .graph .data {
    width: 180px;
    position: absolute;
    right: 0;
    top: 30px;
}
.row3 .graph .data ul li {
    padding: 8px 0;
}
/* 小圆点 */
.row3 .graph .data ul li .dot {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
}
/* 平台 */
.row3 .graph .data ul li span:nth-child(2) {
    display: inline-block;
    width: 50px;
    white-space: nowrap;
}
.row3 .graph .data ul li span:nth-child(3) {
    display: inline-block;
    width: 60px;
    white-space: nowrap;
}
.blue {
    background: #4c8bfd;
}
.green {
    background: #4cc013;
}
.orange {
    background: #faab08;
}
.red {
    background: #fc4c4c;
}
.text-red {
    color: #fc4c4c;
}
.text-green {
    color: #4cc013;
}
.row3 {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.row3 > div {
    width: 49%;
    height: 300px;
    background: #fff;
    /* border-radius: 5px; */
}
.row3 .row3-number {
    display: flex;
    justify-content: space-between;
    /* height: 60px; */
    padding: 8px 30px 0 30px;
    margin-bottom: 20px;
    background: #f5f5f5;
    /* padding: 20px 30px; */
}
.row3-tab {
    margin-left: 20px;
    margin-right: 20px;
}
/* .row2 tr:hover {
    background: rgb(184, 98, 98);
} */
.row4 {
    height: 300px;
    position: relative;
    justify-content: center;
    background: #fff;
}
.row4 .contain {
    width: 100%;
    background: #fff;
}
.row4 #recharge {
    height: 250px;
    width: 500px;
    position: absolute;
    left: 50%;
    margin-left: -250px;
}
</style>
