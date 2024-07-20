import '../../App.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ProductCreate() {
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const form = {
            name: formData.get('name')
        };
        axios.post("http://localhost:3000/product/create/", form).then((response: any) => {
            navigate("/product/" + response.data.id);
        }).catch((error: any) => {
            console.error('Error fetching data:', error);
        });
    }

    return (
        <div>
            <h1>Ajoutez un nouveau produit !</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>
                        Nom du produit:
                        <input type="text" name="name" id="name"/>
                    </label>
                </div>
                <div>
                    <input type="submit" value="Ajouter le produit"/>
                </div>
            </form>
        </div>
    )
}

export default ProductCreate
