# Swagger UI Juhend

Swagger UI on interaktiivne dokumentatsiooniliides Keskpanga API-le. See võimaldab API endpoint-e uurida ja testida otse veebilehitsejas.

## Swagger UI avamine

Kui keskpanga server on käivitatud, saad Swagger UI avada brauseris aadressil:

```
http://localhost:3000/api-docs
```

## Swagger UI kasutamine

### Ülevaade

Swagger UI kuvab kõik saadaval olevad API endpoint-id grupeeritud kaartidena. Meie rakenduse puhul on kaardid jagatud kahte gruppi:

- **Pangad** - Pangandusega seotud operatsioonid (registreerimine, info vaatamine)
- **Ülekanded** - Pangandusülekannete tegemine ja vaatamine

### Autentimine

Paljud API endpoint-id nõuavad autentimist API võtmega. Swagger UI-s autentimiseks:

1. Klõpsa "Authorize" nupul lehe ülaosas
2. Sisesta oma API võti (X-API-Key) väljale
3. Klõpsa "Authorize"
4. Sulge autentimisdialoog "Close" nupuga

Nüüd on kõik päringud, mis nõuavad autentimist, automaatselt API võtmega varustatud.

### API endpoint-ide testimine

API endpoint-i testimiseks:

1. Vali vastav endpoint, millega soovid töötada (klõpsa sellel, et see avada)
2. Klõpsa nupul "Try it out"
3. Täida vajalikud parameetrid:
   - Päringutee parameetrid (URL-is, nt pangaId)
   - Päringukere (JSON, päringuteks nagu panga registreerimine või ülekanne)
4. Klõpsa "Execute" nupul
5. Tulemused kuvatakse automaatselt sektsioonis "Responses"

### Näited

#### Panga registreerimine

1. Vali endpoint `POST /api/banks/register`
2. Klõpsa "Try it out"
3. Sisesta päringukere:
   ```json
   {
     "name": "Minu Pank",
     "apiUrl": "http://localhost:8080"
   }
   ```
4. Klõpsa "Execute"
5. Saadud vastusest leiad oma panga ID ja API võtme

#### Ülekande tegemine

1. Esmalt autendi end (pank, millelt ülekanne tehakse)
2. Vali endpoint `POST /api/transactions`
3. Klõpsa "Try it out"
4. Sisesta päringukere:
   ```json
   {
     "fromBankId": "siinOnSinuPangaId",
     "toBankId": "siinOnSihtpangaId",
     "amount": 100,
     "description": "Ülekanne testimiseks"
   }
   ```
5. Klõpsa "Execute"
6. Saad vastuseks info tehtud ülekande kohta ja oma uue kontojäägi

## Võimalikud veakoodid

Swagger UI näitab ka võimalikke vastuskoode ja nende tähendusi:

- **200/201** - Päring õnnestus
- **400** - Vale päringu formaat või andmed (nt. negatiivne summa)
- **401** - API võti puudub
- **403** - Vale API võti
- **404** - Panka või ressurssi ei leitud
- **500** - Serveri siseviga

## Mudeli skeemid

Swagger UI näitab ka kõigi API päringute ja vastuste mudeleid. Need on nähtavad iga endpoint-i juures või eraldi "Schemas" sektsioonis.

## API integratsiooni kood

Swagger UI-st saad kopeerida valmis koodi integratsiooniks erinevatesse programmeerimiskeeltesse, näiteks:

- JavaScript (fetch, XHR)
- cURL käsurea päringuteks
- Node.js
- Python

Koodinäidete nägemiseks, klõpsa vastava endpoint-i juures olevale "Request samples" nupule.

## API arendaja tööriistad

Swagger UI on abiks ka API arendajatele, näidates:

- Vajalikud päised (headers)
- Nõutavad parameetrid
- Vastuse formaadid
- Veakoodid ja nende kirjeldused

## Swagger UI eelised

- **Interaktiivsus** - päringute testimine otse brauseris
- **Arusaadavus** - selge struktuur ja dokumentatsioon
- **Avastamisvõimalus** - kõik API võimalused on ülevaatlikult näha
- **Kasutajasõbralikkus** - lihtne kasutada ka ilma tehniliste teadmisteta
- **Ajakohasus** - dokumentatsioon on alati ajakohane, kuna see genereeritakse koodist