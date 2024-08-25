import { Notice, Plugin, TAbstractFile, TFile, TFolder } from "obsidian";

// Enum to distinguish between file and folder types
enum ItemType {
    File = 'file',
    Folder = 'folder'
}

// Base interface for both file and folder items
interface BaseItem {
    type: ItemType;
    path: string;
}

// Interface for file items, extending BaseItem
interface FileItem extends BaseItem {
    type: ItemType.File;
    content: string;
}

// Interface for folder items, extending BaseItem
interface FolderItem extends BaseItem {
    type: ItemType.Folder;
    children: FileSystemItem[];
}

// Union type for either a file or folder item
type FileSystemItem = FileItem | FolderItem;

// Interface for the final copy information structure
interface CopyInfo {
    rootElement: FileSystemItem;
    timestamp: string;
}

export default class RecursiveItemCopyPlugin extends Plugin {
    async onload() {
        // Register a new item in the file menu
        this.registerEvent(
            this.app.workspace.on("file-menu", (menu, file) => {
                menu.addItem((item) => {
                    item
                        .setTitle("Copy Contents")
                        .setIcon("copy")
                        .onClick(async () => {
                            await this.copyContents(file);
                        });
                });
            })
        );
    }

    // Main method to copy contents of a file or folder
    async copyContents(file: TAbstractFile) {
        let rootFolder: FileSystemItem;

        if (file instanceof TFolder) {
            // If it's a folder, get its contents recursively
            rootFolder = await this.getFolderContents(file);
        } else if (file instanceof TFile) {
            // If it's a file, read its content
            const content = await this.app.vault.read(file);
            rootFolder = {
                type: ItemType.File,
                path: file.path,
                content: content
            };
        } else {
            // If it's neither a file nor a folder, show an error
            new Notice("Unable to copy. Selected item is neither a file nor a folder.");
            return;
        }

        // Create the final copy info structure
        const copyInfo: CopyInfo = {
            rootElement: rootFolder,
            timestamp: new Date().toISOString()
        };

        // Copy the stringified JSON to clipboard
        await navigator.clipboard.writeText(JSON.stringify(copyInfo, null, 2));
        new Notice("Contents copied to clipboard in JSON format!");
    }

    // Recursive method to get contents of a folder
    async getFolderContents(folder: TFolder): Promise<FileSystemItem> {
        const folderItem: FileSystemItem = {
            type: ItemType.Folder,
            path: folder.path,
            children: []
        };

        // Iterate through all children of the folder
        for (const child of folder.children) {
            if (child instanceof TFile) {
                // If child is a file, read its content
                const content = await this.app.vault.read(child);
                folderItem.children!.push({
                    type: ItemType.File,
                    path: child.path,
                    content: content
                });
            } else if (child instanceof TFolder) {
                // If child is a folder, recursively get its contents
                const subFolderItem = await this.getFolderContents(child);
                folderItem.children!.push(subFolderItem);
            }
        }

        return folderItem;
    }
}