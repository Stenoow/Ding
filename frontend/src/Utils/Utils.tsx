import axios from "axios";
import EnterpriseInterface from "../Interfaces/Enterprise.tsx";
import ProductInterface from "../Interfaces/Product.tsx";

export async function getAllEnterprises(): Promise<EnterpriseInterface[] | null> {
    try {
        let response = await axios.get<EnterpriseInterface[]>(`http://localhost:3000/enterprises`);
        if (response.status < 300 && response.status >= 200) {
            return response.data;
        } else {
            console.error('Error fetching data:', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function getAllProducts(): Promise<ProductInterface[] | null> {
    try {
        let response = await axios.get<ProductInterface[]>(`http://localhost:3000/products`);
        if (response.status < 300 && response.status >= 200) {
            return response.data;
        } else {
            console.error('Error fetching data:', response);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}