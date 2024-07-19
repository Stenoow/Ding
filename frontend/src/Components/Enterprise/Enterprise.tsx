import '../../App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import EnterpriseInterface from "../../Interfaces/Enterprise";
import {Link} from "react-router-dom";

function Enterprise() {
    const [data, setData] = useState<EnterpriseInterface[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/enterprises`)
            .then((response: any)=> {
                setData(response.data)
            })
            .catch((error: any) => console.error('Error fetching data:', error));
    }, []);
    return (
        <div>
            <h1>Ici sont affichées vos entreprises !</h1>
            <Link to={"/enterprise/create"}>Créez une nouvelle entreprise</Link>

            {data.length > 0 ? data.map(enterprise => (
                <li key={enterprise.id}><Link to={"/enterprise/" + enterprise.id}>{enterprise.name}</Link></li>
                )) :
                <p>Aucunes entreprises disponibles !</p>
            }
        </div>
    )
}

export default Enterprise
