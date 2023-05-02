var canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let img = document.getElementById('backGround');
const canvasX = 50;
const canvasY = 100;
let viTri= [];
let toaDoClick ={};
ctx.drawImage(img,canvasX,canvasY);
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
    let viTriBongXuatHien = [];
    //status = 1 (bóng xuất hiện); status = 0 (bóng chuẩn bị xuất hiện); status = -1 ( không có bóng)
    function taoBongNgauNhien(soBongBanDau,status) {
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
            //Vẽ Bóng xuất hiện
            for (const idx in viTriBongHienTai) {
                ctx.beginPath();
                ctx.arc(canvasX + 2 + viTri[viTriBongHienTai[idx]].x, canvasY + 2 + viTri[viTriBongHienTai[idx]].y,20,0,2*Math.PI);
                ctx.stroke();
                viTri[viTriBongHienTai[idx]].status = 1;
            }
            console.log(`Vị Trí Bóng: ${viTriBongHienTai}`);
        }
        if (status == 0) {
            do {
                let soGiongNhau = false;
                let random = Math.round(Math.random()*80);
                for (const idx in viTriBongXuatHien) {
                    if (viTriBongXuatHien[idx] == random) {
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
                    viTriBongXuatHien.push(random);
                }
            } while (viTriBongXuatHien.length < soBongBanDau);
            // Vẽ Bóng Ẩn
            for (const idx in viTriBongXuatHien) {
                ctx.beginPath();
                ctx.arc(canvasX + 2 + viTri[viTriBongXuatHien[idx]].x, canvasY + 2 + viTri[viTriBongXuatHien[idx]].y,5,0,2*Math.PI);
                ctx.stroke();
                viTri[viTriBongXuatHien[idx]].status = 0;

            }
            console.log(`Vị Trí Bóng Ẩn : ${viTriBongXuatHien}`);
        }
    }
     taoBongNgauNhien(7,1);
     taoBongNgauNhien(3,0);

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
        if (viTri[idx].y-25 < toaDoClick.y && toaDoClick.y < viTri[idx].y +25) {
            if (viTri[idx].x-25 < toaDoClick.x && toaDoClick.x < viTri[idx].x +25) {
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
    }
    timDuongDi();
    return chonBongThanhCong;
    }

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

function chuyenDoiTrangThai() {
    for (const idx in viTriBongXuatHien) {
        
    }
}

 