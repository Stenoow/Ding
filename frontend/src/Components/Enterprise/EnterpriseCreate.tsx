import '../../App.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EnterpriseCreate() {
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const form = {
            name: formData.get('name')
        };
        axios.post("http://localhost:3000/enterprise/create/", form).then((response: any) => {
            navigate("/enterprise/" + response.data.id);
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div>
            <h1>Ajoutez une nouvelle entreprise !</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>
                        Nom de l'entreprise:
                        <input type="text" name="name" id="name"/>
                    </label>
                </div>
                <div>
                    <input type="submit" value="Ajouter l'entreprise"/>
                </div>
            </form>
        </div>
    )
}

export default EnterpriseCreate
