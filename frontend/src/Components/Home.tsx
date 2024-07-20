import '../App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import ProductInterface from "../Interfaces/Product.tsx";
import {Link} from "react-router-dom";

function Home() {
    const [product, setProduct] = useState<ProductInterface>();

    useEffect(() => {
        axios.get(`http://localhost:3000/stats/product/maxQuantity`)
            .then((response: any)=> {
                setProduct(response.data)
            })
            .catch((error: any) => console.error('Error fetching data:', error));
    }, []);
    return (
        <div>
            <h1>Bienvenue sur la gestion de vos entreprises !</h1>

            <p>Produit avec la quantité la plus importante aujourd'hui : {product ?
                <Link to={"/product/" + product.id}>{product.name}</Link>
                : "Pas de stocks disponibles"}
            </p>
        </div>
    )
}

export default Home
