'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Bold, Italic, Heading, List, ListOrdered, 
  Quote, Code, Link as LinkIcon, Image as ImageIcon,
  Eye, EyeOff, Save, Send, FileText, CheckCircle,
  LogOut, Plus, ChevronLeft, Trash2, RefreshCw
} from 'lucide-react';

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: 'draft' | 'published';
  content?: string;
}

const OWNER = 'EdisonModesto';
const REPO = 'edisonmodesto-v2';
const DISCORD_BLOG_DRAFTS_CHANNEL = '1477722335829164155';

// Simple toolbar button component
const ToolbarButton = ({ 
  onClick, 
  icon: Icon, 
  label,
  active = false 
}: { 
  onClick: () => void; 
  icon: React.ElementType; 
  label: string;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    title={label}
    className={`p-2 rounded-lg transition-colors ${
      active 
        ? 'bg-[#302B65] text-white' 
        : 'text-[#414141] hover:bg-gray-100'
    }`}
  >
    <Icon className="w-4 h-4" />
  </button>
);

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [ghToken, setGhToken] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'editor' | 'posts'>('posts');
  
  // Editor state
  const [editingSlug, setEditingSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isNew, setIsNew] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    const storedToken = localStorage.getItem('ghToken');
    const storedPwHash = localStorage.getItem('adminPwHash');
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
      localStorage.setItem('adminPwHash', btoa(ADMIN_PASSWORD).slice(0, 20));
      fetchPosts(ghToken);
    } else {
      alert('Invalid password or token');
    }
  };

  const fetchPosts = async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/content/posts`, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (res.ok) {
        const files = await res.json();
        const postsData: Post[] = await Promise.all(
          files
            .filter((f: any) => f.name.endsWith('.mdx'))
            .map(async (f: any) => {
              // Try to get metadata from file
              try {
                const contentRes = await fetch(f.url, {
                  headers: { 'Authorization': `token ${token}` }
                });
                if (contentRes.ok) {
                  const data = await contentRes.json();
                  const content = decodeURIComponent(escape(atob(data.content)));
                  const fmMatch = content.match(/---\n([\s\S]*?)\n---/);
                  if (fmMatch) {
                    const fm = fmMatch[1];
                    const titleMatch = fm.match(/title:\s*(.+)/);
                    const descMatch = fm.match(/description:\s*(.+)/);
                    const dateMatch = fm.match(/date:\s*(.+)/);
                    const statusMatch = fm.match(/status:\s*(.+)/);
                    return {
                      slug: f.name.replace('.mdx', ''),
                      title: titleMatch ? titleMatch[1] : f.name.replace('.mdx', ''),
                      description: descMatch ? descMatch[1] : '',
                      date: dateMatch ? dateMatch[1] : '',
                      status: statusMatch ? statusMatch[1] as 'draft' | 'published' : 'published'
                    };
                  }
                }
              } catch {}
              return {
                slug: f.name.replace('.mdx', ''),
                title: f.name.replace('.mdx', '').replace(/-/g, ' '),
                description: '',
                date: '',
                status: 'published'
              };
            })
        );
        setPosts(postsData);
      }
    } catch (err) {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      const newCursor = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  const handleSave = async (postToDiscord = false) => {
    if (!title || !content) {
      setMessage('❌ Title and content are required');
      return;
    }

    setLoading(true);
    setMessage('');
    
    const slug = editingSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const mdxContent = `---
title: ${title}
description: ${description}
date: ${date || new Date().toISOString().split('T')[0]}
status: ${status}
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
      } catch {}
      
      // Commit
      const body: any = {
        message: sha ? `Update blog post: ${title}` : `Create blog post: ${title}`,
        content: btoa(unescape(encodeURIComponent(mdxContent)))
      };
      
      if (sha) body.sha = sha;
      
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
        setMessage(`✅ Post saved! ${status === 'published' ? 'Published' : 'Saved as draft'}. Vercel will redeploy in ~1 minute.`);
        
        // Post to Discord if requested
        if (postToDiscord && status === 'draft') {
          await postToDiscordChannel(slug, title, description);
        }
        
        resetForm();
        fetchPosts(ghToken);
        setActiveTab('posts');
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

  const postToDiscordChannel = async (slug: string, title: string, desc: string) => {
    try {
      // This would need a Discord bot token - placeholder for now
      console.log('Would post to Discord:', { slug, title, desc });
      setMessage(prev => prev + ' 📤 Posted to #blog-drafts for review.');
    } catch {
      console.error('Failed to post to Discord');
    }
  };

  const resetForm = () => {
    setEditingSlug('');
    setTitle('');
    setDescription('');
    setDate('');
    setContent('');
    setStatus('draft');
    setIsNew(true);
  };

  const editPost = async (post: Post) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/content/posts/${post.slug}.mdx`, {
        headers: {
          'Authorization': `token ${ghToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        const fileContent = decodeURIComponent(escape(atob(data.content)));
        
        const frontmatterMatch = fileContent.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
        if (frontmatterMatch) {
          const fm = frontmatterMatch[1];
          const bodyContent = frontmatterMatch[2];
          
          const titleMatch = fm.match(/title:\s*(.+)/);
          const descMatch = fm.match(/description:\s*(.+)/);
          const dateMatch = fm.match(/date:\s*(.+)/);
          const statusMatch = fm.match(/status:\s*(.+)/);
          
          setEditingSlug(post.slug);
          setTitle(titleMatch ? titleMatch[1] : post.slug);
          setDescription(descMatch ? descMatch[1] : '');
          setDate(dateMatch ? dateMatch[1] : '');
          setStatus((statusMatch?.[1] as 'draft' | 'published') || 'published');
          setContent(bodyContent.trim());
          setIsNew(false);
          setActiveTab('editor');
        }
      }
    } catch (err) {
      console.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (post: Post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/content/posts/${post.slug}.mdx`, {
        headers: {
          'Authorization': `token ${ghToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        
        await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/content/posts/${post.slug}.mdx`, {
          method: 'DELETE',
          headers: {
            'Authorization': `token ${ghToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Delete blog post: ${post.title}`,
            sha: data.sha
          })
        });
        
        setMessage('✅ Post deleted');
        fetchPosts(ghToken);
      }
    } catch {
      setMessage('❌ Failed to delete');
    } finally {
      setLoading(false);
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
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#302B65] rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#050505]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Blog Admin
              </h1>
              <p className="text-[#828282] mt-2">Sign in to manage your posts</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#414141] mb-2">GitHub Token</label>
                <input
                  type="password"
                  value={ghToken}
                  onChange={(e) => setGhToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#302B65] placeholder:text-gray-400 text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#414141] mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#302B65] placeholder:text-gray-400 text-gray-900"
                />
              </div>
              
              <button
                onClick={handleLogin}
                disabled={!ghToken || !password}
                className="w-full bg-[#302B65] text-white py-3 rounded-xl font-medium hover:bg-[#252250] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign In
              </button>
            </div>
          </div>
          
          <p className="text-center mt-6 text-[#828282]">
            <Link href="/" className="hover:text-[#302B65] transition-colors">← Back to site</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#302B65] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-[#050505]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Blog Admin
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'posts' 
                    ? 'bg-[#302B65] text-white' 
                    : 'text-[#414141] hover:bg-gray-100'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => { resetForm(); setActiveTab('editor'); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === 'editor' 
                    ? 'bg-[#302B65] text-white' 
                    : 'bg-[#050505] text-white hover:bg-[#302B65]'
                }`}
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
              <Link 
                href="/" 
                className="px-4 py-2 text-[#414141] hover:text-[#302B65] text-sm font-medium transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-[#828282] hover:text-[#302B65] transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
            message.includes('✅') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.includes('✅') ? <CheckCircle className="w-5 h-5" /> : <span className="text-lg">⚠️</span>}
            {message}
          </div>
        )}

        {activeTab === 'posts' ? (
          /* Posts List View */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#050505]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                All Posts ({posts.length})
              </h2>
              <button
                onClick={() => fetchPosts(ghToken)}
                className="p-2 text-[#828282] hover:text-[#302B65] transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-[#828282]">No posts yet</p>
                  <button
                    onClick={() => { resetForm(); setActiveTab('editor'); }}
                    className="mt-4 text-[#302B65] font-medium hover:underline"
                  >
                    Create your first post
                  </button>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.slug}
                    className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => editPost(post)}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-[#050505]">{post.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#828282] line-clamp-1">{post.description || 'No description'}</p>
                      {post.date && (
                        <p className="text-xs text-[#828282] mt-1">{post.date}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => editPost(post)}
                        className="p-2 text-[#414141] hover:text-[#302B65] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePost(post)}
                        className="p-2 text-[#414141] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Editor View */
          <div className="space-y-6">
            {/* Meta fields */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#414141] mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#302B65] placeholder:text-gray-400 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#414141] mb-2">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description for SEO"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#302B65] placeholder:text-gray-400 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#414141] mb-2">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#302B65] text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#414141] mb-2">Status</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStatus('draft')}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-colors flex items-center justify-center gap-2 ${
                        status === 'draft'
                          ? 'border-[#302B65] bg-[#302B65]/5 text-[#302B65]'
                          : 'border-gray-200 text-[#414141] hover:border-gray-300'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Draft
                    </button>
                    <button
                      onClick={() => setStatus('published')}
                      className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-colors flex items-center justify-center gap-2 ${
                        status === 'published'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 text-[#414141] hover:border-gray-300'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Published
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-gray-200 p-3 flex items-center gap-1 flex-wrap">
                <ToolbarButton onClick={() => insertMarkdown('**', '**')} icon={Bold} label="Bold" />
                <ToolbarButton onClick={() => insertMarkdown('*', '*')} icon={Italic} label="Italic" />
                <div className="w-px h-6 bg-gray-200 mx-2" />
                <ToolbarButton onClick={() => insertMarkdown('# ', '')} icon={Heading} label="Heading" />
                <ToolbarButton onClick={() => insertMarkdown('- ', '')} icon={List} label="Bullet List" />
                <ToolbarButton onClick={() => insertMarkdown('1. ', '')} icon={ListOrdered} label="Numbered List" />
                <div className="w-px h-6 bg-gray-200 mx-2" />
                <ToolbarButton onClick={() => insertMarkdown('> ', '')} icon={Quote} label="Quote" />
                <ToolbarButton onClick={() => insertMarkdown('`', '`')} icon={Code} label="Inline Code" />
                <ToolbarButton onClick={() => insertMarkdown('```\n', '\n```')} icon={Code} label="Code Block" />
                <ToolbarButton onClick={() => insertMarkdown('[', '](url)')} icon={LinkIcon} label="Link" />
                <div className="flex-1" />
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showPreview ? 'bg-[#302B65] text-white' : 'text-[#414141] hover:bg-gray-100'
                  }`}
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>

              {/* Editor Area */}
              <div className={`grid ${showPreview ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                <div className="border-r border-gray-200">
                  <textarea
                    id="content-editor"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="# Start writing your post...\n\nUse the toolbar above or write Markdown directly."
                    className="w-full h-[500px] p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed text-gray-900 placeholder:text-gray-400"
                    spellCheck={false}
                  />
                </div>
                
                {showPreview && (
                  <div className="bg-gray-50 p-6 overflow-auto h-[500px]">
                    <div className="prose prose-lg max-w-none">
                      {content ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-gray-400 italic">Preview will appear here...</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveTab('posts')}
                className="flex items-center gap-2 px-4 py-3 text-[#414141] hover:text-[#302B65] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Posts
              </button>
              
              <div className="flex items-center gap-3">
                {!isNew && (
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-200 rounded-xl text-[#414141] font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                
                {status === 'draft' && (
                  <button
                    onClick={() => handleSave(true)}
                    disabled={loading || !title || !content}
                    className="px-6 py-3 bg-[#050505] text-white rounded-xl font-medium hover:bg-[#302B65] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save & Request Review'}
                  </button>
                )}
                
                <button
                  onClick={() => handleSave(false)}
                  disabled={loading || !title || !content}
                  className="px-6 py-3 bg-[#302B65] text-white rounded-xl font-medium hover:bg-[#252250] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : status === 'published' ? 'Publish' : 'Save Draft'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
