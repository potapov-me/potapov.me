'use client';

import 'react-quill-new/dist/quill.snow.css';
import { useRef, useMemo } from 'react';
import ReactQuill from 'react-quill-new';

interface EditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export const Editor = ({ initialContent, onChange }: EditorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'code-block'],
        ['clean'],
      ],
    },
  }), []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={initialContent}
      onChange={onChange}
      modules={modules}
    />
  );
};