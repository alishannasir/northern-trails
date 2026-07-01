import type { StrapiEntity } from './common';

export type StrapiDivision = StrapiEntity & {
	name: string;
};

export type StrapiDistrict = StrapiEntity & {
	name: string;
	division?: StrapiDivision | null;
};

export type StrapiTehsil = StrapiEntity & {
	name: string;
	district?: StrapiDistrict | null;
};
