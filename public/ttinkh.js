import { auth, db } from "./firebase.js";
import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// DOM elements
const loadingEl = document.getElementById("loading");
const profileEl = document.getElementById("profile");

const uidEl = document.getElementById("uid");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const createdAtEl = document.getElementById("createdAt");

loadingEl.style.display = "block";
profileEl.style.display = "none";

// ❗ DÙNG onAuthStateChanged để lấy user CHUẨN
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        loadingEl.innerHTML = "Bạn cần đăng nhập để xem thông tin!";
        setTimeout(() => (window.location.href = "dangnhap.html"), 1500);
        return;
    }

    // ——— Có user rồi, hiển thị dữ liệu ———
    uidEl.textContent = user.uid;
    emailEl.textContent = user.email;
    createdAtEl.textContent = user.metadata.creationTime;

    try {
        // Lấy thêm thông tin người dùng từ Firestore
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
            const data = snap.data();
            nameEl.textContent = data.name || "(Chưa cập nhật)";
        } else {
            nameEl.textContent = "(Không có trong Firestore)";
        }
    } catch (err) {
        console.error("Lỗi lấy Firestore:", err);
    }

    loadingEl.style.display = "none";
    profileEl.style.display = "block";
});

// ========== NÚT ĐĂNG XUẤT ==========
const logoutBtn = document.createElement("button");
logoutBtn.className = "btn-logout";
logoutBtn.textContent = "Đăng xuất";
profileEl.appendChild(logoutBtn);

logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    localStorage.removeItem("user_session");
    alert("Bạn đã đăng xuất!");
    window.location.href = "dangnhap.html";
});
