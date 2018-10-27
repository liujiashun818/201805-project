nginx配置
```xml
server {
	listen 80;
    server_name 47.92.243.226;

	root /var/www/html;

	location / {
		try_files $uri $uri/ @router;
        index index.html;
	}

        location /api {
                rewrite ^/api/(.*)$ /$1 break;
                proxy_pass http://127.0.0.1:7001;
        }

        location @router {
               rewrite ^.*$ /index.html break;
        }


}
```