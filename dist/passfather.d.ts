declare module "passfather" {

  export interface PassfatherOptions {
    numbers?: boolean | undefined;
    uppercase?: boolean | undefined;
    lowercase?: boolean | undefined;
    symbols?: boolean | undefined;
    length?: number | undefined;
  }

  export default function passfather(options?: PassfatherOptions): string;

}
