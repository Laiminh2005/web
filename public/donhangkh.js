import { db } from "./firebase.js";
import {
    collection,
    query,
    where,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Lấy user hiện tại từ session
const session = JSON.parse(localStorage.getItem("user_session"));

if (!session || !session.user || !session.user.uid) {
    alert("Bạn cần đăng nhập để xem đơn hàng!");
    window.location.href = "dangnhap.html";
}

const currentUserId = session.user.uid;

const myOrdersTable = document.getElementById("myOrdersTable");
const noOrdersText = document.getElementById("no-orders");

// Query: lấy đơn hàng theo userId
const q = query(
    collection(db, "orders"),
    where("userId", "==", currentUserId)
);

// Lấy realtime đơn hàng
onSnapshot(q, (snapshot) => {
    myOrdersTable.innerHTML = "";

    if (snapshot.empty) {
        noOrdersText.classList.remove("hidden");
        return;
    }

    noOrdersText.classList.add("hidden");

    snapshot.forEach((docItem) => {
        const d = docItem.data();
        const id = docItem.id;

        let itemsHtml = d.items.map(sp => `
            <div class="order-item">
                <b>${sp.name}</b> — ${sp.quantity} x ${sp.price.toLocaleString()}₫
            </div>
        `).join("");

        let statusClass = d.status === "approved" ? "approved" : "pending";

        let row = `
            <tr>
                <td>${id}</td>
                <td>${itemsHtml}</td>
                <td><b>${d.total.toLocaleString()}₫</b></td>
                <td><span class="badge ${statusClass}">${d.status}</span></td>
                <td>${d.createdAt ? d.createdAt.toDate().toLocaleString() : ""}</td>
            </tr>
        `;

        myOrdersTable.innerHTML += row;
    });
});
