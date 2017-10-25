# ControlRoom sencha Workspace
 - Login apps/cr_login
 - ControlRoomDesktop apps/cr_desk/
 - LensControl apps/cr_lens_control
 - ControlRoom apps/cr_main/

### Начало работы

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

