import { Plugin } from 'obsidian';

export default class CopyFolderContent extends Plugin {
    async onload() {
        console.log('Loading Copy Folder Content Plugin');
        // Add command to copy folder content
        this.addCommand({
            id: 'copy-folder-content',
            name: 'Copy Folder Content',
            callback: () => this.copyFolderContent()
        });
    }

    async onunload() {
        console.log('Unloading Copy Folder Content Plugin');
    }

    async copyFolderContent() {
        // Implement your folder copying logic here
        console.log('Copying folder content...');
    }
}
