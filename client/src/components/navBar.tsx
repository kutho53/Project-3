//Navbar will be at top of every page containing:
    //"Home" button that redirects to "clientList.tsx"
    //"add client" button in top right corner 
        // generates a pop up with text entry boxes for "name", "phone number", and "email address"
    //Possibly include search bar that can search for clients by name

    import { Link } from "react-router-dom";
    import { useState, useEffect } from "react";
    
    export default function NavBar(){
        const [searchTerm, setSearchTerm] = useState("");
        const [searchResults, setSearchResults] = useState<string[]>([]);
        const [isSearching, setIsSearching] = useState(false);
        
        // Placeholder client data - replace this with your actual client data
        const dummyClients = [
            "John Doe",
            "Jane Smith",
            "Bob Johnson",
            "Alice Brown",
            "Charlie Wilson"
        ];
    
        const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchTerm(value);
            setIsSearching(value.length > 0);
    
            // Filter clients based on search term
            const filteredResults = dummyClients.filter(client =>
                client.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
        };
    
        // Close search results when clicking outside
        useEffect(() => {
            const handleClickOutside = () => setIsSearching(false);
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }, []);
    
        return(
           <nav className="navbar">
                <div className="search-container">
                    <input
                        type="search"
                        placeholder="Search for clients..."
                        value={searchTerm}
                        onChange={handleSearch}
                        onClick={(e) => {
                            e.stopPropagation();
                            if(searchTerm) setIsSearching(true);
                        }}
                        className="search-input"
                    />
                    {isSearching && (
                        <div className="search-results">
                            {searchResults.length > 0 ? (
                                searchResults.map((result, index) => (
                                    <div 
                                        key={index} 
                                        className="search-result-item"
                                        onClick={() => {
                                            setSearchTerm(result);
                                            setIsSearching(false);
                                            console.log(`Selected client: ${result}`);
                                        }}
                                    >
                                        {result}
                                    </div>
                                ))
                            ) : (
                                <div className="search-result-item no-results">
                                    No clients found
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <Link to='/' className="nav-home">Sign Out</Link>
           </nav> 
        )
    }