"use client";

import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  EllipsisVertical,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../tooltip";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../button";
import { Separator } from "../separator";
import { cn } from "@/lib/utils";

interface EditMenuProps {
  editor: Editor | null;
}
function EditMenuComponent({ editor }: EditMenuProps) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setRefresh] = useState(false);

  useEffect(() => {
    if (!editor) return;

    editor.on("transaction", () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setRefresh((prev) => !prev);
        console.log("atualizei");
      }, 100);
    });

    return () => {
      editor.off("selectionUpdate");
    };
  }, [editor]);

  if (!editor) return null;

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const handleStrikethrough = () => {
    editor.chain().focus().toggleStrike().run();
  };

  const handleCode = () => {
    if (editor) {
      editor.chain().focus().toggleCode().run();
    }
  };

  const handleAlign = (alignment: "left" | "center" | "right") => {
    if (editor) {
      editor.chain().focus().setTextAlign(alignment).run();
    }
  };

  return (
    <TooltipProvider>
      <Menubar>
        {/* BOLD */}
        <MenubarMenu>
          <Button
            onClick={handleBold}
            variant="ghost"
            className={cn(
              "cursor-pointer",
              editor.isActive("bold") ? "bg-zinc-200 dark:bg-zinc-700" : ""
            )}
          >
            <Bold />
          </Button>
        </MenubarMenu>

        {/* ITALIC */}
        <MenubarMenu>
          <Button
            onClick={handleItalic}
            variant="ghost"
            className={cn(
              "cursor-pointer",
              editor.isActive("italic") ? "bg-zinc-200 dark:bg-zinc-700" : ""
            )}
          >
            <Italic />
          </Button>
        </MenubarMenu>

        {/* UNDERLINE */}
        <MenubarMenu>
          <Button
            onClick={handleUnderline}
            variant="ghost"
            className={cn(
              "cursor-pointer",
              editor.isActive("underline") ? "bg-zinc-200 dark:bg-zinc-700" : ""
            )}
          >
            <Underline />
          </Button>
        </MenubarMenu>

        {/* STRIKE */}
        <MenubarMenu>
          <Button
            onClick={handleStrikethrough}
            variant="ghost"
            className={cn(
              "cursor-pointer",
              editor.isActive("strike") ? "bg-zinc-200 dark:bg-zinc-700" : ""
            )}
          >
            <Strikethrough />
          </Button>
        </MenubarMenu>

        {/* CODE */}
        <MenubarMenu>
          <Button
            onClick={handleCode}
            variant="ghost"
            className={cn(
              "cursor-pointer",
              editor?.isActive("code") ? "bg-zinc-200 dark:bg-zinc-700" : ""
            )}
          >
            <Code />
          </Button>
        </MenubarMenu>

        {/* ALIGN */}
        <MenubarMenu>
          <MenubarTrigger>
            <EllipsisVertical size={15}/>
          </MenubarTrigger>
          <MenubarContent className="flex flex-row">
            {/* ESQUERDA */}
            <Tooltip>
              <TooltipTrigger>
                <MenubarItem onClick={() => handleAlign("left")}>
                  <AlignLeft />
                </MenubarItem>
              </TooltipTrigger>
              <TooltipContent>Esquerda</TooltipContent>
            </Tooltip>

            {/* CENTER */}
            <Tooltip>
              <TooltipTrigger>
                <MenubarItem onClick={() => handleAlign("center")}>
                  <AlignCenter />
                </MenubarItem>
              </TooltipTrigger>
              <TooltipContent>Centro</TooltipContent>
            </Tooltip>

            {/* DIREITA */}
            <Tooltip>
              <TooltipTrigger>
                <MenubarItem onClick={() => handleAlign("right")}>
                  <AlignRight />
                </MenubarItem>
              </TooltipTrigger>
              <TooltipContent>Direita</TooltipContent>
            </Tooltip>
          </MenubarContent>
        </MenubarMenu>

        <Separator orientation="vertical" />

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </TooltipProvider>
  );
}

export const EditMenu = React.memo(EditMenuComponent);
