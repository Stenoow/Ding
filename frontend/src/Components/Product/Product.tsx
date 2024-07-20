import '../../App.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ProductInterface from "../../Interfaces/Product.tsx";
import {getAllProducts} from "../../Utils/Utils.tsx";

function Product() {
    const [products, setProducts] = useState<ProductInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const products = await getAllProducts();
            if (products) {
                setProducts(products);
            } else {
                console.error('No products found or error occurred');
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <h1>Ici sont affichées les produits !</h1>
            <h2>Ces produits peuvent êtres ajoutés aux magasins</h2>
            <Link to={"/product/create"}>Créez un nouveau produit</Link>

            {products.length > 0 ? products.map(product => (
                <li key={product.id}><Link to={"/product/" + product.id}>{product.name}</Link></li>
                )) :
                <p>Aucuns produits disponibles !</p>
            }
        </div>
    )
}

export default Product
