import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Sidebar_drawer: false,
    LayoutType: "full-sidebar",
    SidebarColor: "white",
    navbarColor: "primary",
    logoColor: "white",
    buildings:[
      {id:1,name:"Building 1",clientId:1,country: "ALB"},
      {id:2,name:"Building 2",clientId:1,country: "BDI"},
      {id:3,name:"Building 3",clientId:1,country: "BGR"},
      {id:4,name:"Building 4",clientId:2,country: "CMR"},
      {id:5,name:"Building 5",clientId:2,country: "BLZ"},
      {id:6,name:"Building 6",clientId:2,country: "DZA"},
      {id:7,name:"Building 7",clientId:3,country: "GUY"},
      {id:8,name:"Building 8",clientId:3,country: "HTI"},
      {id:9,name:"Building 9",clientId:3,country: "IND  "},
    ]
  },
  mutations: {
    SET_LAYOUT_TYPE(state, payload) {
      state.LayoutType = payload;
    },
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    

  },
  actions: {
    setLayoutType({ commit }, width) {
      commit("SET_LAYOUT_TYPE", width);
    },
    addBuulding({ state }, body) {
      state.buildings=[...state.buildings,{...body,id:state.buildings[state.buildings.length-1].id++}];
    },
    editBuilding({ state }, body) {
      let temp=state.buildings;
      temp.forEach(x=>{
        if(x.id==body.id){
          x.name=body.name;
          x.country=body.country;
          return;
        }
      });
      state.buildings=temp;
    },
    deleteBuilding({ state }, body) {
      let temp=state.buildings;
      temp=temp.filter(x=>x.id!==body.id);
      state.buildings=temp;
    },
    
  },
  getters: {
  
  },
});
