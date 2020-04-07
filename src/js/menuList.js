let menuList = [
                {
                    name: "首页",
                    path: "/home",
                    icon: "iconhome"
                },
                {
                    name: "会员管理",
                    // path: '/user',
                    icon: "iconaccount",
                    children: [
                        { name: "会员列表", path: "/user/userlist" },
                        { name: "登录记录", path: "/user/loginlog" },
                        { name: "标签管理 ", path: "/user/tabmanage" },
                        { name: "黑名单管理 ", path: "/user/blacklistmanage" },
                        { name: "等级设置 ", path: "/user/levelsetting" },
                        { name: "洗码设置 ", path: "/user/washsetting" }
                    ]
                },
                {
                    name: "财务管理",
                    // path: '/funds',
                    icon: "iconmoneybag",
                    children: [
                        { name: "入款订单", path: "/funds/incomeorder" },
                        { name: "人工存取", path: "/funds/manualaccess" },
                        { name: "出款审核", path: "/funds/paymentreview" },
                        { name: "出款订单", path: "/funds/paymentorder" },
                        { name: "资金账变", path: "/funds/fundchange" }
                    ]
                },
                {
                    name: "公告管理",
                    // path: '/announce',
                    icon: "iconyunyingzhongxin",
                    children: [
                        { name: "跑马灯消息", path: "/announce/marquee" },
                        { name: "系统公告", path: "/announce/systemannounce" },
                        // { name: "站内消息 ", path: "/announce/station" },
                        { name: "登录弹窗公告 ", path: "/announce/loginpopup" },
                        { name: "轮播公告 ", path: "/announce/carousel" }
                    ]
                },
                {
                    name: "邮件系统",
                    // path: 'email',
                    icon: 'icon185078emailmailstreamline',
                    children: [
                        {name:"发邮件", path:"/email/sendemail"},
                        {name:"收件箱", path:"/email/receiveemail"},
                        {name:"已发邮件", path:"/email/emailsent"},
                        {name:"短信推送", path:"/email/smspush"},
                    ]
                },
                {
                    name: "报表管理",
                    // path: '/report',
                    icon: "iconaccount",
                    children: [
                        { name: "个人报表", path: "/report/personalreport" },
                        { name: "游戏报表", path: "/report/gamereport" },
                        { name: "公司报表", path: "/report/companyreport" },
                        { name: "会员稽核", path: "/report/memberaudit" },
                        { name: "平台注单", path: "/report/platformbet" },
                        { name: "活动报表", path: "/report/activereport" },
                        { name: "会员洗码", path: "/report/userwash" }

                    ]
                },
                {
                    name: "游戏管理",
                    // path: '/game',
                    icon: "iconmiaojie1029data",
                    children: [
                        { name: "H5游戏管理", path: "/game/gameh5" },
                        { name: "PC游戏管理", path: "/game/gamepc" },
                        { name: "APP游戏管理", path: "/game/gameapp" },
                        { name: "平台管理", path: "/game/plantform" },
                        { name: "分类管理", path: "/game/gamesort" },

                    ]
                },
                {
                    name: "活动管理",
                    // path: '/active',
                    icon: "iconcalculator",
                    children: [
                        { name: "静态活动", path: "/active/static" },
                        { name: "动态活动", path: "/active/dynamic" },
                    ]
                },
                {
                    name: "金流管理",
                    // path: '/pay',
                    icon: "icongame",
                    children: [
                        { name: "线下金流配置", path: "/pay/offlinepay" },
                        { name: "线上金流配置", path: "/pay/onlinepay" },
                        { name: "出款银行管理", path: "/pay/exportbank" },

                    ]
                },
                {
                    name: "设置管理",
                    // path: '/set',
                    icon: "iconspeaker-5",
                    children: [
                        { name: "管理员分组", path: "/set/adminsort" },
                        { name: "全域设置", path: "/set/allareaset" },
                        { name: "推广图片配置", path: "/set/picconfig" },
                        { name: "客服设置", path: "/set/serviceset" },
                        { name: "帮助设置", path: "/set/helpset" },
                        { name: "操作记录", path: "/set/operatrecord" },
                        { name: "银行卡反查中心", path: "/set/bankcenter" },
                    ]
                },
               
            ]
export default menuList
