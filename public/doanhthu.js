import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

async function loadDashboard() {
    try {
        // Lấy users
        const usersSnap = await getDocs(collection(db, "users"));
        const totalCustomers = usersSnap.size;

        // Lấy orders
        const ordersSnap = await getDocs(collection(db, "orders"));
        let totalOrders = 0;
        let totalRevenue = 0;

        ordersSnap.forEach(doc => {
            const data = doc.data();
            if (data.status === "approved") { // chỉ tính đơn đã duyệt
                totalOrders++;
                if (Array.isArray(data.items)) {
                    data.items.forEach(item => {
                        totalRevenue += item.total || (item.price * item.quantity || 0);
                    });
                }
            }
        });

        // Hiển thị
        document.getElementById("totalRevenue").innerText = totalRevenue.toLocaleString() + "đ";
        document.getElementById("totalOrders").innerText = totalOrders;
        document.getElementById("totalCustomers").innerText = totalCustomers;

    } catch (error) {
        console.error("Lỗi load dashboard:", error);
    }
}

loadDashboard();
