import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  ...draggableStyle
});

export default getItemStyle;
