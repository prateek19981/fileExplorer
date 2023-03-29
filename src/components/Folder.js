import { useState } from "react";
function Folder({ explorerData, handleInsertNode, handleDeleteNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onDelete = (id) => {
    console.log({ id });
    handleDeleteNode(id);
  };

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  const icon = () => {
    if (explorerData.items.length > 0) {
      if (expand) {
        return "⬇";
      } else return "➡";
    }
  };
  if (explorerData?.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          onClick={(e) => {
            if (e.type === "click") {
              console.log("left");
            } else if (e.type === "contextmenu") {
              console.log("right");
            }
            setExpand(!expand);
          }}
          className="folder">
          <span>
            {" "}
            {icon()} 📁
            {explorerData.name}{" "}
          </span>
          <div className="menu">
            <button
              onClick={(e) => {
                handleNewFolder(e, true);
              }}>
              🗂 ➕
            </button>
            <button
              onClick={(e) => {
                handleNewFolder(e, false);
              }}>
              📃 ➕
            </button>
            <span onClick={() => onDelete(explorerData.id)} className="delete">
              🗑
            </span>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "10px" }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={(e) => {
                  onAddFolder(e);
                }}
                className="inputContainer__input"
                autoFocus
                onBlur={() => {
                  setShowInput({ ...setShowInput, visible: false });
                }}></input>
            </div>
          )}
          {explorerData.items.map((item, index) => {
            return (
              <Folder
                explorerData={item}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                key={item?.id || index}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span className="file">
        {" "}
        {explorerData && "📄"} {explorerData?.name}
      </span>
    );
  }
}

export default Folder;
