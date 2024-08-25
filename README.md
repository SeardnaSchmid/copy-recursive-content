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
  "items": [
    {
      "type": "folder",
      "path": "Essen"
    },
    {
      "type": "file",
      "path": "Essen/Milchreis Rezept.md",
      "content": "\n# Der perfekte Milchreis - Grundrezept\n\n## Zutaten (für 4 Portionen):\n\n- 1 Liter Vollmilch, zimmerwarm\n- 250 g Milchreis\n- 4 EL Zucker\n- 1 EL Butter\n- 1 Vanilleschote oder 1 Pck. Vanillezucker\n- Nach Belieben: Zimtzucker, Apfelmus, Rote Grütze oder frische Früchte\n\n## Zubereitung:\n\n1. In einem großen Topf die Butter schmelzen und den Rundkornreis kurz darin anschwitzen.\n\n2. Zimmerwarme Vollmilch und 4 EL Zucker hinzugeben. Wenn vorhanden, das Mark einer Vanilleschote sowie die aufgeschlitzte Schote ebenfalls in den Topf geben; andernfalls Vanillezucker hinzufügen.\n\n3. Alles unter vorsichtigem Rühren mit dem Holzkochlöffel einmal aufkochen lassen. Dabei aufpassen, dass sich nichts am Topfboden ansetzt.\n\n4. Die Temperatur der Herdplatte zurückschalten - die Milch sollte noch leicht weiterköcheln. Den Milchreis im geschlossenen Topf circa 30 Minuten ziehen lassen.\n\n5. Nach ca. 15 Minuten (evtl. auch früher) umrühren.\n\n6. Nach 30 Minuten ist der Reis servierfertig. Er kann warm oder kalt gegessen werden.\n\n7. Nach Geschmack Zimt und Zucker mischen und über den Milchreis geben oder Apfelmus, Rote Grütze, frisches Obst, etc. dazu reichen.\n\n## Nährwerte und Zubereitungsinfo:\n\n- Kalorien pro Portion: ca. 385 Kcal\n- Arbeitszeit: ca. 10 Minuten\n- Koch-/Backzeit: ca. 35 Minuten\n- Gesamtzeit: ca. 45 Minuten\n- Schwierigkeitsgrad: normal\n"
    },
    {
      "type": "file",
      "path": "Essen/Rhabarber Kuchen Rezept.md",
      "content": "### Zutaten\n\n#### Für die Streusel\n\n- 125 Gramm Butter kalt in Stückchen\n- 125 Gramm Weizenmehl\n- 80 Gramm gemahlene Mandeln Amaretti-Variante siehe Tipps\n- 70 Gramm Zucker\n\n#### Zum Belegen\n\n- 700 Gramm Rhabarber\n\n#### Für den Teig\n\n- 250 Gramm Butter weich\n- 180 Gramm Zucker\n- 4 mittelgroße Eier\n- 400 Gramm Weizenmehl\n- 3 Teelöffel Backpulver\n- 1 Prise Salz\n- 140 Milliliter Milch grobe Angabe\n\n### Zubereitung\n\n- Zunächst die Streusel vorbereiten. Dafür die fein gehackte kalte Butter mit den anderen Zutaten kurz mit den Händen verkneten und zu Streuseln formen. In den Kühlschrank stellen.\n    \n- Die Rhabarberstangen putzen, waschen, schälen und grob in 1-2 cm große Stückchen schneiden. Ein Backblech (max. 37*42 cm) mit Backpapier auslegen oder fetten und mit Mehl bestäuben. Ofen auf 175 Grad Ober- und Unterhitze vorheizen.\n    \n- Für den Rührteig die weiche Butter mit dem Zucker schaumig schlagen. Eier nach und nach einzeln unterrühren. Zuletzt das mit dem Backpulver und Salz vermischte Mehl im Wechsel mit der Milch unterrühren. Der Teig soll schwer reißend vom Löffel fallen.\n    \n- Teig auf dem Backblech verteilen, glattstreichen, die Rhabarberstücke leicht hineindrücken und zuletzt die Streusel auf dem Kuchen verteilen. Etwa 35-40 Minuten backen.\n    \n\n### Anmerkungen\n\n- **Variante mit Amarett**i: Besonders köstlich wird der Rhabarberkuchen mit Amarettini-Streuseln statt normalen Mandelstreuseln. Dafür die gemahlenen Mandeln und den Zucker durch 80 Gramm weiche Amaretti, grob zerbröckelt, sowie 30 g Vanillezucker ersetzen"
    }
  ],
  "timestamp": "2024-08-24T19:41:50.729Z"
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
