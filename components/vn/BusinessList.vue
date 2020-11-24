<template>
    <transition-group name="list" tag="section">
        <article v-for="business in businesses" :key="business.id">            
            <a :href="`https://vietnambis.com/vn/${business.vnslug}-${business.id}.html`">{{ business.full_name }}</a>
            <div class="desc">Mã số thuế: <a :href="`https://vietnambis.com/vn/${business.vnslug}-${business.id}.html`">{{business.tax_id}}</a></div>
            <div class="desc">Địa chỉ: {{business.vietnamese_address}}</div>            
        </article>
    </transition-group>    
</template>

<script>
export default {
    props: {
        businesses: {
            type: Array,
            default: () => [],
        }
    }
}
</script>

<style scoped>
article {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(50, 50, 93, .15), 0 1px 2px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
}

article .poster {
    background: rgba(38, 50, 56, 0.95) no-repeat center / cover;
    height: 480px;
    width: 100%;
    transition: all ease-in 0.5s;
}

article>a {    
    font-size: 20px;
    line-height: 36px;
    margin: 10px 20px 5px 20px;
    display: inline-block;
}

article a:hover {
    text-decoration: underline;
}

article .desc {
    padding: 0 20px 10px 20px;
    font-size: 14px;
    line-height: 24px;
    color: #555;
}
@keyframes fade-in {
    0% {
        display: none;
        opacity: 0;
    }
    5% {
        display: black;
        opacity: 0;
        transform: translateY(3000px)
    }
    100% {
        opacity: 1;
        transform: translateY(0)
    }
}

@keyframes fade-out {
    0% {
        display: block;
        opacity: 1;
    }
    100% {
        display: none;
        opacity: 0;
    }
}

@media screen and (max-width: 1400px) {
   
}

@media screen and (max-width: 1200px) {
   
}

@media screen and (max-width: 960px) {
    article {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
        margin-bottom: 20px;
    }    
    article>a {
        margin: 10px 10px 5px 10px;
        font-size: 18px;
        line-height: 26px;
        color: #3084bb;
    }
    article .desc {
        font-size: 14px;
        line-height: 20px;
        padding: 0 10px 5px 10px;
        color: #666;
    }    
}

@media screen and (max-width: 640px) {
    /* article .poster {
        height: 160px;
    } */
}

@media screen and (max-width: 480px) {
    /* article .poster {
        height: 130px;
    } */
}
</style>
