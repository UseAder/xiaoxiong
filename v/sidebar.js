;(function ($, window) {
    // 侧边栏
    $.fn.sidebar = function () {
        let rows = [
            {idx: 0, title: "管理员管理", href: '/p/a/index.html', img: 'administrator',},
            {idx: 1, title: "教师管理", href: '/p/a/index.html', img: 'teacher' },
            {idx: 2, title: "班级管理", href: '/p/a/cls.html', img: "class"},
            {idx: 3, title: "学生管理", href: '/p/a/student.html', img: 'student' },
            {idx: 4, title: "餐点管理", href: '/p/a/food.html', img: 'food' },
            {idx: 5, title: "保育动态", href: '/p/a/trend.html', img: 'conservation' },
            {idx: 6, title: "互动广场", href: '/p/a/square.html', img: 'square' },
            {idx: 7, title: "系统配置", href: '/p/a/setting.html', img: 'setting' },
        ];
        var tables = `<div class="sidebar-back full-height"></div>`;
        let pathname = window.location.pathname;
        rows.forEach(function (r) {
            let active = pathname === r.href;
            tables = $(tables).append(`<div data-href="${r.href}" class="cell pointer sidebar-cell ${active?'active':''} d-flex align-items-center">
<img src="/img/sidebar/${r.img}${active?'_s':'_d'}.png" style="width: 1.8rem; height: 1.8rem;" alt>
<div class="text">${r.title}</div>
</div>`);
        });
        this.append(tables);
        $('.sidebar-cell').on('click', function () {
            if (!$(this).hasClass('active')) {
                window.location.href = $(this).data('href');
            }
        }).hover(function () {

        }, function () {

        });
        return this;
    };
})(jQuery, window);