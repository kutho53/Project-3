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
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [newClient, setNewClient] = useState({
            name: "",
            phone: "",
            email: ""
        });
    
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
    
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setNewClient(prev => ({
                ...prev,
                [name]: value
            }));
        };
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            // Here you would typically send the data to your backend
            console.log('New Client Data:', newClient);
            // Reset form and close modal
            setNewClient({ name: "", phone: "", email: "" });
            setIsModalOpen(false);
        };
    
        // Close search results when clicking outside
        useEffect(() => {
            const handleClickOutside = () => setIsSearching(false);
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }, []);
    
        return(
           <nav className="navbar">
                <Link to='/' className="nav-home">Home</Link>
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
                <button 
                    className="add-client-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add New Client
                </button>
    
                {/* Add Client Modal */}
                {isModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>Add New Client</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={newClient.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number:</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={newClient.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={newClient.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit">Add Client</button>
                                    <button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
           </nav> 
        )
    }