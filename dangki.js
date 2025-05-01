document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); // Ngăn gửi form mặc định

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let name = document.getElementById("name").value.trim();

    //email
    if (email === ""){
       alert("Email không được để trống.");
        return;
    }

    else if(!email.includes("@") || !email.endsWith(".com")){
       alert("email chưa đúng định dạng");
       return;
    }

    //password
    // Regex kiểm tra có ký tự đặc biệt
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password === ""){
        alert("password không được để trống.");
        return;
    }

    else if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
    }


    else if(!specialCharRegex.test(password)){
        alert("mật khẩu phải chứa ít nhất 1 ký tự đặc biệt");
        return;
    }

    else if(!/[a-z]/.test(password)){
        alert("mật khâu phải có chữ cái thường");
        return;
    }

    else if(!/[A-Z]/.test(password)){
        alert("mật khẩu phải có chữ hoa");
        return;
    }

    else if(!/[0-9]/.test(password)){
        alert("mật khẩu phải có số");
        return;
    }

    //kiểm tra tên
    if (name === "") {
        alert("Vui lòng nhập họ tên.");
        return;
    }

    // Nếu tất cả hợp lệ
    alert("Đăng ký thành công!");
    window.location.href = "index.html";
});

