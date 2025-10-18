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
  "summary": "Um Linux-Storage zu meistern, müssen Sie zuerst die Kernphilosophie von Unix/Linux verstehen: Alles ist eine Datei.",
  "keywords": [
    "fstab",
    "lsblk",
    "storage",
    "mount",
    "lvm",
    "dateisystem"
  ],
  "takeaways": [
    "Alles ist eine Datei – von Textdateien über Verzeichnisse bis hin zu Blockgeräten.",
    "Der Linux-Storage-Stack reicht von Hardware über Device-Files und LVM bis zum Mounting.",
    "Werkzeuge wie lsblk, gdisk, LVM-Kommandos und mkfs führen vom Rohgerät zum produktiven Mount."
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
      "title": "Das Kernprinzip: \"Alles ist eine Datei\"",
      "body": [
        "Um Linux-Storage zu meistern, müssen Sie zuerst die Kernphilosophie von Unix/Linux verstehen: **Alles ist eine Datei.**\n\n* Eine Textdatei ist eine Datei.\n* Ein Verzeichnis ist (intern) eine Datei, die auf andere Dateien verweist.\n* Ihre Maus ist eine Datei (z.B. `/dev/input/mouse0`).\n* Ihre Festplatte ist eine Datei (z.B. `/dev/sda`).\n* Eine Partition auf dieser Festplatte ist eine Datei (z.B. `/dev/sda1`).\n\nDiese Philosophie bedeutet, dass Sie mit denselben grundlegenden Werkzeugen (Lesen, Schreiben, I/O-Steuerung) mit fast allem im System interagieren können. Storage-Kompetenz ist das Verständnis, wie Linux diese \"Geräte-Dateien\" (Device Files) mit der physischen Realität und den Datenstrukturen (Dateisystemen) verbindet."
      ]
    },
    {
      "title": "Der Linux-Storage-Stack: Die Schichten der Abstraktion",
      "body": [
        "Kompetenz bedeutet, jede dieser Schichten und ihren Zweck zu kennen. Stellen Sie es sich wie einen Stapel (Stack) vor, von unten nach oben:\n\n### 1. Physische Schicht (Die Hardware) 🧱\nDas ist die reale Hardware:\n* **HDD** (Hard Disk Drive)\n* **SSD** (Solid State Drive)\n* **NVMe** (Non-Volatile Memory Express)\n\nFür Linux ist das zunächst nur \"Block-Speicher\" – ein Ort, an dem es Datenblöcke lesen und schreiben kann.\n\n### 2. Geräte-Dateien (Device Files)\nDer Kernel erkennt die Hardware und erstellt eine spezielle Datei im `/dev`-Verzeichnis, um sie darzustellen. Das ist die erste Abstraktion.\n* IDE/SATA-Laufwerke: `/dev/sda`, `/dev/sdb` (das 'a' ist die erste Festplatte, 'b' die zweite usw.).\n* NVMe-Laufwerke: `/dev/nvme0n1`, `/dev/nvme0n2`.\n\nSie können theoretisch direkt auf `/dev/sda` schreiben (z.B. mit `dd`), aber das würde alle Daten darauf zerstören. Es gibt noch keine Organisation.\n\n### 3. Partitionierung (Das Aufteilen)\nHier \"zerteilen\" Sie die rohe Geräte-Datei in logische Abschnitte, genannt Partitionen. Jede Partition erhält ihre eigene Geräte-Datei.\n* **Zweck:** Trennung von Anliegen (z.B. Betriebssystem in einer Partition, Benutzerdaten in einer anderen).\n* **Technologien:**\n    * **MBR (Master Boot Record):** Der alte Standard. Limitiert auf 4 primäre Partitionen und Laufwerke bis 2 TB.\n    * **GPT (GUID Partition Table):** Der moderne Standard. Erlaubt praktisch unbegrenzt viele Partitionen und riesige Laufwerksgrößen.\n* **Ergebnis:** Sie haben jetzt `/dev/sda1`, `/dev/sda2` usw. Dies sind immer noch \"rohe\" Blöcke, aber kleinere, voneinander getrennte Bereiche.\n* **Werkzeuge:** `fdisk`, `gdisk`, `parted`.\n\n### 4. Logisches Volume Management (LVM) (Die flexible Schicht) 🧩\nDies ist eine *optionale, aber für Server-Kompetenz entscheidende* Abstraktionsschicht *über* den Partitionen. LVM entkoppelt Ihre Dateisysteme von der physischen Hardware.\n\n* **Philosophie:** Betrachten Sie Speicher nicht als starre Partitionen, sondern als flexiblen \"Pool\".\n* **Komponenten:**\n    1.  **PV (Physical Volume):** Sie markieren eine Partition (z.B. `/dev/sda2`) als \"Physical Volume\", d.h. \"bereit für LVM\".\n    2.  **VG (Volume Group):** Sie fassen einen oder mehrere PVs zu einer \"Volume Group\" zusammen (z.B. \"vg_data\"). Dies ist Ihr Speicherpool. Sie können später einfach eine weitere Festplatte hinzufügen, sie als PV markieren und zur VG hinzufügen, um den Pool zu vergrößern.\n    3.  **LV (Logical Volume):** Aus diesem Pool \"schneiden\" Sie sich nun \"Logical Volumes\" (z.B. \"lv_home\" oder \"lv_web\"). Diese LVs verhalten sich wie Partitionen und bekommen ihre eigenen Geräte-Dateien (z.B. `/dev/mapper/vg_data-lv_home`).\n* **Der Vorteil:** Sie können ein LV im laufenden Betrieb vergrößern (oder verkleinern), ohne sich um die darunterliegenden physischen Festplatten Gedanken machen zu müssen. **Das ist der Kern von Enterprise-Storage-Flexibilität.**\n* **Werkzeuge:** `pvcreate`, `vgcreate`, `lvcreate`, `lvextend`, `lvresize`.\n\n### 5. Das Dateisystem (Die Organisation) 🗂️\nBis jetzt haben wir nur rohe Blöcke. Das Dateisystem ist die **Datenstruktur**, die Sie auf einer Partition (oder einem LV) erstellen. Es ist das \"Inhaltsverzeichnis\" oder das \"Regalsystem\" für Ihre Daten.\n\n* **Funktion:** Es verwaltet **Inodes** (Metadaten über eine Datei: wer besitzt sie, wann erstellt, wo sind die Datenblöcke) und die eigentlichen **Datenblöcke**.\n* **Journaling:** Moderne Dateisysteme (wie ext4, XFS) führen ein \"Journal\". Bevor eine Änderung geschrieben wird, wird sie im Journal vermerkt. Fällt der Strom aus, kann das System beim Neustart ins Journal schauen und die Operation sicher beenden oder rückgängig machen. Das verhindert Korruption.\n* **Werkzeug:** `mkfs` (Make Filesystem), z.B. `mkfs.ext4 /dev/sda1` oder `mkfs.xfs /dev/mapper/vg_data-lv_home`."
      ]
    },
    {
      "title": "Gängige Linux-Dateisysteme (Die Werkzeuge)",
      "body": [
        "| Dateisystem | Beschreibung & Kompetenz |\n| :--- | :--- |\n| **ext4** | Der **Standard** für die meisten Distributionen (Debian, Ubuntu). Äußerst stabil, zuverlässig und \"gut genug\" für fast alles. Es ist der Alleskönner. |\n| **XFS** | Der **Standard** in der Red Hat-Welt (RHEL, CentOS, Rocky). Exzellent bei sehr großen Dateien und hoher Parallelität. Sehr performant für Server-Workloads (Datenbanken, VMs). |\n| **Btrfs** | Das **moderne** \"Copy-on-Write\" (CoW) Dateisystem. Es integriert LVM-Funktionen (Volumes, Snapshots) und RAID direkt in das Dateisystem. **CoW** bedeutet, dass beim Ändern einer Datei der neue Block an eine freie Stelle geschrieben und erst *danach* der Zeiger aktualisiert wird. Dies macht Snapshots (sofortige \"Einfrierungen\" des Systems) extrem effizient. |\n| **ZFS** | Ähnlich wie Btrfs, aber älter und extrem robust. Es ist berühmt für seine Datenintegritäts-Features (Checksummen überall). Aufgrund von Lizenz-Unterschieden ist es meist nicht direkt im Linux-Kernel, aber sehr beliebt (z.B. via OpenZFS). |"
      ]
    },
    {
      "title": "Die letzten Schritte: VFS und Mounting",
      "body": [
        "Sie haben jetzt ein fertiges, formatiertes Dateisystem. Wie greift der Benutzer darauf zu?\n\n### 6. Virtual Filesystem (VFS)\nDas ist die \"geheime Zutat\" des Kernels. Das VFS ist eine Abstraktionsschicht, die es Ihren Programmen (wie `cp`, `mv`, `ls`) erlaubt, mit *jedem* Dateisystem auf dieselbe Weise zu sprechen.\n\nIhr `cp`-Befehl muss nicht wissen, ob er von ext4 auf XFS kopiert. Er spricht mit dem VFS, und das VFS übersetzt die Befehle für die spezifischen Dateisystem-Treiber.\n\n### 7. Mounting (Das Einhängen)\nDer letzte Schritt. Sie müssen Ihr Dateisystem in den globalen Verzeichnisbaum einhängen.\n* **Mount Point:** Sie erstellen ein leeres Verzeichnis (z.B. `mkdir /data`).\n* **Befehl:** `mount /dev/mapper/vg_data-lv_home /data`\n* **Ergebnis:** Ab sofort ist der Inhalt Ihres Dateisystems unter dem Pfad `/data` verfügbar. Das VFS leitet alle Anfragen an `/data` an Ihr Dateisystem weiter.\n* **Persistenz:** Damit dies einen Neustart überlebt, tragen Sie es in die Datei **/etc/fstab** (File System Table) ein. Diese Datei sagt dem System beim Booten, was wohin gemountet werden soll."
      ]
    },
    {
      "title": "Die Werkzeuge des Meisters (Storage-Kompetenz) 🔧",
      "body": [
        "Perfekte Kompetenz bedeutet, die richtigen Werkzeuge für die richtige Aufgabe zu kennen:\n\n* **Übersicht & Diagnose:**\n    * `lsblk`: **(Der wichtigste Befehl)** Zeigt die Block-Geräte in einer Baumstruktur an (Festplatte -> Partition -> LV).\n    * `df -h`: **(Disk Free)** Zeigt den *freien Speicherplatz* pro *gemountetem Dateisystem* an.\n    * `du -sh *`: **(Disk Usage)** Zeigt den *verwendeten Speicherplatz* von *Verzeichnissen* an.\n    * `fdisk -l` / `gdisk -l`: Listet Partitionstabellen auf.\n\n* **Einrichtung & Management:**\n    * `gdisk` / `fdisk`: Partitionen erstellen/löschen.\n    * `pvcreate`, `vgcreate`, `lvcreate`: LVM einrichten.\n    * `mkfs.ext4`, `mkfs.xfs`: Dateisysteme erstellen (Formatieren).\n    * `mount` / `umount`: Dateisysteme ein- und aushängen.\n    * Editor für `/etc/fstab`: Mounts permanent machen.\n\n* **Wartung:**\n    * `fsck`: **(Filesystem Check)** Repariert (un-gemountete!) Dateisysteme.\n    * `lvextend` / `resize2fs`: LVM-Volumes und ext4-Dateisysteme vergrößern. (XFS wird oft automatisch vergrößert)."
      ]
    },
    {
      "title": "Jenseits der lokalen Platte 🌐",
      "body": [
        "Wahre Kompetenz umfasst auch Netzwerkspeicher:\n\n* **NFS (Network File System):** Der \"native\" Weg, Verzeichnisse über das Netzwerk auf Linux/Unix-Systemen zu teilen. Es verhält sich (fast) wie ein lokales Dateisystem.\n* **Samba (SMB/CIFS):** Dient primär dazu, Speicher für Windows-Clients bereitzustellen oder auf Windows-Shares zuzugreifen."
      ]
    },
    {
      "title": "Fazit",
      "body": [
        "**Linux-Storage-Kompetenz** ist das Verständnis dieser Schichten. Es ist die Fähigkeit, eine leere Festplatte (`/dev/sdb`) in einen flexiblen, robusten und organisierten Speicherbereich (`/data`) zu verwandeln, der über LVM wachsen kann, durch ext4/XFS vor Korruption geschützt ist und über `/etc/fstab` jeden Neustart überlebt."
      ]
    },
    {
      "title": "Praxis-Szenario: Neue 100-GB-Platte für /var/www",
      "body": [
        "### Schritt 1: Erkundung (Was ist da?)\n\nZuerst sehen wir nach, wie das System die Festplatte sieht.\n\n```bash\n$ lsblk\nNAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda             8:0    0   50G  0 disk \n├─sda1          8:1    0    1G  0 part /boot\n└─sda2          8:2    0   49G  0 part /\nsdb             8:16   0  100G  0 disk  <-- Das ist unsere neue Festplatte!\n```\n\n**Kompetenz:** `lsblk` zeigt uns, dass `/dev/sdb` existiert, aber keine Partitionen (`part`) oder Mountpoints hat. Es ist ein \"rohes\" Block-Gerät.\n\n---\n\n### Schritt 2: Partitionierung (Das Aufteilen)\n\nWir erstellen eine einzige Partition auf `/dev/sdb`, die wir für LVM nutzen wollen. Wir verwenden `gdisk` für eine moderne GPT-Tabelle.\n\n```bash\n$ sudo gdisk /dev/sdb\n\nGPT fdisk (gdisk) version 1.0.8\n\n# Wir tippen 'n' für eine neue Partition\nCommand (? for help): n\nPartition number (1-128, default 1): 1\nFirst sector (34-209715166, default 34): [Enter]  (Start am Anfang)\nLast sector (34-209715166, default 209715166): [Enter] (Ende am Schluss, nutzt die ganze Platte)\nCurrent type is 'Linux filesystem'\nHex code or GUID (L to show codes, Enter = 8300): 8e00  <-- WICHTIG!\nChanged type of partition to 'Linux LVM'\n\n# Wir tippen 'w' um die Änderungen zu schreiben\nCommand (? for help): w\nFinal checks complete. Really write GPT partition table to disk? (Y/N): Y\nOK; writing new GUID partition table (GPT) to /dev/sdb.\nThe operation has completed successfully.\n```\n\n**Ergebnis:** Wir haben jetzt `/dev/sdb1`. Diese Partition ist speziell mit dem Typ \"Linux LVM\" (Code 8e00) markiert.\n\n```bash\n$ lsblk\nNAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda             8:0    0   50G  0 disk \n├─sda1          8:1    0    1G  0 part /boot\n└─sda2          8:2    0   49G  0 part /\nsdb             8:16   0  100G  0 disk \n└─sdb1          8:17   0  100G  0 part  <-- Unsere neue LVM-Partition\n```\n\n---\n\n### Schritt 3: LVM einrichten (Die flexible Schicht)\n\nJetzt nutzen wir die Partition `/dev/sdb1` und bauen unseren LVM-Stack auf.\n\n**3a. Physical Volume (PV) erstellen:**\nWir sagen LVM, dass es `/dev/sdb1` verwenden darf.\n\n```bash\n$ sudo pvcreate /dev/sdb1\n  Physical volume \"/dev/sdb1\" successfully created.\n```\n\n**3b. Volume Group (VG) erstellen:**\nWir erstellen einen Speicher-Pool (Volume Group) namens `vg_webdata` mit unserem PV.\n\n```bash\n$ sudo vgcreate vg_webdata /dev/sdb1\n  Volume group \"vg_webdata\" successfully created.\n```\n\n**3c. Logical Volume (LV) erstellen:**\nWir \"schneiden\" uns ein 50 GB großes Logical Volume (namens `lv_web`) aus unserem 100-GB-Pool. Den Rest heben wir für später auf.\n\n```bash\n$ sudo lvcreate -L 50G -n lv_web vg_webdata\n  Logical volume \"lv_web\" created.\n```\n\n**Ergebnis:** Wir haben jetzt ein neues \"virtuelles\" Gerät!\n\n```bash\n$ lsblk\nNAME                  MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda                     8:0    0   50G  0 disk \n├─sda1                  8:1    0    1G  0 part /boot\n└─sda2                  8:2    0   49G  0 part /\nsdb                     8:16   0  100G  0 disk \n└─sdb1                  8:17   0  100G  0 part \n  └─vg_webdata-lv_web 253:0    0   50G  0 lvm   <-- Hier ist es!\n```\n\nDas Gerät heißt `/dev/vg_webdata/lv_web` oder (synonym) `/dev/mapper/vg_webdata-lv_web`.\n\n---\n\n### Schritt 4: Dateisystem erstellen (Formatieren)\n\nWir formatieren unser neues LV mit dem XFS-Dateisystem, das gut für Server geeignet ist.\n\n```bash\n$ sudo mkfs.xfs /dev/vg_webdata/lv_web\nmeta-data=/dev/vg_webdata/lv_web isize=512    agcount=4, agsize=3276800 blks\n         =                       sectsz=512   attr=2, projid32bit=1\n         =                       crc=1        finobt=1, sparse=1, rmapbt=0\n         =                       reflink=1\ndata     =                       bsize=4096   blocks=13107200, imaxpct=25\n         =                       sunit=0      swidth=0 blks\nnaming   =version 2              bsize=4096   ascii-ci=0, ftype=1\nlog      =internal log           bsize=4096   blocks=6400, version=2\n         =                       sectsz=512   sunit=0 blks, lazy-count=1\nrealtime =none                   extsz=4096   blocks=0, rtextents=0\n```\n\n---\n\n### Schritt 5: Mounten (Das Einhängen)\n\nDas Dateisystem ist bereit. Wir hängen es jetzt in den Verzeichnisbaum ein.\n\n```bash\n# 1. Den Mount-Punkt erstellen (falls er nicht existiert)\n$ sudo mkdir -p /var/www\n\n# 2. Das Dateisystem einhängen\n$ sudo mount /dev/vg_webdata/lv_web /var/www\n```\n\n**Überprüfung:**\n\n```bash\n$ df -h\nFilesystem                    Size  Used Avail Use% Mounted on\n/dev/sda2                      49G   10G   39G  21% /\n/dev/sda1                     976M  105M  804M  12% /boot\n/dev/mapper/vg_webdata-lv_web  50G   33M   50G   1% /var/www  <-- Erfolg!\n```\n\n**Kompetenz:** `df -h` (Disk Free) zeigt uns den *gemounteten* Speicherplatz an. Wir sehen, dass unsere 50G jetzt unter `/var/www` verfügbar sind.\n\n---\n\n### Schritt 6: Persistenz (/etc/fstab)\n\nDamit der Mount den nächsten Neustart überlebt, tragen wir ihn in `/etc/fstab` ein. Wir verwenden die **UUID** (Unique ID) des Dateisystems, da sich Gerätenamen wie `/dev/sdb` ändern können.\n\n**6a. UUID finden:**\n\n```bash\n$ sudo blkid /dev/vg_webdata/lv_web\n/dev/vg_webdata/lv_web: UUID=\"a1b2c3d4-e5f6-7890-abcd-1234567890ab\" TYPE=\"xfs\" ...\n```\n\n**6b. /etc/fstab bearbeiten:**\nWir fügen (mit `sudo nano /etc/fstab` oder einem anderen Editor) diese Zeile am Ende hinzu:\n\n```\n# /etc/fstab\n... (andere Einträge) ...\n\n# Mount für Web-Daten\nUUID=a1b2c3d4-e5f6-7890-abcd-1234567890ab  /var/www  xfs  defaults  0  0\n```\n\n  * **UUID=...**: Identifiziert das Dateisystem.\n  * **/var/www**: Der Mount-Punkt.\n  * **xfs**: Der Dateisystem-Typ.\n  * **defaults**: Standard-Mount-Optionen (gut für 99% der Fälle).\n  * **0 0**: (Dump- und fsck-Reihenfolge - für XFS und ext4 ist 0 0 sicher).\n\n---\n\n### Schritt 7: Flexibilität zeigen (LVM vergrößern)\n\nEinige Monate später... Unsere Webseite wächst und die 50 GB werden knapp!\n\n```bash\n$ df -h\n...\n/dev/mapper/vg_webdata-lv_web  50G   48G    2G  97% /var/www  <-- ALARM!\n```\n\nKein Problem! Unsere Volume Group `vg_webdata` hat ja noch 50 GB frei (siehe Schritt 3c).\n\n**7a. Logical Volume (LV) vergrößern:**\nWir fügen dem LV `lv_web` 30 GB hinzu.\n\n```bash\n$ sudo lvextend -L +30G /dev/vg_webdata/lv_web\n  Size of logical volume vg_webdata-lv_web changed from 50.00 GiB (12800 extents) to 80.00 GiB (20480 extents).\n  Logical volume vg_webdata-lv_web successfully resized.\n```\n\n**7b. Dateisystem vergrößern:**\nDas LV ist jetzt 80 GB groß, aber das XFS-Dateisystem *darauf* weiß das noch nicht (es denkt immer noch, es hat 50 GB).\n\n```bash\n$ df -h\n...\n/dev/mapper/vg_webdata-lv_web  50G   48G    2G  97% /var/www  <-- Immer noch 50G!\n```\n\nWir müssen das Dateisystem anweisen, sich den neuen Platz zu nehmen. Dies geht bei XFS im laufenden Betrieb.\n\n```bash\n# Bei XFS:\n$ sudo xfs_growfs /var/www\nmeta-data=/dev/mapper/vg_webdata-lv_web isize=512    agcount=4, agsize=3276800 blks\n         = ...\ndata     = ... bsize=4096   blocks=13107200, imaxpct=25\n         = ...\nblocks=20971520, imaxpct=25\n...\ndata blocks changed from 13107200 to 20971520\n\n# (Bei ext4 wäre der Befehl: sudo resize2fs /dev/vg_webdata/lv_web)\n```\n\n**Ergebnis:**\n\n```bash\n$ df -h\n...\n/dev/mapper/vg_webdata-lv_web  80G   48G   32G  61% /var/www  <-- PERFEKT!\n```\n\nWir haben den Speicher im laufenden Betrieb von 50 GB auf 80 GB erweitert, ohne einen Neustart und ohne Datenmigration. **Das** ist LVM-Kompetenz."
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
