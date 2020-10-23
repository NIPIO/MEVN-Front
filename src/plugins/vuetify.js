import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        error: '#FF5252',
        info: '#52D1DC',
        success: '#4CAF50',
        warning: '#FFC107',
        // primary: '#01579B', 
        primary: '#202030', 
        // secondary: '#52D1DC',
        amarrillo: '#F8E16C',
        // secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'md',
  },
});
