<template>
    <div class="md:container mx-auto">
      <ShowAlert :message="message" :components="components" :variant="variant"></ShowAlert>
      <Form_A class=" pb-24" :submit="onSubmit" :reset="onReset" v-model:startdateValue="StartDate" v-model:enddateValue="EndDate"></Form_A>
      <Table_A :StartDate="StartDate" :EndDate="EndDate" :__currentPage="currentPage"></Table_A>
    </div>
  </template>
  <script>
  import Table_A from './tables/Table_A.vue';
  import Form_A from './forms/Form_A.vue';
  import ShowAlert from './alerts/ShowAlert.vue';
  import {mbmpStore} from '../stores/mbmp_store';
import ShowPaginate from './pagination/ShowPaginate.vue';
  
  export default{
    components: {
    Table_A, Form_A, ShowAlert,
    ShowPaginate
},
    setup(){
      const store = mbmpStore()
      return{
        store
      }
    },
    data(){
      return{
        StartDate: '',
        EndDate: '',
        components: [],        
        currentPage: 1,
        perPage: 5,
        variant: '',
      }
    },
    methods: {
      onSubmit(){
        //destroy old element, create a new one with a new value for alert
        this.forceRerender();

        //validation of startdate and enddate
        if (this.EndDate < this.StartDate || this.StartDate > this.EndDate) {
        //     //change the message from store
            this.setMessage('Tanggal Akhir harus lebih besar dari Tanggal Awal')
            this.variant = 'warning'
        }
        else if (this.StartDate.length < 1 || this.EndDate.length < 1) {
        //     //change the message from store
            this.setMessage('Tanggal Awal ataupun Tanggal akhir wajib diisi')
            this.variant = 'warning'
        }else{
            this.fetchHistory
            this.fetchDownload

            this.variant = 'info'
        }
  
      },
      onReset(){
        this.StartDate = '',
        this.EndDate = ''
      },
      forceRerender() { //for alert
        //add new component with id for triggering
        this.components.push({
            id: 0
        })
      },
      setMessage(message){
        this.store.history.message = message
      },
    },
    computed: {
      fetchHistory(){
        return this.store.fetchHistory(this.currentPage - 1, this.perPage, this.StartDate, this.EndDate)
      },
      fetchDownload(){
        return this.store.fetchDownload(this.StartDate, this.EndDate)
      },
      message(){
        return this.store.history.message
      },
    },
    watch:{
      currentPage: {
        handler: function(val){
          this.fetchHistory
        }
      }
    }
  }
  </script>