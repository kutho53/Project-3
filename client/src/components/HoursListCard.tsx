import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Interfaces from '../utils/types';
import { REMOVE_HOUR } from '../utils/mutations';
import { useMutation } from '@apollo/client';


const HoursList: React.FC<Interfaces.HoursList> = ({ onHourUpdated, hours = [] }) => {
  const { userId, clientId } = useParams();
  const [updatedHourId, setUpdatedHourId] = useState('');

 
  const [DeleteHour] = useMutation(REMOVE_HOUR);

  const handleDeleteHour = async () => {
    try {
      await DeleteHour({
        variables: {
          input: {
            user_id: `${userId}`,
            client_id: `${clientId}`,
            hour_id: updatedHourId
          }
        },
      });

      onHourUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {hours &&
          hours.map((hour) => (
            <div key={hour._id} className='col'>
              <div className="card">
                <div className='card-body'>
                  <h4 className="card-title">
                    {hour.startDate} - {hour.endDate} <br />
                  </h4>
                  {/* Add Hour Modal */}
                  <h5 className='card-subtitle mb-2 text-body-secondary'>{hour.loggedTime} hours logged</h5>
                  <p className='card-text'>status: {hour.status}</p>
                  <button
                    type='button'
                    className="btn btn-danger card-link"
                    onClick={() => {handleDeleteHour(), setUpdatedHourId(hour._id)}}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HoursList;