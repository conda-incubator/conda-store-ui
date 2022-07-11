import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  ...draggableStyle
});
