import { Request, Response } from "express";
import Cart from "../models/cart.model";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { product, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product, quantity }],
      });
    } else {
      cart.items.push({ product, quantity } as any);
      await cart.save();
    }

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // Step 1: filter items
    const filtered = cart.items.filter((item: any) => {
      return item.product.toString() !== productId;
    });

    // Step 2: empty DocumentArray
    cart.items.splice(0, cart.items.length);

    // Step 3: push filtered items back
    for (const item of filtered) {
      cart.items.push(item as any);
    }

    await cart.save();

    res.json({ message: "Item removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
