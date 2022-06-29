export interface UpdateInfoResponse {
  id: string;
  customerTypeId: string;
  appellation: string;
  fullname: string;
  birth: Date;
  phone: string;
  email: string;
  idNumber: string;
  idReceivePlace: string;
  idReceiveDate: Date;
  domicile: string;
  address: string;
  avatar: string;
  avatarThumbnailUrl: string;
  attachPaper: string;
  attachPaperThumbnailUrl: string;
}

export interface ResponseTrans {
	id: string,
	orderId: string,
	customerId: string,
	phone: string,
	avatar: string,
	fullname: string,
	birth: string,
	email: string,
	idNumber: string,
	businessRegistration: string,
	placeIssue: string,
	dateIssue: string,
	permanentAddress: string,
	address: string,
	province: string,
	district: string,
	type: number,
	method: number,
	value: number,
	bookingCode: string,
	bookingTime: string,
	deposited: string,
	paid:string,
	remaining: string,
	status: string,
	productName: string,
	productId:string,
	projectID: string,
	projectName: string
  }