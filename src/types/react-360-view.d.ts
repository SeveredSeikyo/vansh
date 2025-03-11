// src/types/react-360-view.d.ts
declare module 'react-360-view' {
    import { FC } from 'react';
  
    interface ThreeSixtyProps {
      amount: number;
      imagePath: string;
      fileName: string;
    }
  
    const ThreeSixty: FC<ThreeSixtyProps>;
  
    export default ThreeSixty;
}
  