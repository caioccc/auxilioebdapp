import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        navigateFallback: '/index.html',
      },
      manifest: {
        name: "Auxilio EBD",
        short_name: "Auxilio EBD",
        description: "Um aplicativo com lições da Escola Bíblica Dominical.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "ic_launcher/res/mipmap-mdpi/ic_launcher.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "ic_launcher/res/mipmap-hdpi/ic_launcher.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "ic_launcher/res/mipmap-xhdpi/ic_launcher.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "ic_launcher/res/mipmap-xxhdpi/ic_launcher.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "ic_launcher/res/mipmap-xxxhdpi/ic_launcher.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "ic_launcher/play_store_512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "ic_launcher/1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "ic_launcher/screen1.png",
            sizes: "540x960",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "ic_launcher/screen2.png",
            sizes: "540x960",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
