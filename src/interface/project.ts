export interface ProjectResponse {
	id: string,
	name: string,
	location: string,
	constructArea: number,
	density: number,
	type: string,
	scale: string,
	funcDivision: string,
	ownership: string,
	description: string,
	avatar: string,
	code: string,
	tradeName: string,
	abbreviationName: string,
	status: string,
	commune: string,
	district: string,
	provincial: string,
	modifyDate: string,
	lsName: string,
	tongBanGhi: string
}

export interface ParamsProjects{
	page: number,
	size: number,
}