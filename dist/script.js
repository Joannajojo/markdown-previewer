import { marked } from "https://esm.sh/marked";
const { useState } = React; // Import useState from React

//To make your markdown previewer interpret carriage returns (i.e., newlines) and render them as <br> (line break) elements,
marked.setOptions({
  gfm: true,
  breaks: true // Treat single line breaks as <br>
});


// Editor component for input
const Editor = ({ content, onChange, isExpanded, toggleExpand }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "editor-group" }, /*#__PURE__*/
    React.createElement("div", { id: "editor-heading" }, /*#__PURE__*/
    React.createElement("h3", { id: "editor-title" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-fire" }), "Editor"), /*#__PURE__*/


    React.createElement("button", { className: "expand-btn", onClick: toggleExpand },
    isExpanded ? /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-compress" }) : /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-expand" }))), /*#__PURE__*/


    React.createElement("textarea", { className: isExpanded ? "expanded" : "collapsed", id: "editor", rows: isExpanded ? 20 : 10, value: content, onChange: onChange })));


};

// Review component to display the converted Markdown as HTML
const Review = ({ content, isPreviewerExpanded, togglePreviewerExpand }) => {
  // Convert Markdown content to HTML
  const markdownToHtml = marked(content); // Use marked.js to parse markdown

  return /*#__PURE__*/(
    React.createElement("div", { id: "preview" }, /*#__PURE__*/
    React.createElement("div", { id: "previewer-heading" }, /*#__PURE__*/
    React.createElement("h3", { id: "preview-title" }, /*#__PURE__*/React.createElement("i", { className: "bi bi-fire" }), "Previewer"), /*#__PURE__*/
    React.createElement("button", { className: "expand-btn", onClick: togglePreviewerExpand },
    isPreviewerExpanded ? /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-compress" }) : /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-expand" }))), /*#__PURE__*/



    React.createElement("div", { className: isPreviewerExpanded ? "expanded" : "collapsed", id: "preview-content", dangerouslySetInnerHTML: { __html: markdownToHtml } })));


};

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
  const [isExpanded, setExpand] = useState(false);
  const [isPreviewerExpanded, setPreviewerExpand] = useState(false);

  const handleContentChange = event => {
    setContent(event.target.value); // Update state with textarea value
  };

  // Whenever expand is selected, it will invert the expand state
  const toggleExpand = () => {
    setExpand(!isExpanded);
    if (isPreviewExpanded) {
      setPreviewerExpand(false);
    }
  };

  const togglePreviewerExpand = () => {
    setPreviewerExpand(!isPreviewerExpanded);
    if (isExpanded) {
      setExpand(false);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", { id: "body-title" }, "Markdown Previewer"),
    !isPreviewerExpanded && /*#__PURE__*/
    React.createElement(Editor, { content: content, onChange: handleContentChange, isExpanded: isExpanded, toggleExpand: toggleExpand }),




    !isExpanded && /*#__PURE__*/React.createElement(Review, { content: content, isPreviewerExpanded: isPreviewerExpanded, togglePreviewerExpand: togglePreviewerExpand }), " ", /*#__PURE__*/
    React.createElement("p", { className: "author-notes" }, "Inspired by : ", /*#__PURE__*/React.createElement("a", { href: "https://markdown-previewer.freecodecamp.rocks", target: "_blank" }, "this website by FreeCodeCamp"))));



};

// Render the component
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));