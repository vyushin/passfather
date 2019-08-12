export interface PassfatherOptions {
  numbers?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  symbols?: boolean;
  length?: number;
}

export default function passfather<T>(options?: PassfatherOptions): T extends null ? never : string;
