# ControlRoom sencha Workspace
 - Login apps/cr_login
 - ControlRoomDesktop apps/cr_desk/
 - LensControl apps/cr_lens_control
 - ControlRoom apps/cr_main/

# Начало работы

Для начала работы нужно сначала сгенерировать sencha Workspace, командой

```sh
 sencha generate workspace ./
```

Затем, в зависимости от того, какие apps будут использоваться, скопировать (клонировать из соответствующего git) нужный app, Например

```sh
cd ./apps
git clone git[нужный git-site]/cr_lens_control
cd ..
```

Затем выполнить команду

```sh
sencha -sdk путь_к_директории_где_установлен_extjs generate app \
    --classic LensControl ./apps/cr_lens_control/
```

После послденей операции можно проверить изменённые или добавленные при билдинге файлы командой

```sh
git status
```

И при необходимости откатить на последнюю версию

```sh
git reset --hard HEAD
```

Для последующего добавления новых приложений (apps) в существующий workspace с директорией `ext` можно выполнить команду

```sh
sencha generate app --ext --classic NameProj ./apps/project_dir/
```

--classic используется, если генерируется классическое приложения без версии для планшетов.

В директории `.sencha\workspace\` в файл `./sencha.cfg` добавить свойство `workspace.classpath=${workspace.dir}/common_d/src` для добавления этой директории в окружение Sencha при поиске объявленных классов. Определять класс в этой директории нужно с именем `Ext.define('Common_d.ИМЯ_КЛАССА=ИМЯ_ФАЙЛА_БЕЗ_JS')`. В данном случае, в этой директории определён скрипт  Property.js,  в котором будут определены нужные конфиги для приложений (например cr_contol_room)

```javascript
Ext.define('Common_d.Property', {
    config : {
		urllogin: '/tango/____/____/1', // путь к танго-машине отвечающей за авторизацию (аутентификацию)
		wsforlens: 'url_вэбсокета/wsj/', // при использовани wsproxy
		//wsforlens: 'url_вэбсокета:порт?',
    },
    constructor: function(config) {
        this.initConfig(config);
        this.self;
    }
}
);
```

 ---------------------------------------------

For generating workspace run these commands:

```sh
 sencha generate workspace ./
```
