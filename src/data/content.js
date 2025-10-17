export { modules } from './modules/index.js';

export const focusModes = [
  {
    id: 'foundation',
    label: 'Solides Fundament',
    badge: 'Starter',
    description: 'Konzentriert sich auf die essenziellen Grundlagen fuer den Wechsel von Windows oder macOS.',
    includes: ['foundations', 'distros', 'filesystem', 'shell'],
    promise: 'Nach einer Woche kennst du die wichtigsten Werkzeuge und weisst, wie du weiterlernst.'
  },
  {
    id: 'ops',
    label: 'Operations Ready',
    badge: 'Ops',
    description: 'Vertieft Betrieb, Paketverwaltung und Service-Management fuer Admin-Aufgaben.',
    includes: ['filesystem', 'shell', 'users', 'packages', 'services', 'network'],
    promise: 'Du kannst produktive Systeme betreiben und dokumentierte Runbooks erstellen.'
  },
  {
    id: 'security',
    label: 'Security & Compliance',
    badge: 'Shield',
    description: 'Fokussiert auf Zugriffskontrolle, Hardening und Backup-Strategien.',
    includes: ['users', 'network', 'security'],
    promise: 'Reduziert Angriffsflaechen und etabliert pruefbare Sicherheits-Policies.'
  },
  {
    id: 'automation',
    label: 'Automation & Scale',
    badge: 'Auto',
    description: 'Ideal fuer DevOps-Rollen: Services automatisieren, Observability etablieren.',
    includes: ['shell', 'packages', 'services', 'automation'],
    promise: 'Du baust reproduzierbare Deployments und skalierst Infrastruktur sicher.'
  }
];

export const quickWins = [
  {
    title: 'SSH-Zugang verhaerten',
    time: '10 Min',
    steps: [
      'Deaktiviere Passwort-Login in /etc/ssh/sshd_config.',
      'Aktiviere Public-Key-Authentifizierung und pruefe mit sshd -T.',
      'Reload mit systemctl reload sshd und teste mit neuem Terminal.'
    ]
  },
  {
    title: 'Crash-Konsolenprotokoll sichern',
    time: '7 Min',
    steps: [
      'Nutze journalctl -b -1 fuer vorherigen Boot.',
      'Exportiere Kerninformationen via journalctl -b -1 -p 3..0.',
      'Speichere Logs mit sudo journalctl -b -1 > ~/crash.log.'
    ]
  },
  {
    title: 'Temp-Verzeichnisse aufraeumen',
    time: '5 Min',
    steps: [
      'Analysiere Groesse mit sudo du -sh /tmp /var/tmp.',
      'Aktiviere systemd-tmpfiles-clean.timer falls deaktiviert.',
      'Lege Regeln in /etc/tmpfiles.d/custom.conf an.'
    ]
  },
  {
    title: 'Netzwerk-Latenz debuggen',
    time: '12 Min',
    steps: [
      'Vergleiche traceroute und mtr Ergebnisse.',
      'Nutze ss -pti fuer Socket-Details.',
      'Logge Paketverluste innerhalb von 5 Minuten mit ping -i 0.5.'
    ]
  }
];

export const milestoneBadges = [
  {
    id: 'ops-ready',
    title: 'Ops Ready',
    description: 'Du kannst Services betreiben, Updates planen und Zwischenfaelle dokumentieren.',
    criteria: [
      'Mindestens zwei produktive Timer oder Services geschrieben.',
      'Runbook mit Eskalationspfad vorhanden.',
      'Updates plus Rollback-Test erfolgreich dokumentiert.'
    ]
  },
  {
    id: 'security-champion',
    title: 'Security Champion',
    description: 'Deine Systeme bestehen Basis-Audits und wiederherstellbare Backups sind geprueft.',
    criteria: [
      'Fail2ban oder aehnliches Intrusion-Tool konfiguriert.',
      'Backup-Restore-Protokoll mit Screenshots erstellt.',
      'Kontinuierliche Ueberwachung sensibler Logs eingerichtet.'
    ]
  },
  {
    id: 'automation-architect',
    title: 'Automation Architect',
    description: 'Deployments laufen reproduzierbar und Observability liefert Handlungsempfehlungen.',
    criteria: [
      'Ansible- oder Terraform-Playbook im Git-Repo versioniert.',
      'CI-Testlauf automatisiert Syntax und Linting.',
      'Dashboards fuer Metriken, Logs und Alerts vorhanden.'
    ]
  }
];

export const learningTracks = [
  {
    id: 'fast-track',
    title: '7-Tage-Schnelleinstieg',
    audience: 'Wechslerinnen und Wechsler von Windows oder macOS',
    cadence: 'Taeglich 45 Minuten',
    focus: 'foundation',
    modules: ['foundations', 'distros', 'filesystem', 'shell', 'packages', 'users', 'services'],
    deliverable: 'Setze eine VM auf, sichere SSH und deploye einen Webserver inklusive Dokumentation.'
  },
  {
    id: 'ops-pro',
    title: '14-Tage-Admin-Track',
    audience: 'Angehende Administratorinnen, Administratoren und DevOps',
    cadence: 'Taeglich 60-75 Minuten',
    focus: 'ops',
    modules: ['filesystem', 'shell', 'users', 'packages', 'services', 'network', 'security'],
    deliverable: 'Betreibe zwei Rollen (Web plus Datenbank) mit Runbooks, Monitoring und Recovery-Test.'
  },
  {
    id: 'automation-lab',
    title: '30-Tage-Automation-Lab',
    audience: 'SRE- und Plattform-Teams',
    cadence: '3 Sessions pro Woche a 90 Minuten',
    focus: 'automation',
    modules: ['services', 'network', 'security', 'automation'],
    deliverable: 'Infrastructure-as-Code Projekt mit CI/CD Pipeline und Observability-Dashboard.'
  }
];

export const cheatSheetBlocks = [
  {
    title: 'Navigation & Dateien',
    entries: [
      { cmd: 'pwd', description: 'Zeigt das aktuelle Arbeitsverzeichnis.' },
      { cmd: 'ls -alh', description: 'Listet Dateien inklusive Rechte und Groessen.' },
      { cmd: 'find . -maxdepth 2 -type f -mtime -1', description: 'Neue Dateien der letzten 24h finden.' },
      { cmd: 'tar czf backup.tgz ~/projekt', description: 'Projektverzeichnis schnell sichern.' }
    ]
  },
  {
    title: 'Services & Prozesse',
    entries: [
      { cmd: 'systemctl list-units --type=service --failed', description: 'Zeigt fehlgeschlagene Dienste.' },
      { cmd: 'journalctl -xe', description: 'Letzte kritische Logs lesen.' },
      { cmd: 'htop', description: 'Interaktive Prozessuebersicht (installieren falls noetig).' },
      { cmd: 'ps aux --sort=-%mem | head', description: 'Speicherhungrige Prozesse aufdecken.' }
    ]
  },
  {
    title: 'Netzwerk & Security',
    entries: [
      { cmd: 'nmcli device status', description: 'Status aller Netzwerkgeraete pruefen.' },
      { cmd: 'sudo tcpdump -nn -i eth0 port 443', description: 'SSL-Traffic debuggen.' },
      { cmd: 'fail2ban-client status sshd', description: 'Blockierte IPs anzeigen.' },
      { cmd: 'gpg --full-generate-key', description: 'Neues GPG-Schluesselpaar erstellen.' }
    ]
  },
  {
    title: 'Automation & DevOps',
    entries: [
      { cmd: 'ansible-inventory --graph', description: 'Inventarstruktur visualisieren.' },
      { cmd: 'terraform plan', description: 'Aenderungen an Infrastruktur simulieren.' },
      { cmd: 'promtool check config prometheus.yml', description: 'Prometheus-Konfiguration validieren.' },
      { cmd: 'kubectl get pods -A', description: 'Ueberblick ueber alle Kubernetes-Pods (falls vorhanden).' }
    ]
  }
];

export const faqItems = [
  {
    question: 'Wie tracke ich meinen Fortschritt?',
    answer: 'Arbeite mit Wochenzielen: Lege Module pro Woche fest, notiere Praxisaufgaben und hake sie taeglich ab. Nutze Git oder Notion fuer Lernjournale.'
  },
  {
    question: 'Welche Hardware eignet sich zum Ueben?',
    answer: 'Eine VM (VirtualBox, GNOME Boxes) reicht. Fuer Server-Szenarien eignet sich ein altes Notebook oder ein Cloud-Server mit Snapshot-Funktion.'
  },
  {
    question: 'Wie halte ich mein Wissen aktuell?',
    answer: 'Abonniere Release-Notes deiner Distribution, lies RSS-Feeds (LWN, Fedora Magazine) und plane monatliche Update-Sessions mit Changelog-Review.'
  },
  {
    question: 'Welche Zertifikate passen zu diesem Kurs?',
    answer: 'Fuer Einsteigerinnen und Einsteiger eignen sich LPI Linux Essentials oder CompTIA Linux+. Admins fokussieren Red Hat RHCSA oder LFCS.'
  }
];

export const scenarioDeck = [
  {
    title: 'Incident: Webserver 503',
    difficulty: 'Fortgeschritten',
    context: 'Nach einem Update liefert der Webserver 503. Logs sind unuebersichtlich, Dienst laeuft angeblich.',
    objectives: [
      'Identifiziere die fehlerhafte Unit oder Abhaengigkeit.',
      'Fuehre einen Rollback oder Hotfix durch.',
      'Dokumentiere die Lessons Learned im Runbook.'
    ],
    hints: [
      'Nutze systemctl list-dependencies nginx.',
      'Pruefe SELinux oder AppArmor Logs.',
      'Teste mit curl --resolve ob DNS oder Loadbalancer beteiligt sind.'
    ]
  },
  {
    title: 'Audit: Compliance-Check in 90 Minuten',
    difficulty: 'Experte',
    context: 'Ein Auditor kuendigt einen kurzfristigen Check an. Du musst Nachweise liefern.',
    objectives: [
      'Exportiere Benutzer- und Gruppenrichtlinien.',
      'Weise Backups, Monitoring und Incident-Playbooks nach.',
      'Praesentiere einen Security-Report mit Handlungsempfehlungen.'
    ],
    hints: [
      'Nutze getfacl -R fuer kritische Pfade.',
      'Generiere einen Audit-Bericht mit ausearch oder aureport.',
      'Fuege Screenshots von Dashboards oder Logs hinzu.'
    ]
  }
];

export const deepDiveResources = [
  {
    label: 'The Linux Command Line (TLCL)',
    description: 'Kostenloses Buch fuer Shell-Vertiefung mit Uebungen.',
    url: 'https://linuxcommand.org/tlcl.php'
  },
  {
    label: 'ArchWiki Task List',
    description: 'Konkrete How-Tos fuer fortgeschrittene Themen, distributionsunabhaengig nutzbar.',
    url: 'https://wiki.archlinux.org/title/General_recommendations'
  },
  {
    label: 'Reddit r/linuxadmin Weekly Thread',
    description: 'Community-Fragen und Troubleshooting-Ideen zum Mitmachen.',
    url: 'https://www.reddit.com/r/linuxadmin/'
  },
  {
    label: 'Awesome Observability',
    description: 'Kuratiertes Verzeichnis zu Monitoring- und Logging-Tools.',
    url: 'https://github.com/cncf/awesome-observability'
  }
];


