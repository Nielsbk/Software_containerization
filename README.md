# Group 24 Software containerization project
## Abhilash Balaji, Niels Keinke & Sven Lankester

### Local commands

#### GitHub link
Link to our project GitHub repo can be found here: https://github.com/Nielsbk/Software_containerization

#### Building and publishing an image
In each respective folder (DB/, server/ and UI/app/) run
```
docker build -t <name> .
docker push <name>
```
to build an image. You can also use Docker Desktop to push it to dockerhub

#### Running locally
Locally (using kubectl) all components can simply be set-up and deleted from the base folder using
```
kubectl apply -f ./Kubernetes/
kubectl delete -f ./Kubernetes/
```

#### Commands used in the presentation for GCS
```
gcloud config set compute/zone europe-west4-b
gcloud container clusters create sc
git clone https://github.com/Nielsbk/Software_containerization.git
Cd Software_containerization
gcloud compute firewall-rules create ui --allow tcp:30003
gcloud compute firewall-rules create server --allow tcp:31640
helm upgrade --install app mychart/
kubectl get pods
Kubectl get nodes --output wide
```
Take one of the external-IPs and you can connect at ip:30003

to uninstall the application and delete the cluster when finished
```
helm uninstall app
gcloud container clusters delete sc
```

#### Re-building and upgrading a running app