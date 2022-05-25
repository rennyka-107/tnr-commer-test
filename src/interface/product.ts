export interface PTGType {
	ProjectName: string,
	BlockName: string,
	ProductName :string,
	DepositeDate: string,
	IsMortgage : boolean,
	GroupCusID : number,
	ProvinceID : number,
	DistrictID : number,
	PriceID : number,
}

interface ListPolicyType {
	PolicyID: number,
	PolicyName: string,
}
interface ListPromotionType {
	PromotionID: number,
	PromotionName: string,
	Value: string,
	Amount: string
}
interface ListScheduleType {
	ScheduleID: number,
	ScheduleName: string
}
export interface PTGResponse {
	DepositMoney: string,
	PromotionMoney: string,
	ApartmentPrice: string,
	LandPrice: string,
	BuildPrice: string,
	LandMoney: string,
	BuildMoney: string,
	FoundationMoney: string,
	TotalMoney: string,
	ListDocument:[],
	ListPolicy: ListPolicyType[],
	ListPromotion: ListPromotionType[],
	ListSchedule: ListScheduleType[]
}