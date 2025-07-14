const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

        // Copy cart items to order
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));
        const totalAmount = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

        const order = await Order.create({
            userId: req.user.id,
            items: orderItems,
            totalAmount
        });

        // Optionally update stock here if needed
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } });
        }

        // Clear the cart
        await Cart.findOneAndDelete({ userId: req.user.id });
        await order.populate('items.productId');
        res.status(201).json(order);
    } catch (err) {
        console.error('Place order error:', err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId').sort({ createdAt: -1 });
    res.json(orders);
};

exports.getOrderById = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id }).populate('items.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
};

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find().populate('userId', 'username email').populate('items.productId').sort({ createdAt: -1 });
    res.json(orders);
};
