export interface PTGType {
	ProjectName: string,
	BlockName: string,
	ProductName :string,
	DepositDate: string,
	IsMortgage : boolean,
	GroupCusID : number,
	ProvinceID : number,
	DistrictID : number,
	PriceID : number,
}

interface ListPolicyType {
	PolicyID?: number,
	PolicyName?: string,
}
interface ListPromotionType {
	PromotionID?: number,
	PromotionName?: string,
	Value?: string,
	Amount?: string
}
interface ListScheduleType {
	ScheduleID?: number,
	ScheduleName?: string
}
export interface PTGResponse {
	DepositMoney?: string,
	PromotionMoney?: string,
	ApartmentPrice?: string,
	LandPrice?: string,
	BuildPrice?: string,
	LandMoney?: string,
	BuildMoney?: string,
	FoundationMoney?: string,
	TotalMoney?: string,
	ListDocument?:[],
	ListPolicy?: ListPolicyType[],
	ListPromotion?: ListPromotionType[],
	ListSchedule?: ListScheduleType[]
}

//interface getListProducts

export interface ProductsType {
	projectId: string,
	location: string,
	projectTypeId: string,	
}
export interface ParamsProducts{
	page: number,
	size: number,
}
export interface ProductsResponse {
	id: string,
	name: string,
	landArea: number,
	numBed: number,
	numBath: number,
	direction: string,
	airConditioner: number,
	swimmingPool: number,
	gym: number,
	projectLevelDetailId: string,
	status: number,
	apartmentModelId: string,
	lotSymbolLegal: string,
	lotSymbolCommercial: string,
	projectId: string,
	homeNum: string,
	wallArea: number,
	clearArea: number,
	price: 10.0,
	unitPrice: number,
	nameProjectType: string,
	tongBanGhi: string
}