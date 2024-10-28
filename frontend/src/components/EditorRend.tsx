import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const EditorJSRenderer = ({ data , id }) => {
  const [expanded, setExpanded] = useState(false);

  const renderBlock = (block) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={block.id}
            className="my-4 text-gray-800"
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );
      case 'header':
        const HeaderTag = `h${block.data.level}`;
        return (
          <HeaderTag key={block.id} className="font-bold my-6">
            {block.data.text}
          </HeaderTag>
        );

      case 'list':
        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={block.id} className="my-4 ml-6">
            {block.data.items.map((item, index) => (
              <li key={index} className={ListTag === 'ul' ? 'list-disc' : 'list-decimal'}>
                {item}
              </li>
            ))}
          </ListTag>
        );

      case 'image':
        return (
          <figure key={block.id} className="my-4">
            <img 
              src={block.data.file.url} 
              alt={block.data.caption}
              className="max-w-full rounded-lg"
            />
            {block.data.caption && (
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'quote':
        return (
          <blockquote key={block.id} className="border-l-4 border-gray-300 pl-4 my-4 italic">
            <p>{block.data.text}</p>
            {block.data.caption && (
              <cite className="block text-sm text-gray-600 mt-2">
                — {block.data.caption}
              </cite>
            )}
          </blockquote>
        );

      case 'delimiter':
        return <hr key={block.id} className="my-6 border-t border-gray-300" />;

      case 'code':
        return (
          <pre key={block.id} className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
            <code>{block.data.code}</code>
          </pre>
        );

      default:
        console.warn(`Block type "${block.type}" is not supported`);
        return null;
    }
  };
  
  return (
  
    <div className="max-w-prose mx-auto">
      {/* Wrapper with limited height for "collapsed" view */}
      <div
        className={`relative ${expanded ? '' : 'h-32 overflow-hidden'}`}
        style={{
          maxHeight: expanded ? 'none' : '150px',
          position: 'relative'
        }}
      >
        {data?.blocks?.map((block) => renderBlock(block))}
        {/* Gradient overlay when collapsed */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-zinc-500 hover:text-zinc-700 font-semibold"
      >
        {expanded ? '' : 'Read More'}
      </button>
      
    </div>
  );
};

export default EditorJSRenderer;
