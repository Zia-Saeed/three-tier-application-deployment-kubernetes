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
