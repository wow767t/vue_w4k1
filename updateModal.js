export default {
    props: ['isNew', 'temp'],
    methods:{
        btnAddEditDel(type) {
            const baseUrl = `https://vue3-course-api.hexschool.io/v2/api/scott/admin/product`
            let data = {
                data: {...this.temp}
            }
            
            if(type === 'add'){
                axios.post(baseUrl,data)
                .then(res => {
                    // console.log(res)
                    alert(res.data.message)
                    this.$emit('get-products')
                    // this.getProducts();
                    this.$emit('hide-modal')
                    // productModal.hide()
                })
                .catch(err => {
                    console.dir(err)
                    console.dir(err.data.message); 
                })
                

            }
            else if(type === 'edit'){
                const id = this.temp.id
                const url = `${baseUrl}/${id}`
                console.log(type)
                axios.put(url, data)
                .then(res => {
                    console.log(res)
                    alert(res.data.message)
                    this.$emit('get-products')
                    // this.getProducts();
                    this.$emit('hide-modal', type)
                    // productModal.hide()
                })
                .catch(err => {
                    console.dir(err); 
                })
                
            }
            else if(type === 'del'){
                const id = this.temp.id
                const url = `${baseUrl}/${id}`
                console.log('emit', type)
                // this.$emit('hide-modal', type)
                this.$emit('for-test', type)
                axios.delete(url)
                .then(res => {
                    console.log(res)
                    alert(res.data.message)
                    this.$emit('get-products')
                    this.$emit('hide-modal', type)
                    // this.getProducts();
                    // delProductModal.hide()
                })
                .catch(err => {
                    console.dir(err); 
                })
            }
        }
    },
    template: `
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                    <span v-if="isNew">????????????</span>
                    <span v-else>????????????</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="mb-2">
                            <h5>????????????</h5>
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">??????????????????</label>
                                <input v-model='temp.imageUrl' type="text" class="form-control"
                                    placeholder="?????????????????????">
                            </div>
                            <img class="img-fluid" :src="temp.imageUrl" alt="">
                        </div>
                        <h5>????????????</h5>
                        <div v-if='Array.isArray(temp.imagesUrl)'>
                            <div v-for='(img,key) in temp.imagesUrl'>
                                <input v-model='temp.imagesUrl[key]' type="text" class="mb-3 form-control"
                                    placeholder="?????????????????????">
                                <img class="img-fluid mb-3" :src="temp.imagesUrl[key]" alt="">
                            </div>
                            <button v-if="!temp.imagesUrl.leangth || temp.imagesUrl[temp.imagesUrl.leangth -1]"
                                @click='temp.imagesUrl.push("")' type="button"
                                class="btn btn-primary w-100 mb-3">??????</button>
                            <button @click='temp.imagesUrl.pop()' type="button"
                                class="btn btn-danger w-100 mb-3">??????</button>
                        </div>

                    </div>
                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">??????</label>
                            <input v-model='temp.title' id="title" type="text" class="form-control"
                                placeholder="???????????????">
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="category" class="form-label">??????</label>
                                <input v-model='temp.category' id="category" type="text" class="form-control"
                                    placeholder="???????????????">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">??????</label>
                                <input v-model='temp.unit' id="unit" type="text" class="form-control"
                                    placeholder="???????????????">
                            </div>
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="origin_price" class="form-label">??????</label>
                                <input v-model.number='temp.origin_price' id="origin_price" type="number"
                                    min="0" class="form-control" placeholder="???????????????">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">??????</label>
                                <input v-model.number='temp.price' id="price" type="number" min="0"
                                    class="form-control" placeholder="???????????????">
                            </div>
                        </div>
                        <hr>

                        <div class="mb-3">
                            <label for="description" class="form-label">????????????</label>
                            <textarea v-model='temp.description' id="description" type="text"
                                class="form-control" placeholder="?????????????????????">
        </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">????????????</label>
                            <textarea v-model='temp.content' id="description" type="text" class="form-control"
                                placeholder="?????????????????????">
        </textarea>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input v-model='temp.is_enabled' id="is_enabled" class="form-check-input"
                                    type="checkbox" :true-value="1" :false-value="0">
                                <label class="form-check-label" for="is_enabled">????????????</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    ??????
                </button>
                <div>
                    <button v-if='isNew'
                    @click='btnAddEditDel("add")' type="button" class="btn btn-primary">
                        ??????
                    </button>
                    <button v-else
                    @click='btnAddEditDel("edit")' type="button" class="btn btn-success">
                        ??????
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
            aria-labelledby="delProductModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 id="delProductModalLabel" class="modal-title">
                            <span>????????????</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ????????????
                        <strong class="text-danger"></strong> ??????(????????????????????????)???
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            ??????
                        </button>
                        <button @click='btnAddEditDel("del")'
                        type="button" class="btn btn-danger">
                            ????????????
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}