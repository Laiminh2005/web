import { db } from "./firebase.js";
import {
    collection,
    onSnapshot,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const orderList = document.getElementById("orderList");

// LẤY ĐƠN HÀNG REALTIME
onSnapshot(collection(db, "orders"), (snapshot) => {
    orderList.innerHTML = ""; 

    snapshot.forEach((docItem) => {
        let d = docItem.data();
        let id = docItem.id;

        let itemsHtml = d.items.map(sp => `
            <div>
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
                <td>
                    ${d.status === "pending" 
                        ? `<button class="duyet" onclick="duyetDon('${id}')">DUYỆT</button>` 
                        : `<i>Đã duyệt</i>`}
                </td>
            </tr>
        `;

        orderList.innerHTML += row;
    });
});

// NÚT DUYỆT ĐƠN
window.duyetDon = async function(id) {
    await updateDoc(doc(db, "orders", id), {
        status: "approved"
    });

    alert("Đơn đã được duyệt!");
};
