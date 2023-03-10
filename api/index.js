const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const db = new pg.Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

//
// STATIC RESOURCES
//

app.get('/mahasiswa', (req, res, next) => {
  db.query(' \
    SELECT "id", "nim", "nama", "prodi", "angkatan", "alamat" \
    FROM "mahasiswa" \
    ORDER BY "nim" \
  ')
  .then(data => {
    res.json({
      columns: [
        {key: 'nim', title: 'NIM'},
        {key: 'nama', title: 'Nama'},
        {key: 'prodi', title: 'Prodi'},
        {key: 'angkatan', title: 'Angkatan'},
        {key: 'alamat', title: 'Alamat'}
      ],
      rows: data.rows
    });
  })
  .catch(next);
});

app.get('/matakuliah', (req, res, next) => {
  db.query(' \
    SELECT "id", "kode", "nama", "sks", "semester" \
    FROM "matakuliah" \
    ORDER BY "semester", "kode" \
  ')
  .then(data => {
    res.json({
      columns: [
        {key: 'kode', title: 'Kode'},
        {key: 'nama', title: 'Nama'},
        {key: 'sks', title: 'SKS'},
        {key: 'semester', title: 'Semester'}
      ],
      rows: data.rows
    });
  })
  .catch(next);
});

app.get('/dosen', (req, res, next) => {
  db.query(' \
    SELECT "id", "nidn", "nama", "alamat" \
    FROM "dosen" \
    ORDER BY "nidn" \
  ')
  .then(data => {
    res.json({
      columns: [
        {key: 'nidn', title: 'NIDN'},
        {key: 'nama', title: 'Nama'},
        {key: 'alamat', title: 'Alamat'}
      ],
      rows: data.rows
    });
  })
  .catch(next);
});

//
// DYNAMIC RESOURCES
//

app.post('/perkuliahan', (req, res, next) => {
  const mahasiswaId = req.body.mahasiswa_id;
  const matakuliahId = req.body.matakuliah_id;
  const dosenId = req.body.dosen_id;
  const nilai = Number(req.body.nilai);

  db.query('INSERT INTO "perkuliahan" ("mahasiswa_id", "matakuliah_id", "dosen_id", "nilai") VALUES ($1, $2, $3, $4)', [mahasiswaId, matakuliahId, dosenId, nilai])
  .then(() => {
    res.status(200).end();
  })
  .catch(next);
});

app.get('/perkuliahan', (req, res, next) => {
  db.query(' \
    SELECT \
      "perkuliahan"."id", \
      "mahasiswa_id", "mahasiswa"."nim" AS "mahasiswa_nim", "mahasiswa"."nama" AS "mahasiswa_nama", \
      "matakuliah_id", "matakuliah"."kode" AS "matakuliah_kode", "matakuliah"."nama" AS "matakuliah_nama", "matakuliah"."sks" AS "matakuliah_sks", \
      "dosen_id", "dosen"."nidn" AS "dosen_nidn", "dosen"."nama" AS "dosen_nama", \
      "nilai" \
    FROM "perkuliahan" \
    JOIN "mahasiswa" ON "mahasiswa"."id" = "perkuliahan"."mahasiswa_id" \
    JOIN "matakuliah" ON "matakuliah"."id" = "perkuliahan"."matakuliah_id" \
    JOIN "dosen" ON "dosen"."id" = "perkuliahan"."dosen_id" \
    ORDER BY "mahasiswa_nim", "matakuliah_kode" \
  ')
  .then(data => {
    res.json({
      columns: [
        {key: 'mahasiswa_nim', title: 'NIM Mahasiswa'},
        {key: 'mahasiswa_nama', title: 'Nama Mahasiswa'},
        {key: 'matakuliah_kode', title: 'Kode Matakuliah'},
        {key: 'matakuliah_nama', title: 'Nama Matakuliah'},
        {key: 'matakuliah_sks', title: 'SKS Matakuliah'},
        {key: 'dosen_nidn', title: 'NIDN Dosen'},
        {key: 'dosen_nama', title: 'Nama Dosen'},
        {key: 'nilai', title: 'Nilai'}
      ],
      rows: data.rows
    });
  })
  .catch(next);
});

app.delete('/perkuliahan/:perkuliahanId', (req, res, next) => {
  const perkuliahanId = req.params.perkuliahanId;

  db.query('DELETE FROM "perkuliahan" WHERE "id" = $1', [perkuliahanId])
  .then(() => {
    res.status(200).end();
  })
  .catch(next);
});

//
// ENTRY POINT
//

const port = 8080;

db.connect()
.then(() => {
  app.listen(port, () => {
    console.log('Listening on port ' + port);
  });
});
