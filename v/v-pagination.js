Vue.component('pagination', {
    props: {
        max: {type: String, default: "1"},
        current: {type: String, default: "1"},
    },
    data() {
        return {
            for_max: 1,
            for_current: 1,
        }
    },
    mounted() {
        this.for_max = parseInt(this.max);
        this.for_current = parseInt(this.current);
    },
    methods: {
        lastPage() {
            if (this.for_current != 0) {
                this.$emit("action", {page: this.for_current-1});
            }
        },
        pageItemAction(page) {
            if (page+1 != this.current) {
                this.$emit("action", {page: page+1})
            }
        },
        nextPage() {
            if (this.for_current != this.for_max) {
                this.$emit("action", {page: this.for_current+1})
            }
        },
    },
    template: `<div class="pagination">
<li class="page-item pointer"><a class="page-link" @click.stop="lastPage"><img src="/img/pagination/previous.png" style="width: 5px; height: 10px;" alt></a></li>
<li class="page-item" v-for="i,idx in for_max" :class="i==current?'active':'pointer'"><a class="page-link" @click.stop="pageItemAction(idx)">{{idx+1}}</a></li>
<li class="page-item pointer"><a class="page-link" @click.stop="nextPage"><img src="/img/pagination/next.png" style="width: 5px; height: 10px;" alt></a></li>
</div>`
});