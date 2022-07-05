<template>
  <div v-if="show">
    <div>
      <h4>Selected Building ({{this.buildingData.name}}) Map View</h4>
    </div>
    <br>
    <GmapMap
      :center='center'
      :zoom='6'
      style='width:100%;  height: 600px;'
      map-type-id="roadmap"
      
    >
      <GmapMarker
        :position="center"
        @click="center=center"
      />
       <gmap-info-window
        :options="{
          maxWidth: 300,
          pixelOffset: { width: 0, height: -35 }
        }"
        :position="center"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open=false">
        <div v-html="infoWindow.template"></div>
    </gmap-info-window>
      <gmap-polygon v-bind:path.sync="markers" v-bind:options="{ strokeColor:'#0000FF',strokeOpacity: 0.6, strokeWeight: 1}">
         </gmap-polygon>
    </GmapMap>
  </div>
</template>

<script>
import { mapState } from 'vuex';
 import countryGeo from "../../constants/countriesgeo.json";
export default {
  name: 'GoogleMap',
  data() {
    return {
      geoLocations:countryGeo,
      infoWindow: {
          open: true,
          template: ''
      },

      buildingData:null,
      selectedClient:JSON.parse(localStorage.getItem("selectedClientId")),
      show:false,
      center: { },
      currentPlace: null,
      markers: [],
      places: [],
    }
  },
  beforeMount(){
    this.mutateData();
  },  
  watch: {
       $route() {
        this.mutateData();
    }
  },
  methods:{
    findCenter(markers) {
    let lat = 0;
    let lng = 0;
    for(let i = 0; i < markers.length; ++i) {
        lat += markers[i].lat;
        lng += markers[i].lng;
    }
    lat /= markers.length;
    lng /= markers.length;
    return {lat: lat, lng: lng}
    },
    mutateData(){
      if(this.$route.params.id >=0){
      const building=this.buildings.filter(x=>x.id == this.$route.params.id );
      if(building.length>0){
      this.buildingData=building[0];
      this.countryLocation=this.geoLocations.features.filter(x=>x.id===this.buildingData.country)[0];
      this.countryLocation.geometry.coordinates[0].forEach(element => {
        // this.markers.push({position:{ lat: element[0], lng: element[1] }})
        this.markers.push({ lat: element[0], lng: element[1] });
        
        this.infoWindow.template=`${this.buildingData.name} Located in ${this.countryLocation.properties.name}`;
      });
      this.center=this.findCenter(this.markers);
      this.show = false
        this.$nextTick(() => {
          this.show = true
        });
  
      }
    }
    }
  },
  
  computed: {
    ...mapState(["buildings"]),
  },
};
</script>