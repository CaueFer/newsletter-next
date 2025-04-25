"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import { EditMenu } from "./textEditor/editMenu";

interface TextEditorProps {
  editable: boolean;
}
const TextEditor = ({ editable }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Italic,
      Underline,
      Strike,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editable,
  });

  return (
    <>
      <EditMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default TextEditor;
