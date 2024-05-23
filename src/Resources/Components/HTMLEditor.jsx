import React, { useState, useRef, useMemo, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function HTMLEditor({ onChange }) {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ 'align': [] }],
          ['clean']
        ]
      }
    });

    setEditor(quill);

    return () => {
      quill.off('text-change');
    };
  }, []);

  useEffect(() => {
    if (!editor) return;

    const handleChange = () => {
      const htmlContent = editorRef.current.querySelector('.ql-editor').innerHTML;
      onChange(htmlContent);
    };

    editor.on('text-change', handleChange);

    return () => {
      editor.off('text-change', handleChange);
    };
  }, [editor, onChange]);

  const memoizedEditor = useMemo(() => {
    return (
      <div ref={editorRef} style={{ height: '400px' }} />
    );
  }, []);

  return memoizedEditor;
}

export default HTMLEditor;
