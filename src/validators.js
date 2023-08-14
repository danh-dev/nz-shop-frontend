function removeAscent (str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
const rule_required = value => !!String(value).trim().length || 'Mục này không được để trống'
const rule_email = value => {
    if (!String(value).length) {
        return 'Email không được để trống'
    } else {
        const emailPattern = /^\w+([\w+\-]+\.)*[\w+\-]+@([\w+\-]+\.)+[\w-]{2,30}$/;
        return emailPattern.test(String(value)) || 'Email không đúng định dạng'
    }
}
const rule_phone = value => {
    if (!String(value).length) {
        return 'Số điện thoại không được để trống';
    } else {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(String(value)) || 'Số điện thoại không đúng định dạng';
    }
};
const rule_password = value => {
    if (!String(value).length) {
        return 'Password không được để trống'
    } else {
        const bestPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,20}$/;
        return bestPassword.test(String(value)) || 'Password phải từ 8 -20 ký tự. Ít nhất 1 chữ thường, 1 chữ in hoa và 1 ký tự đặc biệt'
    }
}
const rule_fullname = value => {
    if (!String(value).trim().length) {
        return 'Họ và tên không được để trống';
    } else {
        const namePattern = /^[a-zA-Z\s]{2,50}$/;
        return namePattern.test(String(removeAscent(value))) || 'Họ và tên phải là chữ có độ dài từ 2-50 ký tự';
    }
};


export {rule_password, rule_email, rule_required, rule_fullname, rule_phone}