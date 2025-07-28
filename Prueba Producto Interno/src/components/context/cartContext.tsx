import { createContext, useReducer, useContext } from "react";
import type {Dispatch} from "react";
import type {TypeoFProduct} from "@/components/types/Product"


interface CartItem extends TypeoFProduct{
    quantity: number;
}

interface CartState{
    cart: CartItem[];
}

type CartAction = 
| {type: "ADD_TO_CART"; payload:TypeoFProduct}
| {type: "REMOVE_FROM_CART"; payload:number}
| {type: "INCREASE_QUANTITY"; payload:number}
| {type: "DECREASE_QUANTITY"; payload:number}


const cartContext = createContext<{state: CartState; dispach: Dispatch<CartAction>} | undefined>(undefined);

const CartReducer = (state: CartState, action: CartAction) :CartState => {
    switch(action.type){
        case"ADD_TO_CART":
        const existinCartItem = state.cart.find(
            (item) => item.id === action.payload.id
        );

        if(existinCartItem){
            return{
            ...state,
            cart: state.cart.map((item)=>
            item.id === action.payload.id ? {...item, quantity: item.quantity + 1 }
            : item
            ),
            };
        }else{
            return{
                ...state, cart: [...state.cart, {...action.payload, quantity: 1 }],
            };
        }

        case "REMOVE_FROM_CART":
            return{
                ...state, cart:state.cart.filter((item) => item.id !== action.payload)
            };

        case "INCREASE_QUANTITY":
            return{
                ...state, cart: state.cart.map((item) =>
                item.id === action.payload ? {...item, queantity: item.quantity + 1} : item
                ),
            };
        case "DECREASE_QUANTITY":
            return{
                ...state, cart: state.cart.map((item) => item.id === action.payload ?{
                    ...item, quantity: Math.max(item.quantity -1, 1)
                }: item)
            };

            default:
                return state;
    }
};

const CartProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) =>{
    const [state, dispach] = useReducer(CartReducer, {cart:[]});

    return(
        <cartContext.Provider value={{state, dispach}}>
            {children}
        </cartContext.Provider>
    )
}

//!custom Hook

const useCart = () => {
    const context = useContext(cartContext);
    if(!context){
        throw new Error("useCart must be used within Card Provider")
    }
    return context
}

export {CartProvider, useCart}