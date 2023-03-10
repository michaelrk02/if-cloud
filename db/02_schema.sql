CREATE TABLE "mahasiswa" (
    "id" UUID NOT NULL DEFAULT UUID_GENERATE_V4(),

    "nim" CHAR(8) NOT NULL,
    "nama" VARCHAR(128) NOT NULL,
    "prodi" VARCHAR(64) NOT NULL,
    "angkatan" INT NOT NULL,
    "alamat" TEXT NOT NULL,

    CONSTRAINT "PK_Mahasiswa" PRIMARY KEY ("id"),
    CONSTRAINT "UK_Mahasiswa_Nim" UNIQUE ("nim")
);

CREATE TABLE "matakuliah" (
    "id" UUID NOT NULL DEFAULT UUID_GENERATE_V4(),

    "kode" CHAR(12) NOT NULL,
    "nama" VARCHAR(128) NOT NULL,
    "sks" INT NOT NULL,
    "semester" INT NOT NULL,

    CONSTRAINT "PK_Matakuliah" PRIMARY KEY ("id"),
    CONSTRAINT "UK_Matakuliah_Kode" UNIQUE ("kode")
);

CREATE TABLE "dosen" (
    "id" UUID NOT NULL DEFAULT UUID_GENERATE_V4(),

    "nidn" CHAR(10) NOT NULL,
    "nama" VARCHAR(128) NOT NULL,
    "alamat" TEXT NOT NULL,

    CONSTRAINT "PK_Dosen" PRIMARY KEY ("id"),
    CONSTRAINT "UK_Dosen_Nidn" UNIQUE ("nidn")
);

CREATE TABLE "perkuliahan" (
    "id" UUID NOT NULL DEFAULT UUID_GENERATE_V4(),

    "mahasiswa_id" UUID NOT NULL,
    "matakuliah_id" UUID NOT NULL,
    "dosen_id" UUID NOT NULL,
    "nilai" REAL NOT NULL,

    CONSTRAINT "PK_Perkuliahan" PRIMARY KEY ("id"),
    CONSTRAINT "UK_Perkuliahan_MahasiswaMatakuliah" UNIQUE ("mahasiswa_id", "matakuliah_id"),
    CONSTRAINT "FK_Perkuliahan_Mahasiswa" FOREIGN KEY ("mahasiswa_id") REFERENCES "mahasiswa" ("id"),
    CONSTRAINT "FK_Perkuliahan_Matakuliah" FOREIGN KEY ("matakuliah_id") REFERENCES "matakuliah" ("id"),
    CONSTRAINT "FK_Perkuliahan_Dosen" FOREIGN KEY ("dosen_id") REFERENCES "dosen" ("id")
);
