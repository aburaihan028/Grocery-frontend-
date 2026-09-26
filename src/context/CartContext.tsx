import { createContext, use, useEffect, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';
interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

// Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// ============= Context Cart Porvider ====================
export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('app_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // items পরিবর্তন হলে cart data localStorage-এ save করে
        localStorage.setItem('app_cart', JSON.stringify(items));
    }, [items]);

    // Add To Cart Function
    const addToCart = (product: Product, quantity = 1) => {
        // items state update করছি
        setItems((prev) => {
            // Cart-এ product আগে থেকেই আছে কিনা খুঁজে বের করছি
            const existing = prev.find(
                (item) => item?.product?._id === product?._id,
            );

            // যদি product আগে থেকেই cart-এ থাকে
            if (existing) {
                // পুরো array loop করবো
                return prev.map((item) =>
                    // বর্তমান item-এর product id
                    // এবং add করতে আসা product id match করলে
                    item?.product?._id === product?._id
                        ? // quantity update করবো
                          {
                              ...item, // আগের item-এর সব data copy
                              quantity: item.quantity + quantity, // quantity বৃদ্ধি
                          }
                        : // match না করলে item অপরিবর্তিত থাকবে
                          item,
                );
            }

            // Product cart-এ না থাকলে
            // নতুন item array-এর শেষে add করবো
            return [
                ...prev, // আগের সব cart items
                {
                    product, // নতুন product
                    quantity, // quantity
                },
            ];
        });

        setIsCartOpen(true);
    };

    // Remove From Cart Function
    const removeFromCart = (productId: string) => {
        setItems((prev) =>
            prev.filter((item) => item.product._id !== productId),
        );
    };

    //  Update Quantity Cart Function
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item?.product?._id === productId ? { ...item, quantity } : item,
            ),
        );
    };

    // Clear Cart Function
    const clearCart = () => {
        setItems([]);
        setIsCartOpen(false);
    };

    // Cart Product Amount Plus
    const cartCount = items.reduce((sum, item) => sum + item?.quantity, 0);
    const cartTotal = items.reduce(
        (sum, item) => sum + item?.product?.price * item?.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    const context = use(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}

export { useCart };
