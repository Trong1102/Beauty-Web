import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
    return (
        <section className="py-20 bg-white-50">
            <div className="container">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Our Essentials</h2>
                        <p className="text-muted">Clinically proven formulas for a radiant complexion.</p>
                    </div>
                </div>
                <div className="product-grid-shop">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
