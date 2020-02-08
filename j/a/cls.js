import util from "../../util/util.js";
import api from "../../util/api.js";

new Vue({
    el: "#app",
    data: {
        ths: ["", "班级名称", "负责老师", "其他老师", "学生总数", ""],
        res: {},
        editAlert: {
            isEdit: false,
            isShow: false,
            mainTeacher: 1,
            otherTeachers: [1],
        },
        deleteAlert: {
            isShow: false,
        },
        successAlert: {
            isShow: false,
        },
        studentAlert: {
            isShow: false,
            ths: ["", "", "姓名", "班级", "性别", "月龄", "身高", "体重", "监护人"],
            students: [],
        }
    },
    created() {
        this.loginRequire();
        this.req_cls_list();
    },
    methods: {
        req_cls_list(keyword) {
            let param = {
                school_id: 1,
            };
            if (keyword !== undefined) {
                param.search_name = keyword;
            }
            let that = this;
            util.get({
                uri: api.clsList,
                data: param,
                success(res) {
                    console.log(res);
                    that.res = res;
                },
                fail(err) {
                    console.log(err);
                }
            })
        },
        get_class_info(cls_id) {
            let that = this;
            util.get({
                uri: api.clsInfo,
                data: {
                    class_id: cls_id,
                    school_id: 1,
                },
                success(res) {
                    console.log(res);
                    that.editAlert.teacher_list = res.teacher_list;
                    if (res.class_info.other_teacher_ids.length === 0) {
                        res.class_info.other_teacher_ids.push(-1);
                    }
                    that.editAlert.class_info = res.class_info;
                    that.editAlert.isShow = true;
                },
                fail(err) {
                    console.log(err)
                }
            })
        },

        make_post_edit_param() {
            let class_info = this.editAlert.class_info;
            let param = {
                school_id: 1,
                class_id: class_info.class_id,
                class_name: class_info.class_name,
                main_teacher: class_info.main_teacher_id,
                other_teacher_ids: class_info.other_teacher_ids.join(',')
            };

            if (!this.verify_can_submit(param)) {
                console.log('cant submit');
                return;
            }
            return param;
        },

        post_class_edit() {
            let param = this.make_post_edit_param();
            if (param === undefined) {
                return;
            }
            console.log(param);
            let that = this;
            util.post({
                uri: api.clsEdit,
                data: param,
                success(res) {
                    that.editAlert.isShow = false;
                    that.successAlert.isShow = true;
                    that.req_cls_list();
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        verify_can_submit(param) {
            if (param.class_name.length === 0) {
                this.$message({
                    message: "请输入班级名",
                    type: 'error'
                });
                return false;
            }
            if (param.main_teacher === 0) {
                this.$message({
                    message: "请选择负责老师",
                    type: 'error'
                });
                return false;
            }
            let newOther = [];
            let other_teacher_ids = param.other_teacher_ids.split(',');
            for (let i = 0; i < other_teacher_ids.length; i++) {
                let ot = other_teacher_ids[i];
                if (ot != -1) {
                    newOther.push(ot)
                }
            }
            param.other_teacher_ids = newOther.join(',');
            return true;
        },
        addOtherTeacher(e) {
            this.editAlert.class_info.other_teacher_ids.push(-1);
            this.$forceUpdate();
        },

        search(e) {
            this.req_cls_list(e.target.value);
        },

        delete_class(id) {
            let param = {
                class_id: id,
            };
            let that = this;
            util.post({
                uri: api.clsDelete,
                data: param,
                success(res) {
                    console.log(res);
                    that.deleteAlert.isShow = false;
                    that.req_cls_list();
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        get_students(id) {
            let param = {
                class_id: id,
            };
            let that = this;
            util.get({
                uri: api.clsStudents,
                data: param,
                success(res) {
                    that.studentAlert.isShow = true;
                    console.log(res);
                },
                fail(err) {
                    console.log(err)
                }
            })

        },
    },
});

// 显示所有学生
function showAll() {
    let students = [
        {number: 1, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 2, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 3, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 4, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 5, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 6, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 7, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 8, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 9, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
        {number: 10, avatar: "/img/student/avatar.png", name: "王祖蓝", cls: "小二班", gender: "男", age: 36, height: 109, weight: 25, teacher: "再叨叨(12312341234)", guardian: "憋叨叨", phone: "12312341234", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", btns: ["edit", "delete", "wechat", "report"]},
    ];

    let tableContainer = $(`<div class="table-container"></div>`).studentTable(students, false);
    let close = `<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>`;
    let content = $(`<div class="alert-content clear"></div>`).append(close).append(tableContainer);
    let alert = $(`<div class="alert"></div>`).append(content);
    $('.content').append(alert);
    $('.alert-close').on('click', function () {
        $('.alert').last().remove();
    });
}
