export type UserRole = 'admin' | 'moderator' | 'user';

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
};

export type Hair = {
  color: string;
  type: string;
};

export type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

export type Company = {
  department: string;
  name: string;
  title: string;
  address: Address;
};

export type Crypto = {
  coin: string;
  wallet: string;
  network: string;
};

export type UserModel = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  /** Derived in the mapper: `${firstName} ${lastName}`. */
  fullName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  /** Parsed from the API's `"1996-5-30"` string. */
  birthDate: Date;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: UserRole;
};

export type AllUsersModel = {
  users: UserModel[];
  total: number;
  skip: number;
  limit: number;
  /** Derived in the mapper: `skip + users.length < total`. */
  hasMore: boolean;
};
