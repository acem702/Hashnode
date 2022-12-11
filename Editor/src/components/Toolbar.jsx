import { useContext } from "react";
import { getCommands, getExtraCommands } from "../commands";
import { EditorContext } from "../Context";

const Toolbar = () => {
  const { dispatch, commandOrchestrator } = useContext(EditorContext);

  const handler = (command) => {
    console.log(command.keyCommand);
    if (command.keyCommand === "preview") {
      dispatch({ preview: true, fullscreen: false, edit: false });
    } else if (command.keyCommand === "fullscreen") {
      dispatch({ preview: false, fullscreen: true, edit: false });
    } else if (command.keyCommand === "edit") {
      dispatch({ preview: false, fullscreen: false, edit: true });
    }
    commandOrchestrator && commandOrchestrator.executeCommand(command);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-3 border-y p-2 border-[#2a354d]">
      <div className="flex gap-2">
        {getExtraCommands().map((command) => {
          return (
            command.keyCommand !== "divider" && (
              <button
                className={"iconBtn"}
                title={command.buttonProps.title}
                key={command.name}
                onClick={() => handler(command)}
              >
                {command.name.substring(0, 1).toUpperCase() +
                  command.name.slice(1, command.name.length)}
              </button>
            )
          );
        })}
      </div>

      <div className="flex gap-4">
        {getCommands().map((command) => {
          return (
            command.keyCommand !== "divider" && (
              <button
                className="iconBtn"
                title={command.buttonProps.title}
                key={command.name}
                onClick={() => handler(command)}
              >
                {command.icon}
              </button>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
