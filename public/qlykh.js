import { db } from "./firebase.js";
import { collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const table = document.getElementById("customerTable");

async function loadCustomers() {
    try {
        const usersSnap = await getDocs(collection(db, "users"));
        table.innerHTML = ""; // reset bảng

        usersSnap.forEach(docSnap => {
            const u = docSnap.data();
            const email = u.email;

            table.innerHTML += `
                <tr>
                    <td>${u.name || "(Không có tên)"}</td>
                    <td>${email}</td>
                    <td><button class="delete-btn" data-id="${docSnap.id}">Xóa</button></td>
                </tr>
            `;
        });

        // Gắn sự kiện Xóa
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                const confirmDelete = confirm("Bạn có chắc muốn xóa khách hàng này không?");
                if (confirmDelete) {
                    await deleteDoc(doc(db, "users", id));
                    alert("Đã xóa khách hàng!");
                    loadCustomers(); // load lại bảng
                }
            });
        });
    } catch (error) {
        console.error("Lỗi khi load customers:", error);
    }
}

loadCustomers();
