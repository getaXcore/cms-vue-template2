import { Observable } from "rxjs";
import { 
    GET_HISTORY_BUNDLING_MB_MP, DOWNLOAD_HISTORY_BUNDLING_MB_MP,
    GET_ETB_PARAM, INSERT_ETB_PARAM, UPDATE_ETB_PARAM, DELETE_ETB_PARAM 
} from "../config/config";
import { mbmpService } from "../service/bundling_mbmp";
import { etbParamService } from "../service/etb_param";

var startDateVal = ""
var endDateVal = ""
var pageVal = ""
var sizeVal = ""

var productIdVal = ""
var productCodeVal = ""
var productDescIdVal = ""
var productDescEnVal = ""
var maxAccountVal = ""
var initDepositVal = ""
var statusIdVal = ""
var createdByVal = ""
var modifiedByVal = ""

export const setForGetHistoryBundlingMBMP = (start_date, end_date, page, size) => {
    startDateVal = start_date,
    endDateVal = end_date,
    pageVal = page,
    sizeVal = size
}

export const setForDownloadHistoryBundlingMBMP = (start_date, end_date) => {
    startDateVal = start_date,
    endDateVal = end_date
}

export const setForInsertEtbParam = (product_code, product_desc_id, product_desc_en, max_account, init_deposit, status_id, created_by) =>{
    productCodeVal = product_code,
    productDescIdVal = product_desc_id,
    productDescEnVal = product_desc_en,
    maxAccountVal = max_account,
    initDepositVal = init_deposit,
    statusIdVal = status_id,
    createdByVal = created_by
} 

export const setForUpdateEtbParam = (product_id, product_code, product_desc_id, product_desc_en, max_account, init_deposit, status_id, modified_by) =>{
    productIdVal = product_id
    productCodeVal = product_code,
    productDescIdVal = product_desc_id,
    productDescEnVal = product_desc_en,
    maxAccountVal = max_account,
    initDepositVal = init_deposit,
    statusIdVal = status_id,
    modifiedByVal = modified_by
}

export const setForDeleteEtbParam = (product_id) => {
    productIdVal =  product_id
}

export const GetHistoryBundlingMBMP = new Observable((observer) => {
    mbmpService({
        url: GET_HISTORY_BUNDLING_MB_MP,
        data: {
            "date_start": startDateVal,
            "date_end": endDateVal
        },
        params: {
            "page": pageVal,
            "size": sizeVal
        }
    }).then(function(response){
        observer.next(response.data);
        observer.complete();
    }).catch(function(error){
        observer.error(error);
    })
})

export const DownloadHistoryBundlingMBMP = new Observable((observer) => {
    mbmpService({
        url: DOWNLOAD_HISTORY_BUNDLING_MB_MP,
        data: {
            "date_start": startDateVal,
            "date_end": endDateVal
        },
    }).then(function(response){
        observer.next(response.data);
        observer.complete();
    }).catch(function(error){
        observer.error(error);
    })
})

export const GetEtbParams = new Observable((observer) => {
    etbParamService({
        url: GET_ETB_PARAM,
        data: {
            "id": null
        },
    }).then(function(response){
        observer.next(response.data);
        observer.complete();
    }).catch(function(error){
        observer.error(error);
    })
})

export const InsertEtbParam = new Observable((observer) => {
    etbParamService({
        url: INSERT_ETB_PARAM,
        data: {
            "product_code": productCodeVal,
            "product_desc_id":productDescIdVal,
            "product_desc_en":productDescEnVal,
            "max_account": maxAccountVal,
            "initial_deposit": initDepositVal,
            "status_id": statusIdVal,
            "created_by": createdByVal
        },
    }).then(function(response){
        observer.next(response.data);
        observer.complete();
    }).catch(function(error){
        observer.error(error);
    })
})

export const UpdateEtbParam = new Observable((observer) => {
    etbParamService({
        url: UPDATE_ETB_PARAM,
        data: {
            "id": productIdVal,
            "product_code": productCodeVal,
            "product_desc_id":productDescIdVal,
            "product_desc_en":productDescEnVal,
            "max_account": maxAccountVal,
            "initial_deposit": initDepositVal,
            "status_id": statusIdVal,
            "modified_by": modifiedByVal
        },
    }).then(function(response){
        observer.next(response.data);
        observer.complete();
    }).catch(function(error){
        observer.error(error);
    })
})

export const DeleteEtbParam = new Observable((observer) => {
    etbParamService({
        url: DELETE_ETB_PARAM,
        data: {
            "id": productIdVal
        },
    }).then(function(response){
        observer.next(response.data);
        observer.complete();
    }).catch(function(error){
        observer.error(error);
    })
})