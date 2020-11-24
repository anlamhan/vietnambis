<template><form action="/vn/ket-qua?q='${}'" method="post">
  <div class="row">
    <div class="six columns">      
      <input class="u-full-width" type="text" placeholder="Tên công ty hoặc mã số thuế" v-model="keyword" name="keyword" id="keyword">
    </div>
    <div class="three columns">      
      <select class="u-full-width" id="province" v-model="province" name="province">
        <option value="all">Tất cả</option>
        <option v-for="province in provinces" v-bind:value="province.id" :key="province.id">{{province.vietnamese_name}}</option>
      </select>
    </div>
    <div class="two columns">
    <input class="button-primary" type="submit" value="Tìm kiếm" @click.stop.prevent="submit()">
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
        
        this.$router.push("/vn/ket-qua/"+this.keyword+"/"+this.province+"/0");
      }
      }
    }
}
</script>