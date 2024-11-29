// export class Validation {
//   required(value, messageError, errorId) {
//     const element = document.getElementById(errorId);

//     if (value === "") {
//       element.innerHTML = messageError;
//       element.style.display = "block";
//     }
//   }
// }
export class Validation {
  // Kiểm tra không để trống
  required(value, messageError, errorId) {
    const element = document.getElementById(errorId);
    if (value.trim() === "") {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  // Kiểm tra tài khoản (4-6 ký số)
  validateAccount(value, messageError, errorId) {
    const regex = /^[0-9]{4,6}$/;
    const element = document.getElementById(errorId);
    if (!regex.test(value)) {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  // Kiểm tra tên nhân viên (chỉ chứa chữ)
  validateName(value, messageError, errorId) {
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;
    const element = document.getElementById(errorId);
    if (!regex.test(value.trim())) {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  // Kiểm tra email
  validateEmail(value, messageError, errorId) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const element = document.getElementById(errorId);
    if (!regex.test(value)) {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  // Kiểm tra mật khẩu (6-10 ký tự, chứa số, chữ in hoa, ký tự đặc biệt)
  validatePassword(value, messageError, errorId) {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
    const element = document.getElementById(errorId);
    if (!regex.test(value)) {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  // Kiểm tra ngày định dạng mm/dd/yyyy
  validateDate(value, messageError, errorId) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    const element = document.getElementById(errorId);
    if (!regex.test(value)) {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  // Kiểm tra lương cơ bản (1,000,000 - 20,000,000)
  validateSalary(value, messageError, errorId) {
    const salary = parseFloat(value);
    const element = document.getElementById(errorId);
    if (isNaN(salary) || salary < 1000000 || salary > 20000000) {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }

  // Kiểm tra chức vụ hợp lệ
  validatePosition(value, messageError, errorId, validPositions) {
    const element = document.getElementById(errorId);
    if (!validPositions.includes(value)) {
      element.innerHTML = messageError;
      element.style.display = "block";
      return false;
    }
    element.innerHTML = "";
    element.style.display = "none";
    return true;
  }
}
