# Backend dokumentáció

Ez a mappa tartalmazza az alkalmazás szerveroldali (backend) kódját. Az API végpontok részletes leírása és tesztelése a 
beépített Swagger felületen keresztül érhető el.

## Főbb jellemzők

- REST API
- MVC architektúra
- JWT alapú autentikáció és autorizáció
- SQL adatbázis 
- Swagger dokumentáció (`/api-docs` útvonalon)

## Swagger használata

A végpontok részletes dokumentációját és kipróbálási lehetőségét a Swagger UI biztosítja, amely elérhető a `/api-docs` 
útvonalon a szerver futtatása után.

## Futtatás

1. Telepítsd a függőségeket:  
   `npm install`
2. Hozzalétre az adatbázist a `konyvtar.sql` fájl segítségével.
3. Állítsd be a környezeti változókat a `.env` fájlban, például az adatbázis kapcsolati adatokat és a szerver PORT-ját.
4. Indítsd el a szervert:  
   `npm run start`
5. Nyisd meg a böngészőben:  
   `http://localhost:PORT/api-docs`

## Futtatás teszt adatbázissal

1. Telepítsd a függőségeket:  
   `npm install`
2. Hozzalétre az adatbázist a `konyvtar.sql` fájl segítségével.
3. Állítsd be a környezeti változókat a `.env` fájlban, például az adatbázis kapcsolati adatokat és a szerver PORT-ját.
4. Indítsd el a szervert:  
   `npm run start-test`
5. Nyisd meg a böngészőben:  
   `http://localhost:PORT/api-docs`

## Mockolt tesztek futtatása

1. Telepítsd a függőségeket:  
   `npm install`
2. Futtasd a teszteket normál módban vagy teszt lefedettségi jelentéssel:  
   `npm run test` vagy `npm run test:html`
3. A tesztek eredményei megjelennek a konzolon, és a teszt lefedettségi jelentés:  
   `src/backend/test-reports`

## Fontos tudnivalók

- Az alkalmazás frontendel együtt történő futtatásakor a `middleware/cors.js` a frontend futtatásával megegyező PORT 
számot használja a CORS policy beállításokhoz, másként az alkalmazás nem megfelelően fog működni.
- Az alkalmazás autentikációt és autorizációt tartalmaz, ezért egyes végpontok swaggerben történő kipróbálásához
először regisztrálni kell egy új felhasználót a `/api-docs` alatt található `/auth/register` végponton, majd bejelentkezni a 
`/auth/login` végponton, és a kapott JWT token-t használni a további végpontok kipróbálásához.

## Project struktúra

- `config`: Adatbázis kapcsolati és logolási beállítások.
- `controllers`: Az API végpontok logikáját tartalmazó fájlok.
- `lib`: Swagger dokumentációhoz szükséges fájl.
- `logs`: Log fájlok helye.
- `middleware`: Autentikáció, autorizáció, CORS policy és általános hibakezelési beállítások.
- `models`: Adatbázis lekérdezéseket tartalmazó fájlok.
- `routes`: Az API végpontok definiálása.
- `tests`: Teszt fájlok.
- `utils`: Segédfüggvények.
- `validators`: Különböző végpontokhoz tartozó validációs szabályok.

## Domain modellek

- `Author`: Szerzőket reprezentálja, tartalmazza a szerző nevét.
- `Genre`: Műfajokat reprezentálja, tartalmazza a műfaj nevét.
- `Language`: Nyelveket reprezentálja, tartalmazza a nyelv nevét.
- `Book`: Könyveket reprezentálja, tartalmazza a könyv címét, szerzőjét, kiadási évét és egyéb jellemzőit.
- `BookCopy`: Könyv példányokat reprezentálja, tartalmazza a könyv azonosítóját, a példány állapotát és egyéb jellemzőit.
- `User`: Felhasználói fiókokat reprezentálja, tartalmazza a regisztrációhoz és bejelentkezéshez szükséges adatokat.
- `Reader`: Olvasókat reprezentálja, tartalmazza az olvasó nevét, email címét és egyéb jellemzőit.
- `Rental`: Kölcsönzéseket reprezentálja, tartalmazza a kölcsönző olvasó azonosítóját, a kölcsönzött könyv példány
azonosítóját és a kölcsönzés időtartamát.

## Az elkészítéshez használt egyéb szoftverek és AI

- IntelliJ IDEA Ultimate Edition
- VS Code
- Copilot
- XAMPP
- Postman
