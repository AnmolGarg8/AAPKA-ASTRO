"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogStore, BlogPost } from "@/lib/store/blogStore";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";
import {
  BookOpen,
  Plus,
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Calendar,
  Save,
  X,
  Lock,
  AlertCircle,
} from "lucide-react";

interface BlogManagerClientProps {
  canManage: boolean;
}

export default function BlogManagerClient({ canManage }: BlogManagerClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(() => BlogStore.getAllPosts());
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCreateNew = () => {
    if (!canManage) {
      alert("Permission Denied: MANAGE access level is required to author articles.");
      return;
    }
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Vedic Astrology",
      author: PLACEHOLDER_ASTROLOGER.displayName,
      authorAvatar: PLACEHOLDER_ASTROLOGER.avatarUrl,
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: "5 min read",
      tags: ["Jyotish", "Remedies"],
      status: "published",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    if (!canManage) {
      alert("Permission Denied: MANAGE access level is required to edit articles.");
      return;
    }
    setEditingPost({ ...post });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!canManage) {
      alert("Permission Denied: MANAGE access level is required to delete articles.");
      return;
    }
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/dashboard/blog?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "error", text: data.message || "Failed to delete article." });
        return;
      }
      BlogStore.deletePost(id);
      setPosts(BlogStore.getAllPosts());
      setStatusMsg({ type: "success", text: "Article deleted successfully." });
    } catch {
      BlogStore.deletePost(id);
      setPosts(BlogStore.getAllPosts());
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManage) {
      alert("Permission Denied: MANAGE access level is required to save articles.");
      return;
    }
    if (!editingPost?.title || !editingPost?.content) {
      alert("Please provide at least a title and content.");
      return;
    }

    const slug =
      editingPost.slug ||
      editingPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const payload = {
      id: editingPost.id,
      title: editingPost.title,
      slug,
      excerpt: editingPost.excerpt || editingPost.title,
      content: editingPost.content,
      category: editingPost.category || "Vedic Astrology",
      author: editingPost.author || PLACEHOLDER_ASTROLOGER.displayName,
      authorAvatar: editingPost.authorAvatar || PLACEHOLDER_ASTROLOGER.avatarUrl,
      coverImage: editingPost.coverImage || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      publishedAt: editingPost.publishedAt || new Date().toISOString().split("T")[0],
      readTime: editingPost.readTime || "5 min read",
      tags: editingPost.tags || ["Vedic"],
      status: editingPost.status || "published",
    };

    try {
      const res = await fetch("/api/dashboard/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "error", text: data.message || "Failed to save article." });
        return;
      }
      BlogStore.savePost(payload as any);
      setPosts(BlogStore.getAllPosts());
      setIsModalOpen(false);
      setEditingPost(null);
      setStatusMsg({ type: "success", text: "Article saved and published successfully." });
    } catch {
      BlogStore.savePost(payload as any);
      setPosts(BlogStore.getAllPosts());
      setIsModalOpen(false);
      setEditingPost(null);
    }
  };

  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Operator Cockpit</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-temple text-2xl sm:text-3xl font-bold text-[#7B2D26]">
                  Vedic Journal &amp; Blog Editor
                </span>
                {!canManage && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 text-[11px] font-bold">
                    <Lock className="h-3 w-3" />
                    View-Only Mode
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#6E5545]">
                Author, schedule, and curate Jyotish treatises to educate seekers and drive organic search traffic.
              </p>
            </div>

            {canManage ? (
              <button
                type="button"
                onClick={handleCreateNew}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#7B2D26] px-5 py-2.5 text-xs font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-sm shrink-0"
              >
                <Plus className="h-4 w-4 text-[#E8A33D]" />
                <span>Write New Article</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#E8D8C3]/50 px-4 py-2 text-xs font-bold text-[#6E5545] border border-[#E8D8C3] cursor-not-allowed">
                <Lock className="h-4 w-4 text-[#6E5545]" />
                <span>MANAGE Access Required to Publish</span>
              </div>
            )}
          </div>
        </div>

        {/* View-Only Notice Banner */}
        {!canManage && (
          <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Staff Read-Only View Active</p>
              <p className="mt-0.5 text-amber-800">
                You have active <strong>VIEW</strong> permissions for the Vedic Journal. You can read and review articles.
                Creation, modification, and deletion are restricted to staff accounts with <strong>MANAGE</strong> access granted by the Platform Owner.
              </p>
            </div>
          </div>
        )}

        {statusMsg && (
          <div
            className={`rounded-2xl p-4 text-xs flex items-center justify-between ${
              statusMsg.type === "success"
                ? "bg-emerald-50 border border-emerald-300 text-emerald-900"
                : "bg-rose-50 border border-rose-300 text-rose-900"
            }`}
          >
            <span>{statusMsg.text}</span>
            <button
              onClick={() => setStatusMsg(null)}
              className="text-xs font-bold hover:underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Blog Posts Management Table */}
        <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E8D8C3] text-[#6E5545]">
                  <th className="pb-3 font-bold">Article Details</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C3]">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#FBF3E7]/50">
                    <td className="py-4 pr-4">
                      <div className="font-temple font-bold text-[#7B2D26] text-sm">
                        {post.title}
                      </div>
                      <span className="text-[11px] text-[#6E5545]">
                        slug: /{post.slug} • {post.readTime}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="rounded bg-[#FBF3E7] px-2 py-0.5 text-[11px] font-bold text-[#C1662F] border border-[#E8D8C3]">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          post.status === "published"
                            ? "bg-[#6B8E5A]/15 text-[#2A4720] border border-[#6B8E5A]/30"
                            : post.status === "scheduled"
                            ? "bg-[#E8A33D]/20 text-[#7B2D26] border border-[#E8A33D]/30"
                            : "bg-[#A8988B]/20 text-[#3B2A1E]"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 text-[#6E5545]">{post.publishedAt}</td>
                    <td className="py-4 text-right space-x-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-lg p-1.5 text-[#6E5545] hover:text-[#7B2D26] inline-block"
                        title="View Public Post"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      {canManage ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(post)}
                            className="rounded-lg p-1.5 text-[#C1662F] hover:text-[#7B2D26]"
                            title="Edit Article"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id)}
                            className="rounded-lg p-1.5 text-rose-500 hover:text-rose-700"
                            title="Delete Article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <span
                          className="text-[10px] text-[#A8988B] italic inline-block py-1.5 px-2"
                          title="Read-only mode"
                        >
                          View only
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Editor Modal (only for canManage) */}
      {canManage && isModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8D8C3] pb-4 mb-6">
              <h3 className="font-temple text-xl font-bold text-[#7B2D26]">
                {editingPost.id ? "Edit Article" : "Compose New Article"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#6E5545] hover:text-[#3B2A1E]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#3B2A1E] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating Saturn Retrograde: Astrological Analysis"
                  value={editingPost.title || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-2.5 text-xs text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#3B2A1E] mb-1">Category</label>
                  <select
                    value={editingPost.category || "Vedic Astrology"}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        category: e.target.value as BlogPost["category"],
                      })
                    }
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-2.5 text-xs text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  >
                    <option value="Vedic Astrology">Vedic Astrology</option>
                    <option value="Planetary Transits">Planetary Transits</option>
                    <option value="Vastu Shastra">Vastu Shastra</option>
                    <option value="Gemology">Gemology</option>
                    <option value="Remedies">Remedies</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#3B2A1E] mb-1">Publication Status</label>
                  <select
                    value={editingPost.status || "published"}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        status: e.target.value as BlogPost["status"],
                      })
                    }
                    className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-2.5 text-xs text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                  >
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#3B2A1E] mb-1">Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Short introductory summary for search engines and cards..."
                  className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-2.5 text-xs text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3B2A1E] mb-1">
                  Full Article Body (Markdown supported) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingPost.content || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="### Section Heading&#10;Write ancient treatise content, planetary remedies..."
                  className="w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3 font-mono text-xs text-[#3B2A1E] focus:outline-none focus:ring-2 focus:ring-[#7B2D26]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#E8D8C3]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-[#E8D8C3] px-4 py-2 font-semibold text-[#6E5545] hover:bg-[#FBF3E7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#7B2D26] px-5 py-2 font-bold text-white hover:bg-[#96372E] shadow-sm flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4 text-[#E8A33D]" />
                  <span>Save &amp; Publish Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
