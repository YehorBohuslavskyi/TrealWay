# TrealWay

## Overview of elements

At the moment a project structure includes 2 modules: 

- Frontend (without web-server)
- Feedback-service (more details in `backend/FeedbackMailSenderService/README.md`)

## How to start

1. To launch frontend, is needed to set up and adjust some web-server (nginx, caddy etc). At least following settings should be set:
- Root directory
- Index page
- Reverse proxy (optional if no dedicated reverse proxy is planned)
- Ports

2. How to launch backend is described in its own README.md