import type { StrapiComponent } from './common';
import type { StrapiMedia } from './media';
import type { StrapiTrail } from './trail';

export type StrapiLink = StrapiComponent & {
	label?: string | null;
	url?: string | null;
};

export type StrapiCard = StrapiComponent & {
	label?: string | null;
	url?: string | null;
	image?: StrapiMedia | null;
};

export type HeroSlide = StrapiComponent & {
	nav_left_label?: string | null;
	nav_right_label?: string | null;
	heading?: string | null;
	description?: string | null;
	episode_label?: string | null;
	image?: StrapiMedia | null;
	background_images?: StrapiMedia[] | null;
};

export type HeroSection = StrapiComponent & {
	title?: string | null;
	logo_icon?: StrapiMedia | null;
	slide?: HeroSlide[];
};

export type AllAboutHikingSection = StrapiComponent & {
	title?: string | null;
	description?: string | null;
	image?: StrapiMedia | null;
};

export type WhatsNewSection = StrapiComponent & {
	title?: string | null;
	trails?: StrapiTrail[];
	layout?: 'equal' | 'asymmetric';
};

export type ExploreSection = StrapiComponent & {
	title?: string | null;
	explore_card?: StrapiCard[];
};

export type AboutUsSection = StrapiComponent & {
	title?: string | null;
	description?: string | null;
	image?: StrapiMedia[];
};

export const SECTION_COMPONENTS = {
	HERO: 'sections.hero',
	ALL_ABOUT_HIKING: 'sections.all-about-hiking',
	WHATS_NEW: 'sections.whats-new',
	EXPLORE: 'sections.explore',
	ABOUT_US: 'shared.about-us'
} as const;

export type SectionComponent =
	(typeof SECTION_COMPONENTS)[keyof typeof SECTION_COMPONENTS];

export type HeroSectionComponent = { __component: typeof SECTION_COMPONENTS.HERO } & HeroSection;
export type AllAboutHikingSectionComponent = {
	__component: typeof SECTION_COMPONENTS.ALL_ABOUT_HIKING;
} & AllAboutHikingSection;
export type WhatsNewSectionComponent = {
	__component: typeof SECTION_COMPONENTS.WHATS_NEW;
} & WhatsNewSection;
export type ExploreSectionComponent = {
	__component: typeof SECTION_COMPONENTS.EXPLORE;
} & ExploreSection;
export type AboutUsSectionComponent = {
	__component: typeof SECTION_COMPONENTS.ABOUT_US;
} & AboutUsSection;

export type HomePageSection =
	| HeroSectionComponent
	| AllAboutHikingSectionComponent
	| WhatsNewSectionComponent
	| ExploreSectionComponent
	| AboutUsSectionComponent;

export function isHeroSection(section: HomePageSection): section is HeroSectionComponent {
	return section.__component === SECTION_COMPONENTS.HERO;
}

export function isAllAboutHikingSection(
	section: HomePageSection
): section is AllAboutHikingSectionComponent {
	return section.__component === SECTION_COMPONENTS.ALL_ABOUT_HIKING;
}

export function isWhatsNewSection(
	section: HomePageSection
): section is WhatsNewSectionComponent {
	return section.__component === SECTION_COMPONENTS.WHATS_NEW;
}

export function isExploreSection(section: HomePageSection): section is ExploreSectionComponent {
	return section.__component === SECTION_COMPONENTS.EXPLORE;
}

export function isAboutUsSection(section: HomePageSection): section is AboutUsSectionComponent {
	return section.__component === SECTION_COMPONENTS.ABOUT_US;
}
