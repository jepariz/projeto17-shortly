--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" date DEFAULT now()
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (2, 'https://www.postgresql.org/docs/current/queries-order.html', 'zXP7BzLH', 8, 0, '2022-12-22');
INSERT INTO public.links VALUES (3, 'https://www.notion.so/bootcampra/Projeto-Shortly-API-3ef2afe78c254d069f862c036efa6f04', '7wMMgkmP', 8, 0, '2022-12-22');
INSERT INTO public.links VALUES (5, 'https://www.hostinger.com.br/tutoriais/quanto-custa-um-dominio-de-site', '6m40CJ5q', 6, 3, '2022-12-22');
INSERT INTO public.links VALUES (6, 'https://www.hostinger.com.br/tutoriais/wordpress', 'aIjCx6ez', 6, 0, '2022-12-22');
INSERT INTO public.links VALUES (7, 'https://www.hostinger.com.br/tutoriais/webinar/melhores-plugins-de-wordpress-para-afiliados', 'RNCS6TnK', 6, 0, '2022-12-22');
INSERT INTO public.links VALUES (1, 'https://www.hostinger.com.br/tutoriais/tutorial-do-git-basics-introducao?ppc_campaign=google_performance_max', 'oCdXUCs2', 8, 8, '2022-12-22');
INSERT INTO public.links VALUES (4, 'https://www.notion.so/Quizzes-08533fb75a2142fc9efeaffb84e477a6', '4vXOQR0m', 6, 1, '2022-12-22');
INSERT INTO public.links VALUES (8, 'https://canaltech.com.br/cursos/meta-mercado-livre-e-ntt-abrem-cursos-de-tecnologia-veja-detalhes-219602/', 'pdAj_jJ1', 9, 2, '2022-12-23');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$.qrJV1l5ZsD3sbJbsbC7EuD.uVVHgXU4ZrBV/ZjBum.3Uffhb7KOC', '2022-12-21');
INSERT INTO public.users VALUES (6, 'Jéssica', 'jess@driven.com.br', '$2b$10$YwKub6EQI31HjAyEsfOpXO.fPx8ngPBowzsh3f1k1SrK7xOIpBYtC', '2022-12-21');
INSERT INTO public.users VALUES (7, 'Ana', 'ana@gmail.com', '$2b$10$WhBikw2bzi8D7Ruk1.Aqx.zgGCUZroMWQblPsLCfM2HAn/g3xx19O', '2022-12-21');
INSERT INTO public.users VALUES (8, 'Victor', 'victor@gmail.com', '$2b$10$bVdJ0F0dLQ5sOX4xiqLLme2e/vt5Vs9AZelZvgPfzc.okEj8Ivf1y', '2022-12-22');
INSERT INTO public.users VALUES (9, 'Malu', 'malu@gmail.com', '$2b$10$8mzWAZ3GsWSHwYbDjhEr1eFyXbwed9BMzRDrxwER.FVqpgbyc5hIq', '2022-12-23');


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

