export type StrapiInlineNode = {
	type: 'text';
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
};

export type StrapiLinkNode = {
	type: 'link';
	url: string;
	children: StrapiInlineNode[];
};

export type StrapiListItemNode = {
	type: 'list-item';
	children: StrapiBlockNode[];
};

export type StrapiBlockNode =
	| {
			type: 'paragraph';
			children: (StrapiInlineNode | StrapiLinkNode)[];
	  }
	| {
			type: 'heading';
			level: 1 | 2 | 3 | 4 | 5 | 6;
			children: StrapiInlineNode[];
	  }
	| {
			type: 'list';
			format: 'ordered' | 'unordered';
			children: StrapiListItemNode[];
	  }
	| {
			type: 'quote';
			children: StrapiInlineNode[];
	  }
	| {
			type: 'code';
			children: StrapiInlineNode[];
	  }
	| {
			type: 'image';
			image: {
				url: string;
				alternativeText?: string | null;
				caption?: string | null;
				width?: number;
				height?: number;
			};
			children: [{ type: 'text'; text: '' }];
	  };
