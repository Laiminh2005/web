import { use } from "react";
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js/auth";

const inpemail = document.querySelector("#email");
const inpPass = document.querySelector("#password");
const loginform = document.querySelector("#dangnhapform");

const handlelogin = function(event){
    event.preventDefault();

    let email = inpemail.value;
    let password = inpPass.value;

    if(!email || !password)
    {
        alert("Vui lòng nhập đầy đủ dữ liệu!");
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user =userCredential.user;

        const userSession = 
        {
            user:
            {
                emai: user.emai
            },
            expiry: new Date().getTime() + 2*60*60*1000 // dang xuat sau 2h
        };
        localStorage.setItem('user_session', JSON.stringify(userSession));
        alert("Đăng nhập thành công!");
        window.location.href = 'index.html';
    })
    .catch(e=>{
        alert("error"+e.message);
    })
}
loginform.addEventListener('submit',handlelogin);
