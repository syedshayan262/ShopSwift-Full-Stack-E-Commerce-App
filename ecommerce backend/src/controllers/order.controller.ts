import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Order from "../models/order.model";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Convert DocumentArray -> normal JS array
    const items = cart.items.map((i: any) => i.toObject());

    for (const item of items) {
      await Order.create({
        user: userId,
        product: item.product,
        quantity: item.quantity,
      });
    }

    // Mongoose way to clear array
    cart.items.splice(0, cart.items.length);
    await cart.save();

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
