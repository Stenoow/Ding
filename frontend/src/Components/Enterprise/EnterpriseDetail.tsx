import '../../App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import EnterpriseInterface from "../../Interfaces/Enterprise";
import {useNavigate, useParams} from "react-router-dom";

function EnterpriseDetail() {
    const { id } = useParams();
    const [enterprise, setEnterprise] = useState<EnterpriseInterface>();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3000/enterprise/${id}` )
            .then((response: any)=> {
                setEnterprise(response.data)
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
        axios.post("http://localhost:3000/enterprise/update/", form).then((response: any) => {
            setEnterprise(response.data)
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    const handleDelete = () => {
        axios.delete("http://localhost:3000/enterprise/" + id).then(() => {
            navigate("/enterprise")
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    if (enterprise) {
        return (
            <div>
                <h1>Voici les détails de {enterprise.name}</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Nom de l'entreprise:
                            <input type="text" name="name" id="name" defaultValue={enterprise.name}/>
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Changer le nom"/>
                    </div>
                </form>
                <a href={"#"} onClick={handleDelete}>Supprimer l'entreprise</a>
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

export default EnterpriseDetail
