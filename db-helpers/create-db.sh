kubectl exec -it deployment/backend-deployment -- createdb -U postgres 'graph-cluster_development'

kubectl rollout restart deployment/backend-deployment
