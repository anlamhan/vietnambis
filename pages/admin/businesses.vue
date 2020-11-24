<template>  
    <div style="padding:10px">        
        <transition name="fade">
            <keep-alive>
                <component :ref="currView" :is="currView" :businessId="editBusinessId" v-on:updateView="updateView" v-on:editBusiness="editBusiness" v-on:businessSaved="businessSaved" v-on:businessUpdated="businessUpdated"></component>
            </keep-alive>
        </transition>
        <notifications  position="bottom left" :duration="600" ></notifications>
    </div>  
</template>

<script>
import BusinessList from '~/components/admin/BusinessList'
import EditBusiness from '~/components/admin/EditBusiness'
import NewPost from '~/components/admin/NewPost'

export default {
  name: 'businesses',
    layout: 'admin',
    data() {
        return {
            currView: 'BusinessList',
            editBusinessId: null
        }
    },
    components: {
        BusinessList,
        EditBusiness,
        NewPost
    },
    methods: {
        updateView(view) {
            this.$notify({
               type:'error',
                title: 'Kiem tra',
                text: 'notification Kiem tra'
            });
            this.currView = view
        },
        editBusiness(editBusinessId) {
            this.updateView('EditBusiness')
            this.editBusinessId = editBusinessId
        },
        businessSaved() {
            this.currView = 'BusinessList'
            this.$nextTick(() => {
                this.$refs['BusinessList'].refreshComponent(false)
                document.querySelector('.main').scrollTop = 0
            })
        },
        businessUpdated() {
            this.currView = 'BusinessList'
            this.$nextTick(() => {
                this.$refs['BusinessList'].refreshComponent(true)
            })
        }
    }
}

</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
