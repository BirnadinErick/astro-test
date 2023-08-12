export function addLayoutFrontmatter() {
  return function (tree, file) {
    if (!file.data.astro.frontmatter.layout) {
      file.data.astro.frontmatter.layout = "../../layouts/PostLayout.astro";
    }
  };
}
