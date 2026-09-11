"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      ImageExtension,
      LinkExtension.configure({
        openOnClick: false,
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none p-4 min-h-[260px] focus:outline-none text-slate-800",
      },
    },
  });

  if (!editor) {
    return (
      <div className="border border-slate-200 rounded-lg p-4 min-h-[260px] bg-slate-50 animate-pulse text-slate-400">
        Loading rich editor...
      </div>
    );
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL (or upload via Media Library):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-navy/30">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 text-slate-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("bold") ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("italic") ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("heading", { level: 3 }) ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("bulletList") ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("orderedList") ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("blockquote") ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("codeBlock") ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>
        <div className="w-px h-5 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded hover:bg-slate-200 transition ${
            editor.isActive("link") ? "bg-slate-300 font-bold text-slate-900" : ""
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded hover:bg-slate-200 transition text-brand-navy"
          title="Insert Image URL"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editable Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
