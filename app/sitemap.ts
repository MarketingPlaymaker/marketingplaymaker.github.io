import type { MetadataRoute } from "next";

// One-page site: search engines ignore #anchors, so the sitemap lists the page itself.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://marketingplaymaker.com.br/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
