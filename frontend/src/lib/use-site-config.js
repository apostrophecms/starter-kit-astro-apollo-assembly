export function useSiteConfig(globalData) {
  const brandingGroup = globalData?.brandingGroup || {};
  const headerGroup = globalData?.headerGroup || {};

  const getHeaderClasses = () => {
    const classes = ['navbar'];

    // Add position class based on headerMode or headerPosition
    const headerPosition = headerGroup.headerPosition;

    if (headerPosition === 'fixed') {
      classes.push('is-fixed-top'); // Bulma's fixed top class
    } else if (headerPosition === 'fixed-fade') {
      classes.push('is-fixed-top', 'is-fixed-fade');
    }

    // Add spacing class
    if (headerGroup.spacing) {
      classes.push(headerGroup.spacing);
    }

    return classes.join(' ');
  };

  const getNavItemClasses = (isActive = false) => {
    const classes = ['navbar-item'];

    if (isActive) {
      classes.push('is-active');
    }

    return classes.join(' ');
  };

  const getDropdownClasses = () => {
    const classes = ['navbar-dropdown'];
    return classes.join(' ');
  };

  const renderBranding = (isMobile = false) => {
    const displayType = isMobile && brandingGroup.mobileDisplayPreference !== 'same'
      ? brandingGroup.mobileDisplayPreference
      : brandingGroup.brandingType;

    const elements = [];

    // Add logo if needed
    if (displayType === 'logo' || displayType === 'both') {
      if (brandingGroup.siteLogo?._urls?.max) {
        elements.push(
          `<img
            src="${brandingGroup.siteLogo._urls.max}" 
            alt="${brandingGroup.siteTitle}"
            style="max-height: ${brandingGroup.logoMaxHeight || 40}px"
            class="navbar-brand-logo"
          />`
        );
      }
    }

    // Add text if needed
    if (displayType === 'text' || displayType === 'both') {
      elements.push(
        `<span class="navbar-brand-text ${brandingGroup.siteTextSize || 'is-size-4'}">
          ${brandingGroup.siteTitle}
        </span>`
      );
    }

    return elements.join('');
  };

  return {
    getHeaderClasses,
    getNavItemClasses,
    getDropdownClasses,
    renderBranding
  };
}