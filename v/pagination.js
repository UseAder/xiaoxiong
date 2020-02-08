;(function ($) {
    // 分页
    $.fn.pagination = function (options) {
        let current = options.current;
        let total = options.total;
        let result = '';
        result += `<li class="page-item pointer"><a data-idx="0" class="page-link"><img src="/img/pagination/previous.png" style="width: 5px; height: 10px;" alt></a></li>`;
        for (let i = 0; i < total; i++) {
            result += `<li class="page-item ${i===3?'active':'pointer'}"><a data-idx="${i+1}" class="page-link">${i+1}</a></li>`
        }
        result += `<li class="page-item pointer"><a data-idx="999" class="page-link"><img src="/img/pagination/next.png" style="width: 5px; height: 10px;" alt></a></li>`;

        $('.pagination').append(result);
        $('.page-link').on('click', function (e) {
            showPage($(this).data());
        });
        return this;
    };
})(jQuery);