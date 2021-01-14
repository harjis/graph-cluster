kubectl exec -it deployment/postgres-deployment -- createdb -U postgres 'graph-cluster_development'

kubectl rollout restart deployment/backend-deployment
