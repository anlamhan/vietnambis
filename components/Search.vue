<template><form action="/search?q='${}'" method="post">
  <div class="row">
    <div class="six columns">      
      <input class="u-full-width" type="text" placeholder="Business name or Tax ID" v-model="keyword" name="keyword" id="keyword">
      <div class="eg"><span>e.g. Vincom Retail, Truong Hai Auto, Bridgestone Tire...</span></div>
    </div>
    <div class="three columns">      
      <select class="u-full-width" id="province" v-model="province" name="province">
        <option value="all">All</option>
        <option v-for="province in provinces" v-bind:value="province.id" :key="province.id">{{province.province_name}}</option>
      </select>
    </div>
    <div class="two columns">
    <input class="button-primary" type="submit" value="Search" @click.stop.prevent="submit()">
    </div>
  </div>    
</form>
</template>
<script>
export default {
    props: {
        provinces: {
            type: Array,
            required: true
        }
    },
  data(){
      return {
        keyword : '',
        province:'all'
      }
    },
    methods: {
      submit(){         
         if(this.keyword !== null && this.keyword !== '') {                      
        
        this.$router.push("/search/"+this.keyword+"/"+this.province+"/0");
      }
      }
    }
}
</script>
<style>
  .eg{
    padding: 10px 0 0 10px;
    font-size: 12px;
  }
</style>