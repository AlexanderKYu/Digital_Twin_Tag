SERVER:

When Creating a server

Install docker
*link youtube video
Install WSL
Install ubuntu
Install GIT
Pull codebase from GitHub
Add necessary files that are git ignored like .env file 
Remove Firewall
Open Windows firewall setting and make a rule to allow inbound communication to the port needed to be open (80 in our case)
Bind WSL port to Windows port
netsh interface portproxy add v4tov4 listenport=<yourPortToForward> listenaddress=0.0.0.0 connectport=<yourPortToConnectToInWSL> connectaddress=(wsl hostname -I) 
Last know website that documents this: https://learn.microsoft.com/en-us/windows/wsl/networking 

When booting up a server
Docker engine is running (opening docker desktop starts it normally)
git pull(if needed)
docker-compose build
docker-compose up



Server Problem:

Currently the server is set so that the socket.io request gets sent directly to the uwsgi server bypassing the nginx for testing purposes. The problem is that the server sends a 101 code but does not truely create the pipeline and keeps resending the request to connect. The way I am interpreting this is that there is either a problem with uwsgi, gevent or socket.io. The most likely of the problem would be that once the handshake process is temporarily agreed upon, it gets dropped since it is a non secure websocket connection. If not, here is the overall architecture of the server to help in solving that issue.

It all starts with docker compose. Docker-compose boots both services(flask-api and nginx server). It also binds port 80 and 5000 from the host computer to the docker network (internal network managed by docker. Inaccessible from the outside unless ports are binded). When a request is sent to port 80 from the client, it gets forwarded to nginx.
Nginx looks at the request, adds headers if needed and forwards it to uwsgi.
uWSGI converts the http request to python and gives it to the appropriate backend (gevent runs both of the concurently) socket.io or the flask-api
It process the request and sends it back through the route to the client
