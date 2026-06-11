import type { Schema, Struct } from '@strapi/strapi';

export interface HeroSectionSlide extends Struct.ComponentSchema {
  collectionName: 'components_hero_section_slides';
  info: {
    displayName: 'slide';
  };
  attributes: {
    background_images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    description: Schema.Attribute.String;
    episode_label: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    nav_left_label: Schema.Attribute.String;
    nav_right_label: Schema.Attribute.String;
  };
}

export interface SectionsAllAboutHiking extends Struct.ComponentSchema {
  collectionName: 'components_sections_all_about_hikings';
  info: {
    displayName: 'all_about_hiking';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsExplore extends Struct.ComponentSchema {
  collectionName: 'components_sections_explores';
  info: {
    displayName: 'explore';
  };
  attributes: {
    explore_card: Schema.Attribute.Component<'shared.cards', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    logo_icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slide: Schema.Attribute.Component<'hero-section.slide', true>;
  };
}

export interface SectionsWhatsNew extends Struct.ComponentSchema {
  collectionName: 'components_sections_whats_news';
  info: {
    displayName: 'whats_new';
  };
  attributes: {
    title: Schema.Attribute.String;
    trails: Schema.Attribute.Relation<'oneToMany', 'api::trail.trail'>;
  };
}

export interface SharedAboutUs extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_us';
  info: {
    displayName: 'about_us';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_items';
  info: {
    displayName: 'link_item';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero-section.slide': HeroSectionSlide;
      'sections.all-about-hiking': SectionsAllAboutHiking;
      'sections.explore': SectionsExplore;
      'sections.hero': SectionsHero;
      'sections.whats-new': SectionsWhatsNew;
      'shared.about-us': SharedAboutUs;
      'shared.cards': SharedCards;
      'shared.link-item': SharedLinkItem;
    }
  }
}
