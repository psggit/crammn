CREATE TABLE IF NOT EXISTS "session"
(
    "sid"    varchar      NOT NULL COLLATE "default",
    "sess"   json         NOT NULL,
    "expire" timestamp(6) NOT NULL
)
    WITH (OIDS= FALSE);

ALTER TABLE "session"
    DROP CONSTRAINT IF EXISTS "session_pkey";
ALTER TABLE "session"
    ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user_profile"
(
    user_id             uuid                        DEFAULT uuid_generate_v4(),
    email               VARCHAR NOT NULL,
    name               VARCHAR NOT NULL,
    google_account_info json    NOT NULL,
    created_at          TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    updated_at          TIMESTAMP WITHOUT TIME ZONE,
    profile_updated     boolean                     default false,
    college             VARCHAR,
    stream              VARCHAR,
    phone_number        VARCHAR
)
    WITH (OIDS= FALSE);

ALTER TABLE "user_profile"
    ADD CONSTRAINT "user_profile_pkey" PRIMARY KEY ("email") NOT DEFERRABLE INITIALLY IMMEDIATE;
