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
                    <span v-if="isNew">新增產品</span>
                    <span v-else>編輯產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="mb-2">
                            <h5>主圖新增</h5>
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">輸入主圖網址</label>
                                <input v-model='temp.imageUrl' type="text" class="form-control"
                                    placeholder="請輸入圖片連結">
                            </div>
                            <img class="img-fluid" :src="temp.imageUrl" alt="">
                        </div>
                        <h5>多圖新增</h5>
                        <div v-if='Array.isArray(temp.imagesUrl)'>
                            <div v-for='(img,key) in temp.imagesUrl'>
                                <input v-model='temp.imagesUrl[key]' type="text" class="mb-3 form-control"
                                    placeholder="請輸入圖片連結">
                                <img class="img-fluid mb-3" :src="temp.imagesUrl[key]" alt="">
                            </div>
                            <button v-if="!temp.imagesUrl.leangth || temp.imagesUrl[temp.imagesUrl.leangth -1]"
                                @click='temp.imagesUrl.push("")' type="button"
                                class="btn btn-primary w-100 mb-3">新增</button>
                            <button @click='temp.imagesUrl.pop()' type="button"
                                class="btn btn-danger w-100 mb-3">刪除</button>
                        </div>

                    </div>
                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input v-model='temp.title' id="title" type="text" class="form-control"
                                placeholder="請輸入標題">
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="category" class="form-label">分類</label>
                                <input v-model='temp.category' id="category" type="text" class="form-control"
                                    placeholder="請輸入分類">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">單位</label>
                                <input v-model='temp.unit' id="unit" type="text" class="form-control"
                                    placeholder="請輸入單位">
                            </div>
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="origin_price" class="form-label">原價</label>
                                <input v-model.number='temp.origin_price' id="origin_price" type="number"
                                    min="0" class="form-control" placeholder="請輸入原價">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">售價</label>
                                <input v-model.number='temp.price' id="price" type="number" min="0"
                                    class="form-control" placeholder="請輸入售價">
                            </div>
                        </div>
                        <hr>

                        <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea v-model='temp.description' id="description" type="text"
                                class="form-control" placeholder="請輸入產品描述">
        </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">說明內容</label>
                            <textarea v-model='temp.content' id="description" type="text" class="form-control"
                                placeholder="請輸入說明內容">
        </textarea>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input v-model='temp.is_enabled' id="is_enabled" class="form-check-input"
                                    type="checkbox" :true-value="1" :false-value="0">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <div>
                    <button v-if='isNew'
                    @click='btnAddEditDel("add")' type="button" class="btn btn-primary">
                        確認
                    </button>
                    <button v-else
                    @click='btnAddEditDel("edit")' type="button" class="btn btn-success">
                        確認
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
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        是否刪除
                        <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            取消
                        </button>
                        <button @click='btnAddEditDel("del")'
                        type="button" class="btn btn-danger">
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}