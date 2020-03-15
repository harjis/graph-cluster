# How to setup HTTPS Domain

- Login to GoDaddy and do to DNS management
- Add 2 new rules
    - Type: A, Name: @, Value: <ip-address-here>
    - Type: CNAME, Name: www, Value: @

- Install cert-manager: github.com/jetstack/cert-manager

For Kubernetes < 1.15

`helm init`

`$ kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.14.0/cert-manager-legacy.crds.yaml`

`kubectl create namespace cert-manager`

`helm repo add jetstack https://charts.jetstack.io`

`helm repo update`

`helm install \
   cert-manager jetstack/cert-manager \
   --namespace cert-manager \
   --version v0.14.0`


- Create certificate.yaml, issuer.yaml
- Push them to remote and check that they have been applied correctly
- Install cert-manager with Helm



