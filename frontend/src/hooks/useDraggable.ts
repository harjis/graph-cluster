import React, { useCallback, useState } from 'react';

import { useWindowEventListener } from './useWindowEventListener';

export type Coordinates = {
  x: number;
  y: number;
};
type Props = {
  coordinates: Coordinates;
  onDrag?: (coordinates: Coordinates) => void;
  onStopDrag?: (coordinates: Coordinates) => void;
};
type Return = {
  coordinates: Coordinates;
  startDrag: (event: React.MouseEvent) => void;
};
export const useDraggable = (props: Props): Return => {
  const [coordinates, setCoordinates] = useState<Coordinates>(
    props.coordinates
  );
  const [nodeOffset, setNodeOffset] = useState<Coordinates | null>(null);

  const startDrag = useCallback((event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    setNodeOffset({ x: pageX, y: pageY });
  }, []);

  const stopDrag = useCallback(() => {
    // A bit hackish to have nodeOffset in the check. Otherwise clicking on canvas
    // without moving anything would also send an update
    nodeOffset && props.onStopDrag && props.onStopDrag(coordinates);
    setNodeOffset(null);
  }, [nodeOffset, coordinates, props]);

  const drag = useCallback(
    (event: MouseEvent) => {
      if (nodeOffset === null) {
        return;
      }
      const xDiff = nodeOffset.x - event.pageX;
      const yDiff = nodeOffset.y - event.pageY;
      setNodeOffset({ x: event.pageX, y: event.pageY });
      setCoordinates((prevPosition) => {
        const newPosition = {
          x: prevPosition.x - xDiff,
          y: prevPosition.y - yDiff,
        };
        props.onDrag && props.onDrag(newPosition);
        return newPosition;
      });
    },
    [nodeOffset, props]
  );

  useWindowEventListener('mousemove', drag);
  useWindowEventListener('mouseup', stopDrag);

  return {
    coordinates,
    startDrag,
  };
};
