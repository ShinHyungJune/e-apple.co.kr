import React from 'react';

const EditorContent = ({ description }) => {
  return (
    <div className="ql-snow solution-detail">
      <div className="ql-editor">
        <div className="editor-wrap" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};

export default EditorContent;