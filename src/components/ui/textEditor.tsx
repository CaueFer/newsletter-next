"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import { Command, Extension, RawCommands } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import { EditMenu } from "./textEditor/editMenu";

declare module "@tiptap/core" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Commands<ReturnType = any> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands(): Partial<RawCommands> {
    return {
      setFontSize:
        (fontSize: string): Command =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
    };
  },
});

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
      TextStyle,
      FontSize,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editable,
    editorProps: {
      attributes: {
        class: "h-full",
      },
    },
  });

  return (
    <div className="min-h-screen w-full bg-muted">
      <EditMenu editor={editor} />
      <EditorContent editor={editor} className="h-full" />
    </div>
  );
};

export default TextEditor;
