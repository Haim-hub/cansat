CREATE TABLE cansat (
  id            SERIAL PRIMARY KEY,
  temp          REAL,
  pressure      REAL,
  date_time     timestamp default current_timestamp
);