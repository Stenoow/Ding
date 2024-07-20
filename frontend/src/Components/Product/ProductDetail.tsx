import '../../App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import ProductInterface from "../../Interfaces/Product.tsx";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductInterface>();


    useEffect(() => {
        axios.get(`http://localhost:3000/product/${id}` )
            .then((response: any)=> {
                setProduct(response.data)
            })
            .catch((error: any) =>  {
                console.error('Error fetching data:', error);
                navigate(-1);
            });
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const form = {
            name: formData.get('name'),
            id: id
        };
        axios.post("http://localhost:3000/product/update/", form).then((response: any) => {
            setProduct(response.data)
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    const handleDelete = () => {
        axios.delete("http://localhost:3000/product/" + id).then(() => {
            navigate("/product")
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    if (product) {
        return (
            <div>
                <h1>Voici les détails du produit {product.name}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nom du magasin :</label>
                        <input type="text" name="name" id="name" defaultValue={product.name}/>
                    </div>
                    <div>
                        <input type="submit" value="Modifier le nom du produit"/>
                    </div>
                </form>
                <a href={"#"} onClick={handleDelete}>Supprimer le produit</a>
            </div>
        )
    } else {
        return (
            <div>
                <p>Chargement de l'aperçu !</p>
            </div>
        )
    }
}

export default ProductDetail
