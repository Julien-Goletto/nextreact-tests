// vitest.config.js
import react from "file:///Users/melvynx/BRAIN/1.PROJECTS/NEXTREACT/code/3.tests/node_modules/.pnpm/@vitejs+plugin-react@2.2.0_vite@3.2.5/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///Users/melvynx/BRAIN/1.PROJECTS/NEXTREACT/code/3.tests/node_modules/.pnpm/vitest@0.26.3_zpypa2oaocakezrrbjrqm65viu/node_modules/vitest/dist/config.js";
var __vite_injected_original_dirname = "/Users/melvynx/BRAIN/1.PROJECTS/NEXTREACT/code/3.tests";
var vitest_config_default = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(__vite_injected_original_dirname, "src/test/vitest.setup.ts")],
    env: {
      IS_REACT_ACT_ENVIRONMENT: "true"
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tZWx2eW54L0JSQUlOLzEuUFJPSkVDVFMvTkVYVFJFQUNUL2NvZGUvMy50ZXN0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21lbHZ5bngvQlJBSU4vMS5QUk9KRUNUUy9ORVhUUkVBQ1QvY29kZS8zLnRlc3RzL3ZpdGVzdC5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21lbHZ5bngvQlJBSU4vMS5QUk9KRUNUUy9ORVhUUkVBQ1QvY29kZS8zLnRlc3RzL3ZpdGVzdC5jb25maWcuanNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgc2V0dXBGaWxlczogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdGVzdC92aXRlc3Quc2V0dXAudHMnKV0sXG4gICAgZW52OiB7XG4gICAgICBJU19SRUFDVF9BQ1RfRU5WSVJPTk1FTlQ6ICd0cnVlJyxcbiAgICB9LFxuICB9LFxuICAvLyByZXNvbHZlOiB7XG4gIC8vICAgYWxpYXM6IHtcbiAgLy8gICAgICd+JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gIC8vICAgfSxcbiAgLy8gfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VixPQUFPLFdBQVc7QUFDMVcsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBRjdCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMsS0FBSyxRQUFRLGtDQUFXLDBCQUEwQixDQUFDO0FBQUEsSUFDaEUsS0FBSztBQUFBLE1BQ0gsMEJBQTBCO0FBQUEsSUFDNUI7QUFBQSxFQUNGO0FBTUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K