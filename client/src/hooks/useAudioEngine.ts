import { useCallback, useRef } from "react";

interface AudioEngineOptions {
  enabled: boolean;
}

export function useAudioEngine({ enabled }: AudioEngineOptions) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!enabled) return null;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return audioContextRef.current;
  }, [enabled]);

  const playTone = useCallback((
    frequency: number,
    duration: number,
    volume: number = 0.1,
    type: OscillatorType = 'sine'
  ) => {
    const audioContext = getAudioContext();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [getAudioContext]);

  const playHoverSound = useCallback(() => {
    playTone(800, 0.1, 0.05, 'sine');
    setTimeout(() => playTone(1200, 0.05, 0.03, 'sine'), 50);
  }, [playTone]);

  const playClickSound = useCallback(() => {
    playTone(1200, 0.15, 0.08, 'square');
    setTimeout(() => playTone(800, 0.1, 0.05, 'sine'), 75);
  }, [playTone]);

  const playSuccessSound = useCallback(() => {
    playTone(523, 0.2, 0.06, 'sine'); // C5
    setTimeout(() => playTone(659, 0.2, 0.06, 'sine'), 100); // E5
    setTimeout(() => playTone(784, 0.3, 0.08, 'sine'), 200); // G5
  }, [playTone]);

  return {
    playHoverSound,
    playClickSound,
    playSuccessSound,
    playTone
  };
}