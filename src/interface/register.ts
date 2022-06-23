export interface RegisterResponse {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: true;
  createdDate: Date;
  phone: string;
}
export interface BodySalePolicy {
	id: string,
	name: string,
	project: any,
	projectId: string,
	content: string
  }

export interface BodyResponseSalePolicy {
	content: BodyResponseSalePolicy[]
}