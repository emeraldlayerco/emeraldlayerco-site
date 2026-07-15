import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Gallery',
      href: getPermalink('/gallery'),
    },
  ],

  actions: [
    {
      text: '🚀 Start Your Project',
      href: getPermalink('/start-project'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Emerald Layer Company',
      links: [
        {
          text: 'Home',
          href: getPermalink('/'),
        },
        {
          text: 'Gallery',
          href: getPermalink('/gallery'),
        },
        {
          text: 'Start Your Project',
          href: getPermalink('/start-project'),
        },
      ],
    },

    {
      title: 'Contact',
      links: [
        {
          text: 'Justin@emeraldlayerco.com',
          href: 'mailto:Justin@emeraldlayerco.com',
        },
        {
          text: '(707) 298-0686',
          href: 'tel:+17072980686',
        },
      ],
    },
  ],

  secondaryLinks: [],

  socialLinks: [],

  footNote: `
    © ${new Date().getFullYear()} Emerald Layer Company · Made in Humboldt County, California
  `,
};