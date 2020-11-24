<template>
    <div>
        <page-header title="Chỉnh sửa bài đăng trên blog">
            <button slot="handle" class="btn btn-main" @click="returnList">Trở lại danh sách</button>
        </page-header>
        <form-group>
            <template slot="label">Tiêu đề</template>
            <input type="text" slot="input" placeholder="Tiêu đề" v-model="business.english_name" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Slug</template>
            <input type="text" slot="input" placeholder="slug" v-model="business.slug" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">VN Slug</template>
            <input type="text" slot="input" placeholder="vnslug" v-model="business.vnslug" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Taxcode</template>
            <input type="text" slot="input" placeholder="tax id" v-model="business.tax_id" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Vietnamese</template>
            <input type="text" slot="input" placeholder="vietnamese" v-model="business.vietnamese_name" maxlength="100">
        </form-group>        
        <form-group>
            <template slot="label">Full Name</template>
            <input type="text" slot="input" placeholder="full name" v-model="business.full_name" maxlength="100">
        </form-group>        
        <form-group>
            <template slot="label">Abbreviated name</template>
            <input type="text" slot="input" placeholder="abbreviated name" v-model="business.abbreviated_name" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Employees</template>
            <input type="text" slot="input" placeholder="employees" v-model="business.employees" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Tel</template>
            <input type="text" slot="input" placeholder="tel" v-model="business.tel" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Fax</template>
            <input type="text" slot="input" placeholder="fax" v-model="business.fax" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Email</template>
            <input type="text" slot="input" placeholder="email" v-model="business.email" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Website</template>
            <input type="text" slot="input" placeholder="website" v-model="business.website" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Legal representative</template>
            <input type="text" slot="input" placeholder="legal representative" v-model="business.legal_representative" maxlength="100">
        </form-group>        
        <form-group>
            <template slot="label">VN legal representative</template>
            <input type="text" slot="input" placeholder="vn legal representative" v-model="business.vn_legal_representative" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Vietnamese address</template>
            <input type="text" slot="input" placeholder="vietnamese address" v-model="business.vietnamese_address" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">English address</template>
            <input type="text" slot="input" placeholder="english address" v-model="business.english_address" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Bank info</template>
            <input type="text" slot="input" placeholder="bank" v-model="business.bank_info" maxlength="100">
        </form-group>         
        <div class="btn-group">
            <button class="btn btn-large btn-main" @click="updateBusiness">Cập nhật</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { deepCopy } from '../../util/assist'

import FormGroup from '~/components/form/FormGroup'
import TagInput from '~/components/form/TagInput'
import ImageUpload from '~/components/form/ImageUpload'
import VueMarkdown from '~/components/form/VueMarkdown'
import PageHeader from '~/components/admin/PageHeader'

export default {
    props: ['businessId'],
    data() {
        return {
            business: {
                english_name: '',
                slug: '',
                vnslug: ''
                // tax_id: '',
                // vietnamese_name: '',
                // full_name: '',
                // abbreviated_name: '',
                // employees: '',
                // tel: '',
                // fax: '',
                // email: '',
                // website: '',
                // legal_representative: '',
                // vn_legal_representative: '',
                // vietnamese_address: '',
                // english_address: '',
                // bank_info: '',
                
                //updated: null
            },
            preview: false,
            //previewMarkdown: ''
        }
    },
    components: {
        FormGroup,
        TagInput,
        VueMarkdown,
        ImageUpload,
        PageHeader
    },
    created() {
        this.setBusiness(this.businessId)
    },
    watch: {
        businessId(val) {
            this.setBusiness(val)
        },
        preview() {
            if (this.preview) {
                //this.previewMarkdown = this.post.markdown
            }
        }
    },
    methods: {
        returnList() {
            this.$emit('updateView', 'BusinessList')
        },
        // addTag(tag) {
        //     axios.post('/api/post/tag/add', {
        //         postTag: {
        //             businessId: this.businessId,
        //             tagId: tag.id
        //         }
        //     }).then(res => {
        //         if (res.data.code !== 200) {
        //             console.error(data.message)
        //         }
        //         this.post.tags.push({
        //             postTagId: res.data.insertId,
        //             tagId: tag.id,
        //             name: tag.name
        //         })
        //     });
        // },
        // delTag(index) {
        //     axios.post("/api/post/tag/del", {
        //         postTagId: this.post.tags[index].postTagId
        //     }).then(res => {
        //         if (res.data.code !== 200) {
        //             console.error(res.data.message);
        //             return false
        //         }
        //         this.post.tags.splice(index, 1);
        //     }).catch((err) => {
        //         alert(err)
        //     });
        // },
        updateBusiness() {
            //console.log(this.business)
            let tempBiz = deepCopy(this.business);
            //delete tempPost.tags
            //console.log(tempBiz)
            axios.post('/api/business/update', {
                business: tempBiz
            }).then((res) => {
                if (res.data.code !== 200) {
                    console.error(res.data.message)
                    return false;
                }
                this.$emit('businessUpdated', this.business)
            }).catch((err) => {
                alert(err)
            });
        },
        // updateMarkdown() {
        //     let tempPost = {
        //         id: this.business.id,
        //         markdown: this.business.markdown
        //     }
        //     axios.post('/api/post/update', {
        //         business: tempPost
        //     }).then((res) => {
        //         if (res.data.code !== 200) {
        //             console.error(res.data.message)
        //             return false;
        //         }
        //     }).catch((err) => {
        //         alert(err)
        //     });
        // },
        setBusiness(businessId) {
            if (isNaN(businessId)) {
                return false;
            }
            axios.get(`/api/business/detail/${businessId}`).then((res) => {
                this.business = res.data.list[0]; console.log(this.business)
                 var date = new Date(this.business.registered_date)
                this.business.registered_date = date.toISOString().slice(0,10);
                 var date = new Date(this.business.established_date)
                this.business.established_date = date.toISOString().slice(0,10);

                this.business.updated_at = new Date().toISOString().slice(0,10);
                this.business.created_at = new Date().toISOString().slice(0,10);
            }).catch((err) => {
                alert(err)
            });
        }
    }
}
</script>

<style scoped>
.btn-group {
    padding: 40px 0 60px 60px;
}

.markdown {
    position: relative;
    width: 100%;
}

.markdown .btn {
    box-shadow: 0 0 3px rgba(100, 100, 100, 0.8);
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
    padding: 5px 10px;
}

.markdown textarea {
    padding: 5px 15px;
    display: block;
    height: 500px !important;
    width: 100%;
    border: 1px solid #ddd;
    resize: none;
}

.markdown textarea:focus {
    border-color: rgb(51, 204, 250);
}

.markdown>div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    overflow-y: auto;
    background: #f2f2f2;
    transition: width ease cubic-bezier(0.075, 0.82, 0.165, 1);
    padding: 10px 20px;
}
</style>
