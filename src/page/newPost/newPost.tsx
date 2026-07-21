import { useMemo } from "react";
import { HeadAndFootWapper } from "#/components/headAndFootWapper";
import { createEditor, type Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

function NewPost() {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <HeadAndFootWapper>
      <div className="page-wrap flex flex-col items-center px-[300px] py-6">
        <div className="w-full">
          <h1>New Post</h1>
        </div>
        <div className="w-full">
          <Slate editor={editor} initialValue={initialValue}>
            <Editable placeholder="Enter some plain text..." />
          </Slate>
        </div>
      </div>
    </HeadAndFootWapper>
  );
}

export default NewPost;
