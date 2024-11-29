import { NhanVien } from "../models/NhanVien.js";
import { NhanVienServices } from "../models/NhanVienServices.js";
import { Validation } from "../models/Validation.js";

// Tạo 1 đối tượng NhanVienSer
const nvServices = new NhanVienServices();

// Tạo 1 đối tượng validation
const validation = new Validation();

// lấy thông tin món ăn
const layThongTinQLNV = () => {
  // DOM tới nhiều element
  const elements = document.querySelectorAll("#nvForm input, #nvForm select");
  console.log("elements: ", elements);

  let nhanVien = {};
  // duyệt elemets
  elements.forEach((element) => {
    const { id, value } = element;
    console.log("value: ", value);
    nhanVien[id] = value;
  });
  console.log("nhanVien: ", nhanVien);

  // khởi tạo 1 đối tượng nhân viên
  return new NhanVien(
    nhanVien.tknv,
    nhanVien.name,
    nhanVien.email,
    nhanVien.password,
    nhanVien.datepicker,
    nhanVien.luongCB,
    nhanVien.chucvu,
    nhanVien.gioLam
  );
};

const renderNhanVien = (arrNhanVien = nvServices.arrNhanVien) => {
  let contentHtml = "";
  arrNhanVien.forEach((nv) => {
    contentHtml += `
    <tr>
        <td>${nv.tknv}</td>
        <td>${nv.name}</td>
        <td>${nv.email}</td>
        <td>${nv.datepicker}</td>
        <td>${nv.chucvu}</td>
        <td>${nv.TinhTongLuong()}</td>
        <td>${nv.XepLoaiNhanVien()}</td>
        <td>
                    <button class="btn btn-success" data-toggle="modal" data-target="#myModal"
                    onclick = "editNhanVien('${nv.tknv}')">Edit</button>
                    <button 
                    onclick = "deleteNhanVien('${nv.tknv}')" 
                    class="btn btn-danger">Delete</button>
        </td>

        
    </tr>
    `;
  });
  document.getElementById("tableDanhSach").innerHTML = contentHtml;
};

// Lưu localstorage
const setLocalStorage = () => {
  localStorage.setItem("arrNhanVien", JSON.stringify(nvServices.arrNhanVien));
};
// render local
const renderLocaleStorage = () => {
  let arrNhanVien = localStorage.getItem("arrNhanVien");
  if (!arrNhanVien) return;

  arrNhanVien = JSON.parse(arrNhanVien);

  const newArrNhanViens = arrNhanVien.map((nhanVien) => {
    return new NhanVien(
      nhanVien.tknv,
      nhanVien.name,
      nhanVien.email,
      nhanVien.password,
      nhanVien.datepicker,
      nhanVien.luongCB,
      nhanVien.chucvu,
      nhanVien.gioLam
    );
  });

  // Đưa món ăn từ local storage vào trong danh sách món ăn của foodService
  nvServices.arrNhanVien = newArrNhanViens;

  //Hiển thị danh sách nhân viên ra UI
  renderNhanVien(newArrNhanViens);
};
renderLocaleStorage();

document.getElementById("btnThem").onclick = () => {
  const formElement = document.getElementById("nvForm");
  formElement.reset();
  // ẩn button cập nhật
  document.getElementById("btnCapNhat").style.display = "none";

  // hiện button thêm
  document.getElementById("btnThemNV").style.display = "inline-block";
  // mở lại ô input tknv
  document.getElementById("tknv").disabled = false;
};

document.getElementById("nvForm").onsubmit = (ev) => {
  //Tránh reload trang
  ev.preventDefault();

  const formElement = document.getElementById("nvForm");

  // Kiểm tra xem action là thêm mới hay chỉnh sửa
  const action = formElement.getAttribute("data-action");

  // lấy thông tin nhân viên
  const nv = layThongTinQLNV();

  // Validation (Kiểm tra dữ liệu đầu vào)
  // if (nv.tknv === "") {
  //   document.getElementById("tbTKNV").innerHTML = "Vui lòng không để trống!!";
  // }
  // validation.required(nv.tknv, "Vui lòng không để trống !!!", "tbTKNV");
  const isAccountValid = validation.validateAccount(
    nv.tknv,
    "Tài khoản phải từ 4-6 ký số!",
    "tbTKNV"
  );
  const isNameValid = validation.validateName(
    nv.name,
    "Tên nhân viên phải là chữ!",
    "tbTen"
  );
  const isEmailValid = validation.validateEmail(
    nv.email,
    "Email không đúng định dạng!",
    "tbEmail"
  );
  const isPasswordValid = validation.validatePassword(
    nv.password,
    "Mật khẩu không hợp lệ!",
    "tbMatKhau"
  );
  const isDateValid = validation.validateDate(
    nv.datepicker,
    "Ngày không hợp lệ!",
    "tbNgay"
  );
  const isSalaryValid = validation.validateSalary(
    nv.luongCB,
    "Lương cơ bản không hợp lệ!",
    "tbLuongCB"
  );
  const isPositionValid = validation.validatePosition(
    nv.chucvu,
    "Chức vụ không hợp lệ!",
    "tbChucVu",
    ["Sếp", "Trưởng phòng", "Nhân viên"]
  );

  if (
    isAccountValid &&
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isDateValid &&
    isSalaryValid &&
    isPositionValid
  )
    if (action !== "edit") {
      // thêm nv vào arrNhanVien
      nvServices.addNhanVien(nv);
    }
  if (action === "edit") {
    // cập nhật món ăn
    nvServices.updateNhanVien(nv);
    // Đóng modal
    document.getElementById("btnDong").click();
  }
  // xóa thuộc tính data-action của thẻ form
  formElement.removeAttribute("data-action");

  // reset form (xóa toàn bộ giá trị input, select ở trong form)
  formElement.reset();

  // Lưu tk nhân viên vào local
  setLocalStorage();

  // Hiển thị danh sách món ăn UI
  renderNhanVien();
};

// Xóa nhân viên
window.deleteNhanVien = (tknv) => {
  console.log("tknv: ", tknv);
  // xóa
  nvServices.deleteNhanVien(tknv);
  console.log(nvServices.arrNhanVien);

  //Cập nhật sau khi xóa trên UI
  renderNhanVien();

  //lưu lại sau khi xóa
  setLocalStorage();
};

// Chức năng edit
window.editNhanVien = (tknv) => {
  // tìm kiếm nhân viên cần edit
  const nvEdit = nvServices.arrNhanVien.find((item) => item.tknv === tknv);

  //  Thêm 1 thuộc tính data-action vào thẻ form để phân biệt giữa thêm mới và cập nhật
  document.getElementById("nvForm").setAttribute("data-action", "edit");

  // disbaled ô input tknv
  document.getElementById("tknv").disabled = true;

  // hiện button cập nhật
  document.getElementById("btnCapNhat").style.display = "inline-block";

  // ẩn button thêm
  document.getElementById("btnThemNV").style.display = "none";

  // đẩy thông tin nv cần edit vào form
  const elements = document.querySelectorAll("#nvForm input, #nvForm select");

  elements.forEach((element) => {
    const { id } = element;
    element.value = nvEdit[id];
  });
};

// LocalStorage

// Lưu
localStorage.setItem("tknv", "Nguyen Van A");

// lưu object, array
localStorage.setItem("nvs", JSON.stringify([{ name: 1, age: 20 }]));

//xóa
// localStorage.removeItem("tknv");

// Đọc giá trị từ locale storage
// nếu key ko đúng => trả về null

const nhanviens = JSON.parse(localStorage.getItem("nvs"));
