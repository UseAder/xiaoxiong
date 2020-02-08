import api from "../../util/api.js";
import util from "../../util/util.js";

new Vue({
    el: '#app',
    data: {
        ths: ['', '账号', '姓名', '班级', '性别', '年龄', '电话', '住址', '毕业', ''],
        select_class: {},
        teachers: [],
        classes: [],
        editAlert: {
            isShow: false,
            isEdit: true,
            id: 0,
            account: "",
            name: "",
            cls: "",
            gender: "",
            age: "",
            phone: "",
            address: "2",
            graduate: "1",
        },
        successAlert: {
            isShow: false,
            type: '',
            account: '',
            password: '',
        },
        deleteAlert: {
            isShow: false,
            idx: 0,
        },
        resetAlert: {
            isShow: false,
            idx: 0,
        }
    },
    created() {
        this.loginRequire();
        this.reqTeacherList();
    },
    methods:{

        // 请求教师列表
        reqTeacherList(param) {
            let param_r = {school_id: this.getSession('userinfo').school_id,};
            if (param) {
                param_r = Object.assign(param, param_r)
            }
            let that = this;
            util.get({
                uri: api.teacherList,
                data: param_r,
                success(res) {
                    console.log(res);
                    that.teachers = res.data_list;

                    that.classes = res.class_list;
                    that.classes.splice(0,0,{class_id: '-1', class_name: '全部班级'})
                },
                fail(err) {
                    console.log(err);
                }
            })
        },

        // 新建修改教师
        newTeacher() {
            Object.keys(this.editAlert).forEach(key => {
                this.editAlert[key] = "";
            });
            this.editAlert.isShow = true;
            this.editAlert.isEdit = false;
            this.editAlert.id = 0;
            this.successAlert.type = '新建';
        },
        editTeacher(e) {
            let obj = this.teachers[e.currentTarget.dataset.idx];
            this.editAlert = {
                isShow: true,
                isEdit: true,
                id: obj.teacher_id,
                account: obj.teacher_account,
                name: obj.teacher_name,
                gender: obj.teacher_gender==='1'?'男':'女',
                age: obj.teacher_age,
                phone: obj.teacher_phone,
                address: obj.teacher_address,
                graduate: obj.teacher_graduate,
            };
            this.successAlert.type = '修改';
        },
        submitTeacher() {
            let that = this;
            let param = {
                teacher_id: this.editAlert.id,
                login_account: this.editAlert.account,
                teacher_name: this.editAlert.name,
                teacher_gender: this.editAlert.gender==='男'?1:2,
                teacher_phone: this.editAlert.phone,
                teacher_age: this.editAlert.age,
                teacher_address: this.editAlert.address,
                teacher_graduate: this.editAlert.graduate,
                school_id: this.getSession('userinfo').school_id,
            };
            let keys = Object.keys(param);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let item = param[key];
                if (item.length === 0) {
                    alert('信息填写不全');
                    return;
                }
            }
            util.post({
                uri: api.teacherEdit,
                data: param,
                success(res) {
                    console.log(res);
                    that.editAlert.isShow = false;
                    that.successAlert.isShow = true;
                    if (!that.editAlert.isEdit) {
                        that.successAlert.account = res.login_account;
                        that.successAlert.password = res.new_pwd;
                    }
                    that.reqTeacherList();
                },
                fail(err) {
                    console.error(err);
                }
            })
        },

        // 删除教师
        delTeacher(e) {
            let that = this;
            let obj = this.teachers[this.deleteAlert.idx];
            util.post({
                uri: api.teacherDel,
                data: {
                    teacher_id: obj.teacher_id,
                },
                success(res) {
                    console.log(res);
                    that.deleteAlert = {isShow: false, idx: -1};
                    that.reqTeacherList();

                    that.$message({
                        message: '成功',
                        type: 'success',
                    });
                },
                fail(err) {

                }
            })
        },

        // 重置教师
        resetTeacher(e) {
            let that = this;
            let teacher_id = this.teachers[this.resetAlert.idx].teacher_id;
            let login_id = this.getSession('userinfo').login_id;
            util.post({
                uri: api.teacherReset,
                data: {
                    teacher_id: teacher_id,
                    login_id: login_id,
                },
                success(res) {
                    that.resetAlert.isShow = false;
                    that.successAlert = {
                        type: '重置',
                        account: res.login_account,
                        password: res.new_pwd,
                        isShow: true,
                    }
                },
                fail(err) {

                }
            })
        },

        // 搜索
        search(e) {
            console.log(e);
            let key = e.currentTarget.dataset.key;
            if (key === 'search_account') {
                this.reqTeacherList({search_account: e.currentTarget.value});
            } else if (key === 'search_name') {
                this.reqTeacherList({search_name: e.currentTarget.value});
            }
        },

        search_class(e) {

            if (this.select_class != -1) {
                this.reqTeacherList({search_class: this.select_class})
            } else {
                this.reqTeacherList()
            }
        },

        // 复制账号密码
        copy(e) {
            let text = e.currentTarget.dataset.text;
            let input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value', text);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                console.log('复制成功');
            }
            document.body.removeChild(input);
        },

        gotopage(e) {
            alert(e.page);
        },
    },
});

// $(document).ready(function () {
//     $.loginRequire();
//
//     $('.navigator').navigator({
//         nickname: '再叨叨剁了你',
//     });
//     $('.sidebar').sidebar({
//         active: 1,
//     });
//     makeFuncArea();
//     makeTableView();
//     $('.pagination').pagination({
//         total: 10,
//         current: 4,
//     })
// });
//
// // 搜索界面
// function makeFuncArea() {
//     let accountSearch = makeSearchBar('account', '账号');
//     let nameSearch = makeSearchBar('name','姓名');
//     let classSearch = makeSearchBar('class', '班级');
//     $('.func-area .search').append(accountSearch).append(nameSearch).append(classSearch);
// }
//
// //
// function makeSearchBar(id, text) {
//     return `<div class="search-bar d-flex align-items-center">
// <img src="/img/content/search.png" style="width: 1.1rem; height: 1.2rem;" alt>
// <div class="input-outer"><input id="${id}" class="fs-12 c-333"></div>
// <div class="fs-12 cl-333">${text}</div>
// </div>`;
// }
//
// // 表格
// function makeTableView() {
//     let header = makeTableHeader();
//     $('table').empty().append(header).append(makeTableRows());
//     // 删除
//     $('.delete').on('click', function () {
//         showDelete();
//     });
//     // 编辑
//     $('.edit').on('click', function () {
//         showEdit();
//     });
//     // 重置账号密码
//     $('.lock').on('click', function () {
//         resetAccount();
//     });
// }
//
// // 表头
// function makeTableHeader() {
//     let titles = ['', '账号', '姓名', '班级', '性别', '年龄', '电话', '住址', '毕业', ''];
//     let classes = ['number', 'account', 'name', 'class', 'gender', 'age', 'phone', 'address', 'graduate', 'func-area'];
//     let tr = `<tr></tr>`;
//     for (let i = 0; i < titles.length; i++) {
//         let title = titles[i];
//         let cls = classes[i];
//         tr = $(tr).append(`<th class="${cls}">${title}</th>`);
//     }
//     return tr;
// }
//
// // 表行
// function makeTableRows() {
//     let rows = [
//         {number: "1", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "2", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "3", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "4", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "5", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "6", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "7", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "8", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "9", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//         {number: "10", account: "0000001", name: "再叨叨", cls: "小二班", gender: "女", age: "26", phone: "18557514751", address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203", graduate: "浙江师范大学杭州幼儿师范学院", btns: ['edit', 'delete', 'lock']},
//     ];
//     let resultRows = ``;
//     for (let i = 0; i < rows.length; i++) {
//         let row = rows[i];
//         resultRows += `<tr class="${i % 2 === 0 ? 'white' : 'blue'}">
// <td class="number border-right">${row.number}</td>
// <td class="account border-right">${row.account}</td>
// <td class="name border-right">${row.name}</td>
// <td class="cls border-right">${row.cls}</td>
// <td class="gender border-right">${row.gender}</td>
// <td class="age border-right">${row.age}</td>
// <td class="phone border-right">${row.phone}</td>
// <td class="address border-right">${row.address}</td>
// <td class="graduate border-right">${row.graduate}</td>
// <td class="funcBtn">
// <div class="full-width d-flex justify-content-between">
// <div class="pointer edit" data-number="${row.number}"><img src="/img/cell/edit.png" style="width: 14px; height: 14px;" alt></div>
// <div class="pointer delete" data-number="${row.number}"><img src="/img/cell/delete.png" style="width: 14px; height: 14px;" alt></div>
// <div class="pointer lock" data-number="${row.number}"><img src="/img/cell/lock.png" style="width: 14px; height: 14px;" alt></div>
// </div>
// </td>
// </tr>`
//     }
// return resultRows;
// }
//
//
// // 新建
// $('.new-cell').on('click', function () {
//     showEdit();
// });
//
// // 编辑
// function showEdit(options) {
//     $('.content').showTeacherEdit({
//         account: "0000001",
//         name: "小二哥",
//         class: "小二班",
//         gender: 1,
//         age: 26,
//         phone: "18557514751",
//         address: "浙江省杭州市滨江区江虹路768号浙农科创园5栋1203",
//         graduate: "浙江师范大学杭州幼儿师范学院",
//         success(res) {
//             if (res.confirm) {
//                 newComplete({
//                     title: '新建教职工账号成功',
//                     account: '000001',
//                     password: '123456',
//                 });
//             }
//         }
//     });
// }
//
// // 删除
// function showDelete() {
//     let number = $(this).data('number');
//     console.log(number);
//     $('.content').showDelete({
//         title: "你确定删除此教职工",
//         content: "删除后不可找回，请谨慎操作",
//         text: "确定",
//         cancelText: "取消",
//         success(res) {
//             if (res.confirm) {
//                 console.log('删除成功');
//             } else if (res.cancel) {
//                 console.log('取消成功');
//             } else if (res.close) {
//                 console.log('关闭成功');
//             }
//         }
//     });
// }
//
// // 新建成功
// function newComplete(options) {
//     $('.alert').last().remove();
//     $('.content').showAccountSuccess(options);
// }
//
// // 重置账号密码
// function resetAccount() {
//     $('.content').showReset({
//         title: "你确定要重置该账户密码",
//         content: "重置密码后原密码将不可用，请谨慎操作",
//         text: "确定",
//         cancelText: "取消",
//         success(res) {
//             if (res.confirm) {
//                 newComplete({
//                     title: '重置密码成功',
//                     account: '000001',
//                     password: '123456',
//                 });
//             }
//         }
//     });
// }