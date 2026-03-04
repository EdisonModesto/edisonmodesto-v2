'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
}

const OWNER = 'EdisonModesto';
const REPO = 'edisonmodesto-v2';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [ghToken, setGhToken] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Editing state
  const [editingSlug, setEditingSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [isNew, setIsNew] = useState(true);

  // Get admin password from env (injected at build time)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

  // Check localStorage for auth
  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    const storedToken = localStorage.getItem('ghToken');
    const storedPwHash = localStorage.getItem('adminPwHash');
    
    // Verify stored password hash matches current env password
    const currentPwHash = btoa(ADMIN_PASSWORD).slice(0, 20);
    
    if (storedAuth === 'true' && storedToken && storedPwHash === currentPwHash) {
      setIsAuthenticated(true);
      setGhToken(storedToken);
      fetchPosts(storedToken);
    }
  }, [ADMIN_PASSWORD]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD && ghToken) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('ghToken', ghToken);
      // Store a hash of the password (not the actual password)
      localStorage.setItem('adminPwHash', btoa(ADMIN_PASSWORD).slice(0, 20));
      fetchPosts(ghToken);
    } else {
      alert('Invalid password or token');
    }
  };

  const fetchPosts = async (token: string) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/content/posts`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (res.ok) {
        const files = await res.json();
        const postsData = files
          .filter((f: any) => f.name.endsWith('.mdx'))
          .map((f: any) => ({
            slug: f.name.replace('.mdx', ''),
            title: f.name.replace('.mdx', '').replace(/-/g, ' '),
            description: '',
            date: ''
          }));
        setPosts(postsData);
      }
    } catch (err) {
      console.error('Failed to fetch posts');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    
    const slug = editingSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const mdxContent = `---
title: ${title}
description: ${description}
date: ${date || new Date().toISOString().split('T')[0]}
---

${content}
`;
    
    try {
      const filePath = `content/posts/${slug}.mdx`;
      
      // Check if file exists
      let sha = null;
      try {
        const existingRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`, {
          headers: {
            'Authorization': `token ${ghToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (existingRes.ok) {
          const existing = await existingRes.json();
          sha = existing.sha;
        }
      } catch {
        // File doesn't exist
      }
      
      // Commit
      const body: any = {
        message: sha ? `Update blog post: ${title}` : `Create blog post: ${title}`,
        content: btoa(unescape(encodeURIComponent(mdxContent)))
      };
      
      if (sha) {
        body.sha = sha;
      }
      
      const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${ghToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        setMessage('✅ Post saved! Vercel will redeploy in ~1 minute.');
        resetForm();
        fetchPosts(ghToken);
      } else {
        const error = await response.json();
        setMessage(`❌ Error: ${error.message || 'Failed to save'}`);
      }
    } catch {
      setMessage('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingSlug('');
    setTitle('');
    setDescription('');
    setDate('');
    setContent('');
    setIsNew(true);
  };

  const editPost = async (post: Post) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/content/posts/${post.slug}.mdx`, {
        headers: {
          'Authorization': `token ${ghToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        const content = decodeURIComponent(escape(atob(data.content)));
        
        // Parse frontmatter
        const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
        if (frontmatterMatch) {
          const fm = frontmatterMatch[1];
          const bodyContent = frontmatterMatch[2];
          
          const titleMatch = fm.match(/title:\s*(.+)/);
          const descMatch = fm.match(/description:\s*(.+)/);
          const dateMatch = fm.match(/date:\s*(.+)/);
          
          setEditingSlug(post.slug);
          setTitle(titleMatch ? titleMatch[1] : post.slug);
          setDescription(descMatch ? descMatch[1] : '');
          setDate(dateMatch ? dateMatch[1] : '');
          setContent(bodyContent.trim());
          setIsNew(false);
        }
      }
    } catch (err) {
      console.error('Failed to load post');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('ghToken');
    localStorage.removeItem('adminPwHash');
    setIsAuthenticated(false);
    setGhToken('');
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#302B65] mb-8 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Admin Login
          </h1>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <input
              type="password"
              value={ghToken}
              onChange={(e) => setGhToken(e.target.value)}
              placeholder="GitHub Token"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#302B65]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#302B65]"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-[#302B65] text-white py-3 rounded-lg font-medium hover:bg-[#252250] transition-colors"
            >
              Login
            </button>
          </div>
          <p className="text-center mt-4 text-[#828282]">
            <Link href="/" className="hover:text-[#302B65]">← Back to site</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#302B65]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Blog Admin
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => { resetForm(); setIsNew(true); }}
              className="bg-[#050505] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#302B65] transition-colors"
            >
              + New Post
            </button>
            <Link href="/" className="text-[#414141] hover:text-[#302B65] text-sm py-2">
              View Site →
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#828282] hover:text-[#302B65] text-sm py-2"
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#050505] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {isNew ? 'New Post' : 'Edit Post'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#414141] mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#302B65]"
                  placeholder="Post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#414141] mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#302B65]"
                  placeholder="Brief description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#414141] mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#302B65]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#414141] mb-1">Content (Markdown)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#302B65] font-mono text-sm"
                  placeholder="# Your post content here..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={loading || !title || !content}
                  className="flex-1 bg-[#302B65] text-white py-3 rounded-lg font-medium hover:bg-[#252250] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Post'}
                </button>
                {!isNew && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-3 border border-gray-200 rounded-lg text-[#414141] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div>
            <h2 className="text-xl font-bold text-[#050505] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Existing Posts
            </h2>
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  onClick={() => editPost(post)}
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium text-[#050505]">{post.title}</h3>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-[#828282] text-center py-8">No posts yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
