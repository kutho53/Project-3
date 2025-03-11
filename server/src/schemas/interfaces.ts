export interface UserArgs {
    _id: string;
}

export interface AddUserArgs {
    input: {
        userName: string;
        password: string;
    }
}

export interface AddClientArgs {
    input: {
        user_id: string;
        client_id?: string;
        client: {
            firstName: string;
            lastName: string;
            buisnessName: string;
            phoneNumber: string;
            email: string;
        }
    }
}

export interface AddHourArgs {
    input: {
        user_id: string;
        client_id: string;
        hour: {
            startDate: string;
            endDate: string;
            loggedTime: string;
            status: string;
        }
    }
}

export interface DeleteArgs {
    input: {
        user_id: string;
        client_id: string;
        hour_id?: string;
    }
}