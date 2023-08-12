import { defineConfig } from "astro/config";
import { addLayoutFrontmatter } from "./addLayoutFrontmatter.mjs";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [addLayoutFrontmatter],
  },
  integrations: [tailwind()],
});
