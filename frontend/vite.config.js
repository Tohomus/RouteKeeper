import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        id:"/",
        name: "RouteKeeper",
        short_name: "RouteKeeper",
        description: "Save and navigate your important routes",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#F8FAFC",
        theme_color: "#3B82F6",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        
      }
    })
  ]
});
