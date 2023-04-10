// 校验身份证
export function validateIdNo(rule, value, callback) {
  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/;
  if (value == "" || value == undefined || value == null) {
    callback(new Error("请输入身份证号码"));
    // callback();
  } else {
    if (!reg.test(value) && value != "") {
      callback(new Error("请输入正确的身份证号码"));
    } else {
      callback();
    }
  }
}

//验证输入的值内容只能包含英文字母和数字
export function validateIdInput(rule, value, callback) {
  const reg = /^[a-z0-9]+$/i;
  if (value == "" || value == undefined || value == null) {
    callback(new Error("输入值不能为空"));
    // callback();
  } else {
    if (!reg.test(value) && value != "") {
      callback(new Error("请输入字母或者数字"));
    } else {
      callback();
    }
  }
}

// 去除空格
export const getTrim = (str) => {
  return str.replace(/\s*/g, "");
};
