# Felhasználói Útmutató (Admin/Könyvtáros felület)

Az E-Könyvtár alkalmazás használatának bemutatása

![Kezdőlap](./public/user_manual_images/e_konyvtar_kezdolap.jpeg "kezdőlap")

## Könyvek

### Listázás

![Könyv lista](./public/user_manual_images/e_konyvtar_konyvek.jpeg "könyv lista")

1. Breadcrumb navigációs menü (a kezdőlap kivételével minden oldalon megtalálható)

2. Keresés - gépelésnél autómatikusan frissíti a listát a találatok szerint

3. A találatok adatainak táblázatos megjelenítése

4. Váltás a találati oldalak között, oldalanként tíz találat kerül megjelenítésre

5. Új könyv adatainak felvétele

6. Navigációs gombok (vissza, előre), funkcionalitásban a böngészö hasonló gombjaival egyeznek meg, kivéve ha nincs elözmény a könyvtár alkalmazásban, ilyenkor a "vissza" gombra kattintva a kezdőlapra visz

7. Műveletek az adott könyvvel:
    - adatlap 
    - pédányok 
    - szerkesztés 
    - törlés

---
### Adatlap

![Könyv adatlap](./public/user_manual_images/e_konyvtar_konyvek_adatlap.jpeg "könyv adatlap")

1. A kiválasztott könyv adatai és leírása

2. Műveletek: 
    - az adott könyvhöz tartozó példányok megjelenítése 
    - szerkesztés
    - törlés

3. Új, az adott könyvhöz tartozó példány adatainak felvétele

---
### Új könyv felvétele/meglévő szerkesztése

![Új könyv felvétele](./public/user_manual_images/e_konyvtar_konyv_uj.jpeg "új könyv felvétele")  ![Könyv szerkesztése](./public/user_manual_images/e_konyvtar_konyv_szerkesztes.jpeg "könyv szerkesztése")

1. Csak a 13 számjegyű verzíó elfogadott

2. A kiadás éve

3. A könyv rövid leírása, pl.: formátum, tartalom

4. Lenyíló listák nyelv, szerző, műfaj választásához

5. Mentés

Hibás adatok esetén a felület visszajelzést kűld a hiba okáról:

- kliens oldalról:

![Frontend validáció](./public/user_manual_images/e_konyvtar_frontend_validacio.jpg "kliens oldali validáció")

- szerver oldalról (ha a kliens oldali ellenőrzés nem szri ki a hibát):

![Backend validáció](./public/user_manual_images/e_konyvtar_szerver_toast_visszajelzes_sikertelen.jpg "szerver oldali validáció")

Sikeres mentés esetén az alábbi üzenet jelenik meg:

![Sikeres mentés](./public/user_manual_images/e_konyvtar_szerver_toast_visszajelzes.jpg "sikeres mentés")

Hasonló visszajelzéseket kapunk más adatok(pl.: példányok, olvasók) megadásakor/szerkesztésekor is.

---
### Törlés

![Törlés](./public/user_manual_images/e_konyvtar_torles.jpeg "törlés")

A kiválasztott könyv törlése.

Hasonló párbeszéd felület jelenik meg más adatok(pl.: példányok, olvasók) törlésekor is.

---
## Nyelvek, szerzők, műfajok

### Listázás

![Nyelvek/szerzők/műfajok](./public/user_manual_images/e_konyvtar_nyelvek.jpeg "nyelvek/szerzők/műfajok")

1. Szerkesztés, törlés

2. Új nyelv/szerző/műfaj hozzáadása

---
### Szerkesztés

![Szerkesztés](./public/user_manual_images/e_konyvtar_nyelvek_szerk.jpeg "szerkesztés")

---
## Példányok

A könyv listában, vagy az adatlapon a "példányok" gombra kattintva az alábbi felület jelenik meg:

![Példányok](./public/user_manual_images/e_konyvtar_konyv_peldanyok.jpeg "példányok")

1. Csak a kiválasztott könyvhöz tartozó példányok jelennek meg a táblázatban

2. Ha az adott példány ki van kölcsönözve, a megjelenő linkre kattintva elérhetőek a hozzá tartozó kölcsönzés adatai

3. Példány szerkesztésére, törlésére szolgáló gombok

---
### Adatlap

![Adatlap](./public/user_manual_images/e_konyvtar_konyv_peldany_adatlap.jpeg "példány adatlap")

1. Példány adatok

2. Példányhoz tartozó könyv adatlapjának megnyitása

---
### Új példány felvétele/meglévő szerkesztése

Új példány felvétele a korábban leírtak szerint az adott könyv adatlapján lehetséges.

Szerkesztésre az alábbi felület szolgál:

![Példány szerkesztése](./public/user_manual_images/e_konyvtar_konyv_peldany_szerk.jpeg "példány szerkesztése")

A könyv id előre megadásra kerűl, nem szerkeszthető!

---
## Olvasók

### Listázás

![Olvasó lista](./public/user_manual_images/e_konyvtar_olvasok.jpeg "olvasó lista")

1. Keresés, könyveknél látotthoz hasonlóan működik, a lista autómatikus frissítésével

2. Kilistázott olvasók adatainak táblázatos megjelenítése

3. Műveletek:

    - adatlap
    - az adott olvasó kölcsönzései
    - szerkesztés
    - törlés

4. Új olvasó felvétele

---
### Adatlap

![Olvasó adatlap](./public/user_manual_images/e_konyvtar_olvaso_adatlap.jpeg "olvasó adatlap")

1. olvasói adatok

2. kölcsönzések

    - meglévők listázása
    - új kölcsönzés felvétele

3. Szerkesztés, törlés

---
### Új olvasó felvétele/meglévő szerkesztése

![Új olvasó](./public/user_manual_images/e_konyvtar_olvaso_uj.jpeg "új olvasó") ![Olvasó szerkesztése](./public/user_manual_images/e_konyvtar_olvaso_szerk.jpeg "olvasó szerkesztése")

Új olvasó felvételekor a kártyaszám egy autómatikusan generált szám lesz(100000 - 999999 között), nem módosítható. Számegyezés nem lehetséges, ez mind kliens mind szerver oldalon ellenőrzésre kerül.  
Szerkesztéskor szintén nincs lehetőség a kártyaszám módosítására.

---
## Kölcsönzések

![Kölcsönzések](./public/user_manual_images/e_konyvtar_kolcsonzesek.jpeg "kölcsönzések")

1. Listázás

2. Kölcsönzött példány adatlapja

3. Kölcsönző olvasó adatlapja

4. Szerkesztés, törlés

5. Új kölcsönzés felvétele

A lejárt határidejű kölcsönzéseknél az alábbi figyelmeztetés jelenik meg:

![Lejárt](./public/user_manual_images/e_konyvtar_kolcsonzesek_lejart.jpeg "lejárt kölcsönzés")

---
### Új kölcsönzés felvétele

![Új](./public/user_manual_images/e_konyvtar_kolcsonzes_uj.jpeg "új kölcsönzés") ![Új kártyaszámmal](./public/user_manual_images/e_konyvtar_kolcsonzes_uj_kszam.jpeg "új kölcsönzés kártyaszámmal")

Ha egy olvasó adatlapjáról navigálunk az új kölcsönzés felvételéhez, a kártyaszám autómatikusan kiegészítésre kerül.

Ha a kezdő dátumot nem adjuk meg, az aznapi dátum kerül mentésre.

Csak meglévő példány id-t, illetve kártyaszámot lehet megadni!

---
### Kölcsönzés módosítása

![Szerkesztés](./public/user_manual_images/e_konyvtar_kolcsonzes_szerk.jpeg "kölcsönzés szerkesztése")

Csak a határidő módosítható(hosszabbítás)!

---
## Felhasználói fiók

![Fiók elérése](./public/user_manual_images/e_konyvtar_fiok_eleres.jpeg "fiók elérése")

![Felhasználói fiók](./public/user_manual_images/e_konyvtar_fiokadatok.jpeg "felhasználói fiók")

1. Felhasználói adatok, a könyvtáros maga is felhasználó, admin jogosultsággal.

2. Mivel a könyvtárosnak is lehetősége van kölcsönzésre, így olvasói adatok is tartoznak hozzá.

3. Saját kölcsönzések megtekintése.

