<template>
    <ul name="list" tag="section" class="list-right">
        <li v-for="district in districts" :key="district.id">            
            <a :href="`https://vietnambis.com/district/${district.slug}`+`-`+`${district.id}`">{{ district.full_district_name }}</a>            
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        districts: {
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
