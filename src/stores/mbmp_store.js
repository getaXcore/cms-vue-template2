import { defineStore } from "pinia";
import { GetHistoryBundlingMBMP, setForGetHistoryBundlingMBMP, DownloadHistoryBundlingMBMP, setForDownloadHistoryBundlingMBMP } from "../repository/repository.js";

export const mbmpStore = defineStore('history',{
    state: () => ({
        history: {
            status: 0,
            message: "",
            datas: {
                totalItems: 0,
                totalPages: 0,
                currentPage: 0,
                content: [],
            }
        },
        donwload: {
            status: 0,
            message: "",
            datas: {
                count: 0,
                rows: []
            }
        },
        loader: false,
    }),
    actions: {
        $reset(){
            this.$state.history.datas.totalPages = 0
            this.$state.history.datas.totalItems = 0    
            this.$state.history.datas.currentPage = 0
            this.$state.history.datas.content = []
            this.$state.donwload.datas.count = 0
            this.$state.donwload.datas.rows = []
        },
        async fetchHistory(page, size, start_date, end_date){
            try {
                this.$state.loader = true

                setForGetHistoryBundlingMBMP(start_date,end_date,page,size)
                const getDataHistory = GetHistoryBundlingMBMP.pipe()

                getDataHistory.subscribe({
                    next: (data) => {
                        
                        this.$state.history.status = data.status
                        this.$state.history.message = data.message
                        if(data.status === 200){
                            this.$state.history.datas.totalPages = data.datas.totalPages
                            this.$state.history.datas.totalItems = data.datas.totalItems    
                            this.$state.history.datas.currentPage = data.datas.currentPage
                            this.$state.history.datas.content = data.datas.content
                        }else{
                            this.$reset()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.history.message = e
                    },
                    complete: ()=>{this.$state.loader = false}

                })

            } catch (error) {
                console.log(error.messages)
                this.$state.history.message = error.message
            }
        },
        async fetchDownload(start_date, end_date){
            try {
                setForDownloadHistoryBundlingMBMP(start_date, end_date)
                const downloadHistory = DownloadHistoryBundlingMBMP.pipe()

                downloadHistory.subscribe({
                    next: (data) => {
                        
                        this.$state.donwload.status = data.status
                        this.$state.donwload.message = data.message
                        if(data.status === 200){
                            this.$state.donwload.datas.count = data.datas.count
                            this.$state.donwload.datas.rows = data.datas.rows
                        }else{
                            this.$reset()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                    },
                    complete: ()=>{}
                })
                
            } catch (error) {
                console.log(error.messages)
            }
        }
    },
})