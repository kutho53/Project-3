import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as Interfaces from '../utils/types';
import { REMOVE_CLIENT, UPDATE_CLIENT } from '../utils/mutations';
import { useMutation } from '@apollo/client';


const ClientsList: React.FC<Interfaces.IncomingArgProps> = ({ onClientUpdated, clients = [] }) => {
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [updatedClientId, setUpdatedClientId] = useState('');
  let [deleteClientId, setDeleteClientId] = useState('');

  const [createClient, { loading: creating }] = useMutation(UPDATE_CLIENT);
  const [deleteClient] = useMutation(REMOVE_CLIENT)

  if (!clients.length) {
    return <h3>No Clients Yet</h3>;
  }

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
            client_id: updatedClientId,
            client: { ...newClient }
          }
        },
      });

      onClientUpdated();
      // Reset form and close modal
      setNewClient({ firstName: "", lastName: "", buisnessName: "", phoneNumber: "", email: "", });
      setIsModalOpen(false);

    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteClient = async () => {
    try {
      await deleteClient({
        variables: {
          input: {
            user_id: `${userId}`,
            client_id: deleteClientId
          }
        },
      });

      onClientUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {clients &&
          clients.map((client) => (
            <div key={client._id} className='col'>
              <div className="card">
                <div className='card-body'>
                  <h4 className="card-title">
                    {client.firstName}, {client.lastName} <br />
                  </h4>
                  {/* Add Client Modal */}
                  <h6 className='card-subtitle mb-2 text-body-secondary'>{client.buisnessName}</h6>
                  <p className='card-text'>Most recent hour logged: </p>
                  <Link
                    className="card-link"
                    to={`/user/${userId}/client/${client._id}`}
                  >
                    View Client Details
                  </Link>
                  <button
                    type='button'
                    className="btn btn-secondary card-link"
                    onClick={() => {setIsModalOpen(true); setUpdatedClientId(client._id)}}
                  >
                    Edit
                  </button>
                  <button
                    type='button'
                    className="btn btn-danger card-link"
                    onClick={() => {handleDeleteClient(), setDeleteClientId(client._id)}}
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
      </div>
              {/* Add Client Modal */}
              {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>Edit Client</h2>
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
                  <button type="submit" disabled={creating}>{creating ? 'Updating...' : 'Edit Client'}</button>
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
  );
};

export default ClientsList;
