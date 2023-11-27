import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import {
  TbBold,
  TbCode,
  TbItalic,
  TbStrikethrough,
  TbUnderline,
  TbLink,
} from "react-icons/tb";
import { FloatingLinkEditor } from "./FloatingLinkEditor";
import { createPortal } from "react-dom";
import { Divider } from "./Divider";
import ToolbarButton from "./ToolbarButton";
import clsx from "clsx";
import AlignToolbarButtons from "./AlignToolbarButtons";

interface Props {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
  isLink: boolean;
  editor: LexicalEditor;
  insertLink: () => void;
  activeClassName?: string;
}

export default function FormatToolbarButtons({
  isBold,
  isCode,
  isItalic,
  isStrikethrough,
  isUnderline,
  isLink,
  insertLink,
  editor,
  activeClassName,
}: Props) {
  return (
    <>
      <ToolbarButton
        children={<TbBold />}
        label="Format Bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={clsx(isBold && activeClassName)}
      />
      <ToolbarButton
        children={<TbItalic />}
        label="Format Italics"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={clsx(isItalic && activeClassName)}
      />
      <ToolbarButton
        children={<TbUnderline />}
        label="Format Underline"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={clsx(isUnderline && activeClassName)}
      />
      <ToolbarButton
        children={<TbStrikethrough />}
        label="Format Strikethrough"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        className={clsx(isStrikethrough && activeClassName)}
      />
      <ToolbarButton
        children={<TbCode />}
        label="Insert Code"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        className={clsx(isCode && activeClassName)}
      />
      <ToolbarButton
        children={<TbLink />}
        label="Insert Link"
        onClick={insertLink}
        className={clsx(isLink && activeClassName)}
      />
      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}

      <Divider />

      <AlignToolbarButtons editor={editor} />
    </>
  );
}
