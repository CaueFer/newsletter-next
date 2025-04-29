"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Command, Extension, RawCommands } from "@tiptap/core";

import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";

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
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (
              "defaultValidate" in ctx &&
              typeof ctx.defaultValidate === "function" &&
              !ctx.defaultValidate(parsedUrl.href)
            ) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            if (
              !ctx.protocols ||
              typeof ctx.protocols !== "object" ||
              !Array.isArray(ctx.protocols)
            ) {
              return false;
            }

            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
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
