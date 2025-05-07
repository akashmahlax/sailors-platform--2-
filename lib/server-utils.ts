// This file contains server-only utilities
// Only import this file in server components or API routes

import fs from "fs"
import path from "path"
import { promisify } from "util"

// Promisify fs functions
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const mkdirAsync = promisify(fs.mkdir)

// Example function to read a file (server-side only)
export async function readServerFile(filePath: string): Promise<string> {
  try {
    return await readFileAsync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    throw error
  }
}

// Example function to write a file (server-side only)
export async function writeServerFile(filePath: string, data: string): Promise<void> {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath)
    await mkdirAsync(dir, { recursive: true }).catch(() => {})

    // Write file
    await writeFileAsync(filePath, data, "utf8")
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error)
    throw error
  }
}

// Add other server-only utilities as needed
