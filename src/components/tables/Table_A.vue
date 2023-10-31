<template>
    <div class=" p-20" v-show="isShow">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" stroke-blue-600 animate-spin w-6 h-6 mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        <lable class="font-semibold text-sky-600 mx-auto">Processing...</lable>
    </div>
    <div v-if="isLength > 0">
        <div class="flex flex-row border-b-2 border-slate-100 pb-3 mb-2">
            <div class="basis-7 text-left">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-red-500 stroke-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                </svg>
            </div>
            <div class="basis-11/12 text-left max-md:basis-8/12"><label class=" text-red-500 font-bold">RESULT</label></div>
            <div class="basis-auto text-right">
                <Download :json_data="rowsDownload" :json_fields="jsonFields" :file_name="fileName" :file_type="fileType" :worksheet_name="worksheetName"></Download>
            </div>
        </div>
        <div class="flex flex-row py-2">
            <div class="basis-9/12 text-left ">
                <select class="form-select rounded-md text-sm" v-model="pageO" @change="showBySelectedOpt" >
                    <option v-for="p in pageOptions">{{ p }}</option>
                </select>
                <label>&nbsp;Per page</label>
            </div>
            <div class="basis-auto text-right ml-9 max-md:ml-0">
                <div class="flex fliex-row  max-md:flex-col">
                    <div class="basis-10"><label>Filter&nbsp;</label></div>
                    <div class="basis-10"><input type="text" placeholder="Type to Search" class="form-input rounded-md text-sm" v-model="searchP" @keyup="searchMore"></div>
                    <div class="bass-10"><button class=" border rounded-md border-slate-400 p-1.5 w-uto bg-slate-400 text-white hover:bg-slate-500 hover:border-slate-500" @click="clearTheFilter">Clear</button></div>
                </div>
            </div>
        </div>
        <div class="flex flex-row text-sm">
            <div class="basis-auto overflow-x-auto">
                <table class="table-auto mx-auto">
                    <thead>
                        <tr>
                            <th class=" border border-slate-200 p-2 bg-slate-100 text-slate-600 hover:bg-slate-200" v-for="item in fields">{{ item }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="hover:bg-slate-200" v-for="(item, index) in _items.length>0?_items:items">
                            <td class="border border-slate-200">{{ (perPage*(currentPage -1)) + (index + 1) }}</td>
                            <td class="border border-slate-200">{{ item.account_number }}</td>
                            <td class="border border-slate-200">{{ item.fullname }}</td>
                            <td class="border border-slate-200">{{ item.phone }}</td>
                            <td class="border border-slate-200">{{ item.email }}</td>
                            <td class="border border-slate-200">{{ item.mother_maid_name }}</td>
                            <td class="border border-slate-200">{{ item.id_type }}</td>
                            <td class="border border-slate-200">{{ item.id_number }}</td>
                            <td class="border border-slate-200">{{ item.birth_date }}</td>
                            <td class="border border-slate-200">{{ item.birth_city }}</td>
                            <td class="border border-slate-200">{{ item.gender }}</td>
                            <td class="border border-slate-200">{{ item.address }}</td>
                            <td class="border border-slate-200">{{ item.address_area }}</td>
                            <td class="border border-slate-200">{{ item.nationality }}</td>
                            <td class="border border-slate-200">{{ item.occupation }}</td>
                            <td class="border border-slate-200">{{ convertDate(item.createdDate) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <ShowPaginate :total-pages="totalPages" :total="totalItems" :per-page="perPage" :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore"></ShowPaginate>
</template>
<script>
import { mbmpStore } from '../../stores/mbmp_store';
import Download from '../forms/Download.vue';
import LocalDate from '../../utils/LocalDate'
import ShowPaginate from '../pagination/ShowPaginate.vue';

export default{
    components:{
        Download, ShowPaginate
    },
    setup(){
        const store = mbmpStore()
        return{
            store
        }
    },
    props: {
        StartDate: String,
        EndDate: String,
        __currentPage: Number
    },
    data(){
        return{
            fields: ['No','No. rekening','Nama','No. HP','Email','Nama Ibu Kandung','Tipe ID Card','NIK','Tanggal Lahir','Tempat Lahir','Gender','Alamat','Kelurahan','Kewarganegaraan','Pekerjaan','Created At'],
            pageOptions: [5, 10, 25, 50, 100],
            searchP: '',
            pageO: 5,
            currentPage: this.__currentPage,
            perPage: 5,
            page: 1,
            hasMorePages: true,
            _items: [],
            jsonFields: {
                "No. rekening": "account_number",
                Nama: "fullname",
                "No. HP": "phone",
                Email: "email",
                "Nama Ibu Kandung": "mother_maid_name",
                "Tipe ID Card": "id_type",
                NIK: "id_number",
                "Tanggal Lahir": "birth_date",
                "Tempat Lahir": "birth_city",
                Gender: "gender",
                Alamat: "address",
                Kelurahan: "address_area",
                Kewarganegaraan: "nationality",
                Pekerjaan: "occupation",
                "Created At": "created_date"
            },
            fileName: "historyMBxMP",
            fileType: "xlsx",
            worksheetName: "Sheet1",
        }
    },
    methods: {
        convertDate(date){
            return LocalDate(date)
        },        
        showMore(page) {
            this.page = page;
            this.currentPage = page;  
            this.fetchHistory
        },
        showBySelectedOpt(){
            this.currentPage = this.curPage===0?1:this.curPage
            this.fetchHistory
        },
        searchMore(){
            if(this.searchP.length > 0){
                for (let i=0; i < this.isLength; i++) {
                    if( //search by includes
                        (this.items[i].fullname.toLowerCase()).includes(`${this.searchP}`) === true || (this.items[i].fullname.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].fullname.includes(`${this.searchP}`) === true ||
                        this.items[i].account_number.includes(`${this.searchP}`) === true ||
                        this.items[i].phone.includes(`${this.searchP}`) === true ||
                        (this.items[i].email.toLowerCase()).includes(`${this.searchP}`) === true ||  (this.items[i].email.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].email.includes(`${this.searchP}`) === true ||
                        (this.items[i].mother_maid_name.toLowerCase()).includes(`${this.searchP}`) === true || (this.items[i].mother_maid_name.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].mother_maid_name.includes(`${this.searchP}`) === true ||
                        this.items[i].id_number.includes(`${this.searchP}`) === true ||
                        this.items[i].birth_date.includes(`${this.searchP}`) === true ||
                        (this.items[i].birth_city.toLowerCase()).includes(`${this.searchP}`) === true || (this.items[i].birth_city.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].birth_city.includes(`${this.searchP}`) === true ||
                        (this.items[i].gender.toLowerCase()).includes(`${this.searchP}`) === true || (this.items[i].gender.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].gender.includes(`${this.searchP}`) === true ||
                        (this.items[i].address.toLowerCase()).includes(`${this.searchP}`) === true || (this.items[i].address.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].address.includes(`${this.searchP}`) === true ||
                        (this.items[i].address_area.toLowerCase()).includes(`${this.searchP}`) === true || (this.items[i].address_area.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].address_area.includes(`${this.searchP}`) === true ||
                        (this.items[i].occupation.toLowerCase()).includes(`${this.searchP}`) === true || (this.items[i].occupation.toUpperCase()).includes(`${this.searchP}`) === true || this.items[i].occupation.includes(`${this.searchP}`) === true
                    )
                    { 
                        this._items.splice(0,this._items.length,this.items[i]) //remove array list from first index and add new item                        
                    }
                }

            }else{
                //remove all values of array list
                this._items.splice(0,this._items.length)
            }
        },
        clearTheFilter(){
            this.searchP = ''
            this._items.splice(0,this._items.length) //remove all values of array list
        },
    },
    computed:{
        isShow(){
            return this.store.loader
        },
        isLength(){
            return this.store.history.datas.content.length
        },
        rowsDownload(){
            return this.store.donwload.datas.rows
        },
        fetchHistory(){
            this.perPage = this.pageO?this.pageO:this.perPage
            return this.store.fetchHistory(this.currentPage - 1, this.perPage, this.StartDate, this.EndDate)
        },
        items(){
            return this.store.history.datas.content            
        },
        totalItems(){
            return this.store.history.datas.totalItems
        },
        totalPages(){
            return Math.ceil(this.totalItems / this.perPage)
        },
        curPage(){
            return this.store.history.datas.currentPage
        }
    },
}
</script>