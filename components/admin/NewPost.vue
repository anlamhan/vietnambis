<template>
    <div>
        <page-header title="Tạo bài đăng blog mới">
            <button slot="handle" class="btn btn-main" @click="returnList">Danh sách</button>
        </page-header>
        <form-group>
            <template slot="label">Tiêu đề</template>
            <input type="text" slot="input" placeholder="Tiêu đề" v-model="post.title" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Slug</template>
            <input type="text" slot="input" placeholder="Slug" v-model="post.slug" maxlength="100">
        </form-group>
        <form-group>
            <template slot="label">Ảnh đại diện</template>
            <div slot="input">
                <input type="text" v-model="post.image">
                <image-upload :image="post.image"></image-upload>
            </div>
        </form-group>
        <form-group>
            <template slot="label">Tags</template>
            <tag-input slot="input" :tags="post.tags" v-on:delTag="delTag" v-on:addTag="addTag"></tag-input>
        </form-group>
        <form-group>
            <template slot="label">Giới thiệu</template>
            <textarea type="text" slot="input" placeholder="Giới thiệu" v-model="post.meta_description" maxlength="200"></textarea>
        </form-group>
        <form-group>
            <template slot="label">Nội dung</template>
            <div slot="input" class="markdown">
                <button class="btn btn-small btn-main" @click="preview = !preview">{{preview ? 'Biên tập' : 'Xem trước'}}</button>
                <textarea v-model="post.markdown"></textarea>
                <vue-markdown :markdown="previewMarkdown" v-show="preview"></vue-markdown>
            </div>
        </form-group>
        <div class="btn-group">
            <button class="btn btn-large btn-main" @click="savePost('published')">Xuất bản</button>
            <button class="btn btn-large btn-main" @click="savePost('draft')">Lưu tạm</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import FormGroup from '~/components/form/FormGroup'
import TagInput from '~/components/form/TagInput'
import ImageUpload from '~/components/form/ImageUpload'
import VueMarkdown from '~/components/form/VueMarkdown'
import PageHeader from '~/components/admin/PageHeader'

export default {
    components: {
        FormGroup,
        TagInput,
        VueMarkdown,
        ImageUpload,
        PageHeader
    },
    data() {
        return {
            post: {
                title: '',
                images: '',
                meta_description: '',
                markdown: '',
                status: '',
                tags: []
            },
            preview: false,
            previewMarkdown: ''
        }
    },
    watch: {
        preview() {
            if (this.preview) {
                this.previewMarkdown = this.post.markdown
            }
        }
    },
    methods: {
        returnList() {
            this.$emit('updateView', 'PostList')
        },
        addTag(tag) {
            this.post.tags.push(tag)
        },
        delTag(index) {
            this.post.tags.splice(index, 1);
        },
        savePost(status) {
            this.post.status = status
            axios.post('/api/post/add', {
                post: this.post
            }).then((res) => {
                if (res.data.code !== 200) {
                    console.error(res.data.message)
                    return false;
                }
                this.post = {
                    title: '',
                    images: '',
                    meta_description: '',
                    markdown: '',
                    status: '',
                    tags: []
                }
                this.$emit('postSaved')
            }).catch((err) => {
                alert(err)
            });
        }
    }
}
</script>

<style>
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
