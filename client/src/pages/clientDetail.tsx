
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import * as Interfaces from '../utils/types';
import { QUERY_ME } from '../utils/queries';
import Header from '../components/header';
import HoursList from '../components/HoursListCard';
import { useState } from 'react';
import { ADD_HOUR } from '../utils/mutations';
//import Auth from '../utils/auth';

export default function ClientDetail(){
    const { userId, clientId } = useParams();
    const [createHour, { loading: creating }] = useMutation(ADD_HOUR)
    const { loading, data, refetch } = useQuery(QUERY_ME, {
      variables: {id: `${userId}` },
    });

  const clients: Interfaces.Client[] = data?.me?.clients;
  const client: Interfaces.Client | undefined = clients.find(client => client._id.toString() === clientId);
  const totalLoggedTime = client?.hours?.reduce((acc, hour) => acc + parseFloat(hour.loggedTime), 0) || 0;

  if (loading) {
    return <div>Loading...</div>;
  }

  const [newHour, setNewHour] = useState({
    startDate: "",
    endDate: "",
    loggedTime: "",
    status: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHour(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHour({
        variables: {
          input: {
            user_id: `${userId}`,
            client_id: `${clientId}`,
            hour: { ...newHour }
          }
        },
      });

      refetch();
      // Reset form and close modal
      setNewHour({ startDate: "", endDate: "", loggedTime: "", status: ""});

    } catch (e) {
      console.error(e);
    }
  };

  const handleHoursEdit = () => {
    refetch();
  }

  return (
    <div className='container'>
      <div className='row app-header'>
        <Header />
      </div>

      <div className='app-main'>
        <div className='row'>
          <div className='col'>
            <Link to={`/user/${userId}`}>back</Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-6 text-center'>
            <h3 className='mt-5'>
              Client: {client?.firstName} {client?.lastName} 
            </h3>
            <p>Buissness: {client?.buisnessName}</p>
            <p>Email: {client?.email}</p>
            <p>phoneNumber: {client?.phoneNumber}</p>

            <div className='mt-5'>
              <h4>Total logged time: {totalLoggedTime}</h4>
            </div>
          </div>
          <div className='col-6 modal-content'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="text"
                    id="startDate"
                    name="startDate"
                    value={newHour.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="text"
                    id="endDate"
                    name="endDate"
                    value={newHour.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loggedTime">Log Hours: </label>
                  <input
                    type="text"
                    id="loggedTime"
                    name="loggedTime"
                    value={newHour.loggedTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Set Status:</label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={newHour.status}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className='btn btn-secondary mb-3' disabled={creating}>{creating ? 'Creating...' : 'Create Hour'}</button>
                </div>
            </form>
          </div>
        </div>
        
        <div className='client-list'>
            <h3 hidden={client?.hours && client.hours.length > 0}>No hours logged</h3>
            
          {client?.hours && client.hours.length > 0 && <HoursList hours={client.hours} onHourUpdated={handleHoursEdit} />}
        </div>
        
      </div>
    </div>
  );
}