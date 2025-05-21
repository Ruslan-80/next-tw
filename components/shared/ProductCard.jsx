import React from "react";
import "./product-card.css"; // Стили для карточки

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src="/images/vru.jpg"
                alt={product.name}
                className="product-image"
            />
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                {/* <ul className="product-specs">
                    {product.attributes.map((spec, index) => (
                        <li key={index}>
                            {spec.attributeName}:{spec.attributeValueName}
                        </li>
                    ))}
                </ul> */}
                <p className="product-price">${product.basePrice}</p>
            </div>
        </div>
    );
};

export default ProductCard;
