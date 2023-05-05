var canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
const img = document.getElementById('backGround');
const canvasX = 50;
const canvasY = 100;
let viTris= [];
let toaDoClick ={};
ctx.drawImage(img,canvasX,canvasY);

//set vị trí các ô (check: kiểm tra đường di chuyển của bóng)
let node = 1;
for (let i = 25; i < 450; i +=50) {
    for (let j = 25; j < 450; j +=50) {
        viTris.push({
            y: i,
            x: j,
            so: node++,
            status: -1,
            check: 0
        });
    }
}
//Tạo Bóng ngẫu nhiên
newBall.setColorBall();
let viTriBongHienTais =[];
let viTriBongSapXuatHiens = [];
//status = 1 (bóng xuất hiện); status = 0 (bóng chuẩn bị xuất hiện); status = -1 ( không có bóng) => chưa xong
function taoBongTrenBan(soBongBanDau,status) {
    //Vẽ Bóng turn hiện tại
    if (status == 1) {
        do {
            let soBongGiongNhau = false;
            let random = Math.round(Math.random()*80);
            for (const idx in viTriBongHienTais) {
                if (viTriBongHienTais[idx] == random) {
                    soBongGiongNhau = true;
                    break;
                } 
            }
            if (soBongGiongNhau == false) {
                viTriBongHienTais.push(random);
            }
        } while (viTriBongHienTais.length < soBongBanDau);

        for (const idx in viTriBongHienTais) {
            ctx.beginPath();
            ctx.arc(canvasX + 2 + viTris[viTriBongHienTais[idx]].x, canvasY + 2 + viTris[viTriBongHienTais[idx]].y,20,0,2*Math.PI);
            ctx.stroke();
            viTris[viTriBongHienTais[idx]].status = 1;
        }
        console.log(`Vị Trí Bóng: ${viTriBongHienTais}`);
    }
    // Vẽ Bóng turn sắp tới
    if (status == 0) {
        do {
            let soBongGiongNhau = false;
            let random = Math.round(Math.random()*80);
            for (const idx in viTriBongSapXuatHiens) {
                if (viTriBongSapXuatHiens[idx] == random) {
                    soBongGiongNhau = true;
                    break;
                } 
            }
            for (const idx in viTriBongHienTais) {
                if (viTriBongHienTais[idx] == random) {
                    soBongGiongNhau = true;
                    break;
                }
            }
            if (soBongGiongNhau == false) {
                viTriBongSapXuatHiens.push(random);
            }
        } while (viTriBongSapXuatHiens.length < soBongBanDau);

        for (const idx in viTriBongSapXuatHiens) {
            ctx.beginPath();
            ctx.arc(canvasX + 2 + viTris[viTriBongSapXuatHiens[idx]].x, canvasY + 2 + viTris[viTriBongSapXuatHiens[idx]].y,5,0,2*Math.PI);
            ctx.stroke();
            viTris[viTriBongSapXuatHiens[idx]].status = 0;

        }
        console.log(`Vị Trí Bóng Ẩn : ${viTriBongSapXuatHiens}`);
    }
    // Vẽ bóng chuẩn bị di chuyển
    if (status == 2) {
        
    }
    // Vẽ bóng di chuyển
    if (status == 3) {
        chuyenDoiTrangThai();
    }
    // Vẽ bóng hoàn thành ăn điểm
    if (status == 4) {
        
    }
}

taoBongTrenBan(7,1);
taoBongTrenBan(3,0);

    // set vị trí tọa độ Click trong canvas
let chonBongThanhCong = false;
let chonViTriDiChuyen = false;

canvas.onclick = function myFunction(event) {
let x = event.offsetX - canvasX;
let y = event.offsetY - canvasY;
toaDoClick = {
    x: x,
    y: y
}
console.log(toaDoClick);

for (const idx in viTris) {
    if (viTris[idx].y-25 < toaDoClick.y && toaDoClick.y < viTris[idx].y +25 && viTris[idx].x-25 < toaDoClick.x && toaDoClick.x < viTris[idx].x +25) {
            console.log(`Ô số: ${viTris[idx].so}`);
            if (viTris[idx].status == 1) {
                chonBongThanhCong = true;
                console.log(`Chọn bóng số: ${viTris[idx].so}`);
                viTris[idx].status = 'batDau';
            }
            if (chonBongThanhCong == true && viTris[idx].status == -1) {
                chonViTriDiChuyen = true;
                console.log(`Di chuyển tới ${viTris[idx].so}`);
                viTris[idx].status = 'ketThuc';
                chonBongThanhCong = false;
        } 
    }
}
danhDauDuongDi();
chuyenDoiTrangThai();
return chonBongThanhCong;
}
//Đánh dấu điểm bắt đầu và kết thúc
function danhDauDuongDi() {
    let a;
    let b;
    for (const idx in viTris) {
        if (viTris[idx].status == 'batDau') {
            a = viTris[idx].so;
        }
        if (viTris[idx].status == 'ketThuc') {
            b = viTris[idx].so;
        }
    }
    console.log(`Di chuyển từ ${a} đến ${b}`);
    if (a>0 && b>0) {
        timDuongDi(a);
    }
}
// Tìm đường di chuyển ngắn nhất
let duongDiChuyen = [];
function timDuongDi(diemBatDau) {
    duongDiChuyen.push(viTris[diemBatDau].so);
    if (viTris[diemBatDau+1].status == -1 && viTris[diemBatDau+1].check == 0) {
        viTris[diemBatDau+1].check = 1;
        duongDiChuyen.push(viTris[diemBatDau+1].so);
        if (viTris[diemBatDau+1].status == 'ketThuc') {
            return duongDiChuyen;
        } else {
            timDuongDi(diemBatDau+1);
        }
    }
    if (viTris[diemBatDau-1].status == -1 && viTris[diemBatDau-1].check == 0) {
        viTris[diemBatDau-1].check = 1;
        duongDiChuyen.push(viTris[diemBatDau-1].so);
        if (viTris[diemBatDau-1].status == 'ketThuc') {
            return duongDiChuyen;
        } else {
            timDuongDi(diemBatDau-1);
        }
    }
    if (viTris[diemBatDau+9].status == -1 && viTris[diemBatDau+9].check == 0) {
        viTris[diemBatDau+9].check = 1;
        duongDiChuyen.push(viTris[diemBatDau+9].so);
        if (viTris[diemBatDau+9].status == 'ketThuc') {
            return duongDiChuyen;
        } else {
            timDuongDi(diemBatDau+9);
        }
    }
    
    if (viTris[diemBatDau-9].status == -1 && viTris[diemBatDau-9].check == 0) {
        viTris[diemBatDau-9].check = 1;
        duongDiChuyen.push(viTris[diemBatDau-9].so);
        if (viTris[diemBatDau-9].status == 'ketThuc') {
            return duongDiChuyen;
        } else {
            timDuongDi(diemBatDau-9);
        }
    }
    
    if (viTris[diemBatDau+1].check == 1 && viTris[diemBatDau-1].check == 1 && viTris[diemBatDau+9].check == 1 && viTris[diemBatDau-9].check == 1 ) {
        let diemKet = duongDiChuyen.indexOf(viTris[diemBatDau].so)
        duongDiChuyen.splice(diemKet,1);
        return;
    }
}

console.log(duongDiChuyen);

// Chuyển bóng từ lượt sắp xh -> xuất hiện
function chuyenDoiTrangThai() {
    for (const idx in viTriBongSapXuatHiens) {
        viTris[viTriBongSapXuatHiens[idx]].status = 1;
        ctx.clearRect(viTris[viTriBongSapXuatHiens[idx]].x + canvasX -22, viTris[viTriBongSapXuatHiens[idx]].y + canvasY -22, 49, 49);
        ctx.beginPath();
        ctx.arc(canvasX + 2 + viTris[viTriBongSapXuatHiens[idx]].x, canvasY + 2 + viTris[viTriBongSapXuatHiens[idx]].y,20,0,2*Math.PI);
        ctx.stroke();
        viTriBongHienTais.push(viTriBongSapXuatHiens[idx]);  
    }
    viTriBongSapXuatHiens = [];
    taoBongTrenBan(3,0);
}

 