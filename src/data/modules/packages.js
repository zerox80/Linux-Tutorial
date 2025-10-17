const moduleData = {
  "id": "packages",
  "pillar": "Betrieb",
  "title": "Paket- & Release-Management",
  "level": "Fortgeschritten",
  "estimated": 50,
  "focus": [
    "ops",
    "automation"
  ],
  "summary": "Automatisiere Updates, vergleiche Paketmanager und plane Rollbacks souveraen.",
  "keywords": [
    "apt",
    "dnf",
    "pacman",
    "flatpak",
    "snap"
  ],
  "takeaways": [
    "Du orchestrierst Updates mit apt, dnf und pacman.",
    "Du planst Rollbacks ueber dnf history oder Timeshift.",
    "Du integrierst Flatpak/Snap gezielt in Desktop-Umgebungen."
  ],
  "commands": [
    {
      "label": "APT-Upgrade",
      "command": "sudo apt update && sudo apt full-upgrade",
      "description": "Kombiniere Index-Aktualisierung und Upgrade.",
      "tags": [
        "Maintenance"
      ]
    },
    {
      "label": "DNF-Rollback",
      "command": "sudo dnf history list\nsudo dnf history undo <ID>",
      "description": "Mache fehlerhafte Transaktionen rueckgaengig.",
      "tags": [
        "Rollback"
      ]
    }
  ],
  "missions": [
    "Vergleiche Paketversionen eines Tools in apt, dnf und Flatpak.",
    "Richte unattended-upgrades oder dnf-automatic ein und teste einen Durchlauf."
  ],
  "resources": [
    {
      "label": "DNF Dokumentation",
      "url": "https://dnf.readthedocs.io/"
    },
    {
      "label": "Flatpak Doku",
      "url": "https://docs.flatpak.org/en/latest/"
    }
  ]
};

export default moduleData;
