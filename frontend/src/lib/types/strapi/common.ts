export type StrapiMeta = {
	pagination?: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	};
};

export type StrapiResponse<T> = {
	data: T;
	meta?: StrapiMeta;
};

export type StrapiTimestamps = {
	createdAt: string;
	updatedAt: string;
	publishedAt?: string | null;
};

export type StrapiEntity = StrapiTimestamps & {
	id: number;
	documentId: string;
};

export type StrapiComponent = {
	id: number;
};
