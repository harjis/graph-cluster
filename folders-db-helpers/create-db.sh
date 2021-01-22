kubectl exec -it deployment/folder-service-postgres-deployment -- createdb -U postgres 'folder-service_development'

kubectl rollout restart deployment/folder-service-backend-deployment
