import * as fs from 'fs';

export function parseFile(filename: string): string[] {
  try {
    // Read the content of the file synchronously
    const fileContent: string = fs.readFileSync("./sourceFiles/" + filename, 'utf-8');

    // Split the content into an array of lines
    const lines: string[] = fileContent.split('\n');

    // Remove any trailing newline from the last line
    if (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }

    return lines;
  } catch (error) {
    let message = 'Unknown Error'
    if(error instanceof Error) message = error.message;
    // Handle file read errors
    console.error(`Error reading file ${filename}: ${message}`);
    return [];
  }
}