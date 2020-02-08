Vue.component('sidebar', {
    data() {
        return {
            rows: [
                {idx: 0, title: "教师管理", href: ['/p/a/index.html'], img: 'teacher'},
                {idx: 1, title: "班级管理", href: ['/p/a/cls.html'], img: "class"},
                {idx: 2, title: "学生管理", href: ['/p/a/student.html'], img: 'student'},
                {idx: 3, title: "餐点管理", href: ['/p/a/food.html', '/p/a/foodhouse.html'], img: 'food'},
                {idx: 4, title: "保育动态", href: ['/p/a/trend.html', '/p/a/leave.html'], img: 'conservation'},
                {idx: 5, title: "互动广场", href: ['/p/a/square.html'], img: 'square'},
                {idx: 6, title: "系统配置", href: ['/p/a/setting.html'], img: 'setting'},
            ]
        }
    },
    created() {
        let pathname = window.location.pathname;
        this.rows.forEach(row => {
            row.img = '/img/sidebar/' + (row.href === pathname ? row.img + '_s' : row.img + '_d') + '.png';
            row.active = row.href.indexOf(pathname) !== -1 ? 'active' : '';
            row.idx = row.href.indexOf(pathname) === -1 ? 0 : row.href.indexOf(pathname);
        });
    },
    methods: {
        gotohref(e) {
            window.location.pathname = e.currentTarget.dataset.href;
        },
    },
    template: `<div class="sidebar full-height"><div class="full-height sidebar-back">
<div v-for="row in rows" class="cell pointer sidebar-cell d-flex align-items-center" :data-href="row.active?row.href[0]:row.href[row.idx]" :class="row.active" :data-idx="row.idx" :href="row.href[row.idx]" @click="gotohref">
<img :src="row.img" style="width: 1.8rem; height: 1.8rem" >
<div class="text">{{row.title}}</div>
</div>
</div></div>`
});