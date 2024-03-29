import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
// export interface CardProps {
//   id: any;
//   index: number;
//   move?: (dragIndex: number, hoverIndex: number) => void;
//   end: (id: string, dragIndex: number) => void;
// }

// interface DragItem {
//   index: number;
//   id: string;
//   type: string;
// }

const ItemTypes = {
  CARD: 'card',
};

const DnDItem = ({ id, end, move, children, index }) => {
  const reference = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!reference.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = reference.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action

      if (move) {
        move(dragIndex, hoverIndex);
      }

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      type: ItemTypes.CARD,
      id,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item) => {
      if (!item) {
        return;
      }
      end(item.id, item.index);
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(reference));
  return (
    <div ref={reference} style={{ opacity }}>
      {children}
    </div>
  );
};

export { DnDItem };
