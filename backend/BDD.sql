PGDMP     	    
                w            ECP    12.1    12.1 8    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    27450    ECP    DATABASE     c   CREATE DATABASE "ECP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE "ECP";
                postgres    false            �            1259    27804    colis    TABLE     �   CREATE TABLE public.colis (
    id integer NOT NULL,
    id_user integer,
    nom character varying(20),
    descr character varying(100),
    poids integer,
    volume integer
);
    DROP TABLE public.colis;
       public         heap    postgres    false            �            1259    27802    colis_id_seq    SEQUENCE     �   CREATE SEQUENCE public.colis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.colis_id_seq;
       public          postgres    false    209            �           0    0    colis_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.colis_id_seq OWNED BY public.colis.id;
          public          postgres    false    208            �            1259    27838 
   itineraire    TABLE     �   CREATE TABLE public.itineraire (
    id_tournee integer,
    id_trajet integer,
    indice integer,
    point_long double precision,
    point_lat double precision
);
    DROP TABLE public.itineraire;
       public         heap    postgres    false            �            1259    27856 
   messagerie    TABLE     u   CREATE TABLE public.messagerie (
    id_tournee integer,
    nom_room character varying(100),
    id_user integer
);
    DROP TABLE public.messagerie;
       public         heap    postgres    false            �            1259    27851    statistiques    TABLE       CREATE TABLE public.statistiques (
    date date NOT NULL,
    nbre_users integer,
    nbre_colis integer,
    nbre_traj integer,
    nbre_tourn integer,
    nbre_cond integer,
    nbre_colis_livr integer,
    nbre_traj_effec integer,
    nbre_tourn_effec integer
);
     DROP TABLE public.statistiques;
       public         heap    postgres    false            �            1259    27791    tournee    TABLE     �  CREATE TABLE public.tournee (
    id integer NOT NULL,
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
       public         heap    postgres    false            �            1259    27789    tournee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tournee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.tournee_id_seq;
       public          postgres    false    207            �           0    0    tournee_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.tournee_id_seq OWNED BY public.tournee.id;
          public          postgres    false    206            �            1259    27817    trajet    TABLE     �  CREATE TABLE public.trajet (
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
    statut integer,
    book_places integer,
    code character(10),
    id_tournee integer
);
    DROP TABLE public.trajet;
       public         heap    postgres    false            �            1259    27815    trajet_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trajet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.trajet_id_seq;
       public          postgres    false    211            �           0    0    trajet_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.trajet_id_seq OWNED BY public.trajet.id;
          public          postgres    false    210            �            1259    27767    utilisateur    TABLE     3  CREATE TABLE public.utilisateur (
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
    photo character varying(50),
    avr_rating double precision,
    nbr_ratings integer,
    pref_animaux integer,
    pref_fumer boolean,
    position_lat character varying(225),
    position_long character varying(225)
);
    DROP TABLE public.utilisateur;
       public         heap    postgres    false            �            1259    27765    utilisateur_id_seq    SEQUENCE     �   CREATE SEQUENCE public.utilisateur_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.utilisateur_id_seq;
       public          postgres    false    203            �           0    0    utilisateur_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.utilisateur_id_seq OWNED BY public.utilisateur.id;
          public          postgres    false    202            �            1259    27778    voiture    TABLE     �   CREATE TABLE public.voiture (
    id integer NOT NULL,
    id_user integer,
    nom_marque character varying(50),
    nom_modele character varying(50),
    nbre_places integer,
    immatriculation character varying(20),
    coffre integer
);
    DROP TABLE public.voiture;
       public         heap    postgres    false            �            1259    27776    voiture_id_seq    SEQUENCE     �   CREATE SEQUENCE public.voiture_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.voiture_id_seq;
       public          postgres    false    205            �           0    0    voiture_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.voiture_id_seq OWNED BY public.voiture.id;
          public          postgres    false    204            �           2604    27807    colis id    DEFAULT     d   ALTER TABLE ONLY public.colis ALTER COLUMN id SET DEFAULT nextval('public.colis_id_seq'::regclass);
 7   ALTER TABLE public.colis ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �           2604    27794 
   tournee id    DEFAULT     h   ALTER TABLE ONLY public.tournee ALTER COLUMN id SET DEFAULT nextval('public.tournee_id_seq'::regclass);
 9   ALTER TABLE public.tournee ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �           2604    27820 	   trajet id    DEFAULT     f   ALTER TABLE ONLY public.trajet ALTER COLUMN id SET DEFAULT nextval('public.trajet_id_seq'::regclass);
 8   ALTER TABLE public.trajet ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �           2604    27770    utilisateur id    DEFAULT     p   ALTER TABLE ONLY public.utilisateur ALTER COLUMN id SET DEFAULT nextval('public.utilisateur_id_seq'::regclass);
 =   ALTER TABLE public.utilisateur ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            �           2604    27781 
   voiture id    DEFAULT     h   ALTER TABLE ONLY public.voiture ALTER COLUMN id SET DEFAULT nextval('public.voiture_id_seq'::regclass);
 9   ALTER TABLE public.voiture ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �          0    27804    colis 
   TABLE DATA           G   COPY public.colis (id, id_user, nom, descr, poids, volume) FROM stdin;
    public          postgres    false    209   �E       �          0    27838 
   itineraire 
   TABLE DATA           Z   COPY public.itineraire (id_tournee, id_trajet, indice, point_long, point_lat) FROM stdin;
    public          postgres    false    212   F       �          0    27856 
   messagerie 
   TABLE DATA           C   COPY public.messagerie (id_tournee, nom_room, id_user) FROM stdin;
    public          postgres    false    214   �F       �          0    27851    statistiques 
   TABLE DATA           �   COPY public.statistiques (date, nbre_users, nbre_colis, nbre_traj, nbre_tourn, nbre_cond, nbre_colis_livr, nbre_traj_effec, nbre_tourn_effec) FROM stdin;
    public          postgres    false    213   �F                 0    27791    tournee 
   TABLE DATA           �   COPY public.tournee (id, id_voiture, statut, depart_adresse, arrivee_adresse, depart_x, depart_y, arrivee_x, arrivee_y, duree, distance, heure_depart) FROM stdin;
    public          postgres    false    207   �F       �          0    27817    trajet 
   TABLE DATA           �   COPY public.trajet (id, id_user, id_colis, departure_time, distance, prix, depart_address, arrivee_address, depart_x, depart_y, arrivee_x, arrivee_y, statut, book_places, code, id_tournee) FROM stdin;
    public          postgres    false    211   pG       {          0    27767    utilisateur 
   TABLE DATA           �   COPY public.utilisateur (id, nom, prenom, mail, password, statut, telephone, sexe, date_naiss, descr, photo, avr_rating, nbr_ratings, pref_animaux, pref_fumer, position_lat, position_long) FROM stdin;
    public          postgres    false    203   H       }          0    27778    voiture 
   TABLE DATA           l   COPY public.voiture (id, id_user, nom_marque, nom_modele, nbre_places, immatriculation, coffre) FROM stdin;
    public          postgres    false    205   DH       �           0    0    colis_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.colis_id_seq', 1, false);
          public          postgres    false    208            �           0    0    tournee_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tournee_id_seq', 3, true);
          public          postgres    false    206            �           0    0    trajet_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.trajet_id_seq', 2, true);
          public          postgres    false    210            �           0    0    utilisateur_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.utilisateur_id_seq', 1, true);
          public          postgres    false    202            �           0    0    voiture_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.voiture_id_seq', 3, true);
          public          postgres    false    204            �           2606    27809    colis colis_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.colis
    ADD CONSTRAINT colis_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.colis DROP CONSTRAINT colis_pkey;
       public            postgres    false    209            �           2606    27855    statistiques statistiques_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.statistiques
    ADD CONSTRAINT statistiques_pkey PRIMARY KEY (date);
 H   ALTER TABLE ONLY public.statistiques DROP CONSTRAINT statistiques_pkey;
       public            postgres    false    213            �           2606    27796    tournee tournee_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.tournee
    ADD CONSTRAINT tournee_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.tournee DROP CONSTRAINT tournee_pkey;
       public            postgres    false    207            �           2606    27822    trajet trajet_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_pkey;
       public            postgres    false    211            �           2606    27775    utilisateur utilisateur_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.utilisateur DROP CONSTRAINT utilisateur_pkey;
       public            postgres    false    203            �           2606    27783    voiture voiture_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.voiture
    ADD CONSTRAINT voiture_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.voiture DROP CONSTRAINT voiture_pkey;
       public            postgres    false    205            �           2606    27810    colis colis_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.colis
    ADD CONSTRAINT colis_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.colis DROP CONSTRAINT colis_id_user_fkey;
       public          postgres    false    203    209    3047            �           2606    27841 %   itineraire itineraire_id_tournee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.itineraire
    ADD CONSTRAINT itineraire_id_tournee_fkey FOREIGN KEY (id_tournee) REFERENCES public.tournee(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.itineraire DROP CONSTRAINT itineraire_id_tournee_fkey;
       public          postgres    false    3051    207    212            �           2606    27846 $   itineraire itineraire_id_trajet_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.itineraire
    ADD CONSTRAINT itineraire_id_trajet_fkey FOREIGN KEY (id_trajet) REFERENCES public.trajet(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.itineraire DROP CONSTRAINT itineraire_id_trajet_fkey;
       public          postgres    false    211    212    3055            �           2606    27859 %   messagerie messagerie_id_tournee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_id_tournee_fkey FOREIGN KEY (id_tournee) REFERENCES public.tournee(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.messagerie DROP CONSTRAINT messagerie_id_tournee_fkey;
       public          postgres    false    207    214    3051            �           2606    27864 "   messagerie messagerie_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messagerie
    ADD CONSTRAINT messagerie_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.messagerie DROP CONSTRAINT messagerie_id_user_fkey;
       public          postgres    false    203    214    3047            �           2606    27797    tournee tournee_id_voiture_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tournee
    ADD CONSTRAINT tournee_id_voiture_fkey FOREIGN KEY (id_voiture) REFERENCES public.voiture(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.tournee DROP CONSTRAINT tournee_id_voiture_fkey;
       public          postgres    false    207    3049    205            �           2606    27828    trajet trajet_id_colis_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_colis_fkey FOREIGN KEY (id_colis) REFERENCES public.colis(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_colis_fkey;
       public          postgres    false    209    211    3053            �           2606    27833    trajet trajet_id_tournee_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_tournee_fkey FOREIGN KEY (id_tournee) REFERENCES public.tournee(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_tournee_fkey;
       public          postgres    false    211    207    3051            �           2606    27823    trajet trajet_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trajet
    ADD CONSTRAINT trajet_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.trajet DROP CONSTRAINT trajet_id_user_fkey;
       public          postgres    false    203    211    3047            �           2606    27784    voiture voiture_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.voiture
    ADD CONSTRAINT voiture_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.utilisateur(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.voiture DROP CONSTRAINT voiture_id_user_fkey;
       public          postgres    false    3047    205    203            �      x������ � �      �   g   x�uλ�0C��&'��|�`�����
�}�tM�CL���I��j+����Od�$$J톸s��V]ۍdH�*6p8��
��9�9�9�7��wU� 'GE�      �      x������ � �      �      x������ � �         �   x�����0���StW���P��ः8�4�HJ��Vc�r�\�����3���΅�*�~��i��g(�Ս��B����
�^������ �d���tK�E�!�)��ʹK���apq
1sonS�Z�����/�R7j�U��+�M�WB�7[uY�      �   �   x�͎�� ���)ص��E�:8�`�%�P����_�������?�4��Hw�o�#ሸC��Y�L��� 'ӧ;�u�a/-"�sN\K��"�/�rL��u)��5��r|�60������7�+���=z놪dڢ��v������2OC      {      x�3���D�$N(7����� +5	      }   )   x�3�4��/H��t�/*N��!cS.#\Ƹ$b���� ��     