import React from 'react';

interface EditorJSBlock {
  id?: string;
  type: string;
  data: {
    text?: string;
    level?: number;
    style?: string;
    items?: string[];
    caption?: string;
    url?: string;
    [key: string]: any;
  };
}

interface EditorJSData {
  time?: number;
  blocks: EditorJSBlock[];
  version?: string;
}

interface BlogRendererProps {
  content: EditorJSData; // You are passing content in this format
}

const BlogRenderer: React.FC<BlogRendererProps> = ({ content }) => {
  if (!content || !content.blocks) {
    return <div>No content available</div>;
  }

  const renderBlock = (block: EditorJSBlock) => {
    switch (block.type) {
      case 'paragraph':
        return <p className="my-4" dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />;
      
      case 'header':
        const HeadingTag = `h${block.data.level || 2}` as keyof JSX.IntrinsicElements;
        return <HeadingTag className="font-bold my-4" dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />;
      
      case 'list':
        const ListContainer = block.data.style === 'ordered' ? 'ol' : 'ul';
        return (
          <ListContainer className={`my-4 ml-6 ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
            {block.data.items?.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ListContainer>
        );
      
      case 'image':
        return (
          <figure className="my-4">
            <img 
              src={block.data.url} 
              alt={block.data.caption || ''} 
              className="max-w-full h-auto rounded-lg"
            />
            {block.data.caption && (
              <figcaption className="text-center text-gray-600 mt-2">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'quote':
        return (
          <blockquote className="my-4 pl-4 border-l-4 border-gray-300 italic">
            <p dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />
            {block.data.caption && (
              <cite className="block mt-2 text-gray-600">— {block.data.caption}</cite>
            )}
          </blockquote>
        );

      default:
        return null;
    }
  };

  return (
    <div className="blog-content">
      {content.blocks.map((block, index) => (
        <div key={index}>{renderBlock(block)}</div>
      ))}
    </div>
  );
};

export default BlogRenderer;
