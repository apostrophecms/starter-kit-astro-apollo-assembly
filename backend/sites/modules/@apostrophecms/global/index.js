import textSizeHelper from '../../../lib/helpers/typography-options.js';

export default {
  fields: {
    add: {
      brandingGroup: {
        type: 'object',
        label: 'Brand Settings',
        fields: {
          add: {
            siteTitle: {
              type: 'string',
              label: 'Site Title',
              required: true,
              def: 'Apos & Astro'
            },
            brandingType: {
              type: 'select',
              label: 'Header Branding Type',
              required: true,
              def: 'text',
              choices: [
                {
                  label: 'Text Only',
                  value: 'text'
                },
                {
                  label: 'Logo Only',
                  value: 'logo'
                },
                {
                  label: 'Logo and Text',
                  value: 'both'
                }
              ]
            },
            siteLogo: {
              type: 'attachment',
              label: 'Site Logo',
              fileGroup: 'images',
              if: {
                $or: [
                  { brandingType: 'logo' },
                  { brandingType: 'both' }
                ]
              }
            },
            siteTextSize: {
              type: 'select',
              label: 'Site Title Size',
              choices: textSizeHelper.getTextSizes(),
              def: 'medium',
              if: {
                $or: [
                  { brandingType: 'logo' },
                  { brandingType: 'both' }
                ]
              }
            },
            logoMaxHeight: {
              type: 'range',
              label: 'Logo Max Height (px)',
              min: 20,
              max: 100,
              def: 40,
              if: {
                $or: [
                  { brandingType: 'logo' },
                  { brandingType: 'both' }
                ]
              }
            },
            mobileDisplayPreference: {
              type: 'select',
              label: 'Mobile Branding Preference',
              choices: [
                {
                  label: 'Same as Desktop',
                  value: 'same'
                },
                {
                  label: 'Text Only',
                  value: 'text'
                },
                {
                  label: 'Logo Only',
                  value: 'logo'
                }
              ],
              def: 'same'
            }
          }
        }
      },
      headerGroup: {
        type: 'object',
        label: 'Header Settings',
        fields: {
          add: {
            headerPosition: {
              type: 'select',
              label: 'Header Position',
              help: 'Choose how the header behaves when scrolling',
              choices: [
                {
                  label: 'Floating - Always Visible',
                  value: 'fixed'
                },
                {
                  label: 'Floating - Fade on Scroll',
                  value: 'fixed-fade'
                },
                {
                  label: 'Static - Scrolls With Content',
                  value: 'static'
                }
              ],
              def: 'fixed'
            },
            navAlignment: {
              type: 'select',
              label: 'Navigation Alignment',
              choices: [
                {
                  label: 'Start',
                  value: 'start'
                },
                {
                  label: 'End',
                  value: 'end'
                }
              ],
              def: 'end'
            },
            spacing: {
              type: 'select',
              label: 'Header Spacing',
              help: 'Control the spacing around header content',
              choices: [
                {
                  label: 'None',
                  value: ''
                },
                {
                  label: 'Small',
                  value: 'spacing-sm'
                },
                {
                  label: 'Medium',
                  value: 'spacing-md'
                },
                {
                  label: 'Large',
                  value: 'spacing-lg'
                }
              ],
              def: 'spacing-md'
            }
          }
        }
      },
      footerGroup: {
        type: 'object',
        label: 'Footer Settings',
        fields: {
          add: {
            showBranding: {
              type: 'boolean',
              label: 'Show Branding in Footer',
              help: 'Uses the same branding configuration as header',
              def: true
            },
            // Social Media settings
            socialLinks: {
              type: 'array',
              label: 'Social Media Links',
              titleField: 'platform',
              fields: {
                add: {
                  platform: {
                    type: 'select',
                    label: 'Platform',
                    required: true,
                    choices: [
                      {
                        label: 'Facebook',
                        value: 'facebook'
                      },
                      {
                        label: 'Twitter/X',
                        value: 'twitter'
                      },
                      {
                        label: 'Instagram',
                        value: 'instagram'
                      },
                      {
                        label: 'LinkedIn',
                        value: 'linkedin'
                      },
                      {
                        label: 'YouTube',
                        value: 'youtube'
                      },
                      {
                        label: 'GitHub',
                        value: 'github'
                      },
                      {
                        label: 'TikTok',
                        value: 'tiktok'
                      },
                      {
                        label: 'Pinterest',
                        value: 'pinterest'
                      },
                      {
                        label: 'Discord',
                        value: 'discord'
                      },
                      {
                        label: 'Mastodon',
                        value: 'mastodon'
                      }
                    ]
                  },
                  url: {
                    type: 'url',
                    label: 'URL',
                    required: true
                  },
                  ariaLabel: {
                    type: 'string',
                    label: 'Accessibility Label',
                    help: 'Custom screen reader text (e.g., "Follow us on Facebook")',
                    def: ''
                  }
                }
              },
              max: 10
            },
            socialIconStyle: {
              type: 'select',
              label: 'Social Icon Style',
              choices: [
                {
                  label: 'Rounded',
                  value: 'rounded'
                },
                {
                  label: 'Circle',
                  value: 'circle'
                },
                {
                  label: 'Square',
                  value: 'square'
                },
                {
                  label: 'Square Rounded',
                  value: 'square-rounded'
                }
              ],
              def: 'rounded'
            },
            socialIconSize: {
              type: 'select',
              label: 'Social Icon Size',
              choices: [
                {
                  label: 'Small',
                  value: 'sm'
                },
                {
                  label: 'Medium',
                  value: 'md'
                },
                {
                  label: 'Large',
                  value: 'lg'
                }
              ],
              def: 'md'
            },
            // Custom Links
            footerCustomLinks: {
              type: 'array',
              label: 'Custom Footer Links',
              titleField: 'linkText',
              fields: {
                add: {
                  linkText: {
                    type: 'string',
                    label: 'Link Text',
                    required: true
                  },
                  linkUrl: {
                    type: 'url',
                    label: 'Link URL',
                    required: true
                  },
                  openInNewTab: {
                    type: 'boolean',
                    label: 'Open in New Tab',
                    def: false
                  }
                }
              }
            },
            // Copyright settings
            copyrightText: {
              type: 'string',
              label: 'Copyright Text',
              help: 'Optional custom copyright text. Year will be added automatically.',
              textarea: true
            },
            showYear: {
              type: 'boolean',
              label: 'Show Current Year',
              def: true
            }
          }
        }
      }
    },
    group: {
      branding: {
        label: 'Branding',
        fields: [ 'brandingGroup' ]
      },
      header: {
        label: 'Header',
        fields: [ 'headerGroup' ]
      },
      footer: {
        label: 'Footer',
        fields: [ 'footerGroup' ]
      }
    }
  }
};
