
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import * as Interfaces from '../utils/types';
import { QUERY_ME } from '../utils/queries';
import Header from '../components/header';
import HoursList from '../components/HoursListCard';
//import Auth from '../utils/auth';

export default function ClientDetail(){
    const { userId, clientId } = useParams();

    const { loading, data, refetch } = useQuery(QUERY_ME, {
      variables: {id: `${userId}` },
    });

  const clients: Interfaces.Client[] = data?.me?.clients;
  const client: Interfaces.Client | undefined = clients.find(client => client._id === clientId);

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <div className='col-8'>
            <h3>
              Client: {client?.firstName} {client?.lastName} 
            </h3>
            <Link to={`/user/${userId}`}>back</Link>
          </div>
          <div className='col-4'>
            <p>Buissness: {client?.buisnessName}</p>
            <p>Email: {client?.email}</p>
            <p>phoneNumber: {client?.phoneNumber}</p>
          </div>
        </div>
        
        <div className='client-list'>
          {client?.hours && client.hours.length > 0 && <HoursList hours={client.hours} onHourUpdated={handleHoursEdit} />}
        </div>
        
      </div>
    </div>
  );
}