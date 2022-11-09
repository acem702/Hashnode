import React, { useCallback, useEffect } from "react";
import useCodeMirror from "./use-codemirror";

const Editor = ({ onChange, initialDoc }) => {
  const handleChange = useCallback(
    (state) => onChange(state.doc.toString()),
    [onChange]
  );

  const [refContainer, editorView] = useCodeMirror({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    } else {
      // loading editor
    }
  }, [editorView]);

  return (
    <>
      <div className="h-full" ref={refContainer}></div>
    </>
  );
};

export default Editor;
