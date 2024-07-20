import '../../App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import StoreInterface from "../../Interfaces/Store.tsx";
import {getAllProducts} from "../../Utils/Utils.tsx";
import ProductInterface from "../../Interfaces/Product.tsx";
import StockInterface from "../../Interfaces/Stock.tsx";

function StoreStock() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [store, setStore] = useState<StoreInterface>();
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [stocks, setStocks] = useState<StockInterface[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const productsFetched = await getAllProducts();
            if (productsFetched) {
                setProducts(productsFetched);
            } else {
                console.error('No products found or error occurred');
            }
        };

        fetchData();
        axios.get(`http://localhost:3000/store/${id}` )
            .then((response: any)=> {
                setStore(response.data);
            })
            .catch((error: any) =>  {
                console.error('Error fetching data:', error);
                navigate(-1);
            });
        axios.get(`http://localhost:3000/stocks/${id}` )
            .then((response: any)=> {
                setStocks(response.data);
            })
            .catch((error: any) =>  {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        for (let product of products) {
            let stock = stocks.find(stock => stock.productId === product.id);
            if (stock) {
                const form = {
                    stockId: stock.id,
                    quantity: formData.get("" + product.id),
                    storeId: id,
                    productId: product.id
                };
                axios.post("http://localhost:3000/stock/update/", form).catch((error: any) => {
                    console.error('Error fetching data:', error);
                });
            } else {
                const form = {
                    quantity: formData.get("" + product.id),
                    storeId: id,
                    productId: product.id
                };
                axios.post("http://localhost:3000/stock/create/", form).catch((error: any) => {
                    console.error('Error fetching data:', error);
                });
            }
            axios.get(`http://localhost:3000/stocks/${id}` )
                .then((response: any)=> {
                    setStocks(response.data);
                })
                .catch((error: any) =>  {
                    console.error('Error fetching data:', error);
                });
        }
    }

    if (store) {
        return (
            <div>
                <h1>Voici les stocks de {store.name}</h1>
                <form onSubmit={handleSubmit}>
                    {products.length > 0 ? products.map(product => (
                            <div key={product.id}>
                                <label htmlFor={"product" + product.id}>Stock du produit {product.name} :</label>
                                <input type="number" min="0" name={"" + product.id} id={"product" + product.id}
                                       defaultValue={stocks.find(stock => stock.productId == product.id)?.quantity ?? 0}/>
                            </div>
                        )) :
                        <p>Aucuns produits disponibles !</p>
                    }
                    <div>
                        <input type="submit" value="Mettre à jour les stocks"/>
                    </div>
                </form>
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

export default StoreStock
