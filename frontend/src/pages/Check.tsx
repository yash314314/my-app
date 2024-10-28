import React from 'react';
import EditorJSRenderer from '../components/EditorRend'; // Adjust the path as necessary
import imageUrl from '../image/a.jpeg';
const Check = () => {
    const Data = {
        author: {
            name: "yashveer"
        },
        title: "this is for check only",
        content: {
            time: 1564767102436,
            blocks: [
                {
                    type: "header",
                    data: {
                        level: 1,
                        text: "Editor.js React Renderer"
                    }
                },
                {
                    type: "image",
                    data: {
                        file: {
                            url: imageUrl
                        },
                        caption: "this is idk",
                        withBorder: false,
                        stretched: false,
                        withBackground: false
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusantium veritatis dolorum cum amet! Ipsa ullam nisi, dolor explicabo ut nobis repudiandae saepe illo error facilis consectetur, quisquam assumenda dolorum."
                    }
                }
            ],
            version: "2.14.0"
        },
        timestamp: "23 October 2024"
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">{Data.title}</h1>
            <h2 className="text-lg font-semibold mb-2">By {Data.author.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{Data.timestamp}</p>
            <EditorJSRenderer data={Data.content} />
        </div>
    );
};

export default Check;
