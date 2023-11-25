import axios from "axios";
import MySecurity from "./mySecurity";
export const endPoint = "http://127.0.0.1:3000/dummydata/";

export default class ClientAPI{ 
    static async post(action,data,selectedImage){
        const formData = new FormData();
        switch(action){
            case "login":                
            case "register":               
            case "logout":               
            // product
            case "getProduct":                
            case "getProductDetail":  
            case "removeProduct":
            case "getCategories":
            case "addProduct":
            case "updateProduct":
            // order
            case "addCart":               
            case "getCartItem":
            case "updateCartItem":
            case "checkOutCart":
            case "getContact":
            case "getOrderHistory":                
            case "getOrderHistoryDeatail":                
            case "updateOrderStatus":
                formData = MySecurity.encryptedPackage(action, data, selectedImage);  
                break;
            default:
                console.log("Bad request");
                return null;
        }             
            
        return await axios.post(endPoint, formData);        
    }
    

}
