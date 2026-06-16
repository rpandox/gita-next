'use client';
import { useEffect, useRef } from 'react';
import { mountGita } from '../lib/engine';

export default function Reader(){
  const ref = useRef(null);
  const booted = useRef(false);
  useEffect(()=>{
    if (booted.current || !ref.current) return;
    booted.current = true;
    mountGita(ref.current);
  },[]);
  return <div ref={ref} style={{position:'fixed',inset:0}} />;
}
