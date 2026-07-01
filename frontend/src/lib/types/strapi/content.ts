import type { StrapiLink, HomePageSection } from './components';
import type { StrapiEntity } from './common';
import type { StrapiMedia } from './media';

export type StrapiHeader = StrapiEntity & {
	logo?: StrapiMedia | null;
	nav_links?: StrapiLink[];
};

export type StrapiFooter = StrapiEntity & {
	site_name?: string | null;
	copyright_text?: string | null;
	disclaimer?: string | null;
	affiliate_disclosure?: string | null;
	linkedin?: string | null;
	instagram?: string | null;
	footer_columns?: StrapiLink[];
};

export type StrapiLetsHike = StrapiEntity & {
	label?: string | null;
	image?: StrapiMedia | null;
};

export type HomePage = StrapiEntity & {
	sections: HomePageSection[];
};
