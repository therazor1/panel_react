import { useContext } from "react";
import PanelContext from "../context/PanelProvider";


const usePanel = () => {
    return useContext(PanelContext)
}
export default usePanel