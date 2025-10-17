const moduleData = {
  "id": "distros",
  "pillar": "Fundament",
  "title": "Distributionen strategisch waehlen",
  "level": "Einsteiger",
  "estimated": 30,
  "focus": [
    "foundation"
  ],
  "summary": "Vergleiche LTS, Rolling Release und Enterprise-Varianten und finde deine passende Testumgebung.",
  "keywords": [
    "debian",
    "ubuntu",
    "fedora",
    "arch",
    "manjaro"
  ],
  "takeaways": [
    "Du verstehst Paketformate (deb, rpm, tar.zst) und deren Vor- und Nachteile.",
    "Du kennst Update-Strategien und wie du Risiken einschaetzt.",
    "Du kannst Live-Systeme bewerten und Installer vergleichen."
  ],
  "explanation": [
    {
      "title": "Warum Strategie zaehlt",
      "body": [
        "Das ist eine hervorragende Frage: Die strategische Wahl einer Distribution entscheidet, wie reibungslos dein Linux-Einstieg verlaeuft.",
        "Es gibt keine perfekte Distribution, sondern nur die passende fuer einen konkreten Zweck. Eine gute Entscheidung basiert auf technischen und philosophischen Unterschieden statt auf Hype oder Optik.",
        "Eine strategische Auswahl fokussiert auf harte Kriterien wie Release-Modell, Paket-Oekosystem, Ausrichtung der Distribution und das Standard-Desktop-Erlebnis."
      ]
    },
    {
      "title": "Faktor 1: Release-Modell",
      "body": [
        "Point-Release (stabil): Du erhaeltst alle 6 bis 24 Monate eine getestete Version. Idealer Einsatz fuer Server, Einsteigerinnen und Buero-Setups, die Ruhe vor grossen Aenderungen brauchen.",
        "Rolling-Release (aktuell): Pakete fliessen kontinuierlich ein, du hast immer neue Treiber und Features. Ideal fuer moderne Hardware, Gaming und Power-User, birgt aber ein hoeheres Risiko fuer Update-Ueberraschungen.",
        "Semi-Rolling: Distributionen wie Fedora liefern halbjaehrlich frische, aber stabilisierte Releases und bilden einen Kompromiss zwischen Aktualitaet und Ruhe."
      ]
    },
    {
      "title": "Faktor 2: Paketfamilie",
      "body": [
        "Die Familienstruktur entscheidet, wie du Software installierst und welche Communities du anzapfst.",
        "Debian-basiert (apt): Debian, Ubuntu, Linux Mint oder Pop!_OS bieten riesige Repositories, viele Tutorials und hohe Kompatibilitaet.",
        "Red Hat-basiert (dnf oder zypper): Fedora, RHEL, AlmaLinux und openSUSE liefern Security-Features wie SELinux und setzen Standards in Enterprise-Umgebungen.",
        "Arch-basiert (pacman plus AUR): Arch, EndeavourOS und Manjaro sind minimalistisch, schnell und ueber das AUR nahezu grenzenlos erweiterbar."
      ]
    },
    {
      "title": "Faktor 3: Philosophie",
      "body": [
        "Einsteigerfreundlich: Distributionen wie Linux Mint, Pop!_OS oder Ubuntu verfolgen das Motto It just works und liefern Treiber, Codecs und App-Stores direkt mit.",
        "Do It Yourself: Arch Linux, Gentoo oder eine Debian-Netinstall geben dir volle Kontrolle, erwarten aber Terminal-Kompetenz und Eigenverantwortung.",
        "Stabilitaet und Sicherheit: Debian Stable, Ubuntu Server LTS oder AlmaLinux fokussieren sich auf verlaesslichen Betrieb, planbare Wartung und lange Supportzyklen.",
        "Anonymitaet und Spezialfaelle: Tails oder Qubes OS priorisieren Privacy, Isolation und ausgefallene Sicherheitsanforderungen."
      ]
    },
    {
      "title": "Faktor 4: Desktop-Umgebung",
      "body": [
        "Standard-Desktops sind optimiert, aber austauschbar. Trotzdem praegen sie Workflows und Ressourcenverbrauch.",
        "GNOME setzt auf Minimalismus und Tastaturkuerzel (Ubuntu, Fedora). KDE Plasma wirkt vertraut fuer Windows-Umsteigerinnen und ist extrem anpassbar.",
        "Cinnamon oder MATE bieten klassische Panels fuer Einsteiger, XFCE bleibt leichtgewichtig fuer aeltere Hardware. Du kannst spaeter jederzeit wechseln."
      ]
    },
    {
      "title": "Strategische Nutzerprofile",
      "body": [
        "Einsteiger oder Umsteiger waehlen Linux Mint Cinnamon, Ubuntu LTS oder Pop!_OS fuer Stabilitaet und schnelle Erfolgserlebnisse.",
        "Entwicklerinnen greifen zu Fedora Workstation, Arch Linux oder openSUSE Tumbleweed, um aktuelle Toolchains und Container-Stacks zu nutzen.",
        "Server-Administratoren setzen auf Debian Stable, Ubuntu Server LTS oder AlmaLinux, um 24x7-Betrieb mit langem Support abzudecken.",
        "Gamer priorisieren Pop!_OS, Fedora oder EndeavourOS, weil moderne Kernel und Grafiktreiber fuer Steam und Proton essenziell sind.",
        "Bastler und Power-User greifen zu Arch Linux, Gentoo oder einer schlanken Debian-Installation, um Systeme von Grund auf zu gestalten."
      ]
    },
    {
      "title": "Validierung vor der Installation",
      "body": [
        "Teste Favoriten in einer virtuellen Maschine und pruefe Paketmanager, Installer und Standard-Workflows innerhalb weniger Stunden.",
        "Nutze Live-USBs, um Hardware wie WLAN, Bluetooth und Grafik ohne Risiko zu validieren, bevor du etwas installierst.",
        "Wenn die Tests passen, dokumentiere Learnings, sichere Backups und plane deine finale Installation mit Rollback-Option."
      ]
    }
  ],
  "commands": [
    {
      "label": "Release-Fakten",
      "command": "cat /etc/os-release | grep -E 'NAME|VERSION|HOME_URL'",
      "description": "Lies wichtige Distributor-Informationen sofort aus.",
      "tags": [
        "Inventur"
      ]
    },
    {
      "label": "Repository-Transparenz",
      "command": "grep -h ^deb /etc/apt/sources.list /etc/apt/sources.list.d/*.list",
      "description": "Pruefe, welche Paketquellen aktiv sind.",
      "tags": [
        "Paketverwaltung"
      ]
    }
  ],
  "missions": [
    "Teste zwei Distributionen als Live-System und dokumentiere Installer, Paketmanager und Standardsoftware.",
    "Bewerte die Community-Dokumentation nach Aktualitaet und Tiefe."
  ],
  "resources": [
    {
      "label": "DistroWatch Uebersicht",
      "url": "https://distrowatch.com/"
    },
    {
      "label": "Fedora Magazine",
      "url": "https://fedoramagazine.org/"
    }
  ]
};

export default moduleData;
