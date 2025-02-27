//Navbar will be at top of every page containing:
    //"Home" button that redirects to "clientList.tsx"
    //"add client" button in top right corner 
        // generates a pop up with text entry boxes for "name", "phone number", and "email address"
    //Possibly include search bar that can search for clients by name

import {Link} from "react-router-dom";

export default function NavBar(){
    return(
       <nav>
            <Link to='/'>Home</Link>
            <ul>Placeholder for search bar</ul>
            <button>Add New Client</button>
       </nav> 
    )
}