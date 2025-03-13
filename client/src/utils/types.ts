export  interface QueryInterface {
  me: MeQueryInterface
}

export  interface MeQueryInterface {
  _id: string;
  userName: string;
}

export interface IncomingArgProps {
    clients: ClientListProps[];
    onClientUpdated: () => void;
  }
  
  export interface ClientListProps {
    _id: string;
    firstName: string;
    lastName: string;
    buisnessName: string;
    phoneNumber: string;
    email: string;
    hours: HoursListProps[]
  }
  
   export interface HoursList {
    hours: HoursListProps[];
    onHourUpdated: () => void;
  }

  export interface HoursListProps {
    _id: string;
    startDate: string;
    endDate: string;
    loggedTime: string;
    status: string;
  }

  
  export interface Client {
    _id: string,
    buisnessName: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber:string,
    hours: Hour[]
  }

  export interface Hour {
    _id: string,
    startDate: string,
    endDate: string,
    loggedTime: string,
    status: string
  }