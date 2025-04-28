//cài đặt mặc định cho mục showcard ẩn
document.getElementById("showcard").style.display="none";

let gh = JSON.parse(localStorage.getItem('gioHang')) || [];
function addToCart(x){
    var box = x.closest('.product-card');
    var hinh = box.querySelector('img').src;
    var giaText = box.querySelector('.price').innerText;
    var tensp = box.querySelector('h3').innerText;
    var soluong = 1;
    
    // xóa giá ở sau nếu sản phẩm có khoảng giá
    var gia = parseInt(giaText.replace(/[₫,.]/g, '').split(' ')[0]);
    
    const index = gh.findIndex(sp => sp[1] === tensp);
    if (index !== -1) {
      gh[index][3] += soluong;
    } else {
      const sp = [hinh, tensp, gia, soluong];
      gh.push(sp);
    }
    localStorage.setItem('gioHang', JSON.stringify(gh)); // lưu vào localStorage
    showmycard();
}
// toLocaleString chỉ để nó hiện số đẹp hơn thôi ví dụ mặc định nó sẽ hiện 390000 thì dùng toLocaleString nó sẽ thành 390,000
function showmycard(){
        var ttgh="";
        var tong=0;
        for (let i=0;i<gh.length;i++){
            var tt = parseInt(gh[i][2])*parseInt(gh[i][3]);
            tong+=tt;
            ttgh+='<tr>'+
                '<td>' + (i + 1) + '</td>'+
                '<td><img src="' + gh[i][0] + '" width="50" alt=""></td>'+
                '<td>' + gh[i][1] + '₫</td>'+
                '<td>' + gh[i][2].toLocaleString() + '</td>'+
                '<td>' + gh[i][3] + '</td>'+
                '<td>' + tt.toLocaleString() + '₫</td>'+
                '<td><button onclick="removeItem(' + i + ')">Xóa</button></td>'+
                '</tr>';
        }
        document.getElementById("mycard").innerHTML = ttgh;

        // Cập nhật dòng tổng trong HTML có sẵn
        document.getElementById("tongtien").innerText = tong.toLocaleString() + "₫";
    }
function removeItem(index) {
    // gh.splice(index, 1); // Xoá sản phẩm ở vị trí index
    // showmycard();
    if (gh[index][3] > 1) {
        gh[index][3] -= 1;
    } else {
        gh.splice(index, 1);
    }
    localStorage.setItem('gioHang', JSON.stringify(gh)); // nhớ lưu lại
    showmycard();
}
//kiểm tra ẩn hiện của giỏ hàng 
function showcard(){
    var kt=document.getElementById("showcard");
    if(kt.style.display == "block"){
        kt.style.display = "none";
    } 
    else{
        kt.style.display = "block";
        showmycard();
    }
}

