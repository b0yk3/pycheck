# pycheck

using lib:
-   cherrypy
-   webix
-   pymysqllib

```yml
app.conf:
-   [mydb]
    host=[..]
    user=[..]
    passwd=[..]
    database=[..]

-   [/static]
    [..static content folder..] 

-   [/list,/data,etc..]
    tools.gzip.on
    tools.gzip.mime_type = [text,json]

-   [sqlscript]
    [..all's sql script needed..]       
```