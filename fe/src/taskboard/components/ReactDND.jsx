import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  BOX: "box",
};

const DraggableBox = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: isDragging ? "lightgreen" : "skyblue",
        cursor: "move",
        textAlign: "center",
        lineHeight: "100px",
      }}
    >
      Drag me
    </div>
  );
};

const DropZone = () => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => alert("Dropped!"),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: "300px",
        height: "300px",
        backgroundColor: isOver ? "lightyellow" : "lightgrey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed black",
      }}
    >
      Drop here
    </div>
  );
};

const DragDropContainer = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "50px" }}>
        <DraggableBox />
        <DropZone />
      </div>
    </DndProvider>
  );
};

export default DragDropContainer;
