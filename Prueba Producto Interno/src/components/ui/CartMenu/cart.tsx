import "./Cart.css"

const Cart = () => {
    return(
        <div className="cart">
            <div className="closeIcon">
                <span>X</span>
            </div>
            <div className="cartItems">
                <h2>Tu Carrito </h2>
                <p>Tu carrito esta vacío</p>
            </div>
            <div>
                <div className="product_selected">
                    <div className="imageArea">
                        <img src="" alt="" />
                        <p>Nombre del producto</p>
                    
                    </div>
                    <div className="increaseDecrease">
                        <button>+</button>
                        <span>1</span>
                        <button>-</button>
                        <div className="remove">
                            <button>Remover</button>
                        </div>
                        <span>$ 100.000</span>
                    </div>
                </div>
            </div>
            <div className="total_price">
                <h2 className="total">
                    total:
                    <p>$23</p>
                </h2>

            </div>
        </div>
    )
}

export default Cart