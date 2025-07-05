let orderItems = [];
let totalPrice = 0;
function addItem(name, price, quantity) {
    quantity = parseInt(quantity) || 0;  // Ensure it's a valid number
    if (quantity <= 0) return;
    let itemIndex = orderItems.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        orderItems[itemIndex].quantity += quantity;
    } else {
        orderItems.push({ name, price, quantity });
    }
    totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateOrderSummary();
}
function updateOrderSummary() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = ""; // Fix spacing issue
    orderItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toFixed(2)}`;
        orderList.appendChild(listItem);
    });
    document.getElementById("total-price").innerText = `${totalPrice.toFixed(2)}`;
}
function generateBill() {
    if (orderItems.length === 0) {
        alert("No items selected. Please add items to your order.");
        return;
    }
    const finalBillingList = document.getElementById("final-billing-list");
    finalBillingList.innerHTML = ""; // Fix spacing issue
    orderItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toFixed(2)}`;
        finalBillingList.appendChild(listItem);
    });
    document.getElementById("final-total-price").innerText = `${totalPrice.toFixed(2)}`;
    document.querySelector(".order_summary").style.display = "none";
    document.getElementById("final-billing-summary").style.display = "block";
}
function clearOrder() {
    orderItems = [];
    totalPrice = 0;
    document.getElementById("order-list").innerHTML = ""; // Clear order summary
    document.getElementById("total-price").innerText = "0"; // Reset total price
    document.getElementById("final-billing-list").innerHTML = ""; // Clear final bill
    document.getElementById("final-total-price").innerText = "0"; // Reset final total
    document.querySelector(".order_summary").style.display = "block";
    document.getElementById("final-billing-summary").style.display = "none";
}