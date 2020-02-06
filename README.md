# Local setup

## Create a kubernetes secret for PGPASSWORD

Notice that pgpassword and PGPASSWORD need to match with backend-deployment.yaml 
and postgres-deployment.yaml files

`kubectl create secret generic pgpassword --from-literal PGPASSWORD=my_pgpassword`


# GC setup

## Encrypt service account file

`docker run -it -v $(pwd):/app ruby:2.3 sh`

### Inside the shell:

`gem install travis`
`travis login` or `travis login --pro` for private projects

### Copy the unencrypted file to the directory you open docker in

`travis encrypt-file service-account.json -r harjis/docker-rails`

### Create a secret in GC. Login to GC and open terminal

`gcloud config set project docker-rails-266706`
`gcloud config set compute/zone europe-north1-a`
`gcloud container clusters get-credentials standard-cluster-1`
`kubectl create secret generic pgpassword --from-literal PGPASSWORD=my_pgpassword`


### Install Helm

`curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3`
`chmod 700 get_helm.sh`
`./get_helm.sh`

### Add some chart and Ingress controller
`helm repo add stable https://kubernetes-charts.storage.googleapis.com/`
`helm install my-nginx stable/nginx-ingress --set rbac.create=true`
