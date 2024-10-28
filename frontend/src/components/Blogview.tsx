import React from 'react';
import BlogRenderer from './Blogrenderer';

interface BlogPostProps {
  post: {
    title: string;
    content: {
      time?: number;
      blocks: Array<any>;
      version?: string;
    };
    author: {
      name: string;
    };
    timestamp: string;
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-8">
        <span>By {post.author.name}</span>
        <span className="mx-2">•</span>
        <span>{post.timestamp}</span>
      </div>
      <BlogRenderer content={post.content} />
    </div>
  );
};

export default BlogPost;