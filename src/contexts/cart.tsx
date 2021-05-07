import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { formatPrice } from "../util/format";

interface CartContextData {
  add:(id:number, qtd:number, name:string, preco:number, image:string, peso:number, color:string) => void;
  remove:(id:number) => void;
  updateAmount:(id:number,amount:number) => void;
  cart: ICart[];
  getTotalValue:() => number;
}

export interface ICart {  
    id:number;
    name: string;
    image: string;
    price: number;
    priceFormatted: string;
    qtd: number;
    subTotal: string;
    peso: number;    
    color: string;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

type CartContextProviderProps = {
  children: ReactNode;
}

export function CartProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  function getCart(): ICart[] {
    const cartString = localStorage.getItem('cart');

    if(cartString) {    
      return JSON.parse(cartString);
    }
    
    return {} as ICart[];    
  }

  function add(id:number, qtd:number, name:string, preco:number, image:string, peso:number, color:string): void {    

    const productExists = cart.find((p) => p.id === id && p.color === color);

    const currentAmount = productExists ? productExists.qtd : 0;
    const amount = currentAmount + qtd;

    if(productExists) {
      const productIndex = cart.findIndex((p) => p.id === id && p.color === color);

      if (productIndex >= 0) {
        cart[productIndex].qtd = amount;
        cart[productIndex].subTotal = formatPrice(cart[productIndex].qtd * cart[productIndex].price);        
      }

      localStorage.setItem('cart',JSON.stringify(cart));

    } else {
      const newCart = cart;
      newCart.push(
        {
         id, 
         name, 
         price: preco, 
         image, 
         qtd, 
         priceFormatted: formatPrice(preco), 
         subTotal: formatPrice(preco * qtd), 
         peso,
         color
        }
      );
      setCart(newCart);
      localStorage.setItem('cart',JSON.stringify(newCart));
    }    

    setCart(getCart());
    
  }

  function remove(id:number): void {
    const productIndex = cart.findIndex((p) => p.id === id);

    if (productIndex >= 0) {
      cart.splice(productIndex, 1);
      localStorage.setItem('cart',JSON.stringify(cart));
    }
  }

  function updateAmount(id:number,amount:number): void {
    const productIndex = cart.findIndex((p) => p.id === id);

    if (amount === 0) {
      remove(id);
    }

    if (amount > 0) {
      cart[productIndex].qtd = amount;
      cart[productIndex].subTotal = formatPrice(cart[productIndex].price * cart[productIndex].qtd);
      localStorage.setItem('cart',JSON.stringify(cart));
    }
        
  }

  function getTotalValue(): number {
    
    let totalValue = 0;
    const cartString = localStorage.getItem('cart');

    if(cartString) {
      JSON.parse(cartString).map((item: ICart) => (
        totalValue += (item.price * item.qtd)
        ));
    }    

    return totalValue;
  }

  const store = {
    add,
    remove,
    updateAmount,
    cart,
    getTotalValue
  }

  return (
    <CartContext.Provider value={store}>
      {children}
    </CartContext.Provider>
  )

}

export const useCart = () => {
  return useContext(CartContext);
}