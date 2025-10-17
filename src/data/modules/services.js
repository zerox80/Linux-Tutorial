const moduleData = {
  "id": "services",
  "pillar": "Betrieb",
  "title": "Systemd, Dienste & Observability",
  "level": "Fortgeschritten",
  "estimated": 55,
  "focus": [
    "ops",
    "automation"
  ],
  "summary": "Betreibe Services zuverlaessig, nutze Timer als Cron-Ersatz und behalte Logs im Blick.",
  "keywords": [
    "systemd",
    "journalctl",
    "timer",
    "logging"
  ],
  "takeaways": [
    "Du managst Services mit systemctl und verstehst Unit-Typen.",
    "Du analysierst Logs gezielt mit journalctl Filtern.",
    "Du planst wiederkehrende Tasks mit systemd Timern."
  ],
  "commands": [
    {
      "label": "Service-Status",
      "command": "systemctl status nginx --no-pager",
      "description": "Pruefe Health-Informationen eines Dienstes.",
      "tags": [
        "Monitoring"
      ]
    },
    {
      "label": "Timer-Check",
      "command": "systemctl list-timers --all | head",
      "description": "Sieh geplante Jobs auf einen Blick.",
      "tags": [
        "Automation"
      ]
    }
  ],
  "missions": [
    "Baue eine eigene systemd Unit inkl. Service und Timer.",
    "Definiere einen Incident-Runbook-Abschnitt fuer einen kritischen Dienst."
  ],
  "resources": [
    {
      "label": "systemd Best Practices",
      "url": "https://www.freedesktop.org/wiki/Software/systemd/BestPractices/"
    },
    {
      "label": "Journalctl Cheatsheet",
      "url": "https://access.redhat.com/sites/default/files/attachments/20150325_systemd.pdf"
    }
  ]
};

export default moduleData;
