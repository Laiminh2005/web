import {auth, db} from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { collection, addDoc } from "firebase/firestore"; 

document.addEventListener("DOMContentLoaded", () => {
const inpUserName = document.querySelector("#name");
const inpEmail = document.querySelector("#email");
const inpPass = document.querySelector("#password");

const Dangky = document.querySelector("#dangkyform");

const handlelogin = function (event)
{
    event.preventDefault();
    let name = inpUserName.value;
    let email = inpEmail.value;
    let password = inpPass.value;

    let role_id = 2;

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

    createUserWithEmailAndPassword(auth, email,password)
    .then ((userCredential)=>{
        const user = userCredential.user;
        const userData = {
            name,
            email,
            password,
            role_id,
            point: 0,
        }
        return addDoc(collection(db,"users"), userData)
    })
    .then(()=>{
        alert("Đăng ký thành công");
        window.location.href = "dangnhap.html";
    })
    .catch((e)=>{
        alert("lỗi " +e.message);
    })
}

Dangky.addEventListener('submit', handlelogin);
});