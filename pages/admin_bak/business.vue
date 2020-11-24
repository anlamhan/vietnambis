<template>
    <div>        
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
.post-form {
    position: absolute;
    top: 0;
    right: 0;
    left: 360px;
    bottom: 0;
    padding: 20px;
    overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
