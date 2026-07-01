import type { StrapiEntity } from './common';
import type { StrapiMedia } from './media';

export type StrapiTrail = StrapiEntity & {
    title: string;
    summary?: string | null;
    distance_km?: number | null;
    difficulty?: string | null;
    photos?: StrapiMedia[] | null;
};
