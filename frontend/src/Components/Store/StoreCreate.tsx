import '../../App.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import EnterpriseInterface from "../../Interfaces/Enterprise.tsx";
import {getAllEnterprises} from "../../Utils/Utils.tsx";

function StoreCreate() {
    const navigate = useNavigate();
    const [data, setData] = useState<EnterpriseInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const enterprises = await getAllEnterprises();
            if (enterprises) {
                setData(enterprises);
            } else {
                console.error('No enterprises found or error occurred');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (!formData.get('enterpriseId')) {
            return;
        }
        const form = {
            name: formData.get('name'),
            enterpriseId: formData.get('enterpriseId')
        };
        axios.post("http://localhost:3000/store/create/", form).then((response: any) => {
            navigate("/store/" + response.data.id);
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div>
            <h1>Ajoutez un nouveau magasin !</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>
                        Nom du magasin:
                        <input type="text" name="name" id="name"/>
                    </label>
                </div>
                <div>
                    <label>
                        L'entreprise:
                        <select name="enterpriseId" id="enterpriseId">
                            <option value="">Choisissez une entreprise</option>
                            {data.length > 0 ? data.map(enterprise => (
                                <option key={enterprise.id} value={enterprise.id}>{enterprise.name}</option>
                                )) : ""
                            }
                        </select>
                    </label>
                </div>
                <div>
                    <input type="submit" value="Ajouter le magasin"/>
                </div>
            </form>
        </div>
    )
}

export default StoreCreate
