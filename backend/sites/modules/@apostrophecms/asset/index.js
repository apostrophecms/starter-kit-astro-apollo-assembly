export default {
  options: {
    // When not in production, refresh the page on restart
    refreshOnRestart: true,
    // Not for use with Astro, which has its own
    hmr: false
  },
  methods(self) {
    return {
      getNamespace() {
        return self.apos.options.theme;
      }
    };
  }
};
