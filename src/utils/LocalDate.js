const LocalDate = (dt) => {
    //initiate to local string date Indonesia
    // const createdDate_ = dt?new Date(dt).toLocaleString('id-ID',{timeZone: "Asia/Jakarta"}):new Date().toLocaleString('id-ID',{timeZone: "Asia/Jakarta"})
        
    // //split date and time into array
    // const arrCreatedDate = createdDate_.split(" ")

    // //split date, month, day into array
    // const arrDate_created = arrCreatedDate[0].split("/")
    // const date_created_year = Number.parseInt(arrDate_created[2]) //full year
    // const date_created_month = ((Number.parseInt(arrDate_created[1])).toString()).length>1?(Number.parseInt(arrDate_created[1])).toString():'0'+(Number.parseInt(arrDate_created[1]) - 1).toString() // month as string from 01 to 12
    // const date_created_day = ((Number.parseInt(arrDate_created[0])).toString()).length>1?(Number.parseInt(arrDate_created[0])).toString():'0'+(Number.parseInt(arrDate_created[0])).toString() // day as string from 01 to 31

    // //split time hour, minute, second into array
    // const arrTime_created = arrCreatedDate[1].split('.')
    // const time_hour_created = ((Number.parseInt(arrTime_created[0])).toString()).length>1?(Number.parseInt(arrTime_created[0])).toString():'0'+(Number.parseInt(arrTime_created[0])).toString() // a string from 00 to 23
    // const time_minute_created = ((Number.parseInt(arrTime_created[1])).toString()).length>1?(Number.parseInt(arrTime_created[1])).toString():'0'+(Number.parseInt(arrTime_created[1])).toString() // a string from 00 to 59
    // const time_second_created = ((Number.parseInt(arrTime_created[2])).toString()).length>1?(Number.parseInt(arrTime_created[2])).toString():'0'+(Number.parseInt(arrTime_created[2])).toString() // a string from 00 to 59
    // console.log((date_created_month.toString()).length)

    // const createdDate = date_created_year+'-'+date_created_month+'-'+date_created_day+' '+time_hour_created+':'+time_minute_created+':'+time_second_created
    
    // return createdDate

    // return createdDate_

    const d = new Date(dt);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Tambah '0' jika bulan < 10
    const day = String(d.getUTCDate()).padStart(2, '0'); // Tambah '0' jika tanggal < 10
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    const seconds = String(d.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default LocalDate;