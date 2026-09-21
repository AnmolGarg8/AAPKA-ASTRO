import { MetadataRoute } from "next";
import { BlogStore } from "@/lib/store/blogStore";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aapkaastro.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/services/kundli",
    "/services/vastu",
    "/services/gemstones",
    "/services/consultation",
    "/blog",
    "/panchang",
    "/reels",
    "/testimonials",
    "/contact",
    "/kundli-generator",
    "/consult",
    "/wallet",
    "/login",
    "/signup",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/panchang" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : route.startsWith("/services") || route === "/consult" ? 0.9 : 0.7,
  }));

  const blogRoutes = BlogStore.getPublishedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
