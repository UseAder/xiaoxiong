document.write(`
<script src="/v/v-pagination.js"></script>
<script src="/v/v-sidebar.js"></script>
<script src="/v/v-navigator.js"></script>
<script src="/v/v-alerts.js"></script>
`);

Vue.component('search-bar', {
    props: {
        id: {type: String, default: ''},
        text: String,
    },
    methods: {
        search(e) {
            console.log(e);
        },
    },
    template: `<div class="search-bar d-flex align-items-center">
<img src="/img/content/search.png" style="width: 1.1rem; height: 1.2rem;" alt>
<div class="input-outer"><input @keyup="search" :id="id" class="fs-12 c-333"></div>
<div class="fs-12 cl-333">{{text}}</div>
</div>`,
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

Vue.prototype.setSession = function (key, value) {
    if (typeof value == 'object') {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    } else {
        window.sessionStorage.setItem(key, value);
    }
};
Vue.prototype.getSession = function (key) {
    let value = window.sessionStorage.getItem(key);
    try{
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
};
Vue.prototype.removeSession = function (key) {
    window.sessionStorage.removeItem(key);
};
Vue.prototype.loginRequire = function () {
    if (!this.getSession('userinfo')) {
        if (window.location.pathname !== '/p/login.html') {
            window.location.pathname = '/p/login.html';
        }
    }
};
Vue.prototype.logout = function () {
    this.removeSession('userinfo');
    window.location.pathname = '/'
};
Vue.prototype.getQueryVariable = function (key) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === key){return pair[1];}
    }
    return false;
};