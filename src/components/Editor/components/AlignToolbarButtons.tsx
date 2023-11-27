import {
  TbAlignLeft,
  TbAlignCenter,
  TbAlignRight,
  TbAlignJustified,
} from "react-icons/tb";
import ToolbarButton from "./ToolbarButton";
import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from "lexical";

interface Props {
  editor: LexicalEditor;
}

export default function AlignToolbarButtons({ editor }: Props) {
  return (
    <>
      <ToolbarButton
        children={<TbAlignLeft />}
        label="Left Align"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
      />
      <ToolbarButton
        children={<TbAlignCenter />}
        label="Center Align"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
      />
      <ToolbarButton
        children={<TbAlignRight />}
        label="Right Align"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
      />
      <ToolbarButton
        children={<TbAlignJustified />}
        label="Justify Align"
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
      />
    </>
  );
}
