<template>
    <div class="container">
        <div class="operalog" ref="operalog">
            <div class="filter p10">
                <ul class="left">
                    <li>
                        <span>管理员：</span>
                        <Input v-model="filter.vendor" />
                    </li>
                    <li>
                        <span>IP搜索：</span>
                        <Input
                            errmsg="格式错误"
                            :showerr="errIpShow(filter.dataIP)"
                            v-model="filter.dataIP"
                        />
                    </li>
                    <li>
                        <span>日期选择：</span>
                        <Date style="width:300px" type="datetimerange" v-model="filter.dates" />
                        <!-- <span style="margin:0 5px;">~</span>
                        <Date v-model="filter.dates[1]" />-->
                    </li>
                    <li>
                        <button class="btn-blue" @click="firstLoad">查询</button>
                        <button class="btn-blue" @click="clearAll">清空</button>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="opera-list">
                    <li v-for="(item, index) in list" :key="index">
                        <span style="min-width:150px;text-align:right;">{{timeAgo(item.created_at)}}</span>
                        <div class="pic-cont">
                            <img class="img" src="../../../assets/image/head.jpg" alt="图片丢失" />
                            <div :class="[index!==list.length-1?'vertical-bar':'']"></div>
                        </div>
                        <div class="opera-cont">
                            <div class="cont-left">
                                <div class="cont-title">{{item.title}}</div>
                            </div>
                            <div>
                                <ul class="detail">
                                    <li>
                                        <span style="font-weight:bold;color:#4c8bfd;">
                                            详情
                                            <span>&nbsp;&nbsp;</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span>管理员：</span>
                                        <span>{{item.admin_name}}</span>
                                    </li>
                                    <li>
                                        <span>时间：</span>
                                        <span>{{item.created_at}}</span>
                                    </li>
                                    <li>
                                        <span>来源：</span>
                                        <span>{{item.origin}}</span>
                                    </li>
                                    <li>
                                        <span>IP：</span>
                                        <span>{{item.ip}}</span>
                                    </li>
                                    <li>
                                        <span>浏览器：</span>
                                        <span>
                                            <img :src="getBrowerPic(item.user_agent)" alt="图片加载失败" />
                                            
                                        </span>
                                        <span>{{item.user_agent}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OperatRecord",
    // props: {
    //     id: {
    //         require: true,
    //         type: [String, Number]
    //     }
    // },
    data() {
        return {
            filter: {
                vendor: "",
                dataIP: "",
                dates: []
            },
            dia_show: false,
            list: {},
            total: 0,
            pageNo: 1,
            pageSize: 25,
            curr_row: {},
            isOver: false, //是否都加载完了
            operaShow: false,
            fireFoxShow: false,
            ChromeShow: false,
            SafariShow: false,
            IEShow: false
        };
    },
    methods: {
        //校验ip地址
        errIpShow(val) {
            if (!val) return false;
            let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

            return !reg.test(val);
        },
        //校验查询条件
        checkFilter() {
            let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            // let re=new RegExp(IpCheck)
            if (!reg.test(this.filter.dataIP) && this.filter.dataIP != "") {
                return false;
            }
            return true;
        },
        // 第一次加载
        firstLoad() {
            this.pageNo = 1;
            this.getList().then(res => {
                if (res.data) {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        getBrowerPic(explore) {
            // console.log('🍟 explorer: ', explore);
            let name = window.all.tool.getExploreName(explore);

            switch (name) {
                case "Opera":
                    return require("../../../assets/image/browser/opera.png");
                    break;
                case "IE":
                    return require("../../../assets/image/browser/IE.png");
                    break;
                case "Edge":
                    return require("../../../assets/image/browser/edge.png");
                    break;
                case "Firefox":
                    return require("../../../assets/image/browser/firefox.png");
                case "Safari":
                    return require("../../../assets/image/browser/safari.png");
                    break;
                case "Chrome":
                    return require("../../../assets/image/browser/chrome.png");
                    break;
                case "IE>=11":
                    return require("../../../assets/image/browser/IE.png");
                    break;

                default:
                    // return require('../../../assets/image/browser/IE.png')
                    break;
            }
        },
        getList() {
            return new Promise((resolve, reject) => {
                if (!this.checkFilter()) return;
                let createdAt = "";
                if (this.filter.dates[0] && this.filter.dates[1]) {
                    createdAt = JSON.stringify([
                        String(this.filter.dates[0]),
                        String(this.filter.dates[1])
                    ]);
                }
                let datas = {
                    data_ip: this.filter.dataIP,
                    admin_name: this.filter.vendor,
                    created_at: createdAt,
                    pageSize: this.pageSize,
                    page: this.pageNo
                };
                // console.log("列表请求数据", datas);
                let data = window.all.tool.rmEmpty(datas);
                let { method, url } = this.$api.operation_record_list;
                this.$http({ method, url, data }).then(res => {
                    // console.log("返回数据", res);
                    if (res && res.code == "200") {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                });
            });
        },
        clearAll() {
            this.filter = {
                vendor: "",
                dataIP: "",
                dates: []
            };
        },
        // 计算时间间隔, 即显示 多久以前
        timeAgo(time) {
            let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (!reg.test(time)) return;
            let dateTimeStamp = new Date(time);

            //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
            var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
            var hour = minute * 60;
            var day = hour * 24;
            var week = day * 7;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime(); //获取当前时间毫秒
            var diffValue = now - dateTimeStamp; //时间差

            if (diffValue < 0) {
                return;
            }
            var minC = diffValue / minute; //计算时间差的分，时，天，周，月
            var hourC = diffValue / hour;
            var dayC = diffValue / day;
            var weekC = diffValue / week;
            var monthC = diffValue / month;
            let result = "--";
            if (monthC >= 1 && monthC <= 3) {
                result = " " + parseInt(monthC) + "月前";
            } else if (weekC >= 1 && weekC <= 3) {
                result = " " + parseInt(weekC) + "周前";
            } else if (dayC >= 1 && dayC <= 6) {
                result = " " + parseInt(dayC) + "天前";
            } else if (hourC >= 1 && hourC <= 23) {
                result = " " + parseInt(hourC) + "小时前";
            } else if (minC >= 1 && minC <= 59) {
                result = " " + parseInt(minC) + "分钟前";
            } else if (diffValue >= 0 && diffValue <= minute) {
                result = "刚刚";
            } else {
                var datetime = new Date();
                datetime.setTime(dateTimeStamp);
                var Nyear = datetime.getFullYear();
                var Nmonth =
                    datetime.getMonth() + 1 < 10
                        ? "0" + (datetime.getMonth() + 1)
                        : datetime.getMonth() + 1;
                var Ndate =
                    datetime.getDate() < 10
                        ? "0" + datetime.getDate()
                        : datetime.getDate();
                var Nhour =
                    datetime.getHours() < 10
                        ? "0" + datetime.getHours()
                        : datetime.getHours();
                var Nminute =
                    datetime.getMinutes() < 10
                        ? "0" + datetime.getMinutes()
                        : datetime.getMinutes();
                var Nsecond =
                    datetime.getSeconds() < 10
                        ? "0" + datetime.getSeconds()
                        : datetime.getSeconds();
                result = Nyear + "-" + Nmonth + "-" + Ndate;
            }
            return result;
        },
        // 滚动加载
        scroll() {
            let isLoading = false;
            let ele = this.$refs.operalog;
            let max_scroll_top = 0;
            ele.onscroll = () => {
                // 距离底部200px时加载一次
                let scrollHeight = ele.scrollHeight;
                let scrollTop = ele.scrollTop;
                // console.log('🍭 scrollTop: ', scrollTop)
                let offsetHeight = ele.offsetHeight;
                /** 窗口底部距离 */
                let bottomOfWindow = scrollHeight - scrollTop - offsetHeight;
                // console.log('🍹 isLoading: ', isLoading)
                if (scrollTop > max_scroll_top) {
                    max_scroll_top = scrollTop;
                }

                if (bottomOfWindow < 200 && isLoading == false) {
                    let totalPage = Math.ceil(this.total / this.pageSize);
                    // 如果是加载到最后一条,不执行()
                    if (this.pageNo === totalPage) {
                        if (scrollTop >= max_scroll_top) {
                            this.$toast.warning("已是最后一条");
                        }
                        return;
                    }

                    isLoading = true;
                    this.pageNo++; // 请求下一页
                    this.getList().then(res => {
                        isLoading = false;
                        if (res.data) {
                            this.list = this.list.concat(res.data.data || []);
                        }
                    });
                }
            };
        }
    },
    mounted() {
        this.firstLoad();
        this.scroll();
    }
};
</script>

<style scoped>
.cont-left {
    width: 200px;
    margin-left: 10px;
}
.cont {
    width: 1000px;
    max-height: 80vh;
    overflow: auto;
}
.operalog {
    height: calc(100vh - 170px);
    overflow: auto;
}
.opera-list {
    /* margin-left: 100px; */
    width: 1700px;
    margin: 20px auto 0 auto;
    /* border: 1px solid #000; */
}
.opera-list > li {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    /* overflow: hidden; */
}
.opera-list > li .pic-cont {
    position: relative;
    width: 40px;
    height: 40px;
    margin-left: 10px;
}
.opera-list > li .img {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    z-index: 1;
}
/* 竖线 */
.opera-list > li .vertical-bar {
    position: absolute;
    top: 40px;
    left: 50%;
    bottom: 0;
    width: 2px;
    height: 180px;
    background: #eee;
}

.opera-list > li .opera-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1300px;
    /* height: 60px; */
    padding: 10px;
    margin-left: 10px;
    background: #f2f2f2;
    border-radius: 5px;
}
.opera-list > li .cont-title {
    font-weight: bold;
    color: #4c8bfd;
}
.detail li > span:first-child {
    display: inline-block;
    min-width: 5em;
    margin-top: 5px;
    margin-right: 10px;
    text-align-last: justify; /* ie9*/
    font-size: 1.1em;
    color: #444;
}

.detail img {
    width: 20px;
    height: 20px;
}
.mt8 {
    margin-top: 8px;
}
.mt30 {
    margin-top: 30px;
}
.dia-inner {
    display: flex;
    justify-content: center;
}
</style>