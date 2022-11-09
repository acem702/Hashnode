import { useEffect, useState, useRef } from "react";
import { minimalSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

const useCodeMirror = (props) => {
  const refContainer = useRef(null);
  const [editorView, setEditorView] = useState();
  const { onChange } = props;

  useEffect(() => {
    if (!refContainer.current) return;

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        minimalSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        // oneDark,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, [refContainer]);

  return [refContainer, editorView];
};

export default useCodeMirror;
