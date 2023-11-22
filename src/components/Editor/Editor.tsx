import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
// import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { TableOfContentsPlugin } from "@lexical/react/TableOfContentsPlugin";
// import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { theme } from "../../constant/theme";
import { useEffect, useState } from "react";
import { $getSelection, $isRangeSelection, EditorState } from "lexical";
import { MATCHERS } from "../../constant/MATCHERS";
import { twMerge } from "tailwind-merge";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

function CustomSelectPlugin() {
  const [editor] = useLexicalComposerContext();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener((editorState) => {
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

  console.log(offset);

  if (!show) return null;
  return (
    <div
      className={twMerge(
        "absolute flex items-center text-xs shadow-lg rounded-md border gap-1 border-gray-200"
      )}
      style={{
        left: offset.x - 80,
        top: offset.y + 25,
      }}
    >
      <button className="px-1.5 py-2.5 hover:bg-gray-100">
        <svg
          className="w-3 h-3 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M3 1h4.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0-7H1m2 7h6.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0 0H1"
          />
        </svg>
      </button>
      <button className="px-1.5 py-2.5 hover:bg-gray-100">
        <svg
          className="w-3 h-3 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="m3.874 15 6.143-14M1 15h6.33M6.67 1H13"
          />
        </svg>
      </button>
      <button className="px-1.5 py-2.5 hover:bg-gray-100">
        <svg
          className="w-3 h-3 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M12 1v9.5a4.5 4.5 0 1 1-9 0V1M1 1h4m5 0h4M1 19h14"
          />
        </svg>
      </button>
      <button className="px-1.5 py-2.5 hover:bg-gray-100">
        <svg
          className="w-3 h-3 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 19 19"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
          />
        </svg>
      </button>
      <button className="px-1.5 py-2.5 hover:bg-gray-100">
        <svg
          className="w-3 h-3 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M4 3V2h10v1M4 14h4m-1.245-3.018L6 14M9 2 7.579 7.579m0 0L1 1m6.579 6.579L15 15"
          />
        </svg>
      </button>
    </div>
  );
}

export function Editor() {
  const [editorState, setEditorState] = useState<EditorState>();
  const initialConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError,
    node: [],
  };

  return (
    <div className="relative w-full min-h-screen px-5 py-5">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full focus:outline-none" />
          }
          placeholder={
            <p className="text-gray-400 absolute top-5 select-none pointer-events-none">
              Write Something...
            </p>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin
          onChange={(editorState) => setEditorState(editorState)}
        />
        <HistoryPlugin />
        <CustomSelectPlugin />
        {/* <LinkPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <TabIndentationPlugin />
      <ClearEditorPlugin />
      <MarkdownShortcutPlugin /> */}
        {/* <AutoLinkPlugin matchers={MATCHERS} /> */}
      </LexicalComposer>
    </div>
  );
}
