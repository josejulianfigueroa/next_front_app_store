export interface OrdersAll {
    id:            string;
    subTotal:      number;
    tax:           number;
    total:         number;
    itemsInOrder:  number;
    isPaid:        boolean;
    paidAt:        Date;
    createAt:      Date;
    transactionId: string;
    user:          User;
    orderAddress:  OrderAddress[];
}

export interface OrderAddress {
    id:        string;
    firstName: string;
    lastName:  string;
    address:   string;
    address2:  string;
    phone:     string;
    city:      string;
    country:   Country;
}

export interface Country {
    id:   string;
    name: string;
}

export interface User {
    id:            string;
    email:         string;
    image:         string;
    fullName:      string;
    isActive:      boolean;
    emailVerified: boolean;
    role:          string;
}
