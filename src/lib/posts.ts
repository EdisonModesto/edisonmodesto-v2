import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || realSlug,
    description: data.description || "",
    date: data.date || new Date().toISOString(),
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}
