# Keskpank

Keskpanga rakendus õppetöö jaoks, mis võimaldab õpilastel oma panga rakenduste kaudu üksteisele ülekandeid teha.

## Paigaldamine

1. Klooni repositoorium
```
git clone https://github.com/JoonasMagi/keskpank.git
cd keskpank
```

2. Paigalda sõltuvused
```
npm install
```

3. Kombineeri server.js failid (kui kasutad tükeldatud versiooni)
```
node combine-server.js
mv server-combined.js server.js
```

4. Käivita server
```
npm start
```

Server käivitub pordil 3000.

## Rakenduse kasutamine

### Keskpank

Keskpanga veebiliides on kättesaadav aadressil [http://localhost:3000](http://localhost:3000)

### Swagger UI

API dokumentatsioon Swagger UI abil on kättesaadav aadressil [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Swagger UI võimaldab:
- Uurida kõiki saadaolevaid API endpoint-e
- Testida API päringuid otse veebiliideses
- Vaadata API vastuste mudeleid
- Tutvuda API dokumentatsiooniga

![Swagger UI näide](https://swagger.io/swagger/media/blog/swagger-ui-announcement/swagger-ui-web.png)

### API kasutamine

1. Registreeri oma pank Swagger UI kaudu
2. Salvesta saadud API võti ja panga ID
3. Kasuta neid oma rakenduses keskpanga API-ga suhtlemiseks

## API kasutamise näidiskood

```javascript
// Tee üelekanne
async function teeYlekanne(apiKey, lahtepangaId, sihtpangaId, summa, kirjeldus) {
  const response = await fetch('http://localhost:3000/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({
      fromBankId: lahtepangaId,
      toBankId: sihtpangaId,
      amount: summa,
      description: kirjeldus
    })
  });
  
  return await response.json();
}
```

## Funktsioonid

- Pankade registreerimine ja haldamine
- Ülekannete tegemine pankade vahel
- Kontosaldode jälgimine
- Tehingute ajaloo kuvamine
- API dokumentatsioon Swagger UI abil