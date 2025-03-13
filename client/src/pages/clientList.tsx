import { useMutation, useQuery } from '@apollo/client';
import Header from '../components/header';
import ClientsList from '../components/ClientListCard';
import { QUERY_ME } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ADD_CLIENT } from '../utils/mutations';

const ClientList: React.FC = () => {
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, data, refetch } = useQuery(QUERY_ME, {
    variables: { id: `${userId}` },
  });
  const [createClient, { loading: creating }] = useMutation(ADD_CLIENT)
  const me = data?.me;

  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    buisnessName: "",
    phoneNumber: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClient({
        variables: {
          input: {
            user_id: `${userId}`,
            client: { ...newClient }
          }
        },
      });

      refetch();
      // Reset form and close modal
      setNewClient({ firstName: "", lastName: "", buisnessName: "", phoneNumber: "", email: "", });
      setIsModalOpen(false);

    } catch (e) {
      console.error(e);
    }
  };

  const handleClientEdit = () => {
    refetch();
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='container'>
      <div className='row app-header'>
        <Header />
      </div>

      <div className='app-main'>
        <div className='row'>
          <div className='col-8'>
            <h2>
              {me?.userName}
            </h2>
          </div>
          <div className='col-4'>
            <button
              type='button'
              className="btn btn-secondary"
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
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={newClient.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={newClient.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="buisnessName">Buisness Name:</label>
                      <input
                        type="text"
                        id="buisnessName"
                        name="buisnessName"
                        value={newClient.buisnessName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number:</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={newClient.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address:</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={newClient.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="modal-buttons">
                      <button type="submit" disabled={creating}>{creating ? 'Creating...': 'Create Client'}</button>
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
          </div>
        </div>
        
        <div className='client-list'>
          {me?.clients?.length > 0 && <ClientsList clients={me?.clients} onClientUpdated={handleClientEdit} />}
        </div>
        
      </div>
    </div>
  );
};

export default ClientList;