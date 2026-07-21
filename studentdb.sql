--
-- PostgreSQL database dump
--



-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: assignment_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assignment_results (
    id integer NOT NULL,
    assignment_id integer NOT NULL,
    student_id integer NOT NULL,
    marks integer,
    remarks text,
    CONSTRAINT assignment_results_marks_check CHECK (((marks >= 1) AND (marks <= 5)))
);


ALTER TABLE public.assignment_results OWNER TO postgres;

--
-- Name: assignment_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assignment_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assignment_results_id_seq OWNER TO postgres;

--
-- Name: assignment_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assignment_results_id_seq OWNED BY public.assignment_results.id;


--
-- Name: assignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assignments (
    id integer NOT NULL,
    exercise character varying(100) NOT NULL,
    subject character varying(100) NOT NULL,
    section character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.assignments OWNER TO postgres;

--
-- Name: assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assignments_id_seq OWNER TO postgres;

--
-- Name: assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assignments_id_seq OWNED BY public.assignments.id;


--
-- Name: class_remarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_remarks (
    id integer NOT NULL,
    schedule_id integer NOT NULL,
    class_date date NOT NULL,
    topics_covered text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.class_remarks OWNER TO postgres;

--
-- Name: class_remarks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_remarks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.class_remarks_id_seq OWNER TO postgres;

--
-- Name: class_remarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_remarks_id_seq OWNED BY public.class_remarks.id;


--
-- Name: student_remarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_remarks (
    id integer NOT NULL,
    schedule_id integer NOT NULL,
    class_date date NOT NULL,
    student_id integer NOT NULL,
    remarks text,
    distracted boolean DEFAULT false,
    participating boolean DEFAULT false,
    great_effort boolean DEFAULT false,
    class_disturbance boolean DEFAULT false,
    late_arrival boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.student_remarks OWNER TO postgres;

--
-- Name: student_remarks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_remarks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_remarks_id_seq OWNER TO postgres;

--
-- Name: student_remarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_remarks_id_seq OWNED BY public.student_remarks.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    roll_no integer NOT NULL,
    name character varying(100) NOT NULL,
    subject character varying(100) NOT NULL,
    section character varying(10) NOT NULL,
    grade character varying(10)
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: teacher_schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher_schedule (
    id integer NOT NULL,
    day character varying(15) NOT NULL,
    section character varying(10) NOT NULL,
    room character varying(10),
    time_slot character varying(20) NOT NULL,
    subject character varying(50) NOT NULL,
    grade integer
);


ALTER TABLE public.teacher_schedule OWNER TO postgres;

--
-- Name: teacher_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacher_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teacher_schedule_id_seq OWNER TO postgres;

--
-- Name: teacher_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teacher_schedule_id_seq OWNED BY public.teacher_schedule.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: assignment_results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignment_results ALTER COLUMN id SET DEFAULT nextval('public.assignment_results_id_seq'::regclass);


--
-- Name: assignments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignments ALTER COLUMN id SET DEFAULT nextval('public.assignments_id_seq'::regclass);


--
-- Name: class_remarks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_remarks ALTER COLUMN id SET DEFAULT nextval('public.class_remarks_id_seq'::regclass);


--
-- Name: student_remarks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_remarks ALTER COLUMN id SET DEFAULT nextval('public.student_remarks_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: teacher_schedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_schedule ALTER COLUMN id SET DEFAULT nextval('public.teacher_schedule_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: assignment_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assignment_results (id, assignment_id, student_id, marks, remarks) FROM stdin;
4	8	5	5	She is brilliant
38	8	3	\N	he is good
1	8	1	2	good
3	8	2	5	bad 
41	8	8	\N	okayishhhh
49	9	2	5	\N
50	9	3	4	\N
42	9	1	2	brilliant
53	13	115	5	Bad Bad work
\.


--
-- Data for Name: assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assignments (id, exercise, subject, section, created_at) FROM stdin;
1	Exercise 15.4	Calculus	E1	2026-07-14 03:06:57.617299
2	Exercise 15.5	Calculus	E1	2026-07-14 03:08:06.94229
3	Exercise 15.6	Calculus	E1	2026-07-14 03:08:44.973174
4	Exercise 17.8	Calculus	E3	2026-07-14 03:10:10.110906
5	Exercise 3.4	Calculus	E1	2026-07-14 03:20:16.333394
6	Exercise 6.7	Calculus	E3	2026-07-14 03:32:40.481053
7	Exercise 5.5	Calculus	E1	2026-07-14 03:33:54.442902
8	Exercise 7.2	Calculus	E1	2026-07-14 03:35:05.461811
9	Exercise 9.8	Calculus	E1	2026-07-14 12:11:47.769322
10	Exercise 4.5	Calculus	E8	2026-07-16 01:25:10.069192
11	Exercise 3.4	Calculus	E9	2026-07-20 16:42:08.940091
12	Exercise 1.2	Calculus	E1	2026-07-21 00:48:10.230869
13	Exercise 5.4	Calculus	E4	2026-07-21 00:50:37.704196
\.


--
-- Data for Name: class_remarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class_remarks (id, schedule_id, class_date, topics_covered, created_at) FROM stdin;
1	23	2026-07-16	Excercise 4.5 Limit	2026-07-16 01:19:45.192698
7	32	2026-07-17	Exercise 4.6 - Quadratic Equations	2026-07-18 05:26:24.609154
38	5	2026-07-20	Limit completed	2026-07-20 12:30:24.45738
39	12	2026-07-21	Limit completed	2026-07-21 00:51:01.846073
\.


--
-- Data for Name: student_remarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_remarks (id, schedule_id, class_date, student_id, remarks, distracted, participating, great_effort, class_disturbance, late_arrival, created_at) FROM stdin;
1	23	2026-07-16	1	he is outstanding	t	t	f	f	f	2026-07-16 02:30:23.787169
4	32	2026-07-18	1	he is bad 	t	t	f	f	f	2026-07-18 06:36:40.395358
14	5	2026-07-20	41	bad	t	f	f	f	f	2026-07-20 12:30:30.429156
15	32	2026-07-17	1	he is bad	t	f	f	f	f	2026-07-20 12:42:10.140365
16	12	2026-07-21	115	bad boy	t	f	f	t	t	2026-07-21 00:51:10.21515
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, roll_no, name, subject, section, grade) FROM stdin;
1	1	ADARSHA ROKKA	Calculus	E1	11
2	2	AAROSH SHRESTHA	Calculus	E1	11
3	3	AASHISH GHIMIRE	Calculus	E1	11
4	4	AAYUSH DAHAL	Calculus	E1	11
5	5	AAYUSHA TAMANG	Calculus	E1	11
6	6	ANMOL BHANDARI	Calculus	E1	11
7	7	ANUBHAV DAHAL	Calculus	E1	11
8	8	BIJAYA DHAKAL	Calculus	E1	11
9	9	BINAYAK DHITAL	Calculus	E1	11
10	10	BISHOW RAJ TIMALSINA	Calculus	E1	11
11	11	DIPESH PAHARI	Calculus	E1	11
12	12	ENOSH BAIDYA	Calculus	E1	11
13	13	JADESH BHANDARI	Calculus	E1	11
14	14	JIYA KARMACHARYA	Calculus	E1	11
15	15	MAYANK MANANDHAR	Calculus	E1	11
16	16	MEESSI JUNG BASNET	Calculus	E1	11
17	17	NISCHAL BAJGAIN	Calculus	E1	11
18	18	NISCHAL THAPA	Calculus	E1	11
19	19	PRASANNA THAPA	Calculus	E1	11
20	20	PRASHANT KHATRI	Calculus	E1	11
21	21	RITIKA MANANDHAR	Calculus	E1	11
22	22	ROCHAK KALIRAJ	Calculus	E1	11
23	23	ROJINA TAMANG	Calculus	E1	11
24	24	SAJAN BHARATI	Calculus	E1	11
25	25	SAMIKSHYA GHIMIRE	Calculus	E1	11
26	26	SAMYOG DAHAL	Calculus	E1	11
27	27	SANDESH DHAULAKOTI	Calculus	E1	11
28	28	SARAD KHATRI	Calculus	E1	11
29	29	SAYUJYA ARYAL	Calculus	E1	11
30	30	SIWAN RAI	Calculus	E1	11
31	31	SMRITI SHRESTHA	Calculus	E1	11
32	32	SONU TAMANG	Calculus	E1	11
33	33	SRIDIP TAMANG	Calculus	E1	11
34	34	SRIJAL SHRESTHA	Calculus	E1	11
35	35	SUBHAM KC	Calculus	E1	11
36	36	SUVAM SHRESTHA	Calculus	E1	11
37	37	SWARNIM DAHAL	Calculus	E1	11
38	38	UNIK THAPA	Calculus	E1	11
39	39	VIJAY KHATRI	Calculus	E1	11
40	40	YUBARAJ KUMAR	Calculus	E1	11
41	1	AADITYA THAPA	Calculus	E2	11
42	2	AMESH GAUTAM	Calculus	E2	11
43	3	ANSHU MAKAJU SHRESTHA	Calculus	E2	11
44	4	ANUJ BHURTEL	Calculus	E2	11
45	5	ANUJ DAHAL	Calculus	E2	11
46	6	ARPIT SHARMA	Calculus	E2	11
47	7	ARYAMAN KHADGI	Calculus	E2	11
48	8	AYUN RAI	Calculus	E2	11
49	9	BIKASH TAMANG	Calculus	E2	11
50	10	DIBASH GAUTAM	Calculus	E2	11
51	11	DIYA SHRESTHA	Calculus	E2	11
52	12	HEM KUMAR SHRESTHA	Calculus	E2	11
53	13	INDRA RAJ KHADKA	Calculus	E2	11
54	14	KAUSHAL BHANDARI	Calculus	E2	11
55	15	KESHAB KHADKA	Calculus	E2	11
56	16	KRITISHA ADHIKARI	Calculus	E2	11
57	17	KUSHAL KHADKA	Calculus	E2	11
58	18	MANIKA SHRESTHA	Calculus	E2	11
59	19	MISHAN UPRETI	Calculus	E2	11
60	20	NEELI RUPALI YADAV	Calculus	E2	11
61	21	OMRAJ KC	Calculus	E2	11
62	22	PRINCE THAPA	Calculus	E2	11
63	23	RITIK CHAULAGAIN	Calculus	E2	11
64	24	ROHAN GAUTAM	Calculus	E2	11
65	25	ROHIT GHALAN TAMANG	Calculus	E2	11
66	26	ROHIT SHRESTHA	Calculus	E2	11
67	27	SAHEL TAMANG	Calculus	E2	11
68	28	SAMBEK SHRESTHA	Calculus	E2	11
69	29	SAMIT ADHIKARI	Calculus	E2	11
70	30	SARIKA KC	Calculus	E2	11
71	31	SAUMYA DEOJU	Calculus	E2	11
72	32	SHINZO BADE	Calculus	E2	11
73	33	SUBIN DULAL	Calculus	E2	11
74	34	SUMINA TAMANG	Calculus	E2	11
75	35	SUNNY THAPA	Calculus	E2	11
76	36	SWAYAM SAPKOTA	Calculus	E2	11
77	1	AAKASH SHRESTHA	Calculus	E3	11
78	2	AASHISH TIMALSINA	Calculus	E3	11
79	3	AASHUTOSH BOLAKHE	Calculus	E3	11
80	4	ACHYUT PRASAD THAPALIYA	Calculus	E3	11
81	5	ANKIT LAMA	Calculus	E3	11
82	6	ANKIT SAPKOTA	Calculus	E3	11
83	7	ARABI TAMANG	Calculus	E3	11
84	8	ASHMITA GIRI	Calculus	E3	11
85	9	BRIKHA DHOJ TAMANG	Calculus	E3	11
86	10	DIPSANG YONJAN TAMANG	Calculus	E3	11
87	11	GIGENDRA LAMA	Calculus	E3	11
88	12	HENARI THAPA	Calculus	E3	11
89	13	JIYA KARKI	Calculus	E3	11
90	14	MANISH SAPKOTA	Calculus	E3	11
91	15	NISHAN TIMALSINA	Calculus	E3	11
92	16	NISHANT KHANAL	Calculus	E3	11
93	17	PRABAL PANTA	Calculus	E3	11
94	18	PRAN REGMI	Calculus	E3	11
95	19	PRATHAM BHUSAL	Calculus	E3	11
96	20	PRATHAM SHRESTHA	Calculus	E3	11
97	21	PRATYUSH KOIRALA	Calculus	E3	11
98	22	PRATYUSH SILWAL	Calculus	E3	11
99	23	RACHIT RAI	Calculus	E3	11
100	24	RAGHAV DULAL	Calculus	E3	11
101	25	REGAN SHRESTHA	Calculus	E3	11
102	26	ROHAN JUNG RAYAMAJHI	Calculus	E3	11
103	27	SADIP LUITEL	Calculus	E3	11
104	28	SAKSHAM PAUDEL	Calculus	E3	11
105	29	SAMIR RAI	Calculus	E3	11
106	30	SAMISHRAN SHRESTHA	Calculus	E3	11
107	31	SAMRIDDHI DAHAL	Calculus	E3	11
108	32	SANDESH SOREN	Calculus	E3	11
109	33	SAPHAL BHANDARI	Calculus	E3	11
110	34	SHAKTI SHRESTHA	Calculus	E3	11
111	35	SHIVAM PANDIT	Calculus	E3	11
112	36	SUDIN SUBEDI	Calculus	E3	11
113	37	SUDIP KUIKEL	Calculus	E3	11
114	38	ZOYA SHRESTHA	Calculus	E3	11
115	1	AARUSH TAMANG	Calculus	E4	11
116	2	AASHRAYA KARKI	Calculus	E4	11
117	3	AASTIK GHIMIRE	Calculus	E4	11
118	4	AAYUSH KOIRALA	Calculus	E4	11
119	5	ABISEK KANDEL	Calculus	E4	11
120	6	ALBIN SHRESTHA	Calculus	E4	11
121	7	ANJELITA MANANDHAR	Calculus	E4	11
122	8	ARJIT SHRESTHA	Calculus	E4	11
123	9	BIKRAM LAMA	Calculus	E4	11
124	10	BIPIN KUNWAR	Calculus	E4	11
125	11	DIPASNA KC	Calculus	E4	11
126	12	GAURAV GHORASAINE	Calculus	E4	11
127	13	KRICHAL ALE MAGAR	Calculus	E4	11
128	14	MISAL BABU SHRESTHA	Calculus	E4	11
129	15	NISCHAL KC	Calculus	E4	11
130	16	PRABESH SAPKOTA	Calculus	E4	11
131	17	PRAJWAL MOKTAN TAMANG	Calculus	E4	11
132	18	PRANAYA KC TIMALSINA	Calculus	E4	11
133	19	PRARAMBHA DAHAL	Calculus	E4	11
134	20	PRASHIDDHIKA ARYAL	Calculus	E4	11
135	21	PRINCE MAHAT	Calculus	E4	11
136	22	PUJA GAUTAM	Calculus	E4	11
137	23	PUKAR DHAKAL	Calculus	E4	11
138	24	RITIK GAUTAM	Calculus	E4	11
139	25	ROCKESH THAPA	Calculus	E4	11
140	26	ROHAN ADHIKARI	Calculus	E4	11
141	27	RUBIN BAJGAIN	Calculus	E4	11
142	28	RUTH PARIYAR	Calculus	E4	11
143	29	SAHAJ THAPA	Calculus	E4	11
144	30	SAHIL BASNET	Calculus	E4	11
145	31	SAJWOL DAHAL	Calculus	E4	11
146	32	SHUBHAM NEUPANE	Calculus	E4	11
147	33	SIDDHARTHA GAUTAM	Calculus	E4	11
148	34	SIMRAN KC	Calculus	E4	11
149	35	SOYA BADE SHRESTHA	Calculus	E4	11
150	36	STUTI KARKI	Calculus	E4	11
151	37	UMANGA THAPA	Calculus	E4	11
152	38	UNIQUE SHRESTHA	Calculus	E4	11
153	1	AGYA GHISING	Calculus	E5	11
154	2	ANGEL KHADKA	Calculus	E5	11
155	3	ASHMITA KARKI	Calculus	E5	11
156	4	ASMITA PAHARI	Calculus	E5	11
157	5	BARSHA ADHIKARI	Calculus	E5	11
158	6	BARSHA BHANDARI	Calculus	E5	11
159	7	BINUKA KHADKA	Calculus	E5	11
160	8	DIPINA KHADKA	Calculus	E5	11
161	9	JENISHA TAMANG (A)	Calculus	E5	11
162	10	JENISHA TAMANG (B)	Calculus	E5	11
163	11	LIDIYA GHIMIRE	Calculus	E5	11
164	12	MALLIKA MANANDHAR	Calculus	E5	11
165	13	MANJILA THAPA	Calculus	E5	11
166	14	NABIN LAMA	Calculus	E5	11
167	15	NAMRATA DAHAL	Calculus	E5	11
168	16	NISHA BASNET	Calculus	E5	11
169	17	NISHA JAISWAL	Calculus	E5	11
170	18	PARBAT BAJGAIN	Calculus	E5	11
171	19	PRANIL ADHIKARI	Calculus	E5	11
172	20	PRASHNA ADHIKARI	Calculus	E5	11
173	21	PRASNA NAKARMI	Calculus	E5	11
174	22	PRATICHYA SAPKOTA	Calculus	E5	11
175	23	PRINCE THAPA MAGAR	Calculus	E5	11
176	24	PURNIMA TAMANG	Calculus	E5	11
177	25	RASHINA CHOU PRADHAN	Calculus	E5	11
178	26	ROSHANI PURKUTI	Calculus	E5	11
179	27	RUBISHA DHAKAL	Calculus	E5	11
180	28	SADICHHYA RAYAMAJHI	Calculus	E5	11
181	29	SAJIN TAMANG	Calculus	E5	11
182	30	SALINA SUCHIKAR	Calculus	E5	11
183	31	SAMYAM SHRESTHA	Calculus	E5	11
184	32	SANJANA SHRESTHA	Calculus	E5	11
185	33	SHEKHAR JIMBA	Calculus	E5	11
186	34	SIMRAN ACHARYA	Calculus	E5	11
187	35	SALOMI SHRESTHA	Calculus	E5	11
188	36	SUBEG SHRESTHA	Calculus	E5	11
189	37	SUDIP SAPKOTA	Calculus	E5	11
190	38	SUJATA GHIMIRE	Calculus	E5	11
191	39	UNISHA SHRESTHA	Calculus	E5	11
192	40	YUNA SHRESTHA	Calculus	E5	11
193	41	YUNISHA KC	Calculus	E5	11
194	1	AARYA POTE	Calculus	E6	11
195	2	AAYUSHA BHUJEL	Calculus	E6	11
196	3	ANUPA GHIMIRE	Calculus	E6	11
197	4	ANURAGI SHRESTHA	Calculus	E6	11
198	5	ANUSHKA GHIMIRE	Calculus	E6	11
199	6	AARZU THAPA	Calculus	E6	11
200	7	BISHESH MANANDHAR	Calculus	E6	11
201	8	DAKSHA CHAUDHARY	Calculus	E6	11
202	9	DEEPIKA GATARAJ	Calculus	E6	11
203	10	DIKSHYA KOIRAL	Calculus	E6	11
204	11	FIBI TAMANG	Calculus	E6	11
205	12	ICHHA THAMI	Calculus	E6	11
206	13	KAJAL TAMANG	Calculus	E6	11
207	14	MANUSHI GAUTAM	Calculus	E6	11
208	15	NAMRATA GHIMIRE	Calculus	E6	11
209	16	NEHA MAHAT	Calculus	E6	11
210	17	NIRJAL PARAJULI	Calculus	E6	11
211	18	NIRJALA KHADKA	Calculus	E6	11
212	19	NISHA SHRESETHA	Calculus	E6	11
213	20	NITISHA MANANDHAR	Calculus	E6	11
214	21	PALISHRA LAMA	Calculus	E6	11
215	22	PHURSANG GYALBO LAMA	Calculus	E6	11
216	23	PRABIN RAYA MAJHI	Calculus	E6	11
217	24	PRABINA DAHAL	Calculus	E6	11
218	25	RAJSHREE SHRESTHA	Calculus	E6	11
219	26	RESHIKA THAPA	Calculus	E6	11
220	27	RUPISHA KARKI	Calculus	E6	11
221	28	SABIN ADHIKARI	Calculus	E6	11
222	29	SAMITA ADHIKARI	Calculus	E6	11
223	30	SAMPANNA KHADKA	Calculus	E6	11
224	31	SANDESH GHIMIRE	Calculus	E6	11
225	32	SHREYA GHISING	Calculus	E6	11
226	33	SHRISHA JOSHI	Calculus	E6	11
227	34	SHRISTI GAUTAM	Calculus	E6	11
228	35	SHRIYA ALE MAGAR	Calculus	E6	11
229	36	SNEHA KHADGI	Calculus	E6	11
230	37	SUKHI GURAGAIN	Calculus	E6	11
231	38	SUMIRA SHRESTHA	Calculus	E6	11
232	39	TEJAL TAMANG	Calculus	E6	11
233	40	UNIKA BAJAGAIN	Calculus	E6	11
234	41	UPASHNA KHATRI	Calculus	E6	11
235	42	YOJANA SAPKOTA	Calculus	E6	11
236	43	YUNA TIMALSINA	Calculus	E6	11
237	1	AASHISH PARAJULI	Calculus	E7	11
238	2	AASHMA KC	Calculus	E7	11
239	3	AAYUSH SHRESTHA	Calculus	E7	11
240	4	AAYUSHMA POKHREL	Calculus	E7	11
241	5	ABHAY DANGOL	Calculus	E7	11
242	6	ABISH NEUPANE	Calculus	E7	11
243	7	ABITA JARKA MAGAR	Calculus	E7	11
244	8	ADYTY SHRESTHA	Calculus	E7	11
245	9	ANJULA SHRESTHA	Calculus	E7	11
246	10	APSANA SHRESTHA	Calculus	E7	11
247	11	AYUSHA RAI	Calculus	E7	11
248	12	DIPTI AIDI	Calculus	E7	11
249	13	JASHMINE BAJRACHARYA	Calculus	E7	11
250	14	KHUSHI TAMANG	Calculus	E7	11
251	15	KRITIKA DAUDE	Calculus	E7	11
252	16	KRITIK DAHAL	Calculus	E7	11
253	17	MANABI NEUPANE	Calculus	E7	11
254	18	MANISHA SAPKOTA	Calculus	E7	11
255	19	NANCY SHRESTHA	Calculus	E7	11
256	20	NIRUTA THAPA	Calculus	E7	11
257	21	NISCHAL LAMSAL	Calculus	E7	11
258	22	NISCHAL SHRESTHA	Calculus	E7	11
259	23	PARISKRIT RIJAL	Calculus	E7	11
260	24	PRASANSHA MIJAR	Calculus	E7	11
261	25	PRASHNA THAPA	Calculus	E7	11
262	26	PURNIKA MANANDHAR	Calculus	E7	11
263	27	RANJITA KC	Calculus	E7	11
264	28	REASON RAJ POKHAREL	Calculus	E7	11
265	29	RISTIKA SHRESTHA	Calculus	E7	11
266	30	SADIKSHYA GHORSAINE	Calculus	E7	11
267	31	SALINA DAHAL	Calculus	E7	11
268	32	SALINA SHAHI	Calculus	E7	11
269	33	SAMPADA GHIMIRE	Calculus	E7	11
270	34	SANGAM RIMAL	Calculus	E7	11
271	35	SANSKRITI SAPKOTA	Calculus	E7	11
272	36	SAYA SHRESTHA	Calculus	E7	11
273	37	SHILPY GHIMIRE	Calculus	E7	11
274	38	SHRUTI SHRESTHA	Calculus	E7	11
275	39	SMRITI GHIMIRE	Calculus	E7	11
276	40	SNEYA SHRESTHA	Calculus	E7	11
277	41	STUPA SHAKYA	Calculus	E7	11
278	1	AARSU SHRESTHA	Calculus	E8	11
279	2	AAYURA SHRESTHA	Calculus	E8	11
280	3	AAYUSHA RAI	Calculus	E8	11
281	4	ANUJ SHRESTHA	Calculus	E8	11
282	5	ANSHU AMATYA	Calculus	E8	11
283	6	BIBISHA THAPA	Calculus	E8	11
284	7	GIRIDHAR THAPA	Calculus	E8	11
285	8	ISHA POKHREL	Calculus	E8	11
286	9	JENISHA BANJARA	Calculus	E8	11
287	10	JIYA JOSHI	Calculus	E8	11
288	11	KRISHCHAL KHADKA	Calculus	E8	11
289	12	KRISTINA SHRESTHA	Calculus	E8	11
290	13	KUSHAL CHAULAGAIN	Calculus	E8	11
291	14	MALLIKA HUMAGAIN	Calculus	E8	11
292	15	MANIKA DARLAMI MAGAR	Calculus	E8	11
293	16	MANISHA THAPA	Calculus	E8	11
294	17	MOHISHA SHRESTHA	Calculus	E8	11
295	18	NISHA PURI	Calculus	E8	11
296	19	PANKAJ KUMAR DAS	Calculus	E8	11
297	20	PRABINA SHRESTHA	Calculus	E8	11
298	21	PRATISTA KARKI	Calculus	E8	11
299	22	PRESNA ACHARYA	Calculus	E8	11
300	23	PRINSHA BHANDARI	Calculus	E8	11
301	24	RESHMA HUMAGAI	Calculus	E8	11
302	25	RISTA ADHIKARI	Calculus	E8	11
303	26	RIYASH DANUWAR	Calculus	E8	11
304	27	ROJI RAI	Calculus	E8	11
305	28	SAKINA LAMA	Calculus	E8	11
306	29	SAMARIKA KUNWAR	Calculus	E8	11
307	30	SAMICHYA DAHAL	Calculus	E8	11
308	31	SHIRISHA HUMAGAIN	Calculus	E8	11
309	32	SHUKARMA TAMANG	Calculus	E8	11
310	33	SUJITA THAPA	Calculus	E8	11
311	34	SUMITRA CHAULAGAIN	Calculus	E8	11
312	35	SMRITI TOLANGE	Calculus	E8	11
313	36	SUNITA TOLANGE	Calculus	E8	11
314	37	SWALIN TAMANG	Calculus	E8	11
315	38	UNIK TAMANG	Calculus	E8	11
316	1	AARJU KARKI	Calculus	E9	11
317	2	AAYUSHMA SHRESTHA	Calculus	E9	11
318	3	AJISHA TAMANG	Calculus	E9	11
319	4	AMBIKA TAMANG	Calculus	E9	11
320	5	ANISHA TIMALSINA	Calculus	E9	11
321	6	ASHUTOSH GAUTAM	Calculus	E9	11
322	7	CHADANI GIRI	Calculus	E9	11
323	8	DIPIKA PAKUWAL	Calculus	E9	11
324	9	JEJESH MANANDHAR	Calculus	E9	11
325	10	JENISA SHRESTHA	Calculus	E9	11
326	11	KANCHAN ADHIKARI	Calculus	E9	11
327	12	KRITI TAMANG	Calculus	E9	11
328	13	KUSHAL TIMALSINA	Calculus	E9	11
329	14	LUCKY MANDAL	Calculus	E9	11
330	15	MAUSAMI MOKTAN TAMANG	Calculus	E9	11
331	16	NABIN KUMAR SINGH	Calculus	E9	11
332	17	NISHA THAPA	Calculus	E9	11
333	18	PRAGATI BK	Calculus	E9	11
334	19	PRASHAMSHA THAPA	Calculus	E9	11
335	20	PRISCILLA MANANDHAR	Calculus	E9	11
336	21	RAGINA SHRESTHA	Calculus	E9	11
337	22	REANZEN DONG LAMA	Calculus	E9	11
338	23	RIDIMA MANANDHAR	Calculus	E9	11
339	24	ROHIT TIMALSINA	Calculus	E9	11
340	25	ROJA SHRESTHA	Calculus	E9	11
341	26	ROJASMI BHANDARI	Calculus	E9	11
342	27	SAMAR DAHAL	Calculus	E9	11
343	28	SAMIKSHA PASACHHE	Calculus	E9	11
344	29	SANDHYA KOIRALA	Calculus	E9	11
345	30	SANGE LAMA	Calculus	E9	11
346	31	SHOBANI RANA MAGAR	Calculus	E9	11
347	32	SHREYA GHORASAINE	Calculus	E9	11
348	33	SHRIJA DANGOL	Calculus	E9	11
349	34	SHRISTI BASNET	Calculus	E9	11
350	35	SHUKRIYA THAPA	Calculus	E9	11
351	36	SIKHA KHADKA	Calculus	E9	11
352	37	SITESH KUMAR YADAV	Calculus	E9	11
353	38	SUMINA TAMANG	Calculus	E9	11
354	39	SUPRIYA KHATRI	Calculus	E9	11
355	40	SWORNIM DAHAL	Calculus	E9	11
356	1	AADITYA TIMALSINA	Calculus	E10	11
357	2	AARADHYA RAYAMAJHI	Calculus	E10	11
358	3	AAYUMI THAPA	Calculus	E10	11
359	4	AAYUSHA SAPKOTA	Calculus	E10	11
360	5	ALISHA SUBEDI	Calculus	E10	11
361	6	ANITA MAGAR	Calculus	E10	11
362	7	ANUPAMA BHUJEL	Calculus	E10	11
363	8	ARUSHNA SHRESTHA	Calculus	E10	11
364	9	DEXSANA DONG	Calculus	E10	11
365	10	DIYA SHARMA	Calculus	E10	11
366	11	JUSTIN PAUDEL	Calculus	E10	11
367	12	KRISHA CHAULAGAIN	Calculus	E10	11
368	13	KHUSHI BASNET	Calculus	E10	11
369	14	LAXMI THAPA	Calculus	E10	11
370	15	MANITA SHRESTHA	Calculus	E10	11
371	16	NEHA GAUTAM	Calculus	E10	11
372	17	NISHA TIMALSINA	Calculus	E10	11
373	18	PRAPTI POUDEL	Calculus	E10	11
374	19	PREKSHA KOJU	Calculus	E10	11
375	20	PRINCESS TAMANG	Calculus	E10	11
376	21	PRINSIKA GAUTAM	Calculus	E10	11
377	22	PUJANA DANUWAR	Calculus	E10	11
378	23	PUKAR SATYAL	Calculus	E10	11
379	24	REWATI KHATRI	Calculus	E10	11
380	25	RIHANA SHRESTHA	Calculus	E10	11
381	26	RIYA SHRESTHA	Calculus	E10	11
382	27	SABITA TAMANG	Calculus	E10	11
383	28	SAJINA TAMANG	Calculus	E10	11
384	29	SAMBHAVI SHRESTHA	Calculus	E10	11
385	30	SAMIYA TIMALSINA	Calculus	E10	11
386	31	SANJU HOMEGAIN	Calculus	E10	11
387	32	SAURAV SHRESTHA	Calculus	E10	11
388	33	SHRISTI TAMANG	Calculus	E10	11
389	34	SMRITI SAPKOTA	Calculus	E10	11
390	35	SUJANA BANIYA	Calculus	E10	11
391	36	SUJITA BANIYA	Calculus	E10	11
392	37	UNISHA SHRESTHA	Calculus	E10	11
393	38	UPASHANA SHRESTHA	Calculus	E10	11
394	39	YUNA SHRESTHA	Calculus	E10	11
\.


--
-- Data for Name: teacher_schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher_schedule (id, day, section, room, time_slot, subject, grade) FROM stdin;
1	Sunday	E7	403	11:00-11:45	Calculus	11
2	Sunday	E9	405	11:50-12:35	Calculus	11
3	Sunday	E8	404	2:00-2:40	Calculus	11
4	Sunday	E6	402	2:40-3:20	Calculus	11
5	Monday	E2	303	10:10-11:00	Calculus	11
6	Monday	E8	404	11:50-12:35	Calculus	11
7	Monday	E4	201	12:35-1:20	Calculus	11
8	Monday	E9	405	2:00-2:40	Calculus	11
9	Monday	E5	401	3:25-4:05	Calculus	11
10	Tuesday	E3	304	10:10-11:00	Calculus	11
11	Tuesday	M4	212	11:00-11:45	Algebra	12
12	Tuesday	E4	201	12:35-1:20	Calculus	11
13	Tuesday	E10	301	2:00-2:40	Calculus	11
14	Tuesday	E8	404	2:40-3:20	Calculus	11
15	Tuesday	E6	402	4:05-4:45	Calculus	11
16	Wednesday	E1	302	10:10-11:00	Calculus	11
17	Wednesday	E2	303	11:00-11:45	Calculus	11
18	Wednesday	E10	301	12:35-1:20	Calculus	11
19	Wednesday	E5	401	2:00-2:40	Calculus	11
20	Wednesday	E9	405	2:40-3:20	Calculus	11
21	Wednesday	E7	403	4:05-4:45	Calculus	11
22	Thursday	E6	402	10:10-11:00	Calculus	11
23	Thursday	E1	302	11:00-11:45	Calculus	11
24	Thursday	E2	303	2:00-2:40	Calculus	11
25	Thursday	E3	304	2:40-3:20	Calculus	11
26	Thursday	E5	401	4:05-4:45	Calculus	11
27	Friday	M4	212	10:10-11:00	Algebra	12
28	Friday	E10	301	11:00-11:45	Calculus	11
29	Friday	E7	403	11:50-12:35	Calculus	11
30	Friday	E4	201	12:35-1:20	Calculus	11
31	Friday	E3	304	2:40-3:20	Calculus	11
32	Friday	E1	302	3:25-4:05	Calculus	11
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	Admin	admin@test.com	123456
\.


--
-- Name: assignment_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assignment_results_id_seq', 54, true);


--
-- Name: assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assignments_id_seq', 13, true);


--
-- Name: class_remarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_remarks_id_seq', 39, true);


--
-- Name: student_remarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_remarks_id_seq', 16, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 394, true);


--
-- Name: teacher_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teacher_schedule_id_seq', 32, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: assignment_results assignment_results_assignment_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignment_results
    ADD CONSTRAINT assignment_results_assignment_id_student_id_key UNIQUE (assignment_id, student_id);


--
-- Name: assignment_results assignment_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignment_results
    ADD CONSTRAINT assignment_results_pkey PRIMARY KEY (id);


--
-- Name: assignments assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);


--
-- Name: class_remarks class_remarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_remarks
    ADD CONSTRAINT class_remarks_pkey PRIMARY KEY (id);


--
-- Name: class_remarks class_remarks_schedule_id_class_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_remarks
    ADD CONSTRAINT class_remarks_schedule_id_class_date_key UNIQUE (schedule_id, class_date);


--
-- Name: student_remarks student_remarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_remarks
    ADD CONSTRAINT student_remarks_pkey PRIMARY KEY (id);


--
-- Name: student_remarks student_remarks_schedule_id_class_date_student_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_remarks
    ADD CONSTRAINT student_remarks_schedule_id_class_date_student_id_key UNIQUE (schedule_id, class_date, student_id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: teacher_schedule teacher_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_schedule
    ADD CONSTRAINT teacher_schedule_pkey PRIMARY KEY (id);


--
-- Name: teacher_schedule unique_teacher_schedule; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_schedule
    ADD CONSTRAINT unique_teacher_schedule UNIQUE (day, section, time_slot, subject);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: assignment_results assignment_results_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignment_results
    ADD CONSTRAINT assignment_results_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.assignments(id) ON DELETE CASCADE;


--
-- Name: assignment_results assignment_results_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignment_results
    ADD CONSTRAINT assignment_results_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: class_remarks class_remarks_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_remarks
    ADD CONSTRAINT class_remarks_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.teacher_schedule(id);


--
-- Name: student_remarks student_remarks_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_remarks
    ADD CONSTRAINT student_remarks_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.teacher_schedule(id);


--
-- Name: student_remarks student_remarks_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_remarks
    ADD CONSTRAINT student_remarks_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- PostgreSQL database dump complete
--

