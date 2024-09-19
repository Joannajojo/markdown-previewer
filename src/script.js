import { marked } from "https://esm.sh/marked";
const { useState } = React; // Import useState from React

//To make your markdown previewer interpret carriage returns (i.e., newlines) and render them as <br> (line break) elements,
marked.setOptions({
  gfm: true,
  breaks: true // Treat single line breaks as <br>
});


// Editor component for input
const Editor = ({ content, onChange, isExpanded, toggleExpand }) => {
  return (
    <div id="editor-group">
      <div id="editor-heading">
        <h3 id="editor-title"><i className="bi bi-fire"></i>
Editor</h3>
      
        <button className="expand-btn" onClick={toggleExpand}>
  {isExpanded ? <i className="fa-solid fa-compress"></i> : <i className="fa-solid fa-expand"></i>}
</button>
      </div>  
     <textarea className={isExpanded? "expanded" : "collapsed"} id="editor" rows={isExpanded? 20 : 10 } value={content} onChange={onChange}></textarea>
     </div>
  );
}

// Review component to display the converted Markdown as HTML
const Review = ({ content, isPreviewerExpanded, togglePreviewerExpand }) => {
  // Convert Markdown content to HTML
  const markdownToHtml = marked(content); // Use marked.js to parse markdown

  return (
    <div id="preview">
      <div id="previewer-heading">
      <h3 id="preview-title"><i className="bi bi-fire"></i>Previewer</h3>
      <button className="expand-btn" onClick={togglePreviewerExpand}>
        {isPreviewerExpanded ? <i className="fa-solid fa-compress"></i> : <i className="fa-solid fa-expand"></i>}
      </button>
        </div>
      {/* Render the parsed HTML using dangerouslySetInnerHTML */}
      <div className={isPreviewerExpanded? "expanded": "collapsed" }id="preview-content" dangerouslySetInnerHTML={{ __html: markdownToHtml }}></div>
    </div>
  );
}

const App = () => {
  // Default markdown content with examples of each required element
  const defaultContent = `
# Heading 1

## Heading 2

This is a [link](https://example.com).

Here is some inline code: \`<div></div>\`.

\`\`\`
// This is a code block
function greet() {
  console.log("Hello, world!");
}
\`\`\`

- List item 1
- List item 2
- List item 3

> This is a blockquote.

![Image](https://via.placeholder.com/150)

**This is bold text.**
`;

  const [content, setContent] = useState(defaultContent); // Initialize content with default markdown
  const [isExpanded,setExpand] = useState(false);
  const [isPreviewerExpanded, setPreviewerExpand] = useState(false);
          
  const handleContentChange = (event) => {
    setContent(event.target.value); // Update state with textarea value
  };
  
  // Whenever expand is selected, it will invert the expand state
  const toggleExpand = () => {
    setExpand(!isExpanded);
    if(isPreviewExpanded){
      setPreviewerExpand(false);
    }
  };
  
  const togglePreviewerExpand=()=>{
      setPreviewerExpand(!isPreviewerExpanded);
     if(isExpanded){
      setExpand(false);
    }
  };
  
  return (
    <div>
      <h1 id="body-title">Markdown Previewer</h1>
      {!isPreviewerExpanded && 
        <Editor content={content} onChange={handleContentChange} isExpanded={isExpanded} toggleExpand={toggleExpand}
          />
      }
      
      {/* Pass content and onChange handler */}
      {!isExpanded && <Review content={content} isPreviewerExpanded={isPreviewerExpanded} togglePreviewerExpand={togglePreviewerExpand} />} {/* Pass content to Review component */}
    <p className="author-notes">Inspired by : <a href="https://markdown-previewer.freecodecamp.rocks" target="_blank">this website by FreeCodeCamp</a></p>
    </div>
    
  );
};

// Render the component
ReactDOM.render(<App />, document.getElementById('root'));
