var canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
const img = document.getElementById('backGround');
//const layout = new Image();
// layout.src = './media/layout.webp'
const canvasX = 50;
const canvasY = 100;
let viTri= [];
let toaDoClick ={};
ctx.drawImage(img,canvasX,canvasY);
// layout.onload = () => {
//     ctx.drawImage(layout,canvasX, canvasY-57, 450, 557);
//   }

//set vị trí các ô
let node = 1;
for (let i = 25; i < 450; i +=50) {
    for (let j = 25; j < 450; j +=50) {
        viTri.push({
            y: i,
            x: j,
            so: node++,
            status: -1
        });
    }
}
//Tạo Bóng ngẫu nhiên
newBall.setColorBall();
let viTriBongHienTai =[];
let viTriBongSapXuatHien = [];
//status = 1 (bóng xuất hiện); status = 0 (bóng chuẩn bị xuất hiện); status = -1 ( không có bóng) => chưa xong
function taoBongTrenBan(soBongBanDau,status) {
    //Vẽ Bóng turn hiện tại
    if (status == 1) {
        do {
            let soGiongNhau = false;
            let random = Math.round(Math.random()*80);
            for (const idx in viTriBongHienTai) {
                if (viTriBongHienTai[idx] == random) {
                    soGiongNhau = true;
                    break;
                } 
            }
            if (soGiongNhau == false) {
                viTriBongHienTai.push(random);
            }
        } while (viTriBongHienTai.length < soBongBanDau);

        for (const idx in viTriBongHienTai) {
            ctx.beginPath();
            ctx.arc(canvasX + 2 + viTri[viTriBongHienTai[idx]].x, canvasY + 2 + viTri[viTriBongHienTai[idx]].y,20,0,2*Math.PI);
            ctx.stroke();
            viTri[viTriBongHienTai[idx]].status = 1;
        }
        console.log(`Vị Trí Bóng: ${viTriBongHienTai}`);
    }
    // Vẽ Bóng turn sắp tới
    if (status == 0) {
        do {
            let soGiongNhau = false;
            let random = Math.round(Math.random()*80);
            for (const idx in viTriBongSapXuatHien) {
                if (viTriBongSapXuatHien[idx] == random) {
                    soGiongNhau = true;
                    break;
                } 
            }
            for (const idx in viTriBongHienTai) {
                if (viTriBongHienTai[idx] == random) {
                    soGiongNhau = true;
                    break;
                }
            }
            if (soGiongNhau == false) {
                viTriBongSapXuatHien.push(random);
            }
        } while (viTriBongSapXuatHien.length < soBongBanDau);

        for (const idx in viTriBongSapXuatHien) {
            ctx.beginPath();
            ctx.arc(canvasX + 2 + viTri[viTriBongSapXuatHien[idx]].x, canvasY + 2 + viTri[viTriBongSapXuatHien[idx]].y,5,0,2*Math.PI);
            ctx.stroke();
            viTri[viTriBongSapXuatHien[idx]].status = 0;

        }
        console.log(`Vị Trí Bóng Ẩn : ${viTriBongSapXuatHien}`);
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

for (const idx in viTri) {
    if (viTri[idx].y-25 < toaDoClick.y && toaDoClick.y < viTri[idx].y +25 && viTri[idx].x-25 < toaDoClick.x && toaDoClick.x < viTri[idx].x +25) {
            console.log(`Ô số: ${viTri[idx].so}`);
            if (viTri[idx].status == 1) {
                chonBongThanhCong = true;
                console.log(`Chọn bóng số: ${viTri[idx].so}`);
                viTri[idx].status = 'batDau';
            }
            if (chonBongThanhCong == true && viTri[idx].status == -1) {
                chonViTriDiChuyen = true;
                console.log(`Di chuyển tới ${viTri[idx].so}`);
                viTri[idx].status = 'ketThuc';
                chonBongThanhCong = false;
        } 
    }
}
timDuongDi();
chuyenDoiTrangThai();
return chonBongThanhCong;
}
// Chưa xong =>> đang làm tiếp
function timDuongDi() {
    let a;
    let b;
    let queue = [];
    for (const idx in viTri) {
        if (viTri[idx].status == 'batDau') {
            a = viTri[idx].so;
        }
        if (viTri[idx].status == 'ketThuc') {
            b = viTri[idx].so;
        }
    }
    
    console.log(`Di chuyển từ ${a} đến ${b}`);
}

// Chuyển bóng từ lượt sắp xh -> xuất hiện
function chuyenDoiTrangThai() {
    for (const idx in viTriBongSapXuatHien) {
        viTri[viTriBongSapXuatHien[idx]].status = 1;
        ctx.clearRect(viTri[viTriBongSapXuatHien[idx]].x + canvasX -22, viTri[viTriBongSapXuatHien[idx]].y + canvasY -22, 49, 49);
        ctx.beginPath();
        ctx.arc(canvasX + 2 + viTri[viTriBongSapXuatHien[idx]].x, canvasY + 2 + viTri[viTriBongSapXuatHien[idx]].y,20,0,2*Math.PI);
        ctx.stroke();
        viTriBongHienTai.push(viTriBongSapXuatHien[idx]);  
    }
    viTriBongSapXuatHien = [];
    taoBongTrenBan(3,0);
}

 