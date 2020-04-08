# Landing page. Bankruptcy

Сайт "Банкротство физических лиц" - это простая целевая страница, которая выполняет все свои функции. Сайт полностью адаптивный, содержит в себе слайдеры, карту. Данные, полученные от пользователя хранятся в базе данных. Для более подробного ознакомления смотрите исходный код.

**Важно:** Backend сайта написан на PHP, поэтому если будете использовать сайт на локальном сервере, позаботьтесь об этом.

Данные из формы поступают на сервер, где обрабатываются php скриптом и записываются в таблицу базы данных.

## Информация для создания базы данных MySQL

### Создать базу данных

```sql
CREATE DATABASE `bankruptcy`;
```

### Таблица

```sql
CREATE TABLE `userdata` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(8) NOT NULL,
  `phoneNumber` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### Индекс таблицы

```sql
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`id`);
```

### Автоинкремент

```sql
ALTER TABLE `userdata`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;
```
