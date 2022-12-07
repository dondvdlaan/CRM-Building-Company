import { useStorageApi } from "../../shared/Api";
import ButtonAppBar from "../../uiElements/ButtonAppBar"
import LogIn from "../login/LogIn";


/**
 * Component to list all references
 */
export const ListReferences = () =>{

  // *** Constants and variables ***  
  // Check if user is logged in
  const auth = useStorageApi("userToken");
  
  if(!auth) return <LogIn />;
  
    return(
        <>
        
<ButtonAppBar currentPage="References" />
        <h3>
            List References
        </h3>
        </>

    )

}