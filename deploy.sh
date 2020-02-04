docker build -t d0rka/graph-cluster-backend:latest -t d0rka/graph-cluster-backend:$SHA -f ./backend/Dockerfile ./backend
docker build -t d0rka/graph-cluster-frontend:latest -t d0rka/graph-cluster-frontend:$SHA -f ./frontend/Dockerfile ./frontend

docker push d0rka/graph-cluster-backend:latest
docker push d0rka/graph-cluster-frontend:latest

docker push d0rka/graph-cluster-backend:$SHA
docker push d0rka/graph-cluster-frontend:$SHA

kubectl apply -f k8s
kubectl set image deployments/backend-deployment backend=d0rka/graph-cluster-backend:$SHA
kubectl set image deployments/frontend-deployment frontend=d0rka/graph-cluster-frontend:$SHA

kubectl apply -f k8s-migrator/db-create.yaml
kubectl apply -f k8s-migrator/db-migrate.yaml

kubectl wait --for=condition=complete --timeout=600s job/db-migrate

kubectl delete job db-create
kubectl delete job db-migrate
