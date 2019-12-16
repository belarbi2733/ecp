PGDMP     !            	        w            ECP    12.0    12.0 -    t           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            u           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            v           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            w           1262    16948    ECP    DATABASE     c   CREATE DATABASE "ECP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE "ECP";
                postgres    false            �            1259    18573    colis    TABLE     �   CREATE TABLE public.colis (
    id integer NOT NULL,
    id_user integer,
    nom character varying(20),
    statut boolean,
    descr character varying(100),
    poids integer,
    dimension character varying(20)
);
    DROP TABLE public.colis;
       public         heap    postgres    false            �            1259    18571    colis_id_seq    SEQUENCE     �   CREATE SEQUENCE public.colis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.colis_id_seq;
       public          postgres    false    209            x           0    0    colis_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.colis_id_seq OWNED BY public.colis.id;
          public          postgres    false    208            �            1259    18560    tournee    TABLE        CREATE TABLE public.tournee (
    id integer NOT NULL,
    id_voiture integer,
    depart_x double precision,
    depart_y double precision,
    arrivee_x double precision,
    arrivee_y double precision,
    duree integer,
    distance integer,
    heure_depart character varying(20)
);
    DROP TABLE public.tournee;
       public         heap    postgres    false            �            1259    18558    tournee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tournee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.tournee_id_seq;
       public          postgres    false    207            y           0    0    tournee_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.tournee_id_seq OWNED BY public.tournee.id;
          public          postgres    false    206            �            1259    18586    trajet    TABLE     �  CREATE TABLE public.trajet (
    id integer NOT NULL,
    id_user integer,
    id_colis integer,
    departure_time character varying(30),
    distance integer,
    prix character varying(20),
    depart_address character varying(100),
    arrivee_address character varying(100),
    depart_x double precision,
    depart_y double precision,
    arrivee_x double precision,
    arrivee_y double precision,
    statut boolean,
    book_places integer,
    id_tournee integer
);
    DROP TABLE public.trajet;
       public         heap    postgres    false            �            1259    18584    trajet_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trajet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.trajet_id_seq;
       public          postgres    false    211            z           0    0    trajet_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.trajet_id_seq OWNED BY public.trajet.id;
          public          postgres    false    210            �            1259    18536    utilisateur    TABLE     �  CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    nom character varying(30),
    prenom character varying(30),
    mail character varying(50),
    password character varying(100),
    statut integer,
    telephone character varying(15),
    sexe character varying(10),
    date_naiss character varying(20),
    descr character varying(250),
    note real,
    pref_animaux integer,
    pref_fumer boolean
);
    DROP TABLE public.utilisateur;
       public         heap    postgres    false            �            1259    18534    utilisateur_id_seq    SEQUENCE     �   CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.utilisateur_id_seq;
       public          postgres    false    203            {           0    0    utilisateur_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;
          public          postgres    false    202            �            1259    18547    voiture    TABLE     �   CREATE TABLE public.voiture (
    id integer NOT NULL,
    id_user integer,
    nom_marque character varying(50),
    nom_modele character varying(50),
    nbre_places integer,
    immatriculation character varying(20),
    coffre integer
);
    DROP TABLE public.voiture;
       public         heap    postgres    false            �            1259    18545    voiture_id_seq    SEQUENCE     �   CREATE SEQUENCE public.voiture_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.voiture_id_seq;
       public          postgres    false    205            |           0    0    voiture_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.voiture_id_seq OWNED BY public.voiture.id;
          public          postgres    false    204            �           2604    18576    colis id    DEFAULT     d   ALTER TABLE ONLY public.colis ALTER COLUMN id SET DEFAULT nextval('public.colis_id_seq'::regclass);
 7   ALTER TABLE public.colis ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �           2604    18563 
   tournee id    DEFAULT     h   ALTER TABLE ONLY public.tournee ALTER COLUMN id SET DEFAULT nextval('public.tournee_id_seq'::regclass);
 9   ALTER TABLE public.tournee ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �           2604    18589 	   trajet id    DEFAULT     f   ALTER TABLE ONLY public.trajet ALTER COLUMN id SET DEFAULT nextval('public.trajet_id_seq'::regclass);
 8   ALTER TABLE public.trajet ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �           2604    18539    utilisateur id    DEFAULT     p   ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);
 =   ALTER TABLE public.utilisateur ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            �           2604    18550 
   voiture id    DEFAULT     h   ALTER TABLE ONLY public.voiture ALTER COLUMN id SET DEFAULT nextval('public.voiture_id_seq'::regclass);
 9   ALTER TABLE public.voiture ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            o          0    18573    colis 
   TABLE DATA           R   COPY public.colis (id, id_user, nom, statut, descr, poids, dimension) FROM stdin;
    public          postgres    false    209   �5       m          0    18560    tournee 
   TABLE DATA           z   COPY public.tournee (id, id_voiture, depart_x, depart_y, arrivee_x, arrivee_y, duree, distance, heure_depart) FROM stdin;
    public          postgres    false    207   �5       q          0    18586    trajet 
   TABLE DATA           �   COPY public.trajet (id, id_user, id_colis, departure_time, distance, prix, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, book_places, id_tournee) FROM stdin;
    public          postgres    false    211   6       i          0    18536    utilisateur 
   TABLE DATA           �   COPY public.utilisateur (id, nom, prenom, mail, password, statut, telephone, sexe, date_naiss, descr, note, pref_animaux, pref_fumer) FROM stdin;
    public          postgres    false    203   6       k          0    18547    voiture 
   TABLE DATA           l   COPY public.voiture (id, id_user, nom_marque, nom_modele, nbre_places, immatriculation, coffre) FROM stdin;
    public          postgres    false    205   ;6       }           0    0    colis_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.colis_id_seq', 1, false);
          public          postgres    false    208            ~           0    0    tournee_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.tournee_id_seq', 1, false);
          public          postgres    false    206                       0    0    trajet_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.trajet_id_seq', 1, false);
          public          postgres    false    210            �           0    0    utilisateur_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.utilisateur_id_seq', 1, false);
          public          postgres    false    202            �           0    0    voiture_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.voiture_id_seq', 1, false);
          public          postgres    false    204            �           2606    18578    colis colis_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.colis
    ADD CONSTRAINT colis_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.colis DROP CONSTRAINT colis_pkey;
       public            postgres    false    209            �           2606    18565    tournee tournee_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.tournee
    ADD CONSTRAINT tournee_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.tournee DROP CONSTRAINT tournee_pkey;
       public            postgres    false    207            �           2606    18591    trajet trajet_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_pkey;
       public            postgres    false    211            �           2606    18544    utilisateur utilisateur_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.utilisateur DROP CONSTRAINT utilisateur_pkey;
       public            postgres    false    203            �           2606    18552    voiture voiture_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.voiture
    ADD CONSTRAINT voiture_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.voiture DROP CONSTRAINT voiture_pkey;
       public            postgres    false    205            �           2606    18579    colis colis_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.colis
    ADD CONSTRAINT colis_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.colis DROP CONSTRAINT colis_id_user_fkey;
       public          postgres    false    3035    209    203            �           2606    18566    tournee tournee_id_voiture_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tournee
    ADD CONSTRAINT tournee_id_voiture_fkey FOREIGN KEY (id_voiture) REFERENCES public.voiture(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.tournee DROP CONSTRAINT tournee_id_voiture_fkey;
       public          postgres    false    207    205    3037            �           2606    18597    trajet trajet_id_colis_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_colis_fkey FOREIGN KEY (id_colis) REFERENCES public.colis(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_colis_fkey;
       public          postgres    false    211    3041    209            �           2606    18602    trajet trajet_id_tournee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_tournee_fkey FOREIGN KEY (id_tournee) REFERENCES public.tournee(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_tournee_fkey;
       public          postgres    false    211    207    3039            �           2606    18592    trajet trajet_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_user_fkey;
       public          postgres    false    211    203    3035            �           2606    18553    voiture voiture_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.voiture
    ADD CONSTRAINT voiture_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.voiture DROP CONSTRAINT voiture_id_user_fkey;
       public          postgres    false    3035    205    203            o      x������ � �      m      x������ � �      q      x������ � �      i      x������ � �      k      x������ � �     