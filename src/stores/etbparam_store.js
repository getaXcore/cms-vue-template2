import { defineStore } from "pinia";
import { GetEtbParams, setForInsertEtbParam, setForDeleteEtbParam, setForUpdateEtbParam, InsertEtbParam, UpdateEtbParam, DeleteEtbParam } from "../repository/repository";
import { MoneyFormat } from './../utils/MoneyFormat'

export const etbparamStore = defineStore('params',{
    state: () => ({
        params : {
            status: 0,
            message: '',
            datas: []
        },
        loader: false
    }),
    actions: {
        $reset(){
            this.$state.params.datas = []
        },
        async fetchParams(){
            try {
                this.$state.loader = true

                const getParams =  GetEtbParams.pipe()
                getParams.subscribe({
                    next: (data) => {
                            
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            const datas = data.datas.map((value,index) => {
                                if(value.initial_deposit){
                                    value.initial_deposit = MoneyFormat(value.initial_deposit)
                                }
    
                                return value
                            })
                            this.$state.params.datas = datas
                        }else{
                            this.$reset()
                        }

                        
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: ()=>{this.$state.loader = false}})
            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
            
        },
        insertParam(obj,statusId,userName){
            try {
                const deposit = (obj.minDeposit).replace(',','')
                setForInsertEtbParam(obj.productCode,obj.descriptionId,obj.descriptionEn,obj.maxAccount,deposit,statusId,userName)
                const insert = InsertEtbParam.pipe()
                insert.subscribe({
                    next: (data) =>{
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            this.fetchParams()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: () =>{}
                })   

            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
        },
        updateParam(obj,statusId,userName){
            try {
                const deposit = (obj.minDeposit).replace(',','')
                setForUpdateEtbParam(obj.productId,obj.productCode,obj.descriptionId,obj.descriptionEn,obj.maxAccount,deposit,statusId,userName)
                const update = UpdateEtbParam.pipe()
                update.subscribe({
                    next: (data) =>{
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            this.fetchParams()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: () =>{}
                })
                
            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
        },
        deleteParam(productId){
            try {
                setForDeleteEtbParam(productId)
                const deleted = DeleteEtbParam.pipe()
                deleted.subscribe({
                    next: (data) =>{
                        this.$state.params.status = data.status
                        this.$state.params.message = data.message
                        if(data.status === 200){
                            this.fetchParams()
                        }
                    },
                    error: (e) => {
                        console.log(e)
                        this.$state.params.message = e
                    },
                    complete: () =>{}
                })
            } catch (error) {
                console.log(error.messages)
                this.$state.params.message = error.message
            }
        }
    }
})