<template>
    <b-card class="mt-3">
    <h3 v-if="edit">Edit Building</h3>  
    <h3 v-else>Add Building</h3>
    <hr class="my-4">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Enter Building Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Location:" label-for="input-2" :description="error">
        <model-list-select :list="options"
                     v-model="form.country"
                     option-value="id"
                     option-text="name"
                     placeholder="Select Country">
  </model-list-select>
      </b-form-group>

      <b-button type="submit" variant="primary">
        <span >Submit</span>
         <b-spinner v-if="spinner" class="ml-1" small></b-spinner>
      </b-button>
      <b-button type="reset" class="ml-3" variant="danger">Reset</b-button>
    </b-form>
    </b-card>
</template>

<script>
 import { ModelListSelect } from 'vue-search-select';
 import countryList from "../../../constants/countriesList.json";
import { mapActions } from 'vuex';
import { mapState } from "vuex";
  export default {
       components: {
      ModelListSelect
    },
    props:["id"],
    data() {
      return {
        buildingId:this.$route.params.id || this.id,
        options: countryList,
        edit:false,
        selectedClient:JSON.parse(localStorage.getItem("selectedClientId")),
        spinner:false,
        form: {
          name: '',
          country:null
        },
        error:"",
        show: true
      }
    },
    beforeMount:function(){
      this.buildingId=this.$route.params.id;
      if(this.buildingId >=0){
        this.edit=true;
      const building=this.buildings.filter(x=>x.id==this.buildingId && this.selectedClient === x.clientId);
      if(building.length>0){

      this.form.country=building[0].country;
      this.form.name=building[0].name;
      this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
  
      }else{
        this.makeToast("Information","info","Please add new Building.");
        this.makeToast("Error","danger","Building id not found for this client!");
        this.edit=false;       
      }
      }
    },
    computed: {
    ...mapState(["buildings"]),
  },
    methods: {
      ...mapActions([
      'addBuulding','editBuilding'
    ]),
        makeToast(title,variant = null,message) {
        this.$bvToast.toast(message, {
          title: `${title}`,
          variant: variant,
          solid: true
        })
      },
      onSubmit(event) {
        event.preventDefault()
        if(!this.form.country){
          this.error="Please Select Country";
          return;
        }else{
          this.error=null;
        }
        if(this.spinner){
          return;
        }
        this.spinner=true;
        
        if(this.edit){

          setTimeout(()=>{
            this.makeToast("Success","success","Building updated sucessfullty!");
            this.editBuilding({...this.form,id:this.buildingId});
            this.spinner=false;
          },1000);
        }else{
          setTimeout(()=>{
            this.makeToast("Success","success","Building added sucessfullty!");
            this.addBuulding({...this.form,clientId:JSON.parse(localStorage.getItem("selectedClientId"))});
            this.spinner=false;
            this.form.name = '';
            this.form.country = null;
            this.show = false
            this.$nextTick(() => {
              this.show = true
            });
          },1000);
          
        }
        
      },
      onReset(event) {
        event.preventDefault()
        this.form.name = ''
        this.form.country = null
        this.show = false
        this.$nextTick(() => {
          this.show = true
        });
      }
    }
  }
</script>
