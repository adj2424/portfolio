import Lenis from 'lenis';
import { createContext } from 'react';

export interface Context {
  lenis: Lenis | null;
  isMobile: boolean;
  onHover: boolean;
  setOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  onWorksHover: { isWorksTitleHover: boolean; worksImgSrc: string };
  setOnWorksHover: React.Dispatch<React.SetStateAction<{ isWorksTitleHover: boolean; worksImgSrc: string }>>;


}

export const MyContext = createContext<Context | null>(null);
