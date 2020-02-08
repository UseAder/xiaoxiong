import util from "../../util/util.js";
import api from "../../util/api.js";

new Vue({
    el: '#app',
    data: {
        ths: ["", "", "姓名", "班级", "性别", "月龄", "身高", "体重", "负责老师", "监护人", "联系电话", "家庭住址", ""],
        students: [],
        classes: [],
        editAlert: {
            show: false,
            edit: false,
            obj: {},
        },
        guardianSelectAlert: {
            show: false,
            info: {}
        },
        deleteAlert: {
            show: false,
        },
        parentsAlert: {
            show: false,
        },
        reportAlert: {
            show: false,
        }
    },
    created() {
        this.loginRequire();
        this.req_student_list();
    },
    methods: {
        req_student_list(name) {
            let that = this;
            let userinfo = this.getSession('userinfo');
            let param = {
                login_id: userinfo.login_id,
                login_type: userinfo.login_type,
            };
            if (name != undefined) {
                param.search_name = name;
            }
            util.get({
                uri: api.stuList,
                data: param,
                success(res) {
                    console.log(res);
                    that.students = res.data_list;
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        get_student_info(id) {
            this.editAlert.show = true;
            this.editAlert.edit = true;
            let that = this;
            util.get({
                uri: api.stuInfo,
                data: {
                    student_id: id,
                },
                success(res) {
                    console.log(res);
                    that.editAlert.show = true;
                    that.editAlert.obj = res.student_info;
                    that.editAlert.classes = res.class_list;
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        uploadImg(class_id, success) {
            util.upload({
                uri: api.upload,
                file: this.editAlert.photo_file,
                dirName: "students_class" + class_id,
                success(res) {
                    success(res);
                },
            })
        },

        editStudent() {
            let param = this.editAlert.obj;
            let that = this;
            if (this.editAlert.photo_file) {
                this.uploadImg(param.class_id, function (url) {
                    param.student_img = url;
                    that.postStudent(param);
                })
            } else {
                this.postStudent(param);
            }
        },

        postStudent(param) {
            let that = this;
            util.post({
                uri: api.stuAdd,
                data: param,
                success(res) {
                    console.log(res);
                    that.editAlert.show = false;
                    that.req_student_list();
                },
                fail(err) {
                    console.log(err);
                }
            })
        },


        photo_selected(e) {
            this.editAlert.photo = URL.createObjectURL(e.target.files[0]);
            this.editAlert.photo_file = e.target.files[0];
            this.$forceUpdate();
        },

        req_guardian_list(e) {
            let id = this.$refs.guardianSearchInput.value;
            if (!id || id.length === 0) return;
            let param = {
                search_id: id,
            };
            let that = this;
            util.get({
                uri: api.guardianList,
                data: param,
                success(res) {
                    console.log(res);
                    if (res.length>0) {
                        that.guardianSelectAlert.info = res[0];
                    }

                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        onSelectGuardian() {
            this.guardianSelectAlert.show=true;
            this.$refs.guardianInput.blur();
        },

        guardianSelect() {
            let info = this.guardianSelectAlert.info;
            this.editAlert.guardian = info;
            this.guardianSelectAlert.show = false;
            this.editAlert.obj.guardian_name = info.name;
            this.editAlert.obj.guardian_id = info.id;
        },

        deleteStudent() {
            let that = this;
            util.post({
                uri: api.stuDelete,
                data: {
                    student_id: this.deleteAlert.id,
                },
                success(res) {
                    console.log(res);
                    that.deleteAlert.show = false;
                    that.req_student_list();
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        showParents(id) {
            let that = this;
            util.get({
                uri: api.stuParent,
                data: {
                    student_id: id,
                },
                success(res) {
                    that.parentsAlert.guardian_list = res.guardian_list;
                    that.parentsAlert.relative_list = res.relative_list;
                    that.parentsAlert.show = true;
                    console.log(res);
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        showReports(student_id) {
            let that = this;
            util.get({
                uri: api.stuReport,
                data: {
                    student_id: student_id,
                },
                success(res) {
                    console.log(res);
                    that.reportAlert.show = true;
                    that.reportAlert.list = res;
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

    }
});
