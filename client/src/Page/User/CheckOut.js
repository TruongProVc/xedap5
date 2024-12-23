// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Lấy giỏ hàng từ session
//  useEffect(() => {
//     const cartData = JSON.parse(localStorage.getItem('cart')) || [];
//     setCart(cartData); useEffect(() => {
//         const cartData = JSON.parse(localStorage.getItem('cart')) || [];
//         setCart(cartData);
//         calculateTotal(cartData);
//       }, []);
//     calculateTotal(cartData);
//   }, []);
//   // Tính toán tổng giá trị giỏ hàng
//   const calculateTotal = (cartData) => {
//     let total = 0;
//     cartData.forEach(item => {
//       total += item.Price * item.Quantity;
//     });
//     setTotalPrice(total);
//   };
//   // Xử lý khi người dùng nhấn "Thanh toán"
//   const handleCheckout = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Bạn cần đăng nhập để thanh toán.');
//       window.location.href = '/login'; // Điều hướng đến trang đăng nhập
//       return;
//     }
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       {/* Thông tin người dùng */}
//       <div>
//         <label>Họ tên</label>
//         <input type="text" value={userInfo.name} onChange={e => ({  name: e.target.value })} />
//       </div>
//       <div>
//         <label>Email</label>
//         <input type="email" value={userInfo.email} onChange={e => ({ email: e.target.value })} />
//       </div>
//       <div>
//         <label>Địa chỉ</label>
//         <input type="text" value={userInfo.address} onChange={e => ({address: e.target.value })} />
//       </div>
//       <div>
//         <label>Số điện thoại</label>
//         <input type="text" value={userInfo.phone} onChange={e => ({ phone: e.target.value })} />
//       </div>

//       {/* Giỏ hàng */}
//       <div>
//         <h3>Giỏ hàng</h3>
//         <ul>
//           {cart.map(item => (
//             <li key={item.ProductId}>
//               {item.ProductName} - {item.Quantity} x {item.Price.toLocaleString()} VNĐ
//             </li>
//           ))}
//         </ul>
//         <p>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</p>
//       </div>

//       {/* Phương thức thanh toán */}
//       <div>
//         <label>Phương thức thanh toán</label>
//         <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
//           <option value="CashOnDelivery">Thanh toán khi nhận hàng</option>
//           <option value="CreditCard">Thanh toán bằng thẻ</option>
//         </select>
//       </div>

//       {/* Nút thanh toán */}
//       <button onClick={handleCheckout}>Thanh toán</button>
//     </div>
//   );
// };

// export default Checkout;
