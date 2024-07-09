import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: true,
        }),
      ],
    }),
  ],
});
