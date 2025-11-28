// import { db } from "./firebase.js";
// import {
//     collection,
//     query,
//     where,
//     onSnapshot
// } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// // Lấy user hiện tại từ session
// const session = JSON.parse(localStorage.getItem("user_session"));

// if (!session || !session.user || !session.user.uid) {
//     alert("Bạn cần đăng nhập để xem đơn hàng!");
//     window.location.href = "dangnhap.html";
// }

// const currentUserId = session.user.uid;

// const myOrdersTable = document.getElementById("myOrdersTable");
// const noOrdersText = document.getElementById("no-orders");

// // Query: lấy đơn hàng theo userId
// const q = query(
//     collection(db, "orders"),
//     where("userId", "==", currentUserId)
// );

// // Lấy realtime đơn hàng
// onSnapshot(q, (snapshot) => {
//     myOrdersTable.innerHTML = "";

//     if (snapshot.empty) {
//         noOrdersText.classList.remove("hidden");
//         return;
//     }

//     noOrdersText.classList.add("hidden");

//     snapshot.forEach((docItem) => {
//         const d = docItem.data();
//         const id = docItem.id;

//         let itemsHtml = d.items.map(sp => `
//             <div class="order-item">
//                 <b>${sp.name}</b> — ${sp.quantity} x ${sp.price.toLocaleString()}₫
//             </div>
//         `).join("");

//         let statusClass = d.status === "approved" ? "approved" : "pending";

//         let row = `
//             <tr>
//                 <td>${id}</td>
//                 <td>${itemsHtml}</td>
//                 <td><b>${d.total.toLocaleString()}₫</b></td>
//                 <td><span class="badge ${statusClass}">${d.status}</span></td>
//                 <td>${d.createdAt ? d.createdAt.toDate().toLocaleString() : ""}</td>
//             </tr>
//         `;

//         myOrdersTable.innerHTML += row;
//     });
// });
import { db, auth } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const table = document.getElementById("customerTable");

auth.onAuthStateChanged(async user => {
    if (!user) {
        console.log("Chưa đăng nhập!");
        return;
    }

    try {
        // Lấy đơn hàng của user hiện tại đã được admin duyệt
        const ordersRef = collection(db, "orders");
        const q = query(
            ordersRef, 
            where("userId", "==", user.uid),
            where("status", "==", "approved")
        );

        const ordersSnap = await getDocs(q);
        table.innerHTML = "";

        if (ordersSnap.empty) {
            table.innerHTML = "<tr><td colspan='3'>Chưa có đơn hàng được duyệt</td></tr>";
            return;
        }

        ordersSnap.forEach(docSnap => {
            const order = docSnap.data();
            table.innerHTML += `
                <tr>
                    <td>${docSnap.id}</td>
                    <td>${order.total || 0}</td>
                    <td>${order.status}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Lỗi khi load orders:", error);
    }
});
