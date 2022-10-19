import Bold from "public/icons/editor-icons/Bold";
import Code from "public/icons/editor-icons/Code";
import Heading from "public/icons/editor-icons/Heading";
import Italic from "public/icons/editor-icons/Italic";
import Ol from "public/icons/editor-icons/Ol";
import Ul from "public/icons/editor-icons/Ul";
import WebLink from "public/icons/editor-icons/WebLink";
import Underline from "public/icons/underline";
import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_ICON_SIZE } from "utils/constant";
import { addCommand } from "utils/helpers/miniFunctions";

const tools = [
  {
    data: "heading",
    hasChildren: true,
    name: "code",
    icon: (
      <Heading
        w={DEFAULT_ICON_SIZE}
        h={DEFAULT_ICON_SIZE}
        className="fill-black dark:fill-white"
      />
    ),
    on: false,
  },
  {
    data: "code",
    hasChildren: false,
    name: "code",
    icon: (
      <Code
        w={DEFAULT_ICON_SIZE}
        h={DEFAULT_ICON_SIZE}
        className="fill-black dark:fill-white"
      />
    ),
    on: false,
  },
  {
    data: "strong",
    hasChildren: false,
    name: "bold",
    icon: (
      <Bold
        w={DEFAULT_ICON_SIZE}
        h={DEFAULT_ICON_SIZE}
        className="fill-black dark:fill-white"
      />
    ),
    on: false,
  },
  {
    data: "i",
    hasChildren: false,
    name: "underline",
    icon: (
      <Italic
        w={DEFAULT_ICON_SIZE}
        h={DEFAULT_ICON_SIZE}
        className="fill-black dark:fill-white"
      />
    ),
    on: false,
  },
  {
    data: "ol",
    hasChildren: false,
    name: "ordered list",
    icon: (
      <Ol
        w={DEFAULT_ICON_SIZE}
        h={DEFAULT_ICON_SIZE}
        className="fill-black dark:fill-white"
      />
    ),
    on: false,
  },
  {
    data: "ul",
    hasChildren: false,
    name: "unordered list",
    icon: (
      <Ul
        w={DEFAULT_ICON_SIZE}
        h={DEFAULT_ICON_SIZE}
        className="fill-black dark:fill-white"
      />
    ),
    on: false,
  },
  {
    data: "u",
    hasChildren: false,
    name: "Underline",
    icon: (
      <Underline
        w={DEFAULT_ICON_SIZE}
        h={DEFAULT_ICON_SIZE}
        className="fill-black dark:fill-white"
      />
    ),
    on: false,
  },
];

const TextEditor = ({ onChange }) => {
  const writingArea = useRef(null);
  const toolsRef = useRef([]);

  useEffect(() => {
    console.log("object");
    onChange(writingArea.current.innerHTML);
  }, [writingArea.current?.innerHTML]);

  return (
    <>
      <header className="flex sticky top-0 left-0 bg-white dark:bg-dark-border_primary px-8 items-center justify-end border-y border-dark-border_primary dark:border-dark-border_secondary py-4 gap-6">
        {tools.map((e, i) =>
          e.hasChildren ? (
            <div className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                className="cursor-pointer w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center"
              >
                H
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white dark:bg-black border border-light-border_primary dark:border-dark-border_primary shadow-lg rounded-lg w-24 text-center overflow-hidden"
              >
                <button
                  data-command={e.name}
                  className="cursor-pointer py-2 hover:bg-gray-900"
                  title={e.name}
                  ref={(ele) => (toolsRef.current[i] = ele)}
                  onClick={() => addCommand("h1")}
                >
                  H1
                </button>
                <button
                  data-command={e.name}
                  className="cursor-pointer py-2 hover:bg-gray-900"
                  title={e.name}
                  ref={(ele) => (toolsRef.current[i] = ele)}
                  onClick={() => addCommand("h2")}
                >
                  H2
                </button>
                <button
                  data-command={e.name}
                  className="cursor-pointer py-2 hover:bg-gray-900"
                  title={e.name}
                  ref={(ele) => (toolsRef.current[i] = ele)}
                  onClick={() => addCommand("h3")}
                >
                  H3
                </button>
              </ul>
            </div>
          ) : (
            <button
              data-command={e.name}
              className="cursor-pointer"
              title={e.name}
              ref={(ele) => (toolsRef.current[i] = ele)}
              onClick={() => addCommand(e.data)}
            >
              {e.icon}
            </button>
          )
        )}
      </header>
      <main>
        <div
          ref={writingArea}
          contentEditable
          className="px-4 py-6 min-h-[35rem] writingArea"
          spellCheck={"off"}
          autoCapitalize={"off"}
          id="editor"
          onInput={(e) => onChange(e)}
          onChangeCapture={() => console.log("hi")}
          autoCorrect={"off"}
        >
          Tell your story here ...
        </div>
      </main>
    </>
  );
};

export default TextEditor;
