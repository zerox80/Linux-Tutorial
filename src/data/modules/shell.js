const moduleData = {
  "id": "shell",
  "pillar": "Produktivitaet",
  "title": "Shell-Workflow & Automatisierung",
  "level": "Einsteiger",
  "estimated": 45,
  "focus": [
    "foundation",
    "ops",
    "automation"
  ],
  "summary": "Nutze Shell-Features, History, Aliase und Pipes, um Aufgaben in Sekunden zu loesen.",
  "keywords": [
    "bash",
    "zsh",
    "fish",
    "workflow",
    "alias"
  ],
  "takeaways": [
    "Du baust wiederverwendbare Aliase und Funktionen.",
    "Du navigierst Logs mit Pipes und Suchmustern souveraen.",
    "Du setzt sichere Shell-Defaults und nutzt Hilfesysteme."
  ],
  "commands": [
    {
      "label": "Log-Fokus",
      "command": "journalctl -u ssh --since \"-1h\" | grep -i failed",
      "description": "Finde fehlgeschlagene SSH-Logins der letzten Stunde.",
      "tags": [
        "Troubleshooting"
      ]
    },
    {
      "label": "Alias-Library",
      "command": "echo \"alias ll='ls -alF'\" >> ~/.bashrc\nsource ~/.bashrc",
      "description": "Beispiel fuer schnellere Navigation mit Aliases.",
      "tags": [
        "Produktivitaet"
      ]
    }
  ],
  "missions": [
    "Erstelle fuenf produktive Aliase oder Funktionen fuer deinen Alltag.",
    "Nutze Ctrl+R, um einen komplexen Befehl aus der Historie wiederzuverwenden."
  ],
  "resources": [
    {
      "label": "GNU Bash Manual",
      "url": "https://www.gnu.org/software/bash/manual/bash.html"
    },
    {
      "label": "tldr Seiten",
      "url": "https://tldr.sh/"
    }
  ]
};

export default moduleData;
