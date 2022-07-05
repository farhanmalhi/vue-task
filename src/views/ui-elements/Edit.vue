<template>
   <Form
   v-if="show"
   :id="key"
   ></Form>
</template>

<script>
import Form from '../../components/ui/form/Form.vue'
  export default {
  name:"Edit",
  components: { Form },  
  data(){
    return{
      key:this.$route.params.id,
      show:true
    }
  },

  watch: {
       $route() {
      this.show=false;
      this.$nextTick(()=>{
        this.show=true;
      });
    }
  }
  }
</script>