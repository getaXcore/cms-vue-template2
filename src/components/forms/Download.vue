<template>
     <JsonExcel
        class=" hover:cursor-pointer border p-2 border-slate-300 rounded-md"
        :data="json_data"
        :fields="json_fields"
        :worksheet="worksheet_name"
        :name="file_name"
        :type="file_type"
    >
        <div class="flex flex-row">
            <div class=" basis-auto">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-slate-500 stroke-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </div>
            <div class=" basis-auto ml-2"><label class=" hover:cursor-pointer">DOWNLOAD</label></div>
        </div>
    </JsonExcel>
        
   
</template>
<script>
import JsonExcel from 'vue-json-excel3'
export default{
    props:{
        json_data: Object,
        json_fields: Object,
        file_name: String,
        file_type: String,
        worksheet_name: String
    },
    components:{
        JsonExcel,
    }
    
}
</script>