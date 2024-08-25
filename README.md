# Streamlined Folder Copy Plugin for Obsidian

## Purpose

The Streamlined Folder Copy plugin for Obsidian enhances your note-taking and organization experience by allowing you to easily copy the contents of files and folders in a structured JSON format. This plugin is particularly useful for:

- Backing up specific parts of your vault
- Sharing structured content with others
- Analyzing the structure and content of your notes
- Migrating content to other systems or applications

![](/assets/preview.png)

## Features

- Copy the contents of a single file or an entire folder structure
- Preserve the hierarchical structure of folders and files
- Include file contents in the copied data
- Output data in a clean, structured JSON format
- Timestamp each copy operation for easy tracking

## How to Use

1. **Installation**
   - Open Obsidian Settings
   - Go to "Community Plugins" and disable Safe Mode
   - Click "Browse" and search for "Streamlined Folder Copy"
   - Install the plugin and enable it

2. **Copying File or Folder Contents**
   - Right-click on any file or folder in your Obsidian vault
   - In the context menu, click on "Copy Contents"
   - The plugin will process the selected item and copy the structured data to your clipboard

3. **Using the Copied Data**
   - Paste the copied content into any text editor or application that accepts JSON
   - The copied data will include the full path of each item, its content (for files), and maintain the folder structure (for folders)

## Output Format

The copied data is in JSON format and includes:

- `rootElement`: The copied file or folder
  - `type`: Either "file" or "folder"
  - `path`: The full path of the item in your vault
  - `content`: The content of the file (for file types)
  - `children`: An array of contained files and folders (for folder types)
- `timestamp`: The date and time when the copy was made

Example output for a folder:

```json
{
  "rootElement": {
    "type": "folder",
    "path": "/Example Folder",
    "children": [
      {
        "type": "file",
        "path": "/Example Folder/Note1.md",
        "content": "This is the content of Note1."
      },
      {
        "type": "folder",
        "path": "/Example Folder/Subfolder",
        "children": [
          {
            "type": "file",
            "path": "/Example Folder/Subfolder/Note2.md",
            "content": "This is the content of Note2."
          }
        ]
      }
    ]
  },
  "timestamp": "2023-08-01T12:34:56.789Z"
}
```

## Use Cases

1. **Backup**: Quickly create a structured backup of specific parts of your vault.
2. **Sharing**: Share a structured representation of your notes, including content and organization.
3. **Analysis**: Use the JSON output to analyze the structure and content of your notes programmatically.
4. **Migration**: Use the structured output to migrate your notes to other systems or applications.

## Feedback and Support

If you encounter any issues or have suggestions for improvements, please visit our GitHub repository [insert link here] to submit an issue or contribute to the project.

Enjoy streamlined copying of your Obsidian content!