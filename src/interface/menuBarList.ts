export interface MenuBar {
	id: string,
	name: string,
}

export interface MenuBarProjectType {
	id: string,
	name: string,
	iconHover: string,
	icon: string,
}

export interface MenuBarLocation {
	syncFrom: string,
	syncDate: string,
	ProvinceID: number,
	ProvinceName: string
}

export interface CategoryResponse {
	id: string,
	code: string,
	name: string,
}