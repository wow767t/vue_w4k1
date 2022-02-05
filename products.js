import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

let productModal = null;
let delProductModal = null;

import pagination from "./pagination.js"
import updatemodal from "./updateModal.js"




const app = createApp({
    components: {
        pagination,
        updatemodal
    },
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2/',
            apiPath: 'scott',
            products: {},
            isNew: false,
            temp:{
                imagesUrl: [] 
            },
            pagination: {},

        }
    },
    mounted() {
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = myCookie;
        this.checkAdmin()

        // create modal
        productModal = new bootstrap.Modal(document.querySelector('#productModal'))
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'))
    },
    methods: {
        checkAdmin() {
            // https://vue3-course-api.hexschool.io/v2/api/user/check
            const url = `${this.apiUrl}api/user/check`

            axios.post(url)
            .then(res => {
                // console.log(res)
                this.getProducts()
            })
            .catch(err => {
                console.dir(err); 
            })
        },
        getProducts(page = 1) {
            // https://vue3-course-api.hexschool.io/v2/api/scott/admin/products/all
            const url = `${this.apiUrl}api/${this.apiPath}/admin/products/?page=${page}`
            axios.get(url)
            .then(res => {
                // console.log(res)
                const {products, pagination} = res.data
                this.products = products
                this.pagination = pagination
            })
            .catch(err => {
                console.error(err); 
            })
        },
        // open modal add, edit, del
        openModal(type, item) {
            
            if(type === 'add'){
                // console.log(type)
                this.isNew = true;
                this.temp = {
                    imagesUrl: []
                }
                // console.log(type)
                // this.forTest(type)
                this.showModal()
            }
            else if(type === 'edit'){
                // console.log(item)
                this.isNew = false;
                this.temp = {
                    imagesUrl: [],
                    ...item
                }
                productModal.show()
                this.getProducts()
            }
            else if(type === 'del'){
                console.log(type)
                // this.forTest(type)
                this.isNew = false;
                this.temp = {
                    imagesUrl: [],
                    ...item
                }
                delProductModal.show()
            }
        },
        // forTest(type) {
        //     console.log('inner:',type)
        //     delProductModal.hide()
        // },
        showModal() {
            productModal.show()
        },
        closeModal(type) {
            if(type === "del"){
                console.log('close', type)
                delProductModal.hide()
            }
            else{
                productModal.hide()

            }
        },
        
    }
});

app.mount('#app')