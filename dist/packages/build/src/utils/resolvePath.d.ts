export declare function usePathAbs(basePath: string): (...paths: string[]) => string;
export declare const absCwd: (...paths: string[]) => string;
export declare function usePathRel(basePath: string): (path: string, ignoreLocalSignal?: boolean) => string;
export declare const relCwd: (path: string, ignoreLocalSignal?: boolean) => string;
