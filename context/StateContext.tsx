import React, { createContext, useContext, useState, ReactNode } from 'react';
import {toast} from 'react-hot-toast';

type MyComponentProps = {
    children: ReactNode;
  }; 

type foundProductProps = {
    price: number;
    quantity: number;
}

const Context = createContext({} as any);

export const StateContext = ({ children }: MyComponentProps) => {
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, settotalQuantities] = useState<number>(0);
    const [qty, setQty] = useState(1);

    let foundProduct : any;
  
    
    let index;

    const onAdd = (product: { _id: string; price: number; quantity: number; name: string; }, quantity: number)=> {
        const checkProductInCart = cartItems.find((item : any)=> item._id === product._id)
        setTotalPrice((prevTotalPrice)=> prevTotalPrice + product.price * quantity)
        settotalQuantities((prevQuantities)=> prevQuantities + quantity)
        if(checkProductInCart) {
            
            const updatedCartItems : any  = cartItems.map((cartProduct : any)  => {
                if(cartProduct._id === product._id) return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity
                }
              })
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to cart`)
    }
    const onRemove = (product: { _id: string; }) => {
        foundProduct  = cartItems.find((item)=> item._id === product._id);
        const newCartItems = cartItems.filter((item)=> item._id !== product._id);
        setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price * foundProduct.quantity);
        settotalQuantities((prevTotalQuantities)=> prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id : string, value : string)=> {
        foundProduct = cartItems.find((item)=> item._id === id);
        index = cartItems.findIndex((product)=> product._id === id);
        const newCartItems = cartItems.filter((item)=> item._id !== id);
        if(value === 'inc') {
         setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
         setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price);
         settotalQuantities((prevQuantities)=> prevQuantities + 1);
        } else if(value === 'dec') {
        if(foundProduct.quantity > 1) {
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
            setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price);
            settotalQuantities((prevQuantities)=> prevQuantities - 1);
        }
        }
    }
    const incQty = () => {
        setQty((prevQty)=> prevQty + 1 )
    }
    const decQty = () => {
        setQty((prevQty)=> {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        })
    }

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
            setTotalPrice,
            settotalQuantities,
        }}
        >
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);