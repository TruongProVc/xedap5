const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const SECRET_KEY = 'saddasdasadsasdadsas';

// Lấy dữ liệu giỏ hàng và thông tin khách hàng
exports.getCheckoutData = async (req, res) => {
  const token = req.session ? req.session.token : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Giải mã token để lấy customerId
    const decoded = jwt.verify(token, SECRET_KEY);
    const customerId = decoded.customerid;

    // Lấy thông tin khách hàng từ database
    const customer = await Customer.findOne({ where: { CustomerId: customerId } });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Kiểm tra giỏ hàng
    if (!req.session.cart || req.session.cart.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    return res.status(200).json({
      customer: {
        firstname: customer.Firstname,
        lastname: customer.Lastname,
        email: customer.Email,
        address: customer.Address,
        mobile: customer.Mobile,
      },
      cart: req.session.cart,
    });
  } catch (error) {
    console.error('Error fetching checkout data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Tạo đơn hàng và thanh toán
exports.createOrder = async (req, res) => {
  const { paymentMethod, discount } = req.body;
  const token = req.session ? req.session.token : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Giải mã token để lấy customerId
    const decoded = jwt.verify(token, SECRET_KEY);
    const customerId = decoded.customerid;
    console.log(customerId)

    if (!req.session.cart || req.session.cart.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    let subPrice = 0;
    req.session.cart.forEach(item => {
      subPrice += item.Quantity * item.Price;
    });

    const totalPrice = subPrice - discount;

    // Tạo đơn hàng
    const order = await Order.create({
      CustomerId: customerId,
      PaymentMethod: paymentMethod,
      SubPrice: subPrice,
      TotalPrice: totalPrice,
      Discount: discount,
    });

    // Lưu chi tiết đơn hàng
    for (const item of req.session.cart) {
      await OrderDetail.create({
        OrderId: order.OrderId,
        ProductId: item.ProductId,
        Quantity: item.Quantity,
        Price: item.Price,
      });
    }

    // Xóa giỏ hàng
    req.session.cart = [];

    return res.status(201).json({
      message: 'Order created successfully',
      orderId: order.OrderId,
      totalPrice: totalPrice,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
