import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const btnCheckout = document.querySelector(".tt-tt");

if (btnCheckout) {
    btnCheckout.addEventListener("click", async (e) => {
        e.preventDefault();

        let cart = JSON.parse(localStorage.getItem('gioHang')) || [];

        if (cart.length === 0) {
            alert("Giỏ hàng đang trống!");
            return;
        }

        const items = cart.map(sp => ({
            image: sp[0],
            name: sp[1],
            price: sp[2],
            quantity: sp[3],
            total: sp[2] * sp[3]
        }));

        const totalOrder = items.reduce((s, it) => s + it.total, 0);

        const order = {
            items: items,
            total: totalOrder,
            status: "pending",
            createdAt: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "orders"), order);
            localStorage.removeItem("gioHang");
            alert("Đặt hàng thành công!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Có lỗi khi thanh toán!");
        }
    });
}
