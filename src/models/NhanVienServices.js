export class NhanVienServices {
  arrNhanVien = [];
  constructor() {}

  // dùng để thêm nhân viên vào trong arrNhanVien
  addNhanVien(nv) {
    this.arrNhanVien.push(nv);
  }

  // xóa món ăn
  deleteNhanVien(tknv) {
    const index = this.arrNhanVien.findIndex((item) => item.tknv === tknv);
    if (index !== -1) {
      // xóa
      this.arrNhanVien.splice(index, 1);
    }
  }

  //update nv
  updateNhanVien(nv) {
    const index = this.arrNhanVien.findIndex((item) => item.tknv === nv.tknv);
    if (index !== -1) {
      this.arrNhanVien[index] = nv;
    }
  }
}
