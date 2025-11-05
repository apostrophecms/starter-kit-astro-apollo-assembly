const funColors = [ '#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51' ];
const neutralColors = [ '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529' ];
const headings = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'p' ];
const weights = [ '300', '400', '500', '600', '700' ];
const fontFams = [
  'Inter Variable',
  'Garamond',
  'monospace',
  'cursive',
  'fantasy'
];
function typeSelectors(heading) {
  return [
    `.${heading}`,
    `.rich-text-widget ${heading}`,
    `.apos-rich-text-editor__editor ${heading}`,
    `${heading}.content`,
    `.card-content ${heading}.subtitle`
  ];
}

const headingsStyles = {};
headings.forEach(heading => {
  headingsStyles[`${heading}Font`] = {
    type: 'select',
    label: 'Font',
    selector: typeSelectors(heading),
    important: true,
    property: 'font-family',
    choices: fontFams.map((f) => ({
      label: f.toUpperCase(),
      value: f
    }))
  };
  headingsStyles[`${heading}SizeDesktop`] = {
    type: 'range',
    important: true,
    label: 'Size (desktop)',
    selector: typeSelectors(heading),
    property: 'font-size',
    mediaQuery: '(770px <= width <= 9999px)',
    min: 14,
    max: 144,
    step: 1,
    unit: 'px'
  };
  headingsStyles[`${heading}SizeTablet`] = {
    type: 'range',
    important: true,
    label: 'Size (tablet)',
    selector: typeSelectors(heading),
    property: 'font-size',
    mediaQuery: '(480px <= width <= 769px)',
    min: 14,
    max: 144,
    step: 1,
    unit: 'px'
  };
  headingsStyles[`${heading}SizeMobile`] = {
    type: 'range',
    important: true,
    mediaQuery: '(0px <= width <= 479px)',
    label: 'Size (mobile)',
    selector: typeSelectors(heading),
    property: 'font-size',
    min: 14,
    max: 144,
    step: 1,
    unit: 'px'
  };

  headingsStyles[`${heading}Weight`] = {
    type: 'select',
    important: true,
    label: 'Weight',
    selector: typeSelectors(heading),
    property: 'font-weight',
    choices: weights.map((f) => ({
      label: f.toUpperCase(),
      value: f
    }))
  };
  headingsStyles[`${heading}Color`] = {
    type: 'color',
    important: true,
    label: 'Color',
    selector: typeSelectors(heading),
    property: 'color',
    options: {
      presetColors: neutralColors
    }
  };
  headingsStyles[`${heading}LH`] = {
    type: 'range',
    important: true,
    label: 'Line height',
    selector: typeSelectors(heading),
    property: 'line-height',
    min: 0.9,
    max: 2,
    step: 0.1,
    unit: ''
  };
  headingsStyles[`${heading}LS`] = {
    type: 'range',
    important: true,
    label: 'Letter spacing',
    selector: typeSelectors(heading),
    property: 'letter-spacing',
    min: -5,
    max: 10,
    step: 0.5,
    unit: 'px'
  };
});

export default {
  // headings
  ...headingsStyles,
  siteBackgroundColor: {
    type: 'color',
    label: 'Background color',
    selector: [
      'body'
    ],
    property: 'background-color',
    options: {
      presetColors: funColors
    }
  },
  // Site
  siteBorderColor: {
    type: 'color',
    label: 'Border color',
    selector: [
      'body'
    ],
    property: 'border-color',
    options: {
      presetColors: funColors
    }
  },
  siteBorderThickness: {
    type: 'range',
    label: 'Border thickness',
    selector: 'body',
    important: true,
    property: 'border-width',
    unit: 'px',
    min: 0,
    max: 20,
    step: 1,
    def: 0
  },
  sitePadding: {
    type: 'range',
    label: 'Padding',
    selector: 'body',
    important: true,
    property: 'padding',
    unit: 'px',
    min: 0,
    max: 30,
    step: 1,
    def: 0
  },
  // buttons
  buttonBackgroundColor: {
    type: 'color',
    label: 'Background color',
    selector: [
      '.button.default'
    ],
    property: 'background-color',
    options: {
      presetColors: funColors
    }
  },
  buttonBackgroundColorHover: {
    type: 'color',
    label: 'Background Color (Hover)',
    selector: [
      '.button.default:hover'
    ],
    property: 'background-color',
    options: {
      presetColors: funColors
    }
  },
  buttonTextColor: {
    type: 'color',
    label: 'Text color',
    selector: [
      '.button.default'
    ],
    property: 'color',
    options: {
      presetColors: neutralColors
    }
  },
  // header
  headerBackgroundColor: {
    type: 'color',
    label: 'Background color',
    selector: [
      '.navbar',
      '.navbar-dropdown',
      '.navbar-dropdown .navbar-item:not(.is-active, .is-selected)',
      '.navbar-menu'
    ],
    property: 'background-color',
    important: true,
    options: {
      presetColors: neutralColors
    }
  },
  headerTransparency: {
    type: 'range',
    label: 'Transparency',
    help: '0 is fully transparent, 100 is solid',
    selector: '.navbar',
    property: 'opacity',
    min: 0,
    max: 1,
    step: 0.05,
    def: 1
  },
  headerTextColor: {
    type: 'color',
    label: 'Text color',
    important: true,
    selector: [
      '.navbar .navbar-link',
      '.navbar .navbar-link::after',
      '.navbar-link:not(.is-arrowless)::after',
      '.navbar .navbar-item',
      '.navbar .navbar-brand-text'
    ],
    property: [ 'color', 'border-color' ],
    options: {
      presetColors: neutralColors
    }
  },
  headerHoverColor: {
    type: 'color',
    label: 'Text color (hover)',
    selector: [
      '.navbar-item:hover',
      '.navbar-link:hover',
      '.navbar-dropdown .navbar-item:not(.is-active, .is-selected):hover'
    ],
    property: 'background-color',
    important: true,
    options: {
      presetColors: funColors
    }
  },
  headerActiveColor: {
    type: 'color',
    label: 'Active-page link color',
    property: 'background-color',
    selector: '.navbar-item.is-active',
    options: {
      presetColors: funColors
    }
  },
  headerDropdownTextColor: {
    type: 'color',
    important: true,
    label: 'Dropdown text color',
    selector: '.navbar-dropdown .navbar-item',
    property: 'color',
    options: {
      presetColors: neutralColors
    }
  },
  headerMobileNavbarTextColor: {
    type: 'color',
    important: true,
    label: 'Mobile navigation text color',
    selector: '.navbar-burger',
    property: 'color',
    options: {
      presetColors: neutralColors
    }
  },

  // footer
  footerBackgroundColor: {
    type: 'color',
    label: 'Background color',
    selector: '.footer-modern',
    property: 'background-color',
    options: {
      presetColors: funColors
    }
  },
  footerTextColor: {
    type: 'color',
    label: 'Text color',
    selector: '.footer-modern',
    property: 'color',
    options: {
      presetColors: neutralColors
    }
  },
  footerLinkColor: {
    type: 'color',
    label: 'Link color',
    selector: '.footer-modern a',
    property: 'color',
    options: {
      presetColors: funColors
    }
  },
  footerLinkHoverColor: {
    type: 'color',
    label: 'Link color (hover)',
    selector: '.footer-modern a:hover',
    property: 'color',
    options: {
      presetColors: funColors
    }
  }
};
