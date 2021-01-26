<template>
    <div><input name="keyword" v-model="keyword" id="keyword" /> <button slot="handle" class="btn btn-main" @click="search">Search</button>
        <page-header title="Listing">            
            <button slot="handle" class="btn btn-main" @click="addNewPost">New Post</button>
        </page-header>
        <article v-for="(biz, index) in businesses" :key="biz.id">
            <a href="javascript:;" @click="editBusiness(biz.id)">{{ biz.english_name }}</a>
            <div class="btn-group">
                <a href="javascript:;" class="btn btn-small btn-danger" @click="updateStatus(index,'offline')" v-if="biz.is_public == '1'">Xuất bản</a>
                <a href="javascript:;" class="btn btn-small btn-danger" @click="updateStatus(index,'published')" v-if="biz.is_public == '0'">Tái xuất bản</a>
                <a href="javascript:;" class="btn btn-small btn-danger" @click="updateStatus(index,'published')" v-if="biz.is_public == ''">Chính thức phát hành</a>
                <nuxt-link target="_blank" class="btn btn-small btn-main" :to="'/post/'+biz.id">Xem trước</nuxt-link>
            </div>
        </article>
        <!-- <vue-page :total="count" :page="page" model="button" v-on:pageChange="getPageList" class="vue-page"></vue-page> -->
        <pagination :total="count" :currentPage="page" :totalPages="1000" @pagechanged="onPageChange"></pagination>
    </div>
</template>

<script>
import axios from 'axios'

import VuePage from '~/components/VuePage'
import Pagination from '~/components/Pagination.vue'
import PageHeader from '~/components/admin/PageHeader'

export default {
    data() {
        return {
            businesses: [],
            currPost: 0,
            count: 0,
            page: 0,
            keyword : ''
        }
    },
    created() {
        this.getPageList(0)
        axios.get('/api/business/count/all').then(res => {
            this.count = res.data.result
        })
    },
    components: {
        VuePage,
        PageHeader,
        Pagination
    },
    methods: {
        refreshComponent(isSaveCurrPage) {
            if (isSaveCurrPage) {
                this.getPageList(this.page)
            } else {
                this.getPageList(0)
            }
        },
        addNewPost() {
            this.$emit('updateView', 'NewPost')
        },
        editBusiness(businessId) {
            console.log(businessId)
            this.$emit('editBusiness', businessId);
        },
        getPageList(page) {
            axios.get(`/api/business/page/${page}`).then(res => {
                this.businesses = res.data.list;
                this.currPost = this.businesses[0];
                this.page = page;
                this.$emit('currPostChange', this.businesses[0])
            })
        },
        search(keyword, page) {
            axios.get(`/api/business/search/${this.keyword}`).then(res => {
                this.businesses = res.data.list;
                this.currPost = this.businesses[0];
                //this.page = page;
                this.$emit('currPostChange', this.businesses[0])
            })
        },
        handlePostFormUpdate(newPost) {
            this.currPost.title = newPost.title;
            this.currPost.status = newPost.status;
        },
        updateStatus(index, newStatus) {
            axios.post('/api/post/update', {
                business: {
                    id: this.businesses[index].id,
                    status: newStatus
                }
            }).then((res) => {
                this.businesses[index].is_public = newStatus;
            }).catch((err) => {
                alert(err)
            });
        },
        onPageChange(page) {         
            this.page = page;
            this.getPageList(page)
        }
    }
}
</script>

<style scoped>
article {
    margin: 20px 0;
    padding: 10px;
    box-shadow: 0 0 15px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .1);
    transition: all ease 0.12s;
}

article:hover {
    box-shadow: 0 0 15px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, 0.15);
}

article a {
    margin-bottom: 10px;
    color: #333;
    font-size: 16px;
    transition: all ease .1s;
}

article.curr a {
    color: #1b8afa;
}

article .btn-group {
    text-align: right;
    padding: 10px 0 0 0;
}

article .btn-group a {
    font-size: 14px;
    color: #fff;
}

.vue-page {
    padding: 20px 0;
}
</style>
