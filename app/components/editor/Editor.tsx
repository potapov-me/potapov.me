import { useEditor, EditorContent, type Editor as TiptapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useState, useRef } from 'react';
import ReactCrop, { Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FaBold, FaItalic, FaStrikethrough } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

// Using a native <img> for cropping to ensure we can read
// naturalWidth/height and attach a proper HTMLImageElement ref

interface EditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: TiptapEditor | null }) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [originalFilename, setOriginalFilename] = useState<string | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalFilename(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    if (image && completedCrop && originalFilename && imgRef.current) {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.clientWidth;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.clientHeight;
      const outputWidth = Math.round(completedCrop.width);
      const outputHeight = Math.round(completedCrop.height);
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(
          imgRef.current,
          Math.round(completedCrop.x * scaleX),
          Math.round(completedCrop.y * scaleY),
          Math.round(completedCrop.width * scaleX),
          Math.round(completedCrop.height * scaleY),
          0,
          0,
          outputWidth,
          outputHeight
        );

        canvas.toBlob(async (blob) => {
          if (blob) {
            const croppedFilename = originalFilename.includes('.')
              ? originalFilename.replace(/(\.[^./]+)$/i, '-cropped$1')
              : `${originalFilename}-cropped.png`;
            const formData = new FormData();
            formData.append('file', blob, croppedFilename);

            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();

            if (data.success) {
              editor?.chain().focus().setImage({ src: data.path }).run();
              setImage(null);
              setOriginalFilename(null);
              setCompletedCrop(null);
            }
          }
        }, 'image/png');
      }
    }
  };

  if (!editor) {
    return null;
  }

  const styleButtonClasses = "p-2 rounded-md hover:bg-gray-200";
  const activeStyleButtonClasses = "bg-gray-300";

  return (
    <>
      <div className="border border-gray-300 rounded-t-lg p-2 flex space-x-2">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${styleButtonClasses} ${editor?.isActive('bold') ? activeStyleButtonClasses : ''}`}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${styleButtonClasses} ${editor?.isActive('italic') ? activeStyleButtonClasses : ''}`}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`${styleButtonClasses} ${editor?.isActive('strike') ? activeStyleButtonClasses : ''}`}
        >
          <FaStrikethrough />
        </button>
        <input type="file" id="image-upload" onChange={handleImageSelect} accept="image/*" className="hidden" />
        <label htmlFor="image-upload" className={`${styleButtonClasses} hover:cursor-pointer`}>
          <FiUpload />
        </label>
      </div>
      {image && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[80vh] overflow-auto w-[600px] h-[400px]">
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={image}
                alt="Crop preview"
                style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
              />
            </ReactCrop>
            <div className="flex justify-end mt-2">
              <button type="button" onClick={() => setImage(null)} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button type="button" onClick={handleCrop} className="px-4 py-2 bg-primary text-white rounded-md">Crop & Insert</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Editor = ({ initialContent, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="border border-gray-300 rounded-b-lg">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
