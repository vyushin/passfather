declare module "passfather" {

  export interface PassfatherOptions {
    numbers?: boolean | undefined;
    uppercase?: boolean | undefined;
    lowercase?: boolean | undefined;
    symbols?: boolean | undefined;
    length?: number | undefined;
    ranges?: Array<number[]> | undefined;
    prng?: 'default' | 'Alea' | 'KISS07' | 'Kybos' | 'LFib' | 'LFIB4' | 'MRG32k3a' | 'Xorshift03' | undefined;
    seed?: Array<string | number> | undefined;
  }

  export default function passfather(options?: PassfatherOptions): string;

}
