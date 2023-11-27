type ToolbarClassNamesType = {
  container?: string;
  button?: string;
  active?: string;
};

export type EditorAPIType = {
  namespace: string;
  showTreeView?: boolean;
  placeholder?: string;
  classNames?: {
    container?: string;
    inner?: string;
    input?: string;
    treeView?: string;
    toolbar?: ToolbarClassNamesType;
    placeholder?: string;
  };
};

export type EditorToolbarAPIType = {
  classNames?: ToolbarClassNamesType;
};
