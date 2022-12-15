import { simplifiedDBApi, useDBApi, useStorageApi } from "../shared/Api"
import { ProjectWCustomer } from "../types/Project";
import BasicMenu from "../uiElements/BasicMenu"
import ButtonAppBar from "../uiElements/ButtonAppBar"
import LogIn from "./login/LogIn";


/**
 * Component to display summary
 */
export const Summary = () =>{

    // *** Constants and variables ***
    const auth = useStorageApi("userToken");

    console.log("auth: ", auth);
    
    if(!auth) return <LogIn />;

    simplifiedDBApi("GET","testing")
    .then((res: any) =>console.log("resting res ", res))

    

return(
<>
    <ButtonAppBar currentPage="Summary" />
        <h3>
            Summary
        </h3>
</>

    )

}