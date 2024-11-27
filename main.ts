import { Notice, Plugin, TAbstractFile, TFile, TFolder, Menu } from "obsidian";

// Enum to distinguish between file and folder types
export enum ItemType {
    File = 'file',
    Folder = 'folder'
}

// Interface for file system items (both files and folders)
export interface FileSystemItem {
    type: ItemType;
    path: string;
    content?: string;
}

// Interface for the final copy information structure
export interface CopyInfo {
    items: FileSystemItem[];
    timestamp: string;
}

export default class RecursiveItemCopyPlugin extends Plugin {
    async onload() {
        // Register a new item in the file menu for individual files/folders
        this.registerEvent(
            this.app.workspace.on("file-menu", (menu: Menu, file: TAbstractFile) => {
                menu.addItem((item) => {
                    item
                        .setTitle("Copy contents (recursive)")
                        .setIcon("copy")
                        .onClick(async () => {
                            await this.handleCopyContents([file]);
                        });
                });
            })
        );

        // Register a new item in the file explorer context menu for multiple selections
        this.registerEvent(
            this.app.workspace.on("files-menu", (menu: Menu, files: TAbstractFile[]) => {
                menu.addItem((item) => {
                    item
                        .setTitle("Copy contents of selected items (recursive)")
                        .setIcon("copy")
                        .onClick(async () => {
                            await this.handleCopyContents(files);
                        });
                });
            })
        );
    }

    // Updated method to handle copying contents of selected files or folders
    async handleCopyContents(files: TAbstractFile[]) {
        if (files.length === 0) {
            new Notice("No files or folders selected.");
            return;
        }

        const items: FileSystemItem[] = [];

        for (const file of files) {
            if (file instanceof TFolder) {
                // If it's a folder, get its contents recursively
                items.push(...await this.getFolderContents(file));
            } else if (file instanceof TFile) {
                // If it's a file, read its content
                const content = await this.app.vault.read(file);
                items.push({
                    type: ItemType.File,
                    path: file.path,
                    content: content
                });
            }
        }

        // Remove duplicates
        const uniqueItems = this.removeDuplicates(items);

        // Create the final copy info structure
        const copyInfo: CopyInfo = {
            items: uniqueItems,
            timestamp: new Date().toISOString()
        };

        // Copy the stringified JSON to clipboard
        await navigator.clipboard.writeText(JSON.stringify(copyInfo, null, 2));
        new Notice(`Contents of ${uniqueItems.length} unique item(s) copied to clipboard in JSON format!`);
    }

    // Updated method to get contents of a folder
    async getFolderContents(folder: TFolder): Promise<FileSystemItem[]> {
        const items: FileSystemItem[] = [{
            type: ItemType.Folder,
            path: folder.path
        }];

        // Iterate through all children of the folder
        for (const child of folder.children) {
            if (child instanceof TFile) {
                // If child is a file, read its content
                const content = await this.app.vault.read(child);
                items.push({
                    type: ItemType.File,
                    path: child.path,
                    content: content
                });
            } else if (child instanceof TFolder) {
                // If child is a folder, recursively get its contents
                items.push(...await this.getFolderContents(child));
            }
        }

        return items;
    }

    // Updated method to remove duplicates
    removeDuplicates(items: FileSystemItem[]): FileSystemItem[] {
        const uniqueItems: FileSystemItem[] = [];
        const seenPaths = new Set<string>();

        for (const item of items) {
            if (!seenPaths.has(item.path)) {
                seenPaths.add(item.path);
                uniqueItems.push(item);
            }
        }

        return uniqueItems;
    }
}