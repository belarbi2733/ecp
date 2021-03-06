PGDMP         &                 x            ECP    12.1    12.1 B    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    27450    ECP    DATABASE     c   CREATE DATABASE "ECP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE "ECP";
                postgres    false            �            1259    28844    colis    TABLE     �   CREATE TABLE public.colis (
    id integer NOT NULL,
    id_user integer,
    nom_colis character varying(20),
    volume integer
);
    DROP TABLE public.colis;
       public         heap    postgres    false            �            1259    28842    colis_id_seq    SEQUENCE     �   CREATE SEQUENCE public.colis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.colis_id_seq;
       public          postgres    false    209            �           0    0    colis_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.colis_id_seq OWNED BY public.colis.id;
          public          postgres    false    208            �            1259    28881 
   itineraire    TABLE     �   CREATE TABLE public.itineraire (
    id_tournee integer,
    id_trajet integer,
    indice integer,
    point_long double precision,
    point_lat double precision
);
    DROP TABLE public.itineraire;
       public         heap    postgres    false            �            1259    28904    message    TABLE     �   CREATE TABLE public.message (
    id integer NOT NULL,
    id_user integer,
    message text,
    id_tournee integer,
    message_date date,
    message_time time without time zone
);
    DROP TABLE public.message;
       public         heap    postgres    false            �            1259    28902    message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.message_id_seq;
       public          postgres    false    216            �           0    0    message_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;
          public          postgres    false    215            �            1259    28896    statistiques    TABLE     (  CREATE TABLE public.statistiques (
    id integer NOT NULL,
    nbre_users integer,
    nbre_colis integer,
    nbre_trajet integer,
    nbre_tournee integer,
    nbre_cond integer,
    nbre_colis_livr integer,
    nbre_traj_effec integer,
    nbre_tourn_effec integer,
    date date NOT NULL
);
     DROP TABLE public.statistiques;
       public         heap    postgres    false            �            1259    28894    statistiques_id_seq    SEQUENCE     �   CREATE SEQUENCE public.statistiques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.statistiques_id_seq;
       public          postgres    false    214            �           0    0    statistiques_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.statistiques_id_seq OWNED BY public.statistiques.id;
          public          postgres    false    213            �            1259    28826    tournee    TABLE     �  CREATE TABLE public.tournee (
    id integer NOT NULL,
    id_user integer,
    id_voiture integer,
    statut integer,
    depart_adresse character varying(100),
    arrivee_adresse character varying(100),
    depart_x double precision,
    depart_y double precision,
    arrivee_x double precision,
    arrivee_y double precision,
    duree integer,
    distance integer,
    heure_depart character varying(50)
);
    DROP TABLE public.tournee;
       public         heap    postgres    false            �            1259    28824    tournee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tournee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.tournee_id_seq;
       public          postgres    false    207            �           0    0    tournee_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.tournee_id_seq OWNED BY public.tournee.id;
          public          postgres    false    206            �            1259    28857    trajet    TABLE       CREATE TABLE public.trajet (
    id integer NOT NULL,
    id_user integer,
    id_colis integer,
    departure_time character varying(30),
    distance integer,
    prix double precision,
    depart_address character varying(100),
    arrivee_address character varying(100),
    depart_x double precision,
    depart_y double precision,
    arrivee_x double precision,
    arrivee_y double precision,
    statut integer,
    book_places integer,
    code character(10),
    comment character varying(250),
    id_tournee integer
);
    DROP TABLE public.trajet;
       public         heap    postgres    false            �            1259    28855    trajet_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trajet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.trajet_id_seq;
       public          postgres    false    211            �           0    0    trajet_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.trajet_id_seq OWNED BY public.trajet.id;
          public          postgres    false    210            �            1259    28802    utilisateur    TABLE     V  CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    nom character varying(30),
    prenom character varying(30),
    mail character varying(50),
    password character varying(100),
    statut integer,
    telephone character varying(15),
    sexe character varying(10),
    date_naiss date,
    descr character varying(250),
    paypal character varying(100),
    photo character varying(50),
    avr_rating double precision,
    nbr_ratings integer,
    pref_animaux integer,
    pref_fumer boolean,
    position_lat character varying(225),
    position_long character varying(225)
);
    DROP TABLE public.utilisateur;
       public         heap    postgres    false            �            1259    28800    utilisateur_id_seq    SEQUENCE     �   CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.utilisateur_id_seq;
       public          postgres    false    203            �           0    0    utilisateur_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;
          public          postgres    false    202            �            1259    28813    voiture    TABLE     �   CREATE TABLE public.voiture (
    id integer NOT NULL,
    id_user integer,
    nom_marque character varying(50),
    nom_modele character varying(50),
    nbre_places integer,
    immatriculation character varying(20),
    coffre integer
);
    DROP TABLE public.voiture;
       public         heap    postgres    false            �            1259    28811    voiture_id_seq    SEQUENCE     �   CREATE SEQUENCE public.voiture_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.voiture_id_seq;
       public          postgres    false    205            �           0    0    voiture_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.voiture_id_seq OWNED BY public.voiture.id;
          public          postgres    false    204            �           2604    28847    colis id    DEFAULT     d   ALTER TABLE ONLY public.colis ALTER COLUMN id SET DEFAULT nextval('public.colis_id_seq'::regclass);
 7   ALTER TABLE public.colis ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �           2604    28907 
   message id    DEFAULT     h   ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);
 9   ALTER TABLE public.message ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    28899    statistiques id    DEFAULT     r   ALTER TABLE ONLY public.statistiques ALTER COLUMN id SET DEFAULT nextval('public.statistiques_id_seq'::regclass);
 >   ALTER TABLE public.statistiques ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            �           2604    28829 
   tournee id    DEFAULT     h   ALTER TABLE ONLY public.tournee ALTER COLUMN id SET DEFAULT nextval('public.tournee_id_seq'::regclass);
 9   ALTER TABLE public.tournee ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �           2604    28860 	   trajet id    DEFAULT     f   ALTER TABLE ONLY public.trajet ALTER COLUMN id SET DEFAULT nextval('public.trajet_id_seq'::regclass);
 8   ALTER TABLE public.trajet ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            �           2604    28805    utilisateur id    DEFAULT     p   ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);
 =   ALTER TABLE public.utilisateur ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �           2604    28816 
   voiture id    DEFAULT     h   ALTER TABLE ONLY public.voiture ALTER COLUMN id SET DEFAULT nextval('public.voiture_id_seq'::regclass);
 9   ALTER TABLE public.voiture ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �          0    28844    colis 
   TABLE DATA           ?   COPY public.colis (id, id_user, nom_colis, volume) FROM stdin;
    public          postgres    false    209   �Q       �          0    28881 
   itineraire 
   TABLE DATA           Z   COPY public.itineraire (id_tournee, id_trajet, indice, point_long, point_lat) FROM stdin;
    public          postgres    false    212   �Q       �          0    28904    message 
   TABLE DATA           _   COPY public.message (id, id_user, message, id_tournee, message_date, message_time) FROM stdin;
    public          postgres    false    216   �Q       �          0    28896    statistiques 
   TABLE DATA           �   COPY public.statistiques (id, nbre_users, nbre_colis, nbre_trajet, nbre_tournee, nbre_cond, nbre_colis_livr, nbre_traj_effec, nbre_tourn_effec, date) FROM stdin;
    public          postgres    false    214   R       �          0    28826    tournee 
   TABLE DATA           �   COPY public.tournee (id, id_user, id_voiture, statut, depart_adresse, arrivee_adresse, depart_x, depart_y, arrivee_x, arrivee_y, duree, distance, heure_depart) FROM stdin;
    public          postgres    false    207   .R       �          0    28857    trajet 
   TABLE DATA           �   COPY public.trajet (id, id_user, id_colis, departure_time, distance, prix, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, book_places, code, comment, id_tournee) FROM stdin;
    public          postgres    false    211   KR       �          0    28802    utilisateur 
   TABLE DATA           �   COPY public.utilisateur (id, nom, prenom, mail, password, statut, telephone, sexe, date_naiss, descr, paypal, photo, avr_rating, nbr_ratings, pref_animaux, pref_fumer, position_lat, position_long) FROM stdin;
    public          postgres    false    203   hR       �          0    28813    voiture 
   TABLE DATA           l   COPY public.voiture (id, id_user, nom_marque, nom_modele, nbre_places, immatriculation, coffre) FROM stdin;
    public          postgres    false    205   �R       �           0    0    colis_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.colis_id_seq', 1, false);
          public          postgres    false    208            �           0    0    message_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.message_id_seq', 1, false);
          public          postgres    false    215            �           0    0    statistiques_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.statistiques_id_seq', 1, false);
          public          postgres    false    213            �           0    0    tournee_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.tournee_id_seq', 1, false);
          public          postgres    false    206            �           0    0    trajet_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.trajet_id_seq', 1, false);
          public          postgres    false    210            �           0    0    utilisateur_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.utilisateur_id_seq', 1, false);
          public          postgres    false    202            �           0    0    voiture_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.voiture_id_seq', 1, false);
          public          postgres    false    204            �           2606    28849    colis colis_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.colis
    ADD CONSTRAINT colis_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.colis DROP CONSTRAINT colis_pkey;
       public            postgres    false    209            �           2606    28912    message message_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public            postgres    false    216            �           2606    28901    statistiques statistiques_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.statistiques
    ADD CONSTRAINT statistiques_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.statistiques DROP CONSTRAINT statistiques_pkey;
       public            postgres    false    214            �           2606    28831    tournee tournee_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.tournee
    ADD CONSTRAINT tournee_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.tournee DROP CONSTRAINT tournee_pkey;
       public            postgres    false    207            �           2606    28865    trajet trajet_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_pkey;
       public            postgres    false    211            �           2606    28810    utilisateur utilisateur_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.utilisateur DROP CONSTRAINT utilisateur_pkey;
       public            postgres    false    203            �           2606    28818    voiture voiture_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.voiture
    ADD CONSTRAINT voiture_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.voiture DROP CONSTRAINT voiture_pkey;
       public            postgres    false    205            �           2606    28850    colis colis_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.colis
    ADD CONSTRAINT colis_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.colis DROP CONSTRAINT colis_id_user_fkey;
       public          postgres    false    3055    203    209                       2606    28884 %   itineraire itineraire_id_tournee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.itineraire
    ADD CONSTRAINT itineraire_id_tournee_fkey FOREIGN KEY (id_tournee) REFERENCES public.tournee(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.itineraire DROP CONSTRAINT itineraire_id_tournee_fkey;
       public          postgres    false    207    3059    212                       2606    28889 $   itineraire itineraire_id_trajet_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.itineraire
    ADD CONSTRAINT itineraire_id_trajet_fkey FOREIGN KEY (id_trajet) REFERENCES public.trajet(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.itineraire DROP CONSTRAINT itineraire_id_trajet_fkey;
       public          postgres    false    3063    211    212                       2606    28918    message message_id_tournee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_id_tournee_fkey FOREIGN KEY (id_tournee) REFERENCES public.tournee(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.message DROP CONSTRAINT message_id_tournee_fkey;
       public          postgres    false    3059    216    207                       2606    28913    message message_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.message DROP CONSTRAINT message_id_user_fkey;
       public          postgres    false    216    3055    203            �           2606    28832    tournee tournee_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tournee
    ADD CONSTRAINT tournee_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.tournee DROP CONSTRAINT tournee_id_user_fkey;
       public          postgres    false    207    3055    203            �           2606    28837    tournee tournee_id_voiture_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tournee
    ADD CONSTRAINT tournee_id_voiture_fkey FOREIGN KEY (id_voiture) REFERENCES public.voiture(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.tournee DROP CONSTRAINT tournee_id_voiture_fkey;
       public          postgres    false    205    3057    207                       2606    28871    trajet trajet_id_colis_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_colis_fkey FOREIGN KEY (id_colis) REFERENCES public.colis(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_colis_fkey;
       public          postgres    false    211    209    3061                       2606    28876    trajet trajet_id_tournee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_tournee_fkey FOREIGN KEY (id_tournee) REFERENCES public.tournee(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_tournee_fkey;
       public          postgres    false    207    211    3059                        2606    28866    trajet trajet_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_user_fkey;
       public          postgres    false    203    211    3055            �           2606    28819    voiture voiture_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.voiture
    ADD CONSTRAINT voiture_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.voiture DROP CONSTRAINT voiture_id_user_fkey;
       public          postgres    false    205    3055    203            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     