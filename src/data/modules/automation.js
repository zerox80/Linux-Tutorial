const moduleData = {
  "id": "automation",
  "pillar": "Produktivitaet",
  "title": "Infrastructure-as-Code & Observability-Basics",
  "level": "Experte",
  "estimated": 65,
  "focus": [
    "automation"
  ],
  "summary": "Automatisiere Provisionierung mit Ansible, plane CI/CD-Hooks und setze Observability-Grundlagen um.",
  "keywords": [
    "ansible",
    "terraform",
    "prometheus",
    "grafana",
    "gitops"
  ],
  "takeaways": [
    "Du schreibst idempotente Playbooks fuer wiederkehrende Aufgaben.",
    "Du integrierst Checks in CI/CD und GitOps-Flows.",
    "Du sammelst Metriken und Logs zentralisiert (Prometheus, Loki)."
  ],
  "commands": [
    {
      "label": "Ansible Dry-Run",
      "command": "ansible-playbook site.yml --check --diff",
      "description": "Evaluiere Aenderungen ohne sie anzuwenden.",
      "tags": [
        "Automation"
      ]
    },
    {
      "label": "Prometheus Targets",
      "command": "curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets[] | {instance, health}'",
      "description": "Pruefe, ob Monitoring-Targets gesund sind.",
      "tags": [
        "Observability"
      ]
    }
  ],
  "missions": [
    "Automatisiere einen Server-Setup mit Ansible inklusive Handlers.",
    "Visualisiere mindestens drei Kennzahlen in Grafana oder Netdata."
  ],
  "resources": [
    {
      "label": "Ansible Best Practices",
      "url": "https://docs.ansible.com/ansible/latest/dev_guide/developing_best_practices.html"
    },
    {
      "label": "Prometheus Getting Started",
      "url": "https://prometheus.io/docs/introduction/first_steps/"
    }
  ]
};

export default moduleData;
