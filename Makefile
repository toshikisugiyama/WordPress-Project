init:
	chmod +w ./DocumentRoot
	chmod +w ./DocumentRoot/wp-content/{languages,plugins,uploads}
	chmod +w ./DocumentRoot/wp-content/languages/{plugins,themes}
	chmod +w ./DocumentRoot/wp-content/plugins/akismet
	chmod +w ./DocumentRoot/wp-content/uploads
	chmod +w ./DocumentRoot/wp-content/uploads/2020
	chmod +w ./DocumentRoot/wp-content/uploads/2020/*
	chmod 755 ./DocumentRoot/wp-content
	chmod 440 ./DocumentRoot/wp-config.php
	chown kusanagi:www ./DocumentRoot/wp-config.php
	npm install
	npm run build

update-assets:
	npm install
	npm run build
