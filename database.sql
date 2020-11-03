CREATE TABLE cansat (
  num           REAL,
  id            SERIAL PRIMARY KEY,
  temp          REAL,
  pressure      REAL,
  alt           REAL,
  date_time     timestamp default current_timestamp
);