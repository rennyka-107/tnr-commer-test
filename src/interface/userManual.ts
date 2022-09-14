export interface responseUserManual  {
	id: string,
	name: string,
	status: number,
	description: string,
	iconUrl: string,
	createAt: string,
	icon: string
  }

export interface userManualContent {
	id: string,
	userManualId: string,
	content: string,
	summaryContent: string,
	media: string,
	projectName: string,
	category: string,
	thumbnailUrl: string,
	status: number,
	createAt: string,
	updateAt: string
  }

  export interface userManualByID {
	userManual: responseUserManual,
	userManualContent: userManualContent
  }