// let host = "http://192.168.124.7";
let host = "https://mp.ninthwind.com";
// let path = "/bear_baby/codes/public/index.php";
let baseUrl = host;

export default {
    // 上传图片
    upload: baseUrl + "/upload_img",
    // 登录退出
    login: baseUrl + "/manager_login",

//    教师管理
    teacherList: baseUrl + "/fetch_teacher_list",
    teacherEdit: baseUrl + "/teacher_edit",
    teacherDel: baseUrl + "/del_teacher",
    teacherReset: baseUrl + "/reset_teacher_pwd",
//    班级管理
    clsList: baseUrl + "/fetch_class_list",
    clsInfo: baseUrl + "/class_edit",
    clsEdit: baseUrl + "/class_edit",
    clsDelete: baseUrl + "/del_class",
    clsStudents: baseUrl + "/fetch_class_student",
//    学生管理
    stuList: baseUrl + "/student_list",
    stuAdd: baseUrl + "/student_edit",
    guardianList: baseUrl + "/search_member",
    stuInfo: baseUrl + "/student_edit",
    stuDelete: baseUrl + "/del_student",
    stuParent: baseUrl + "/family_list",
    stuReport: baseUrl + "/monthly_magazine_list",
//    食品库
    foodList: baseUrl + "/larder_list",
    foodInfo: baseUrl + "/food_edit",
    foodEdit: baseUrl + "/food_edit",
    foodDelete: baseUrl + "/del_food",
//    餐点管理
    foodSelect: baseUrl + "/food_select",


//    教师端
    t_stuList: baseUrl + "/today_student_list",
};
