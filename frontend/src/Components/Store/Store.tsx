import '../../App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import StoreInterface from "../../Interfaces/Store.tsx";

function Store() {
    const [data, setData] = useState<StoreInterface[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/stores`)
            .then((response: any)=> {
                setData(response.data)
            })
            .catch((error: any) => console.error('Error fetching data:', error));
    }, []);
    return (
        <div>
            <h1>Ici sont affichées les magasins !</h1>
            <Link to={"/store/create"}>Créez un nouveau magasin</Link>

            {data.length > 0 ? data.map(store => (
                <li key={store.id}><Link to={"/store/" + store.id}>{store.name}</Link></li>
                )) :
                <p>Aucuns magasins disponibles !</p>
            }
        </div>
    )
}

export default Store
