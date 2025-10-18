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
  "summary": "Verstehe die Speicher-Philosophie von Linux, verbinde Block-Devices mit Dateisystemen und orchestriere Mounts sicher.",
  "keywords": [
    "fstab",
    "lsblk",
    "storage",
    "mount",
    "lvm",
    "dateisystem"
  ],
  "takeaways": [
    "Du erklaerst das \"Alles ist eine Datei\"-Prinzip anhand realer Geraete.",
    "Du kartierst den Storage-Stack von Hardware ueber LVM bis zum Mountpoint.",
    "Du waehlst passende Dateisysteme und planst persistente Mount- und Backup-Strategien."
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
  "explanation": [
    {
      "title": "Alles ist eine Datei – das Kernprinzip",
      "body": [
        "Unix und Linux behandeln saemtliche Ressourcen als Dateien: Textinhalte, Verzeichnisse, Ein- und Ausgabegeraete oder komplette Block-Devices wie Festplatten.",
        "Beispiele wie /dev/input/mouse0, /dev/sda oder /dev/sda1 zeigen, wie der Kernel physischen Komponenten eine Datei-Repraesentation gibt und damit ein einheitliches Werkzeug-Set fuer Lesen, Schreiben und Steuerung ermoeglicht.",
        "Storage-Kompetenz bedeutet zu verstehen, wie diese Device-Files mit der physischen Realitaet korrespondieren und welche Datenstrukturen (Dateisysteme) darauf aufsetzen."
      ]
    },
    {
      "title": "Der Linux-Storage-Stack in Schichten",
      "body": [
        "Die unterste Ebene bilden physische Block-Geraete wie HDD, SSD oder NVMe. Fuer Linux stellen sie rohe Datenbloecke bereit, auf die der Kernel zugreifen kann.",
        "Partitionierung teilt diese Rohgeraete in logische Abschnitte auf, etwa /dev/sda1 oder /dev/sda2. Werkzeuge wie fdisk, gdisk oder parted verwalten MBR- bzw. GPT-Tabellen und strukturieren so die Kapazitaet.",
        "Darueber liegt optional LVM: Du deklarierst Partitionen als Physical Volumes, fasst sie zu Volume Groups zusammen und erzeugst daraus flexible Logical Volumes. Diese LVs erhalten eigene Device-Files (z. B. /dev/mapper/vg_data-lv_home) und lassen sich im laufenden Betrieb vergroessern oder verkleinern.",
        "Auf Partitionen oder Logical Volumes erstellst du Dateisysteme mit mkfs. Sie verwalten Inodes, Datenbloecke und Journals, sodass deine Daten organisiert, konsistent und crash-sicher bleiben."
      ]
    },
    {
      "title": "Dateisysteme gezielt auswaehlen",
      "body": [
        "ext4 dient vielen Distributionen als robuster Allrounder und liefert zuverlaessige Performance fuer allgemeine Workloads.",
        "XFS ist Standard im Red-Hat-Umfeld und zeigt Staerken bei grossen Dateien sowie hoher Parallelitaet, etwa fuer Datenbanken oder Virtualisierung.",
        "Btrfs implementiert Copy-on-Write, Snapshots und RAID-Features direkt im Dateisystem und eignet sich fuer Workloads, die flexible Rollbacks erfordern.",
        "ZFS setzt auf umfassende Integritaetspruefung und Daten-Schutzmechanismen. Trotz getrenntem Kernel-Modul bleibt es wegen seiner Robustheit beliebt, besonders mit OpenZFS."
      ]
    },
    {
      "title": "VFS und Mounting zusammenbringen",
      "body": [
        "Das Virtual Filesystem (VFS) abstrahiert die Unterschiede einzelner Dateisystem-Treiber. Tools wie cp oder ls sprechen nur mit dem VFS, das die Operationen an ext4, XFS oder andere Treiber delegiert.",
        "Ein Dateisystem wird ueber einen Mountpoint in den globalen Verzeichnisbaum integriert. Du erstellst ein leeres Verzeichnis, mountest z. B. /dev/mapper/vg_data-lv_home nach /data und definierst Persistenz ueber /etc/fstab.",
        "Eine sauber gepflegte fstab stellt sicher, dass Mounts nach Reboots wiederhergestellt werden. Dokumentiere Optionen wie defaults, nofail oder x-systemd.automount, um Verhalten und Resilienz zu steuern."
      ]
    },
    {
      "title": "Werkzeuge fuer Diagnose und Betrieb",
      "body": [
        "lsblk zeigt Block-Geraete, Partitionen und LVM-Strukturen als Baum und ist dein Startpunkt fuer jede Storage-Analyse.",
        "df -h und du -sh * quantifizieren freien und belegten Speicher, waehrend fdisk -l oder gdisk -l Partitionstabellen offenlegen.",
        "pvcreate, vgcreate und lvcreate initialisieren LVM; mkfs formatiert Volumes; mount und umount bringen Dateisysteme online oder offline. Fuer Konsistenzpruefungen steht fsck bereit, und lvextend plus resize2fs erweitern Speicher bedarfsgerecht."
      ]
    },
    {
      "title": "Jenseits der lokalen Platte",
      "body": [
        "Kompetente Storage-Admins denken ueber lokale Laufwerke hinaus. NFS stellt Verzeichnisse im Linux- und Unix-Umfeld ueber das Netzwerk bereit und fuehlt sich dank Mounts wie lokaler Speicher an.",
        "Samba implementiert SMB/CIFS und ermoeglicht Zusammenarbeit mit Windows-Clients. Plane Authentifizierung, Berechtigungen und Performance-Tuning je nach Client-Landschaft.",
        "Fasse das Gelernte in einer Praxisformel zusammen: Von /dev/sdb ueber Partitionierung, LVM, mkfs und Mount gelangst du zu einem robusten /data, das Backups, Snapshots und Netzwerkeinbindung uebersteht."
      ]
    },
    {
      "title": "Praxis-Szenario: Neue Platte fuer /var/www einrichten",
      "body": [
        "Ausgangspunkt ist eine frische 100-GB-Festplatte, die als /dev/sdb erkannt wird. Mit lsblk pruefst du, dass noch keine Partitionen existieren und identifizierst das Ziel-Geraet.",
        "Anschliessend legst du mit gdisk eine GPT-Partition an, setzt den Typ auf Linux LVM (8e00) und erhaeltst so /dev/sdb1 als Grundlage fuer flexible Verwaltung.",
        "Markiere /dev/sdb1 per pvcreate als Physical Volume, buendel es in der Volume Group vg_webdata und schneide mit lvcreate ein 50G grosses Logical Volume lv_web heraus. lsblk zeigt dir die verschachtelten Ebenen.",
        "Formatiere das LV mit mkfs.xfs und mounte es nach dem Anlegen des Mountpoints nach /var/www. df -h bestaetigt die neue Kapazitaet; per blkid und einem Eintrag in /etc/fstab sorgst du fuer Neustart-Persistenz.",
        "Wird spaeter mehr Platz benoetigt, vergroesserst du das LV mit lvextend um z. B. 30G und passt das Dateisystem online via xfs_growfs /var/www an. So waechst der Storage ohne Ausfallzeit von 50G auf 80G."
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
