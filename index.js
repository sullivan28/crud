const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();


app.use(cors());
app.use(bodyparser.json());

//database conexao

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
  port: 3306,

});

//checar conexao database
db.connect(err => {
  if (err) { console.log(err, 'dberr'); }
  console.log('database conectado..');
});


app.get('/user', (req, res) => {
  let qr = 'select * from user';

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, 'errs');
    }

    if (result.length > 0) {
      res.send({
        message: 'all user data',
        data: result
      });
    }
  })
});


app.get('/user/:id', (req, res) => {

  let gID = req.params.id;

  let qr = 'select * from user where id = ${gID}';

  db.query(qr, (err, result) => {

    if (err) { console.log(err); }

    if (result.length > 0) {
      res.send({
        message: 'data not found',
        data: result
      });
    }
  })
});


// create data   
app.post('/user', (req, res) => {
  console.log(req.body, 'createdata');

  let fullname = req.body.fullname;
  let email = req.body.fullemail;
  let dataNascimento = req.body.fulldataNascimento;
  let profissao = req.body.fullprofissao;
  let texto = req.body.fulltexto;

  let qr = 'insert into user(fullname,email,dataNascimento,profissao,texto)'
  values('${fullname}', '${email}', '${dataNascimento}', '${profissao}', '${texto}');

  db.query(qr, (err, result) => {

    if (err) {
      console.log(err);
      console.log(result, 'result')
      res.send({
        message: 'dados coletados.',
      });
    }
  })
});


//update data

app.put('/user/:id', (req, res) => {

  console.log(req.body, 'updatedata');

  let gID = req.params.id;

  let fullname = req.body.fullname;
  let email = req.body.fullemail;
  let dataNascimento = req.body.fulldataNascimento;
  let profissao = req.body.fullprofissao;
  let texto = req.body.fulltexto;


  let qr = 'update user set fuillname = ${fullname}, email = ${email}, dataNascimento = ${dataNascimento},profissao = ${profissao}, texto = ${texto} , where id =  ${gID}';
  db.query(qr, (err, result) => {

    if (err) { console.log(err); }

    res.send({
      message: 'data update'
    });
  })
})


//delete data
app.delete('/user/:id', (req, res) => {

  let qID = req.params.id;

  let qr = 'delete from user where id = '${ gID }'';
  db.query(qr, (err, result) => {
    if (err) { console.log(err); }

    res.send(
      {
        message: 'dados deletados'
      }
    )
  });

});




app.listen(3000, () => {
  console.log('server iniciado');
});