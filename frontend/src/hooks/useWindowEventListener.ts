import {useEffect} from 'react';

export type Handler<E extends keyof WindowEventMap> = (e: WindowEventMap[E]) => void;

export const useWindowEventListener = <EventName extends keyof WindowEventMap>(
    eventName: EventName,
    handler: Handler<EventName>,
): void => {
  useEffect(() => {
    const eventListener = (event: WindowEventMap[EventName]) => handler(event);

    window.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName, handler]);
};
