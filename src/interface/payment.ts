export interface PaymentListByIdAPI{
	ScheduleID: number,
	LandMoney: number,
	BuildMoney: number,
	FoundationMoney: number,
	TotalMoney: number
}

export interface PaymentListResponse {
	Number: number,
	Date: string,
	Description: string,
	Type1: number,
	Percentage1:string,
	Amount1: string,
	Type2: number,
	Percentage2: string,
	Amount2: string,
	Type3: number,
	Percentage3:string,
	Amount3: string,
	Amount: string
}