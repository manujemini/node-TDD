SELECT 'CREATE DATABASE task_tracker'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'task_tracker')\gexec

CREATE TABLE todo(
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) not null,
  time time not null
);