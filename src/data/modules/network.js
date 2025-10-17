const moduleData = {
  "id": "network",
  "pillar": "Betrieb",
  "title": "Netzwerk & Remote-Zugriff",
  "level": "Fortgeschritten",
  "estimated": 45,
  "focus": [
    "ops",
    "security"
  ],
  "summary": "Konfiguriere Netzwerkprofile, sichere SSH, ueberwache Ports und Troubleshoote Latenzen.",
  "keywords": [
    "ssh",
    "firewall",
    "nmtui",
    "netplan",
    "tcpdump"
  ],
  "takeaways": [
    "Du verwaltest Connections mit NetworkManager oder netplan.",
    "Du haertest SSH und setzt Port-Forwarding sicher ein.",
    "Du analysierst Netzwerkpfade mit ss, traceroute und tcpdump."
  ],
  "commands": [
    {
      "label": "Firewall-Policy",
      "command": "sudo firewall-cmd --list-all",
      "description": "Schneller Ueberblick ueber aktive Firewalld-Regeln.",
      "tags": [
        "Security"
      ]
    },
    {
      "label": "Verbindungen pruefen",
      "command": "ss -tulpn | head",
      "description": "Liste offene Ports und zugehoerige Prozesse.",
      "tags": [
        "Troubleshooting"
      ]
    }
  ],
  "missions": [
    "Richte SSH-Schluessel und agent forwarding ein, teste Multi-Hop-Login.",
    "Analysiere ein Netzwerkproblem mit traceroute und tcpdump."
  ],
  "resources": [
    {
      "label": "OpenSSH Hardening Guide",
      "url": "https://www.ssh.com/academy/ssh/hardening"
    },
    {
      "label": "NetworkManager CLI",
      "url": "https://networkmanager.dev/docs/api/latest/nmcli.html"
    }
  ]
};

export default moduleData;
