import { auth, db } from "./firebase.js";
import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// DOM elements
const loadingEl = document.getElementById("loading");
const profileEl = document.getElementById("profile");

const uidEl = document.getElementById("uid");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const createdAtEl = document.getElementById("createdAt");

async function loadUserProfile() {
    loadingEl.style.display = "block";
    profileEl.style.display = "none";

    // Lấy user từ Firebase Auth
    const user = auth.currentUser;

    if (!user) {
        loadingEl.innerHTML = "Bạn chưa đăng nhập!";
        return;
    }

    // Gán thẻ HTML
    uidEl.textContent = user.uid;
    emailEl.textContent = user.email;
    createdAtEl.textContent = user.metadata.creationTime;

    // Lấy thông tin từ Firestore (nếu có)
    try {
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
        nameEl.textContent = "(Lỗi)";
    }

    // Hiện giao diện
    loadingEl.style.display = "none";
    profileEl.style.display = "block";
}

loadUserProfile();

// ====== NÚT ĐĂNG XUẤT ======
const logoutBtn = document.createElement("button");
logoutBtn.className = "btn-logout";
logoutBtn.textContent = "Đăng xuất";
profileEl.appendChild(logoutBtn);

logoutBtn.addEventListener("click", async () => {
    await auth.signOut();
    localStorage.removeItem("user_session");
    alert("Bạn đã đăng xuất!");
    window.location.href = "login.html";
});
