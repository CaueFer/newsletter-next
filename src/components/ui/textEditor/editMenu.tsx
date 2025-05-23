"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  EllipsisVertical,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
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
import {
  sizeMapToAcron,
  sizeMapToPx,
  valueFormatToText,
} from "@/lib/defaultConst";
import { LinkPopup } from "./linkPopup";

interface EditMenuProps {
  editor: Editor | null;
}
function EditMenuComponent({ editor }: EditMenuProps) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setRefresh] = useState(false);

  const [popupState, setPopupState] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
    initialUrl: string;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
    initialUrl: "",
  });

  const getSelectionPosition = useCallback(() => {
    if (!editor) return { x: 0, y: 0 };

    const { to } = editor.state.selection;
    const endRange = editor.view.coordsAtPos(to);

    const x = endRange.left;
    const y = endRange.bottom + 5;

    return { x, y };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.on("transaction", () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setRefresh((prev) => !prev);
        console.log("atualizei");

        const fontSize = editor.getAttributes("textStyle").fontSize;
        if (!fontSize) {
          editor.commands.setFontSize("18px");
        }

        const appearLinkPopup = () => {
          const isActive = editor?.isActive("link");

          if (isActive) {
            const currentLink = editor.getAttributes("link").href || "";
            const { x, y } = getSelectionPosition();

            setPopupState({
              isOpen: true,
              x,
              y,
              initialUrl: currentLink,
            });
          } else {
            setPopupState({
              isOpen: false,
              x: 0,
              y: 0,
              initialUrl: "",
            });
          }
        };
        appearLinkPopup();
      }, 100);
    });

    return () => {
      editor.off("selectionUpdate");
    };
  }, [editor, getSelectionPosition]);

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

  const handleAlign = (alignment: "left" | "center" | "right" | "justify") => {
    if (editor) {
      editor.chain().focus().setTextAlign(alignment).run();
    }
  };

  const handleSizeChange = (size: string) => {
    editor.chain().focus().setFontSize(sizeMapToPx[size]).run();
  };

  const handleParagraphy = () => {
    editor.chain().focus().setParagraph().run();
  };

  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleCheckList = () => {
    editor.chain().focus().toggleTaskList().run();
  };

  const handleHeading1 = () => {
    editor
      ?.chain()
      .focus()
      .setHeading({ level: 1 })
      .setFontSize(sizeMapToPx["xl"])
      .run();
  };

  const handleHeading2 = () => {
    editor
      ?.chain()
      .focus()
      .setHeading({ level: 2 })
      .setFontSize(sizeMapToPx["lg"])
      .run();
  };

  const handleHeading3 = () => {
    editor
      ?.chain()
      .focus()
      .setHeading({ level: 3 })
      .setFontSize(sizeMapToPx["md"])
      .run();
  };

  const getFormatText = (): string => {
    const formatOptions: [boolean, string][] = [
      [editor.isActive("taskList"), "tl"],
      [editor.isActive("bulletList"), "bl"],
      [editor.isActive("paragraph"), "pr"],
      [editor.isActive("heading", { level: 1 }), "h1"],
      [editor.isActive("heading", { level: 2 }), "h2"],
      [editor.isActive("heading", { level: 3 }), "h3"],
    ];

    const item = formatOptions.find(([active]) => active)?.[1] || "pr";
    return item;
  };

  const setFormatText = (format: string) => {
    const formatAcron = valueFormatToText[format];

    switch (formatAcron) {
      case "paragraph":
        handleParagraphy();
        break;
      case "bulletList":
        handleBulletList();
        break;
      case "taskList":
        handleCheckList();
        break;
      case "heading-1":
        handleHeading1();
        break;
      case "heading-2":
        handleHeading2();

        break;
      case "heading-3":
        handleHeading3();

        break;

      default:
        break;
    }
  };

  const handleToogleLink = () => {
    const isActive = editor?.isActive("link");

    if (isActive) {
      handleRemoveLink();
    } else {
      const currentLink = editor.getAttributes("link").href || "";
      const { x, y } = getSelectionPosition();

      setPopupState({
        isOpen: true,
        x,
        y,
        initialUrl: currentLink,
      });
    }
  };

  const handleSubmitLink = (link: string) => {
    editor.chain().focus().setLink({ href: link }).run();
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
  };
  return (
    <>
      <div className="flex justify-center align-center p-2">
        <TooltipProvider>
          <Menubar>
            {/* FORMAT */}
            <MenubarMenu>
              <Select
                onValueChange={(e) => setFormatText(e)}
                defaultValue={undefined}
                value={getFormatText()}
              >
                <SelectTrigger className="w-[180px] focus-visible:ring-0 focus-visible:border-inherit py-1 max-h-[30px]">
                  <SelectValue placeholder="Escolher formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pr">Parágrafo</SelectItem>
                  <SelectItem value="bl">Lista de pontos</SelectItem>
                  <SelectItem value="tl">Lista de tarefas</SelectItem>
                  <SelectItem value="h1">Titulo 1</SelectItem>
                  <SelectItem value="h2">Titulo 2</SelectItem>
                  <SelectItem value="h3">Titulo 3</SelectItem>
                </SelectContent>
              </Select>
            </MenubarMenu>

            {/* SIZES */}
            <MenubarMenu>
              <Select
                onValueChange={(e) => handleSizeChange(e)}
                defaultValue={undefined}
                value={
                  sizeMapToAcron[editor.getAttributes("textStyle").fontSize]
                }
              >
                <SelectTrigger className="w-[150px] focus-visible:ring-0 focus-visible:border-inherit py-1 max-h-[30px]">
                  <SelectValue placeholder="Escolher tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">Extra Pequeno</SelectItem>
                  <SelectItem value="sm">Pequeno</SelectItem>
                  <SelectItem value="md">Médio</SelectItem>
                  <SelectItem value="lg">Grande</SelectItem>
                  <SelectItem value="xl">Extra Grande</SelectItem>
                </SelectContent>
              </Select>
            </MenubarMenu>

            <Separator orientation="vertical" />

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
                  editor.isActive("italic")
                    ? "bg-zinc-200 dark:bg-zinc-700"
                    : ""
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
                  editor.isActive("underline")
                    ? "bg-zinc-200 dark:bg-zinc-700"
                    : ""
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
                  editor.isActive("strike")
                    ? "bg-zinc-200 dark:bg-zinc-700"
                    : ""
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
              <MenubarTrigger className="cursor-pointer">
                <EllipsisVertical size={15} />
              </MenubarTrigger>
              <MenubarContent className="flex flex-row justify-around">
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

                {/* JUSTIFY */}
                <Tooltip>
                  <TooltipTrigger>
                    <MenubarItem onClick={() => handleAlign("justify")}>
                      <AlignJustify />
                    </MenubarItem>
                  </TooltipTrigger>
                  <TooltipContent>Justificar</TooltipContent>
                </Tooltip>

                {/* LINK */}
                <Tooltip>
                  <TooltipTrigger>
                    <MenubarItem
                      onClick={() => handleToogleLink()}
                      className={cn(
                        editor?.isActive("link")
                          ? "bg-zinc-200 dark:bg-zinc-700"
                          : ""
                      )}
                    >
                      <Link />
                    </MenubarItem>
                  </TooltipTrigger>
                  <TooltipContent>Link</TooltipContent>
                </Tooltip>
              </MenubarContent>
            </MenubarMenu>

            <Separator orientation="vertical" />

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem>
                  Always Show Bookmarks Bar
                </MenubarCheckboxItem>
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
              <MenubarTrigger>Exportar</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Texto</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">PDF</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Docx</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </TooltipProvider>
      </div>

      {popupState.isOpen && (
        <LinkPopup
          x={popupState.x}
          y={popupState.y}
          initialUrl={popupState.initialUrl}
          onSubmit={handleSubmitLink}
          onRemove={handleRemoveLink}
          isLinkActive={editor?.isActive("link")}
        />
      )}
    </>
  );
}

export const EditMenu = React.memo(EditMenuComponent);
