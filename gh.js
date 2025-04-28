// Load giỏ hàng từ localStorage khi trang giỏ hàng được mở
document.addEventListener('DOMContentLoaded', function() {
    var gh = JSON.parse(localStorage.getItem('gioHang')) || [];
    var ttgh = "";
    var tong = 0;
    for (let i = 0; i < gh.length; i++) {
        var tt = parseInt(gh[i][2]) * parseInt(gh[i][3]);
        tong += tt;
        ttgh += '<tr>' +
            '<td><img src="' + gh[i][0] + '" width="50" alt=""></td>' +
            '<td>' + gh[i][1] + '</td>' +
            '<td>' + gh[i][2].toLocaleString() + '₫</td>' +
            '<td>' + gh[i][3] + '</td>' +
            '<td>' + tt.toLocaleString() + '₫</td>' +
            '<td><button type="button" onclick="removeItem(' + i + ')">Xóa</button></td>' +
            '</tr>';
    }
    document.getElementById("body-gh").innerHTML = ttgh;
    document.getElementById("tongt").innerText = tong.toLocaleString() + "₫";
});

function removeItem(index) {
    var gh = JSON.parse(localStorage.getItem('gioHang')) || [];
    if (gh[index][3] > 1) {
        gh[index][3] -= 1;
    } else {
        gh.splice(index, 1);
    }
    localStorage.setItem('gioHang', JSON.stringify(gh)); // Lưu lại sau khi thay đổi
    location.reload(); // Tải lại trang để cập nhật giỏ hàng
}
