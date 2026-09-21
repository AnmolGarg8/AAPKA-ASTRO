"use client";

import React from "react";
import Link from "next/link";
import { BlogStore } from "@/lib/store/blogStore";
import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";
import { MandalaDivider } from "@/components/ui/MandalaDivider";

export const BlogPreviewSection: React.FC = () => {
  const posts = BlogStore.getPublishedPosts().slice(0, 3);

  return (
    <section className="relative bg-[#FFFDF9] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E8D8C3]">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C1662F]/30 bg-[#FBF3E7] px-3.5 py-1 text-xs font-bold text-[#7B2D26]">
              <BookOpen className="h-3.5 w-3.5 text-[#E8A33D]" />
              <span>VEDIC ASTROLOGY JOURNAL</span>
            </div>
            <h2 className="mt-2 font-temple text-3xl sm:text-4xl font-bold text-[#7B2D26]">
              Timeless Wisdom, Planetary Insights &amp; Remedies
            </h2>
            <p className="mt-1 text-sm text-[#6E5545]">
              Authentic Jyotish treatises translated into clear, actionable guidance for modern living.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#7B2D26] bg-[#FBF3E7] px-4 py-2 text-xs font-bold text-[#7B2D26] hover:bg-[#7B2D26] hover:text-[#FBF3E7] transition-all shadow-sm"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] shadow-sm hover:shadow-md transition-all hover:border-[#C1662F]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#3B2A1E]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 rounded-md bg-[#7B2D26]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-[#FBF3E7]">
                  {post.category}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#6E5545] mb-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="h-3.5 w-3.5 text-[#C1662F]" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-temple text-lg font-bold text-[#7B2D26] group-hover:text-[#C1662F] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs text-[#3B2A1E]/80 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8D8C3] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="h-7 w-7 rounded-full object-cover border border-[#E8D8C3]"
                    />
                    <span className="text-xs font-semibold text-[#3B2A1E]">
                      {post.author}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C1662F] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
