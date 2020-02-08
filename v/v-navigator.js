Vue.component('navigator', {
    props: ['nickname'],
    data() {
        return {
            time: new Date().format('yyyy-MM-dd hh:mm:ss'),
        }
    },
    created() {
        let that = this;
        setInterval(function () {
            that.time = new Date().format('yyyy-MM-dd hh:mm:ss');
        }, 1000);
    },
    methods: {
        exit() {
            this.logout()
        },
        navigate(e) {
            window.location.href = e.currentTarget.dataset.uri;
        },
    },
    template: `<div class="navigator navigator-back d-flex align-items-center justify-content-between">
<a href="index.html"><img src="/img/login/logo.png" alt style="width: 15rem; height: 2.75rem;"></a>
<div class="time cl-999 fs-14"><div class="time-content">{{time}}</div></div>
<div class="d-flex align-items-center justify-content-center">
<img @click="navigate" data-uri="info.html" class="pointer" alt src="/img/navigator/head_men.png" style="width: 1.8rem; height: 2.05rem">
<div @click="navigate" data-uri="info.html" class="pointer nickname cl-333">{{nickname}}</div>
<div @click="exit" class="exit-btn pointer d-flex justify-content-center align-items-center fw-600">退出</div>
</div>
</div>`
});

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};