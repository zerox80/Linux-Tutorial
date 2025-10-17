const moduleData = {
  "id": "foundations",
  "pillar": "Fundament",
  "title": "Linux-DNA & Philosophie",
  "level": "Einsteiger",
  "estimated": 35,
  "focus": [
    "foundation",
    "ops"
  ],
  "summary": "Tauche in die DNA von Linux ein: Vom Monolith-Kernel ueber GNU-Userland bis zur Community-Governance. Du lernst, warum Freiheit und Kollaboration zentrale Designprinzipien sind, wie Distributionen Entscheidungen verhandeln und welche Werte in Manifesten, Lizenzen und Roadmaps verankert sind.",
  "keywords": [
    "kernel",
    "distribution",
    "opensource",
    "gnu",
    "community"
  ],
  "takeaways": [
    "Du erklaerst, wie Kernel, Init-System und Userland zusammenspielen und wer Entscheidungen verantwortet.",
    "Du interpretierst Release-Modelle (Rolling, LTS, Stable) und argumentierst passende Einsatzszenarien.",
    "Du analysierst Governance-Modelle von Debian, Fedora, Arch & Co. inklusive Community-Mechanismen.",
    "Du identifizierst hochwertige Quellen fuer Self-Service-Loesungen und bewertest deren Vertrauenswuerdigkeit.",
    "Du formulierst deine eigene Lernphilosophie samt Prinzipien fuer nachhaltige Open-Source-Beitraege."
  ],
  "commands": [
    {
      "label": "Systeminventur",
      "command": "hostnamectl\n. /etc/os-release && printf \"ID=%s\\nVARIANT=%s\\nSUPPORT=%s\\n\" \"$ID\" \"${VARIANT:-n/a}\" \"${SUPPORT_URL:-n/a}\"",
      "description": "Pruefe Kernel, Architektur, Hersteller und Support-Kanale auf einen Blick.",
      "tags": [
        "Inventur",
        "Setup",
        "Philosophie"
      ]
    },
    {
      "label": "Kernel-Module scannen",
      "command": "lsmod | head -n 10\nmodinfo $(lsmod | awk 'NR==2{print $1}')",
      "description": "Gewinne Einblick in aktive Treiber, Maintainer-Infos und Lizenztexte im Kernel-Kosmos.",
      "tags": [
        "Kernel",
        "Hardware",
        "Analyse"
      ]
    },
    {
      "label": "Init-Philosophie pruefen",
      "command": "ps -p 1 -o comm=\nreadlink /sbin/init 2>/dev/null || realpath /sbin/init",
      "description": "Ermittle, ob systemd, OpenRC, runit oder ein anderer Init-Prozess die Boot-Philosophie bestimmt.",
      "tags": [
        "Init",
        "Architektur"
      ]
    },
    {
      "label": "Release-Kanal kartieren",
      "command": "grep -E '^(ID|VERSION|VERSION_CODENAME|VARIANT)=' /etc/os-release",
      "description": "Diskutiere anhand offizieller Metadaten Rolling- vs. LTS-Strategien und ihre Auswirkungen.",
      "tags": [
        "Distribution",
        "Governance"
      ]
    },
    {
      "label": "Maintainer entdecken",
      "command": "apt show coreutils 2>/dev/null | grep -E 'Maintainer|Homepage' || pacman -Si coreutils 2>/dev/null | grep -E 'Packager|URL' || rpm -qi coreutils 2>/dev/null | grep -E 'Vendor|URL'",
      "description": "Vergleiche Maintainer-Modelle unterschiedlicher Paketquellen und reflektiere Verantwortungsketten.",
      "tags": [
        "Community",
        "Paketmanagement",
        "Recherche"
      ]
    }
  ],
  "explanation": [
    {
      "title": "Was steckt hinter der Linux-DNA?",
      "body": [
        "Linux ist weniger ein einzelnes Produkt als ein Baukasten mit klaren Schnittstellen. Der Kernel bildet das Herz, aber ohne das GNU-Userland, Libraries wie glibc und das Init-System waere kein alltagstaugliches Betriebssystem moeglich.",
        "Distributionen kuratieren diesen Baukasten: Sie entscheiden, welche Kernel-Version gepflegt wird, welche Paketmanager Standards setzen und welche Haltung zu proprietaerer Software vertreten wird. Diese Entscheidungen spiegeln Werte wie Offenheit, Pragmatismus oder Stabilitaet.",
        "Wenn du verstehst, wie diese Bausteine ineinandergreifen, erkennst du schnell, ob eine Distribution zu deinem Projektrahmen passt und kannst erklaeren, warum bestimmte Defaults gewaehlt wurden."
      ]
    },
    {
      "title": "Philosophie zwischen Freiheit und Verantwortung",
      "body": [
        "Linux steht in der Tradition der Free-Software-Bewegung: Freiheit, Code zu studieren, zu veraendern und zu teilen, ist kein Bonus, sondern Kernprinzip. Licenzen wie GPL oder LGPL sichern diese Freiheiten juristisch ab.",
        "Gleichzeitig haben sich pragmatische Stroemungen etabliert, die auf Nutzwert und schnelle Iterationen achten (z. B. Open-Source-Definition der OSI). Distributionen positionieren sich entlang dieses Spektrums und bauen Governance-Strukturen auf, um Konflikte zu moderieren.",
        "Philosophie heisst hier: Welche Regelwerke, Kodizes und Communities gestalten die Zukunft des Projekts? Wer entscheidet ueber Roadmaps, Security-Fixes und Richtlinien? Deine Aufgabe ist es, diese Mechanismen zu erkennen und deren Auswirkungen einzuordnen."
      ]
    },
    {
      "title": "Community-Mechanismen verstehen",
      "body": [
        "Projekt-Governance reicht von basisdemokratischen Modellen (Debian) bis zu stark kuratierten Strukturen (Fedora, SUSE). Maintainer fungieren als Torwaechter fuer Pakete, legen Review-Prozesse fest und koordinieren Releases.",
        "Issue-Tracker, Mailinglisten und Request-for-Comments-Formate dokumentieren Entscheidungen. Durch das Lesen dieser Quellen lernst du, wie technische Diskussionen gefuehrt werden und welche Argumentationslinien ueberzeugen.",
        "Jede Community besitzt implizite Normen: Netiquette, Code of Conduct, Eskalationspfade. Wer sie kennt, kann sicher Feedback geben, Pull-Requests argumentieren und Konflikte produktiv loesen."
      ]
    },
    {
      "title": "Deine Rolle definieren",
      "body": [
        "Setze dich bewusst mit deiner Motivation auseinander: Willst du Systeme stabil betreiben, Innovation beschleunigen oder Fairness im digitalen Raum staerken? Diese Leitfrage praegt, welche Distribution, Tools und Communities du priorisierst.",
        "Dokumentiere Lernziele in Iterationen (z. B. Wochen-Sprints) und formuliere Kriterien, die deinen Fortschritt sichtbar machen. Verbinde Messbares (z. B. gelesene RFCs, getestete Kernel-Features) mit Reflexion (z. B. Lessons Learned, Community-Beobachtungen).",
        "Halte fest, wie du Wissen teilst: Blogposts, interner Chat, Brown-Bag-Sessions oder Pull-Requests. Linux lebt davon, dass Lernende ihr Wissen wieder zurueck in die Community tragen."
      ]
    }
  ],
  "missions": [
    "Skizziere deine Lernziele inklusive Leitmotiven (Freiheit, Sicherheit, Offenheit) und verknuepfe sie mit konkreten Zeitbloecken.",
    "Erstelle eine Stammbaum-Grafik mit mindestens drei Linux-Familien und ordne jeweils Governance, Paketmanager und Release-Kanal zu.",
    "Kuratiere ein persoenliches Quellenverzeichnis (ArchWiki, Fedora Docs, Kernel-Newbies, Producing OSS) und kennzeichne Vertrauensstufen.",
    "Formuliere ein persoenliches Manifest: Welche Philosophie bringst du in Projekte ein und welche Erwartungen hast du an Communities?"
  ],
  "resources": [
    {
      "label": "Kernel Docs Quick Start",
      "url": "https://docs.kernel.org/admin-guide/quick-start.html"
    },
    {
      "label": "Open Source Guides",
      "url": "https://opensource.guide/"
    },
    {
      "label": "GNU Philosophy Essays",
      "url": "https://www.gnu.org/philosophy/philosophy.html"
    },
    {
      "label": "Producing Open Source Software",
      "url": "https://producingoss.com/"
    },
    {
      "label": "Linux Foundation Training Blog",
      "url": "https://training.linuxfoundation.org/blog/"
    },
    {
      "label": "Kernel Process Documentation",
      "url": "https://docs.kernel.org/process/"
    }
  ]
};

export default moduleData;
