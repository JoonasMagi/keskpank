// Ülekannete API endpoint-id

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Tee ülekanne ühelt pangalt teisele
 *     tags: [Ülekanded]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionRequest'
 *     responses:
 *       201:
 *         description: Ülekanne edukalt tehtud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Vale päringu andmed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: API võti puudub
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Vale API võti
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Panka ei leitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Serveri viga
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/transactions', (req, res) => {
  try {
    const { fromBankId, toBankId, amount, description } = req.body;
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(401).json({ error: 'API võti puudub' });
    }

    if (!fromBankId || !toBankId || !amount) {
      return res.status(400).json({ error: 'Puuduvad vajalikud andmed ülekande tegemiseks' });
    }

    // Kontrolli, et summa on positiivne arv
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Summa peab olema positiivne arv' });
    }

    const banks = readBanks();
    
    // Leia lähtepank
    const fromBank = banks.banks.find(bank => bank.id === fromBankId);
    if (!fromBank) {
      return res.status(404).json({ error: 'Lähtepanka ei leitud' });
    }

    // Kontrolli, kas API võti on õige
    if (fromBank.apiKey !== apiKey) {
      return res.status(403).json({ error: 'Vale API võti' });
    }

    // Leia sihtpank
    const toBank = banks.banks.find(bank => bank.id === toBankId);
    if (!toBank) {
      return res.status(404).json({ error: 'Sihtpanka ei leitud' });
    }

    // Kontrolli, kas lähtepangal on piisavalt raha
    if (fromBank.balance < amount) {
      return res.status(400).json({ error: 'Kontol pole piisavalt raha' });
    }

    // Tee ülekanne
    fromBank.balance -= parseFloat(amount);
    toBank.balance += parseFloat(amount);

    // Salvesta muudatused
    writeBanks(banks);

    // Salvesta ülekanne ajalukku
    const transactions = readTransactions();
    const newTransaction = {
      id: uuidv4(),
      fromBankId,
      fromBankName: fromBank.name,
      toBankId,
      toBankName: toBank.name,
      amount: parseFloat(amount),
      description: description || 'Ülekanne',
      timestamp: new Date().toISOString()
    };

    transactions.transactions.push(newTransaction);
    writeTransactions(transactions);

    res.status(201).json({
      transaction: newTransaction,
      fromBankBalance: fromBank.balance
    });
  } catch (error) {
    console.error('Viga ülekande tegemisel:', error);
    res.status(500).json({ error: 'Serveri viga ülekande tegemisel' });
  }
});