import fields from './fields.js';

function getKeysWithPrefix(obj, prefix) {
  return Object.keys(obj).filter(key => key.startsWith(prefix));
}

export default {
  site: {
    label: 'Site',
    fields: getKeysWithPrefix(fields, 'site')
  },
  header: {
    label: 'Header',
    fields: getKeysWithPrefix(fields, 'header')
  },
  headings: {
    label: 'Headings',
    group: {
      h1: {
        label: 'Heading One',
        fields: getKeysWithPrefix(fields, 'h1')
      },
      h2: {
        label: 'Heading Two',
        fields: getKeysWithPrefix(fields, 'h2')
      },
      h3: {
        label: 'Heading Three',
        fields: getKeysWithPrefix(fields, 'h3')
      },
      h4: {
        label: 'Heading Four',
        fields: getKeysWithPrefix(fields, 'h4')
      },
      h5: {
        label: 'Heading Five',
        fields: getKeysWithPrefix(fields, 'h5')
      }
    }
  },
  paragraphs: {
    label: 'Paragraphs',
    fields: getKeysWithPrefix(fields, 'p')
  },
  buttons: {
    label: 'Buttons',
    fields: getKeysWithPrefix(fields, 'button')
  },
  footer: {
    label: 'Footer',
    fields: getKeysWithPrefix(fields, 'footer')
  } 
};
