CREATE TABLE pet (
                     id          BIGSERIAL PRIMARY KEY,
                     name        VARCHAR(100) NOT NULL,
                     type        VARCHAR(20)  NOT NULL,
                     birth_date  DATE         NULL,
                     owner_email VARCHAR(255) NOT NULL,
                     created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
