import {
  relative, resolve, sep,
} from 'node:path';
// 给一个基础路径，获取到一个以此为基准计算绝对路径的方法
export function usePathAbs(basePath: string) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return (...paths: string[]) => normalizePath(resolve(basePath, ...paths));
}

// 获取相对于当前脚本执行位置的绝对路径

export const absCwd = usePathAbs(process.cwd());

// 给与一个基础路径，获取到一个以此为基准路径计算相对路径的方法
export function usePathRel(basePath: string) {
  return (path:string, ignoreLocalSignal:boolean = true) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const result = normalizePath(relative(basePath, path));
    if (result.slice(0, 2) === '..') {
      return result;
    }
    return ignoreLocalSignal ? result : `./${result}`;
  };
}

// 获取相当于当前脚本执行位置的相对路径
export const relCwd = usePathRel(process.cwd());

// 抹平win和linux平台路径分隔符差异
function normalizePath(path: string) {
  if (sep === '/') {
    return path;
  }
  return path.replace(new RegExp(`\\${sep}`, 'g'), '/');
}
