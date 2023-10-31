export const MoneyFormat = (value) =>{
    value = value.replace(/\D/g, '');
    var number = value.length;
    var angka = number % 3;
    var angka2 = "";
    if (angka == 0)
        angka2 = 3;
    else
        angka2 = angka;
    var format = value.substr(angka2);
    var formatPrice = format.length / 3;
    var digitBelakang = "";
    var digit = "";
    for (var a = 0; a < formatPrice; a++) {
        digitBelakang = "," + format.substr(-3) + digitBelakang;
        var nilai = format.length - 3;
        format = format.substr(0, nilai);
    }
    var result = value.substr(0, angka2);
    var resultNum = result + digitBelakang;

    return resultNum;
}