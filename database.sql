CREATE TABLE cansat (
  num           REAL default 1,
  id            SERIAL,
  temp          REAL,
  pressure      REAL,
  alt           REAL,
  date_time     timestamp default current_timestamp
);

DECLARE @@xrotation AS INT;

