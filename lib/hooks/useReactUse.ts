"use client";

import { useEffect, useRef } from "react";

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const hasRun = useRef(false);
  const effectRef = useRef(effect);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      return effectRef.current();
    }
  }, []);
};

export const useLongPress = (
  callback: (event: React.MouseEvent | React.TouchEvent) => void,
  { threshold = 400 }: { threshold?: number } = {},
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);
  const eventRef = useRef<React.MouseEvent | React.TouchEvent>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const start = (event: React.MouseEvent | React.TouchEvent) => {
    eventRef.current = event;
    timeoutRef.current = setTimeout(() => {
      if (eventRef.current) {
        callbackRef.current(eventRef.current);
      }
    }, threshold);
  };

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    eventRef.current = undefined;
  };

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};
