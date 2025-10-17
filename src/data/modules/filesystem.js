const moduleData = {
  "id": "filesystem",
  "pillar": "Fundament",
  "title": "Dateisystem & Storage-Kompetenz",
  "level": "Einsteiger",
  "estimated": 40,
  "focus": [
    "foundation",
    "ops"
  ],
  "summary": "Lerne die Linux-Dateihierarchie kennen, analysiere Speicher und plane Mount-Strategien.",
  "keywords": [
    "fstab",
    "lsblk",
    "storage",
    "mount"
  ],
  "takeaways": [
    "Du liest Dateistrukturen (FHS) intuitiv.",
    "Du untersuchst Mounts, Quotas und Groesse schnell.",
    "Du planst persistente Mounts inklusive Backups."
  ],
  "commands": [
    {
      "label": "Storage-Inventur",
      "command": "lsblk -f\nsudo df -h | head",
      "description": "Visualisiere Dateisysteme, Mountpoints und belegten Speicher.",
      "tags": [
        "Storage"
      ]
    },
    {
      "label": "Platzfresser finden",
      "command": "sudo du -h /var | sort -h | tail",
      "description": "Identifiziere grosse Verzeichnisse im variablen Bereich.",
      "tags": [
        "Optimierung"
      ]
    }
  ],
  "missions": [
    "Analysiere dein Home-Verzeichnis und dokumentiere die Top-Ordner.",
    "Richte ein Loop-Device als Testpartition ein und mounte es via /etc/fstab."
  ],
  "resources": [
    {
      "label": "FHS Standard",
      "url": "https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html"
    },
    {
      "label": "Systemd Mount Units",
      "url": "https://www.freedesktop.org/software/systemd/man/latest/systemd.mount.html"
    }
  ]
};

export default moduleData;
