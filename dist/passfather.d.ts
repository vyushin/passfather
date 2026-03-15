export interface PassfatherOptions {
  numbers?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  symbols?: boolean;
  length?: number;
  ranges?: number[][][];
  prng?: 'default' | 'Alea' | 'KISS07' | 'Kybos' | 'LFib' | 'LFIB4' | 'MRG32k3a' | 'Xorshift03';
  seed?: (string | number)[];
}

export default function passfather(options?: PassfatherOptions): string;
