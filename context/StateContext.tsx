import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

// Define the Product and State types
type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

type State = {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cartItems: Product[];
  setCartItems: (cartItems: Product[]) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  totalQuantities: number;
  settotalQuantities: (quantity: number) => void;
  qty: number;
  setQty: (qty: number) => void;
  onAdd: (product: Product, quantity: number) => void;
  onRemove: (product: Product) => void;
  toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void;
  incQty: () => void;
  decQty: () => void;
}

type Props = {
  children: ReactNode;
}

// Create a new context using the State type
const Context = createContext({} as State);

// Define a component that provides the state context to its children
export const StateContext = ({ children }: Props) => {
  // Define the state variables
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, settotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState(1);

  // Define the onAdd function that adds a product to the cart
  let foundProduct: Product | undefined;
  let index: number | undefined;

  const onAdd = (product: Product, quantity: number) => {
    // Check if the product is already in the cart
    const checkProductInCart = cartItems.find(item => item._id === product._id);
    
    // Update the total price and quantity of items in the cart
    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
    settotalQuantities(prevQuantities => prevQuantities + quantity);
    
    // If the product is already in the cart, update the quantity
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } 
    // If the product is not in the cart, add it
    else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    // Show a success toast indicating the product has been added to the cart
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const onRemove = (product: Product) => {
    foundProduct = cartItems.find(item => item._id === product._id);
    const newCartItems = cartItems.filter(item => item._id !== product._id);
    if (foundProduct) {
      const price = foundProduct.price || 0;
      const quantity = foundProduct.quantity || 0;
      setTotalPrice(prevTotalPrice => prevTotalPrice - price * quantity);
      settotalQuantities(prevTotalQuantities => prevTotalQuantities - quantity);
      setCartItems(newCartItems);
    }
  };

const toggleCartItemQuantity = (id: string, value: 'inc' | 'dec'): void => {
  // Find the product in the cart with the given ID
  const foundProduct = cartItems.find((item) => item._id === id);
  if (!foundProduct) {
    return;
  }

  // Get the index of the product in the cart
  const index = cartItems.findIndex((product) => product._id === id);

  // Remove the product from the cart
  const newCartItems = cartItems.filter((item) => item._id !== id);

  // Add the product back to the cart with the updated quantity
  if (value === 'inc') {
    const updatedProduct = { ...foundProduct, quantity: foundProduct.quantity + 1 };
    setCartItems([...newCartItems, updatedProduct]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
    settotalQuantities((prevQuantities) => prevQuantities + 1);
  } else if (value === 'dec') {
    // Make sure the quantity of the product is greater than 1 before decreasing
    if (foundProduct.quantity > 1) {
      const updatedProduct = { ...foundProduct, quantity: foundProduct.quantity - 1 };
      setCartItems([...newCartItems, updatedProduct]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      settotalQuantities((prevQuantities) => prevQuantities - 1);
    }
  }
};

const incQty = () => {
  setQty((prevQty) => prevQty + 1);
};

const decQty = () => {
  setQty((prevQty) => {
    if (prevQty - 1 < 1) return 1;
    return prevQty - 1;
  });
};

return (
  <Context.Provider
    value={{
      showCart,
      setShowCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAdd,
      toggleCartItemQuantity,
      onRemove,
      setCartItems,
      setQty,
      setTotalPrice,
      settotalQuantities,
    }}
  >
    {children}
  </Context.Provider>
);
}
export const useStateContext = () => useContext(Context);