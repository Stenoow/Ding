import '../../App.css'
import {useEffect, useState} from "react";
import EnterpriseInterface from "../../Interfaces/Enterprise";
import {Link} from "react-router-dom";
import {getAllEnterprises} from "../../Utils/Utils.tsx";

function Enterprise() {
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
