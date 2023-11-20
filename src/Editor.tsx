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
// import { TableOfContentsPlugin } from "@lexical/react/TableOfContentsPlugin";
// import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { theme } from "./constant/theme";
import { useState } from "react";
import { EditorState } from "lexical";
import { MATCHERS } from "./constant/MATCHERS";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

export default function Editor() {
  const [editorState, setEditorState] = useState<EditorState>();
  const initialConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editable-container" />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={(editorState) => setEditorState(editorState)} />
      <button
        onClick={() => {
          console.log(editorState?.toJSON());
        }}
      />
      <HistoryPlugin />
      <LinkPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <TabIndentationPlugin />
      <ClearEditorPlugin />
      <MarkdownShortcutPlugin />
      <AutoLinkPlugin matchers={MATCHERS} />
      {/* <MyCustomAutoFocusPlugin /> */}
    </LexicalComposer>
  );
}
