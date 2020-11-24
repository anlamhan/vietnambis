<template>
    <ul class="nav-list">
        <li class="nav-item"><nuxt-link to="/">Trang chủ</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/vn/doanh-nghiep">Tìm doanh nghiệp</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/vn/blog">Blog</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/vn/gioi-thieu">Giới thiệu</nuxt-link></li>        
        <li class="nav-item"><nuxt-link to="/vn/lien-he">Liên hệ</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/en">Tiếng Anh</nuxt-link></li>
    </ul>
</template>

<style scoped>

    .nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .nav-item {
        margin: 12px 10px;
    }

    .nav-item a {
        text-decoration: none;
        color: #fefefe;
    }

    .nav-item a:hover,
    .nav-item a:active{
        color: #b4b4b4;
    }

    @media (max-width: 767px) {
        .nav-list {
            display: block;
        }
        .nav-item{
            margin-top: 16px;
            margin-bottom: 16px;
        }
    }

    @media (min-width: 768px) {
        .nav-list {
            display: flex;
        }
    }

</style>