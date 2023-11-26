import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  RangeSelection,
  TextFormatType,
} from "lexical";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  TbBold,
  TbClearFormatting,
  TbItalic,
  TbLink,
  TbUnderline,
  TbHeading,
  TbChevronDown,
  TbTypography,
  TbCursorText,
  TbQuote,
  TbList,
} from "react-icons/tb";

export function CustomToolbarSelectPlugin() {
  const [editor] = useLexicalComposerContext();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener((_) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection?.getTextContent() !== "") {
          setShow(true);
          const range = window.getSelection()?.getRangeAt(0);
          const rect = range?.getBoundingClientRect();
          if (rect) {
            setOffset({ x: rect.x, y: rect.y });
          }
        } else {
          setShow(false);
        }
      });
    });
  }, [editor]);

  const handleClick = (
    type: "bold" | "italic" | "removeFormat" | "underline"
  ) => {
    editor.update(() => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, type as TextFormatType);
    });
  };

  useEffect(() => {
    return editor.registerUpdateListener((_) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));
        }
        return false;
      });
    });
  }, [editor]);

  if (!show) return null;
  return (
    <div
      className={twMerge(
        "absolute flex items-center text-base shadow-lg rounded-md border gap-1 border-gray-200"
      )}
      style={{
        left: offset.x - 80,
        top: offset.y + 25,
      }}
    >
      <div className="group px-1.5 py-2 hover:bg-gray-100 flex items-center gap-1 cursor-pointer border-r relative">
        <TbHeading />
        <TbChevronDown />
        <div className="hidden absolute top-full mt-0.5 left-0 w-44 bg-gray-50 text-sm border rounded-lg group-hover:block overflow-hidden">
          <p className="text-gray-600 pt-2 pl-2 pb-1 border-b">Convert to</p>
          <ul className="flex flex-col">
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbTypography />
              </span>
              Heading 1
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbTypography />
              </span>{" "}
              Heading 2
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbTypography />
              </span>{" "}
              Heading 3
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbTypography />
              </span>{" "}
              Heading 4
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbTypography />
              </span>
              Heading 5
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbTypography />
              </span>
              Heading 6
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100 border-t">
              <span className="border p-1 rounded-lg bg-white">
                <TbCursorText />
              </span>
              Paragraph
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbQuote />
              </span>
              Quote
            </li>
            <li className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-100">
              <span className="border p-1 rounded-lg bg-white">
                <TbList />
              </span>
              List
            </li>
          </ul>
        </div>
      </div>
      <button
        className={twMerge(
          "px-1.5 py-2 hover:bg-gray-100",
          isBold && "bg-gray-100"
        )}
        onClick={() => handleClick("bold")}
      >
        <TbBold />
      </button>
      <button
        className={twMerge(
          "px-1.5 py-2 hover:bg-gray-100",
          isItalic && "bg-gray-100"
        )}
        onClick={() => handleClick("italic")}
      >
        <TbItalic />
      </button>
      <button
        className={twMerge(
          "px-1.5 py-2 hover:bg-gray-100",
          isUnderline && "bg-gray-100"
        )}
        onClick={() => handleClick("underline")}
      >
        <TbUnderline />
      </button>
      <button className={twMerge("px-1.5 py-2 hover:bg-gray-100")}>
        <TbLink />
      </button>
      <button
        className={twMerge("px-1.5 py-2 hover:bg-gray-100")}
        onClick={() => handleClick("removeFormat")}
      >
        <TbClearFormatting />
      </button>
    </div>
  );
}
