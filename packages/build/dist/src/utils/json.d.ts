/**
 * 从文件中读取出 JSON 对象
 * @param filePath 文件路径
 * @returns JSON 对象
 */
export declare function readJsonFile<T extends Record<string, any> = Record<string, any>>(filePath: string): Promise<T>;
/**
 * 将 JSON 对象写入文件
 * @param filePath 文件路径
 * @param rests {@link JSON.stringify} 的参数
 */
export declare function writeJsonFile(filePath: string, ...rest: Parameters<typeof JSON.stringify>): Promise<void>;
