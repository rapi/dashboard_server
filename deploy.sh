rsync -r --exclude .git/ --exclude .env ./ rapi@rapi.md:dashboard_server/;
ssh rapi@rapi.md 'killall -9 node';
ssh rapi@rapi.md 'cd ~/dashboard_server && node server/index.js &' &
