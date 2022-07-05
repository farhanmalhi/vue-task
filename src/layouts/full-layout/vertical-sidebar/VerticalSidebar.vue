<template>
  <aside
    class="left-sidebar"
    :class="
      Sidebar_drawer ? `show-sidebar bg-white` : `bg-white`
    "
  >
    <div class="bg-secondary navbar-header" style="padding:10px" >
       <model-list-select :list="clients"
                     v-model="selectedClient"
                     option-value="id"
                     option-text="name"
                     >
  </model-list-select>
    </div>
    <div class="scrlbar">
      <ul class="nav flex-column mb-0">
        <template v-for="(building) in buildingData">
          <!---Single Menu -->
          <li class="nav-item"  :key="building.id">
            <div class="nav-link d-flex justify-content-between" :class="building.id == $route.params.id ? 'router-link-exact-active' : ''">
              <div @click="$router.push(`/map/${building.id}`).catch(()=>{})">
                <i class="mdi mdi-hospital-building"></i>
                <span class="hide-text">{{ building.name }}</span>
              </div>
              <div>
                <i class="mdi mdi-tooltip-edit" @click="$router.push(`/edit/${building.id}`).catch(()=>{})"></i>
                <i class="mdi mdi-delete" @click="showModal(building)"></i>
              </div>
            </div>
          </li>
        </template>
      </ul>
    <div class="text-center px-3">
        <b-button
          target="_blank"
          variant="info"
          block
          @click="$router.push(`/add`).catch(()=>{})"
          >Add Building</b-button
        >
      </div>  
    </div>
    
    <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Delete"
      @hidden="hideModal"
      @ok="handleOk"
    >
      <p>Are you sure you want to delete?</p>
    </b-modal>
  </div>
  </aside>
  
</template>

<script>
// import LogoDark from "../logo-dark/LogoDark";
import { mapActions, mapState } from "vuex";
 import { ModelListSelect } from 'vue-search-select';

export default {
  name: "VerticalSidebar",
  // components: {
  //   LogoDark,
  // },
  components: {
      ModelListSelect
    },
  data: () => ({
    clients:JSON.parse(localStorage.getItem("clients")),
    selectedClient:JSON.parse(localStorage.getItem("selectedClientId")),
    initialShow: true,
    buildingD:null,

  }),
  computed: {
    ...mapState(["logoColor", "Sidebar_drawer", "SidebarColor","buildings"]),
    check() {
      return console.log(this.$router.history.current);
    },
    buildingData(){
      return this.buildings.filter(x=>x.clientId===this.selectedClient);
    }
  },
  methods: {
    ...mapActions([
      'deleteBuilding'
    ]),
    showModal(data) {
        this.buildingD=data;
        this.$nextTick(() => {
          this.$bvModal.show('modal-prevent-closing')
        })
      },
      hideModal() {
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        });
      },
      handleOk(){
        this.deleteBuilding(this.buildingD);
        this.hideModal();
        this.$bvToast.toast("Building deleted Sucessfully", {
          title: `Success`,
          variant: "success",
          solid: true
        });
      },
    showMobileSidebar() {
      this.$store.commit("SET_SIDEBAR_DRAWER", false);
    },
  },
   watch: {  
     selectedClient: function(value) {
        localStorage.setItem("selectedClientId",JSON.stringify(value));
      }
  },
};
</script>

<style scoped>

</style>