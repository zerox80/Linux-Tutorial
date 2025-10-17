const moduleData = {
  "id": "users",
  "pillar": "Sicherheit",
  "title": "Benutzer, Gruppen & Policies",
  "level": "Fortgeschritten",
  "estimated": 45,
  "focus": [
    "ops",
    "security"
  ],
  "summary": "Setze granulare Rechte, verstehe PAM-Module und dokumentiere Zugriffsstrategien.",
  "keywords": [
    "sudo",
    "acl",
    "pam",
    "policies"
  ],
  "takeaways": [
    "Du modellierst Rollen mit klassischen Rechten und ACLs.",
    "Du sicherst sudo-Regeln mit Principle of Least Privilege.",
    "Du integrierst Audit-Mechanismen wie faillock oder pam_tally2."
  ],
  "commands": [
    {
      "label": "Rechte-Snapshot",
      "command": "stat -c '%A %U %G %n' /var/log/auth.log",
      "description": "Analysiere Berechtigungen einer sensiblen Datei.",
      "tags": [
        "Compliance"
      ]
    },
    {
      "label": "ACL-Haertung",
      "command": "sudo setfacl -m u:deploy:rwx /srv/app",
      "description": "Gewaehr zielgerichteten Zugriff via ACL.",
      "tags": [
        "Security"
      ]
    }
  ],
  "missions": [
    "Lege einen dedizierten Admin-Account an und definiere sudo-Regeln.",
    "Teste ACLs mit mindestens zwei Rollen und dokumentiere Ergebnisse."
  ],
  "resources": [
    {
      "label": "sudoers Referenz",
      "url": "https://www.sudo.ws/docs/man/sudoers.man/"
    },
    {
      "label": "Red Hat PAM Guide",
      "url": "https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html-single/securing_networks/index#assembly_configuring-authentication-with-pluggable-authentication-modules_pam"
    }
  ]
};

export default moduleData;
