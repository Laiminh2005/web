import { db } from "./firebase.js";
import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Lấy session lưu khi đăng nhập
const session = JSON.parse(localStorage.getItem("user_session"));

const profileEl = document.getElementById("profile");
const uidEl = document.getElementById("uid");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const createdAtEl = document.getElementById("createdAt");

// Không có session → chưa đăng nhập
if (!session || !session.user) {
    alert("Bạn cần đăng nhập để xem thông tin tài khoản");
    window.location.href = "dangnhap.html";
} else {
    // Lấy user từ session
    const user = session.user;

    // Hiện thông tin có sẵn
    uidEl.textContent = user.uid;
    emailEl.textContent = user.email;

    // Lấy thêm từ Firestore
    (async () => {
        try {
            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);

            if (snap.exists()) {
                const data = snap.data();
                nameEl.textContent = data.name || "(Chưa cập nhật)";
                createdAtEl.textContent = data.createdAt || "(Không có)";
            } else {
                nameEl.textContent = "(Không có trong Firestore)";
                createdAtEl.textContent = "(Không có)";
            }

            profileEl.style.display = "block";
        } catch (err) {
            console.error("Lỗi lấy Firestore:", err);
        }
    })();
}

const toggleBtn = document.getElementById("toggleUpdate");
const updateWrapper = document.getElementById("updateWrapper");

// Trạng thái đóng/mở
let isOpen = false;

toggleBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
        updateWrapper.style.display = "block";
        toggleBtn.textContent = "Đóng lại";
    } else {
        updateWrapper.style.display = "none";
        toggleBtn.textContent = "Cập nhật thông tin";
    }
});
