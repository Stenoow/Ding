import '../../App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import EnterpriseInterface from "../../Interfaces/Enterprise";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getAllEnterprises} from "../../Utils/Utils.tsx";
import StoreInterface from "../../Interfaces/Store.tsx";

function StoreDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [store, setStore] = useState<StoreInterface>();
    const [enterprises, setEnterprises] = useState<EnterpriseInterface[]>([]);


    useEffect(() => {
        axios.get(`http://localhost:3000/store/${id}` )
            .then((response: any)=> {
                setStore(response.data)
            })
            .catch((error: any) =>  {
                console.error('Error fetching data:', error);
                navigate(-1);
            });
        const fetchData = async () => {
            const enterprises = await getAllEnterprises();
            if (enterprises) {
                setEnterprises(enterprises);
            } else {
                console.error('No enterprises found or error occurred');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const form = {
            name: formData.get('name'),
            enterpriseId: formData.get('enterpriseId'),
            id: id
        };
        axios.post("http://localhost:3000/store/update/", form).then((response: any) => {
            setStore(response.data)
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    const handleDelete = () => {
        axios.delete("http://localhost:3000/store/" + id).then(() => {
            navigate("/store")
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    if (store) {
        return (
            <div>
                <h1>Voici les détails de magasin {store.name}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nom du magasin :</label>
                        <input type="text" name="name" id="name" defaultValue={store.name}/>
                    </div>
                    <div>
                        <label htmlFor="enterpriseId">Propriétaire du magasin :</label>
                        <select name="enterpriseId" id="enterpriseId" defaultValue={store.enterpriseId}>
                            {enterprises.length > 0 ? enterprises.map(enterprise => (
                                <option key={enterprise.id} value={enterprise.id}>{enterprise.name}</option>
                            )) : ""
                            }
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Changer les informations du magasin"/>
                    </div>
                </form>
                <div>
                    <a href={"#"} onClick={handleDelete}>Supprimer le magasin</a>
                </div>
                <div>
                    <Link to={"/store/stock/" + store.id}>Afficher le stockage du magasin</Link>
                </div>
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

export default StoreDetail
