const moduleData = {
  "id": "security",
  "pillar": "Sicherheit",
  "title": "Hardening & Backup-Strategien",
  "level": "Experte",
  "estimated": 60,
  "focus": [
    "security"
  ],
  "summary": "Plane Backups, setze Audit-Tools ein und schliesse gaengige Angriffsvektoren.",
  "keywords": [
    "selinux",
    "apparmor",
    "backup",
    "auditd",
    "fail2ban"
  ],
  "takeaways": [
    "Du aktivierst Mandatory Access Control (SELinux/AppArmor) zielgerichtet.",
    "Du baust Monitoring fuer Authentifizierungsversuche auf.",
    "Du definierst Disaster-Recovery-Playbooks inklusive Restore-Tests."
  ],
  "commands": [
    {
      "label": "SELinux Kontext",
      "command": "sestatus\nls -Z /var/www/html",
      "description": "Pruefe SELinux-Modus und Dateikontexte.",
      "tags": [
        "Security"
      ]
    },
    {
      "label": "Backup-Check",
      "command": "sudo systemctl status backup.timer",
      "description": "Stelle sicher, dass Backups planmaessig laufen.",
      "tags": [
        "Resilience"
      ]
    }
  ],
  "missions": [
    "Implementiere fail2ban oder sshguard und simuliere Fehlversuche.",
    "Fuehre einen Full-Restore-Test deines wichtigsten Backups durch."
  ],
  "resources": [
    {
      "label": "SELinux Project",
      "url": "https://selinuxproject.org/page/Main_Page"
    },
    {
      "label": "Backup Best Practices",
      "url": "https://wiki.archlinux.org/title/Backup"
    }
  ]
};

export default moduleData;
