import type { StrapiTimestamps } from './common';

export type StrapiMediaFormat = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
};

export type StrapiMediaFormats = {
	large?: StrapiMediaFormat;
	medium?: StrapiMediaFormat;
	small?: StrapiMediaFormat;
	thumbnail?: StrapiMediaFormat;
};

export type StrapiMedia = StrapiTimestamps & {
	id: number;
	documentId: string;
	name: string;
	alternativeText?: string | null;
	caption?: string | null;
	width?: number | null;
	height?: number | null;
	formats?: StrapiMediaFormats | null;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl?: string | null;
	provider: string;
	provider_metadata?: Record<string, unknown> | null;
	focalPoint?: Record<string, unknown> | null;
};
