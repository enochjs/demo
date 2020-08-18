import fs from 'fs'

export function summarizeFilesInDirectorySync(directory: string) {
  return fs.readdirSync(directory).map((fileName: string) => ({directory, fileName}));
}
