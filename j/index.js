$(document).ready(function () {
    $.loginRequire();
    $('.navigator').navigator({
        nickname: '再叨叨剁了你',
    });
    $('.sidebar').sidebar({
        active: 0,
    });
    makeFuncArea();
    makeTableView();
    $('.pagination').pagination({
        total: 10,
        current: 4,
    })
});

// 搜索界面
function makeFuncArea() {
    var accountSearch = makeSearchBar('account', '账号');
    var nameSearch = makeSearchBar('name','姓名');
    $('.func-area .search').append(accountSearch).append(nameSearch);
}

//
function makeSearchBar(id, text) {
    return `<div class="search-bar d-flex align-items-center">
<img src="/img/content/search.png" style="width: 1.1rem; height: 1.2rem;" alt>
<div class="input-outer"><input id="${id}" class="cl-333"></div>
<div class="cl-333">${text}</div>
</div>`;
}

// 列表
function makeTableView() {
    var header = makeTableHeader();
    $('table').append(header).append(makeTableRows());
    $('.edit').on('click', function(){
        edit($(this).data());
    });
    $('.delete').on('click', function () {
        deleteItem(($(this).data()));
    });
    $('.lock').on('click', function() {
        lock($(this).data());
    });
    $('.status div .using').on('click', function () {
        console.log('changeStatus');
    });
}

// 表头
function makeTableHeader() {
    var header = `<tr></tr>`;

    let titles = ['', '账号', '姓名', '电话', '状态', ''];
    titles.forEach(function (title) {
        header = $(header).append(`<th>${title}</th>`)
    });

    return header;
}

// 表格内容
function makeTableRows() {


    let rows = [
        {title: 1, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 2, account: '000001', name: '再叨叨', phone: '18557514751', status: '暂停使用', btns: ['edit', 'delete', 'lock']},
        {title: 3, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 4, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 5, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 6, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 7, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 8, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 9, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
        {title: 10, account: '000001', name: '再叨叨', phone: '18557514751', status: '使用中', btns: ['edit', 'delete', 'lock']},
    ];
    let rowResult = ``;
    for (let i = 0; i < rows.length; i++) {
        let r = rows[i];
        rowResult += `<tr class="${i % 2 === 0 ? 'white' : 'blue'}">
<td class="number border-right">${r.title}</td>
<td class="account border-right">${r.account}</td>
<td class="name border-right">${r.name}</td>
<td class="phone border-right">${r.phone}</td>
<td class="status border-right"><div class="d-flex justify-content-center"><div class="fs-10 pointer text-white ${r.status === '使用中' ? 'using' : 'pausing'}">${r.status}</div></div></td>
<td class="funcBtn">
<div class="full-width d-flex justify-content-between">
<div class="edit pointer" data-number="${r.title}" title="编辑"><img src="/img/cell/edit.png" alt="编辑"></div>
<div class="delete pointer" data-number="${r.title}" title="删除"><img src="/img/cell/delete.png" alt="删除"></div>
<div class="lock pointer" data-number="${r.title}" title="重置密码"><img src="/img/cell/lock.png" alt="重置密码"></div>
</div>
</td>
</tr>`
    }
    return rowResult;
}


// 点击功能
function edit(options) {
    console.log(options);
    $('.content').append(`<div class="alert"><div class="alert-content">
<div class="alert-close"><img src="/img/alert/close.png" style="width: 1.5rem; height: 1.5rem;" alt></div>
<div class="row"><label class="title-input-title">账号：</label><input class="title-input-input"></div>
<div class="row"><label class="title-input-title">姓名：</label><input class="title-input-input"></div>
<div class="row"><label class="title-input-title">电话：</label><input type="text" class="title-input-input"></div>
<div class="submit">确定</div>
</div></div>`);
    $('.alert-close').on('click', function () {
        $('.alert').last().remove();
    });
    $('.alert .submit').on('click', function () {
        $('.alert').last().remove();

    });
}

function deleteItem(options) {
    $('.content').showDelete({
        title: "你确定删除此管理员",
        content: "删除后不可找回, 请谨慎操作",
        success(res) {
            if (res.confirm) {
                console.log('删除')
            }
        }
    })
}

function lock(options) {
    console.log(options);
    $('.content').showReset({
        title: "你确定要重置该账户密码",
        content: "重置密码后原密码将不可用,请谨慎操作",
        success(res) {
            if (res.confirm) {
                console.log('重置了');
                $('.content').showAccountSuccess({
                    title: "重置密码成功",
                    account: "000001",
                    password: "123456",
                })
            }
        }
    })
}

function showPage(options) {
    console.log(options);
}

$('.new-cell').on('click', function () {
    console.log(1234);
});