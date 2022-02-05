export default {
    props: ['pages'],
    methods: {
        getPage(page) {
            // console.log(page)
            this.$emit('inner-emit-method', page)
        }
    },
    template: `
    <nav aria-label="Page navigation example">
    <ul class="pagination">

      <li   :class= '{disabled:!pages.has_pre}'
            @click.prevent="getPage(page = pages.current_page-1)"
            class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li   v-for="page in pages.total_pages" :key="page"
            @click.prevent="getPage(page)"
            :class= '{active: page === pages.current_page}'
            class="page-item">
        <a class="page-link" href="#">{{page}}</a>
      </li>

      <li   :class= '{disabled:!pages.has_next}' 
      @click.prevent="getPage(page = pages.current_page+1)"
            class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    </nav>
    `
}

// why pagination.total_pages is 'number' , but via v-for gen page1, 2, 3...