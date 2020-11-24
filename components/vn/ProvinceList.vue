<template>
    <ul name="list" tag="section" class="list-right">
        <li v-for="province in provinces" :key="province.id">            
            <a :href="`https://vietnambis.com/vn/tinh-thanh/${province.slug}`+`-`+`${province.id}`">{{ province.vietnamese_name }}</a>            
        </li>
    </ul>    
</template>

<script>
export default {
    props: {
        provinces: {
            type: Array,
            default: () => [],
        }
    }
}
</script>

<style scoped>
.list-right
{
}
.list-right li {
    border-bottom: 1px solid #ececec;
    margin: 10px 0 10px 0;
    padding: 0px 0px 10px 0;
}
</style>
