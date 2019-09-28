# 三界八纲

https://zhuanlan.zhihu.com/p/55765949

## Server
### init
```
pipenv shell

python manage.py migrate
```

### load data
```
python manage.py shell

exec(open("scripts/load.py").read())
```

### run dev
```
python manage.py runserver 
```

## App
### init
```
yarn install
```

### dev
```
yarn dev:weapp
```

### release
```
yarn build:weapp
```