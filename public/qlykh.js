import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const table = document.getElementById("customerTable"); // <-- cập nhật đúng ID

async function loadCustomers() {
    const usersSnap = await getDocs(collection(db, "users"));
    const ordersSnap = await getDocs(collection(db, "orders"));

    // Gom đơn hàng theo email
    const orderMap = {};

    ordersSnap.forEach(doc => {
        const data = doc.data();

        if (!data.customerEmail || data.status !== "paid") return;

        if (!orderMap[data.customerEmail]) {
            orderMap[data.customerEmail] = {
                count: 0,
                total: 0
            };
        }

        orderMap[data.customerEmail].count++;

        // tính tổng tiền
        let sum = 0;
        data.items.forEach(item => {
            sum += item.total;
        });

        orderMap[data.customerEmail].total += sum;
    });

    // Hiển thị user
    usersSnap.forEach(doc => {
        const u = doc.data();
        const email = u.email;

        const paidCount = orderMap[email]?.count || 0;
        const totalSpent = orderMap[email]?.total || 0;

        table.innerHTML += `
            <tr>
                <td>${u.name || "(Không có tên)"}</td>
                <td>${email}</td>
                <td>${paidCount}</td>
                <td>${totalSpent.toLocaleString()}đ</td>
            </tr>
        `;
    });
}

loadCustomers();
