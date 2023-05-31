const express = require("express");
const bodyParser = require("body-parser");
const mysqlMe = require("./connectDb");
const getData = require("./responseData");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  getData(200, "API SIAP DIPAKAI!", "SUKSES!", res);
});

app.get("/mahasiswa", (req, res) => {
  const querySql = `SELECT * FROM MAHASISWA`;
  mysqlMe.query(querySql, (error, result) => {
    getData(200, result, "Data Mahasiswa Berhasil Ditampilkan!!", res);
  });
});

app.get("/mahasiswa/:npm", (req, res) => {
  const querySql = `SELECT * FROM MAHASISWA`;
  mysqlMe.query(querySql, (error, result) => {
    const query = `SELECT * FROM mahasiswa WHERE Npm = ${req.params.npm}`;
    mysqlMe.query(query, (err, result) => {
      getData(
        200,
        result,
        `Data Mahasiswa Berhasil Dengan NPM ${req.params.npm}`,
        res
      );
    });
  });
});

app.post("/mahasiswa", (req, res) => {
  // PAKE POSTMAN!!!!
  const { Nama, Npm, Kelas, Jurusan } = req.body;

  const query = `INSERT INTO mahasiswa VALUES ('${Nama}', '${Npm}', '${Kelas}', '${Jurusan}')`;

  mysqlMe.query(query, (error, result) => {
    if (error) throw getData(500, "GAGAL", "GAGAL INSERT DATA!!", res);
    if (result?.affectedRows) {
      const data = {
        isSucces: result.affectedRows,
      };
      getData(200, data, "BERHASIL INSERT DATA!", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  // PAKE POSTMAN
  const { Nama, Npm, Kelas, Jurusan } = req.body;
  const query = `UPDATE mahasiswa SET Nama = '${Nama}', Kelas = '${Kelas}', Jurusan = '${Jurusan}' WHERE Npm = ${Npm}`;

  mysqlMe.query(query, (error, result) => {
    if (error) throw getData(500, "GAGAL", "GAGAL UPDATE DATA!", res);
    if (result?.affectedRows) {
      const data = {
        isSucces: result.affectedRows,
        message: result.message,
      };
      getData(200, data, "BERHASIL UPDATE DATA!", res);
    } else {
      getData(500, "GAGAL", "GAGAL UPDATE DATA!", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const query = `DELETE FROM mahasiswa WHERE Npm = ${req.body.Npm}`;

  mysqlMe.query(query, (error, result) => {
    if (error) throw getData(500, "GAGAL", "GAGAL HAPUS DATA!", res);
    if (result?.affectedRows) {
      const data = {
        isSucces: result.affectedRows,
        message: result.message,
      };
      getData(200, data, "BERHASIL HAPUS DATA!", res);
    } else {
      getData(500, "GAGAL", "GAGAL HAPUS DATA!", res);
    }
  });
});

app.listen(3000, () => {
  console.log("App Sudah Berjalan Di Port localhost:3000");
});
