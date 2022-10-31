import { useContext } from "react";
import ClientsContext from "../context/ClientProvider";


const useClients = () => {
    return useContext(ClientsContext)
}
export default useClients
