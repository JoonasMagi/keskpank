/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Vaata kõiki ülekandeid
 *     tags: [Ülekanded]
 *     responses:
 *       200:
 *         description: Kõik ülekanded
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Serveri viga
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/transactions', (req, res) => {
  try {
    const transactions = readTransactions();
    res.json(transactions.transactions);
  } catch (error) {
    console.error('Viga ülekannete laadimisel:', error);
    res.status(500).json({ error: 'Serveri viga ülekannete laadimisel' });
  }
});

/**
 * @swagger
 * /api/transactions/bank/{bankId}:
 *   get:
 *     summary: Vaata ühe panga ülekandeid
 *     tags: [Ülekanded]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: bankId
 *         required: true
 *         schema:
 *           type: string
 *         description: Panga ID
 *     responses:
 *       200:
 *         description: Panga ülekanded
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
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
app.get('/api/transactions/bank/:bankId', (req, res) => {
  try {
    const { bankId } = req.params;
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(401).json({ error: 'API võti puudub' });
    }

    const banks = readBanks();
    const bank = banks.banks.find(bank => bank.id === bankId);

    if (!bank) {
      return res.status(404).json({ error: 'Panka ei leitud' });
    }

    // Kontrolli, kas API võti on õige
    if (bank.apiKey !== apiKey) {
      return res.status(403).json({ error: 'Vale API võti' });
    }

    const transactions = readTransactions();
    const bankTransactions = transactions.transactions.filter(
      t => t.fromBankId === bankId || t.toBankId === bankId
    );

    res.json(bankTransactions);
  } catch (error) {
    console.error('Viga panga ülekannete laadimisel:', error);
    res.status(500).json({ error: 'Serveri viga panga ülekannete laadimisel' });
  }
});

// Lisa info Swagger UI kohta peamisele veebilehele
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Serveri käivitamine
app.listen(PORT, () => {
  console.log(`Server töötab pordil ${PORT}`);
  console.log(`Swagger dokumentatsioon on saadaval: http://localhost:${PORT}/api-docs`);
});