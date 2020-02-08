document.write(`
<script src="/v/sidebar.js"></script>
<script src="/v/navigator.js"></script>
<script src="/v/alerts.js"></script>
<script src="/v/pagination.js"></script>
`);
// 对象方法
;(function ($) {
    // 页面公用
    $.fn.body = function (options) {
        return this.append(`<div class="container-fluid full-height d-flex flex-column">
    <div class="navigator"></div>
    <div class="d-content full-height d-flex">
        <div class="sidebar full-height"></div>
        <div class="content full-height full-width d-flex flex-column">
             
        </div>
    </div>
</div>`)
    };

    $.fn.funcArea = function(options) {
        this.append(`<div class="func-area d-flex align-items-center justify-content-between">
                <div class="search d-flex align-items-center"></div>
                <div class="new-cell pointer cursor fw-600 fs-15 d-flex align-items-center justify-content-center">新建</div>
            </div>`);
        $('.new-cell').on('click', function () {
            if (typeof options.new == 'function') {
                options.new()
            }
        });
        return this;
    };

    $.fn.searchBar = function(options) {
        this.append(`<div class="search-bar d-flex align-items-center">
<img src="/img/content/search.png" style="width: 1.1rem; height: 1.2rem;" alt>
<div class="input-outer"><input id="${options.id}" class="fs-12 c-333"></div>
<div class="fs-12 cl-333">${options.text}</div>
</div>`);
        $(`#${options.id}`).bind('keyup', function (e) {
            if (e.keyCode === 13) {
                if (typeof options.confirm == 'function') {
                    options.confirm($(this).val());
                }
            }
        });
        return this;
    };

    $.fn.table = function (options) {
        return this.append(`<div class="d-flex full-height" style="overflow: auto;">
                <table></table>
            </div>
<ul class="pagination"></ul>`)
    };

    $.fn.studentTable = function (students, showEdit, handler) {
        let table = `<table></table>`;
        let ths = `<tr></tr>`;
        let thTitles = ["", "", "姓名", "班级", "性别", "月龄", "身高", "体重", "负责老师", "监护人", "联系电话", "家庭住址", ""];
        thTitles.forEach(function (t) {
            ths = $(ths).append(`<th>${t}</th>`);
        });
        table = $(table).append(ths);
        for (let i = 0; i < students.length; i++) {
            let row = students[i];
            table = $(table).append(`<tr class="${i%2===0?'white':'blue'}">
<td class="number border-right">${row.number}</td>
<td class="avatar border-right"><img src="${row.avatar}" style="width: 4rem; height: 4rem;" alt></td>
<td class="name border-right">${row.name}</td>
<td class="cls border-right">${row.cls}</td>
<td class="gender border-right">${row.gender}</td>
<td class="age border-right">${row.age}</td>
<td class="height border-right">${row.height}</td>
<td class="weight border-right">${row.weight}</td>
<td class="teacher border-right">${row.teacher}</td>
<td class="guardian border-right">${row.guardian}</td>
<td class="phone border-right">${row.phone}</td>
<td class="address border-right">${row.address}</td>
${showEdit?`<td class="funcBtn">
<div class="full-width d-flex justify-content-between">
<div class="pointer edit student-cell" data-number="${row.number}"><img src="/img/cell/edit.png" style="width: 14px; height: 14px;" alt></div>
<div class="pointer delete student-cell" data-number="${row.number}"><img src="/img/cell/delete.png" style="width: 14px; height: 14px;" alt></div>
<div class="pointer wechat student-cell" data-number="${row.number}"><img src="/img/cell/wechat.png" style="width: 14px; height: 14px;" alt></div>
<div class="pointer report student-cell" data-number="${row.number}"><img src="/img/cell/report.png" style="width: 14px; height: 14px;" alt></div>
</div>
</td>`:``}
</tr>`);
        }
        this.append(table);
        $('.student-cell.edit').on('click', function (  ) {
            if (typeof handler.edit == 'function') {
                handler.edit($(this));
            }
        });
        $('.student-cell.delete').on('click', function () {
            if (typeof handler.delete == 'function') {
                handler.delete($(this));
            }
        });
        $('.student-cell.wechat').on('click', function () {
            if (typeof handler.wechat == 'function') {
                handler.wechat($(this));
            }
        });
        $('.student-cell.report').on('click', function () {
            if (typeof handler.report == 'function') {
                handler.report($(this));
            }
        });
        return this;
    }

})(jQuery);

(function ($, window) {

    // 写localStorage
    $.extend({
        loginRequire() {
            if (!$.getSession('userinfo')) {
                if (window.location.pathname !== '/p/login.html') {
                    window.location.pathname = '/p/login.html';
                }
            }
        },
        setSession(key, value) {
            if (typeof value == 'object') {
                window.sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                window.sessionStorage.setItem(key, value);
            }
        },
        getSession(key) {
            let value = window.sessionStorage.getItem(key);
            try{
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        },
        removeSession(key) {
            window.sessionStorage.removeItem(key);
        },
    });
})(jQuery, window);

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
