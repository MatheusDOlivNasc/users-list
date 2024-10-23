export type UserModel = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  city: string;
  company: string;
};

export type DefaultUserModel = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;

  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
