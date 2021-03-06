export type Role = 'CLIENT' | 'ITEMEDITOR' | 'ADMIN' | 'SUPERADMIN'

export interface User {
  id: string
  username: string
  email: string
  roles: Role[]
  createdAt: string
}

export type SignupArgs = Pick<User, 'username' | 'email'> & { password: string }

export type SigninArgs = Omit<SignupArgs, 'email'>;


// Tire
export interface Factory {
  id: string
  factoryName: string
  productsMe: FactoryProduct[]
  receivedProducts: FactoryProduct[]
  createdAt: string
  user: User
}
export type FactoryArgs = Pick<Factory, 'factoryName'> 

export interface FactoryProduct {
  id: string
  factoryName: Factory
  productName: string
  factoryReceive: Factory[]
  description: string
  imageUrl: string
  createdAt: string
  user: User
}
// new Tier
export interface Tier {
  id: string;
  industrialEstate: string;
  businessType: string;
  companyName: string;
  description: string;
  address: string;
  phoneNumber: string;
  FAX: string;
  Email: string;
}