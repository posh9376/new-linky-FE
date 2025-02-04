/* eslint-disable react/prop-types */
import cart from './assets/cart-4-svgrepo-com.svg'


function ProductItems({image, title, description, price, location ,handleAddCart}) {
   
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">Ksh. {price}</p>
                <p className="card-text">{location}</p>
                <button className="btn btn-primary"><img src={cart} width={40} alt="cart" onClick={handleAddCart}/>Add to cart</button>
            </div>
        </div>
    );
}

export default ProductItems