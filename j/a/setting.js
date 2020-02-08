new Vue({
    el: '#app',
    data: {
        funcShow: true,
        funcIdx: -1,
        qrCode: "",
        noticeEditLogoUrl: "",
        options: [
            {img: 'about', text: '关于我们', bgColor: '#E5FFFC',},
            {img: 'qrcode', text: '关注我们', bgColor: '#E6FFE5'},
            {img: 'notice', text: '新建公告', bgColor: '#E5F1FF'},
        ],
        breadcrumb: [
            {img: 'about', text: '关于我们', bgColor: '#E5FFFC',},
            {img: 'qrcode', text: '关注我们', bgColor: '#E6FFE5'},
            {img: 'notice', text: '新建公告', bgColor: '#E5F1FF'},
            {img: 'notice', text: '编辑关于我们', bgColor: '#E5F1FF'},
        ],
        abouts: [
            {title: '园区地址', type: 'text', text: '浙江省杭州市上城区秋涛路178号5号楼一层51070'},
            {title: '园区电话', type: 'text', text: '12312341234'},
            {title: '顶部图片', type: 'image', image: '/img/login/logo.png'},
            {title: '园区介绍', type: 'text', text: '小熊摇篮，是由台湾惠文领袖教育集团创办的0-3岁国际婴幼教育品牌。惠文领袖教育集团成立于1980年，至今将近四十年的教育经验积累，萃取出最优质实作的0-15岁教学体系。惠文领袖被评为“全国百佳幼儿园”（台湾地区唯一代表）。\n' +
                    '集团多元发展，投入母婴产业，于上海投资萌诺母婴中心，并研发小熊摇篮国际托育课程体系。2019年将同步成立上海小熊摇篮国际婴幼中心、上海小熊摇篮培训基地、杭州小熊摇篮典范中心及杭州小熊摇篮婴幼研究院。\n' +
                    '音乐教学系统是惠文领袖教育重要特色，惠文领袖教育乐旗队为亚洲唯一八度于东京、香港、上海迪斯尼乐园演出的幼儿园单位。'},
        ],
        ths: ['', '标题/时间', '描述', '公告内容', ''],
        tdCount: 10,
        td: {number: 1, title: '开学通知', time: '2019-12-20 20:30', description: '2019学年第一学期将于9月2日正式开学。现就新学期收费等有关事宜做如下告知', content: '<br/>' +
                '                                2019学年第一学期将于9月2日正式开学。现就新学期收费等有关事宜做如下告知：<br/>' +
                '一、学生报到注册及开学时间<br/>' +
                '全体学生于8月30日（周五）上午8:15到校报到注册。小结暑假生活，领取书簿。<br/>' +
                '9月2日（周一） 正式开学，按课表上课。<br/>' +
                '二、收费项目与标准<br/>' +
                '本学期的收费工作将严格执行沪教委财（2015）13号文件的精神与要求，以下代办性收费项目及标准均向闵行区教育局报告，并已在校园网及收费公示栏中做公示。<br/>' +
                '1. 教育活动费               3000元/学期 \n' +
                '2. 校服费                    400元/套（学生自愿，据实结算）<br/>' +
                '3. 午餐费                    15元/餐<br/>' +
                '三、其他说明</br>' +
                '1. 请家长最迟于9月8日（周日）之前将应缴款项的合计金额存入农业银行银行卡内。<br/>', funcBtn: ['edit', 'delete', 'show']},
    },
    created() {
        this.loginRequire();
        let idx = this.getQueryVariable('i');
        console.log(idx);
        if (idx) {
            this.funcIdx = idx;
            this.funcShow = idx === -1;
        }
    },
    methods: {
        funcBtnAction(e) {
            let dataset = e.currentTarget.dataset;
        },
        titleFuncBtnAction(e) {
            let dataset = e.currentTarget.dataset;
            window.location.href = window.location.pathname + '?i=' + dataset.idx;
        },
        breadcrumbAction(e) {
            window.location.href = e.currentTarget.dataset.href;
        },
        selectQrcode() {
            this.$refs['qrcode'].click();
        },
        qrcodeChanged(e) {
            let file = e.target.files[0];
            this.qrCode = URL.createObjectURL(file);
            this.file = file;
        },
        qrSubmit(e) {

            let param = new FormData();
            param.append('file', this.file, '.jpg');
            param.append('dir_name', 'attentionQR');
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            axios.post('http://192.168.124.7/bear_baby/codes/public/index.php/test', param, config)
                .then(response => {
                    console.log(response)
                });
        },
        noticeSubmit() {

        },
        aboutEdit() {
            window.location.href = window.location.pathname + '?i=3';
        },
        noticeLogoEdit() {
            this.$refs['noticeLogoEdit'].click();
        },
        noticeLogoEdited(e) {
            let file = e.target.files[0];
            let url = URL.createObjectURL(file);

            this.noticeEditLogoUrl = url;
        },
        cancel() {
            window.history.back();
        },
    }
});



// $(document).ready(function () {
//     $.loginRequire();
//     $('body').body();
//     $('.navigator').navigator({
//         nickname: '再叨叨剁了你',
//     });
//     $('.sidebar').sidebar();
//
//     funcArea();
// });

// 上方功能区域: 关于我们/关注我们/新建公告/能力指标
function funcArea() {
    let options = [
        {img: 'about', text: '关于我们', bgColor: '#E5FFFC'},
        {img: 'qrcode', text: '关注我们', bgColor: '#E6FFE5'},
        {img: 'notice', text: '新建公告', bgColor: '#E5F1FF'},
        {img: 'ability', text: '能力指标', bgColor: '#FFF8E5'},
    ];
    let funcAreaEle = `<div></div>`;
    options.forEach(function (option) {
        funcAreaEle = $(funcAreaEle).append(makeFuncBtn(option));
    });
    $('.content').append(`<div class="func-area d-flex justify-content-between">${$(funcAreaEle).html()}</div>`)
        .append(`<div class="d-flex full-height" style="overflow: scroll"><table>${$(makeNoticeTable()).html()}</table></div>`);
    $('.edit').on('click', function() {

    });
    $('.delete').on('click', function () {

    });
    $('.show').on('click', function () {

    });
}

function makeFuncBtn(option) {
    return `<div class="btn pointer d-flex align-items-center justify-content-center" style="background-color: ${option.bgColor};">
<img src="/img/setting/${option.img}.png" style="width: 2.65rem; height: 2.65rem" alt>
<div class="fs-18" style="margin-left: 1rem">${option.text}</div>
</div>`
}

function makeNoticeTable() {
    let table = `<table></table>`;
    console.log(makeNoticeTh());
    table = $(table).append(makeNoticeTh()).append(makeNoticeTr());
    return table;
}

function makeNoticeTh() {
    let titles = ['', '标题/时间', '描述', '公告内容', ''];
    let th = `<tr></tr>`;
    titles.forEach(function (title) {
        th = $(th).append(`<th>${title}</th>`);
    });
    return `<tr>${$(th).html()}</tr>`
}

function makeNoticeTr() {
    let notice =
        {number: 1, title: '开学通知', time: '2019-12-20 20:30', description: '2019学年第一学期将于9月2日正式开学。现就新学期收费等有关事宜做如下告知', content: '<br/>' +
                '                                2019学年第一学期将于9月2日正式开学。现就新学期收费等有关事宜做如下告知：<br/>' +
                '一、学生报到注册及开学时间<br/>' +
                '全体学生于8月30日（周五）上午8:15到校报到注册。小结暑假生活，领取书簿。<br/>' +
                '9月2日（周一） 正式开学，按课表上课。<br/>' +
                '二、收费项目与标准<br/>' +
                '本学期的收费工作将严格执行沪教委财（2015）13号文件的精神与要求，以下代办性收费项目及标准均向闵行区教育局报告，并已在校园网及收费公示栏中做公示。<br/>' +
                '1. 教育活动费               3000元/学期 <br/>' +
                '2. 校服费                    400元/套（学生自愿，据实结算）<br/>' +
                '3. 午餐费                    15元/餐<br/>' +
                '三、其他说明</br>' +
                '1. 请家长最迟于9月8日（周日）之前将应缴款项的合计金额存入农业银行银行卡内。<br/>', funcBtn: ['edit', 'delete', 'show']};
    let trs = ``;
    for (let i = 0; i < 10; i++) {

        trs += `<tr class="${i%2===0?'white':'blue'}">
<td class="border-right">${notice.number}</td>
<td class="border-right" style=""><span>${notice.title}</span><br/><span>${notice.time}</span></td>
<td class="border-right" style="">${notice.description}</td>
<td class="border-right text-left" style="">${notice.content}</td>
<td class="border-right funcBtn"><div class="full-width d-flex justify-content-between">
<div class="pointer edit"><img src="/img/setting/edit.png" style="width: 1.2rem; height: 1.2rem;"></div>
<div class="pointer delete"><img src="/img/setting/delete.png" style="width: 1.2rem; height: 1.2rem"></div>
<div class="pointer show"><img src="/img/setting/show.png" style="width: 1.2rem;height: 1.2rem"> </div>
</div></td>
</tr>`
    }
    return trs;
}