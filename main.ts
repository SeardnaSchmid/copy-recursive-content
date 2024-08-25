import { Notice, Plugin, TAbstractFile, TFile, TFolder } from "obsidian";

interface FileInfo {
	path: string;
	name: string;
	content: string;
}

interface FolderInfo {
	name: string;
	files: FileInfo[];
	folders: FolderInfo[];
}

export default class RecursiveFolderCopyPlugin extends Plugin {
	async onload() {
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				menu.addItem((item) => {
					item
						.setTitle("Copy Folder Contents")
						.setIcon("copy")
						.onClick(async () => {
							await this.copyContents(file);
						});
				});
			})
		);
	}

	async copyContents(file: TAbstractFile) {
		if (file instanceof TFolder) {
			const contents = await this.getFolderContents(file);
			await navigator.clipboard.writeText(JSON.stringify({ root: file.name, ...contents }, null, 2));
			new Notice("Folder contents copied to clipboard in JSON format!");
		} else if (file instanceof TFile) {
			const content = await this.app.vault.read(file);
			const fileInfo: FileInfo = {
				path: file.path,
				name: file.name,
				content: content
			};
			await navigator.clipboard.writeText(JSON.stringify(fileInfo, null, 2));
			new Notice("File content copied to clipboard in JSON format!");
		} else {
			new Notice("Unable to copy. Selected item is neither a file nor a folder.");
		}
	}

	async getFolderContents(folder: TFolder): Promise<FolderInfo> {
		const folderInfo: FolderInfo = {
			name: folder.name,
			files: [],
			folders: []
		};

		for (const child of folder.children) {
			if (child instanceof TFile) {
				const content = await this.app.vault.read(child);
				folderInfo.files.push({
					path: child.path,
					name: child.name,
					content: content
				});
			} else if (child instanceof TFolder) {
				const subFolder = await this.getFolderContents(child);
				folderInfo.folders.push(subFolder);
			}
		}

		return folderInfo;
	}
}