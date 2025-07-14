const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  const total = cart?.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0) || 0;
  res.json({ items: cart?.items || [], total });
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product || product.stock < quantity) return res.status(400).json({ error: 'Invalid product or stock' });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) item.quantity += quantity;
    else cart.items.push({ productId, quantity });

    await cart.save();
    await cart.populate('items.productId');
    res.json(cart);
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  const item = cart.items.find(i => i.productId.toString() === req.params.productId);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  if (quantity <= 0) cart.items = cart.items.filter(i => i.productId.toString() !== req.params.productId);
  else item.quantity = quantity;

  await cart.save();
  await cart.populate('items.productId');
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  cart.items = cart.items.filter(i => i.productId.toString() !== req.params.productId);
  await cart.save();
  res.json({ message: 'Item removed from cart' });
};