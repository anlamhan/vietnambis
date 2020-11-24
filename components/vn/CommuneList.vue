<template>
    <ul name="list" tag="section" class="list-right">
        <li v-for="commune in communes" :key="commune.id">            
            <a :href="`https://vietnambis.com/vn/xa/${commune.slug}`+`-`+`${commune.id}`">{{ commune.vietnamese_name }}</a>            
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        communes: {
            type: Array,
            required: true
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
