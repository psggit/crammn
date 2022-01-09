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

CREATE UNIQUE INDEX user_profile_user_id_idx ON user_profile (user_id);

-- SEQUENCE: public.user_profile_id_seq

-- DROP SEQUENCE public.user_profile_id_seq;

CREATE SEQUENCE public.user_profile_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.user_profile_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.transaction_id_seq

-- DROP SEQUENCE public.transaction_id_seq;

CREATE SEQUENCE public.transaction_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.transaction_id_seq
    OWNER TO postgres;

-- SEQUENCE: public.order_id_seq

-- DROP SEQUENCE public.order_id_seq;

CREATE SEQUENCE public.order_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.order_id_seq
    OWNER TO postgres;

-- Table: public.orders

-- DROP TABLE public.orders;

CREATE TABLE IF NOT EXISTS public.orders
(
    id character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT nextval('order_id_seq'::regclass),
    status character varying(20) COLLATE pg_catalog."default" NOT NULL,
    user_id uuid NOT NULL,
    total_amount double precision NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    razorpay_order_id character varying COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_user_id_ref FOREIGN KEY (user_id)
    REFERENCES public.user_profile (user_id) MATCH SIMPLE
                         ON UPDATE NO ACTION
                         ON DELETE NO ACTION
    );

ALTER TABLE public.orders
    OWNER to postgres;

-- Table: public.transactions

-- DROP TABLE public.transactions;

CREATE TABLE IF NOT EXISTS public.transactions
(
    id character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT nextval('transaction_id_seq'::regclass),
    order_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    pg_order_id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    pg_payment_id character varying(30) COLLATE pg_catalog."default" NOT NULL,
    pg_signature character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT transaction_order_id_ref FOREIGN KEY (order_id)
    REFERENCES public.orders (id) MATCH SIMPLE
                         ON UPDATE NO ACTION
                         ON DELETE NO ACTION
    NOT VALID
    );

ALTER TABLE public.transactions
    OWNER to postgres;

-- Table: public.user_courses

-- DROP TABLE public.user_courses;

CREATE TABLE IF NOT EXISTS public.user_courses
(
    user_id uuid NOT NULL,
    course_id integer NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    order_id character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_courses_order_id_ref FOREIGN KEY (order_id)
    REFERENCES public.orders (id) MATCH SIMPLE
                         ON UPDATE NO ACTION
                         ON DELETE NO ACTION,
    CONSTRAINT user_courses_user_id_ref FOREIGN KEY (user_id)
    REFERENCES public.user_profile (user_id) MATCH SIMPLE
                         ON UPDATE NO ACTION
                         ON DELETE NO ACTION
    );

ALTER TABLE public.user_courses
    OWNER to postgres;