# 🚀 Three-Tier Kubernetes Application (React + Django + PostgreSQL)

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

A **production-ready**, cloud-native three-tier application deployed on a **Kubernetes (KIND) cluster** with full-stack monitoring and persistent storage.

## 🌟 Key Features
- **Frontend**: React.js (NodePort-exposed)
- **Backend**: Django REST API (ClusterIP-secured)
- **Database**: PostgreSQL with **Persistent Volume Claims (PVC)**
- **Monitoring**: Prometheus + Grafana (optional Helm deployment)
- **Zero-Downtime Ready**: Kubernetes-native architecture

## 🛠️ One-Command Deployment

```bash
# Deploy all components (in order):
kubectl apply -f postgres/ && \
kubectl apply -f backend/ && \
kubectl apply -f frontend/
# Install with Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus
helm install grafana grafana/grafana

# Access Grafana
kubectl port-forward svc/grafana 3000:80

├── backend/
│   ├── deployment.yaml    # Django app deployment
│   └── service.yaml       # ClusterIP service
├── frontend/
│   ├── deployment.yaml    # React app deployment
│   ├── service.yaml       # NodePort service
│   └── src/api/index.ts   # API endpoint config
└── postgres/
    ├── deployment.yaml    # PostgreSQL stateful deployment
    ├── service.yaml       # Database service
    └── pvc.yaml           # Persistent Volume Claim

🚀 How It Works
Frontend → React app served via NodePort

Backend → Django handles API requests (internal ClusterIP)

Database → PostgreSQL with persistent storage

Services → Auto-discover via Kubernetes DNS

🚨 Troubleshooting Guide
Issue	Solution
Frontend not loading	Check NodePort service: kubectl get svc frontend-service
API connection failed	Verify backend pod logs: kubectl logs <backend-pod-name>
Database not persisting	Check PVC status: kubectl get pvc
All else fails	Reset deployments: kubectl delete -f postgres/ -f backend/ -f frontend/ && kubectl apply -f ./
