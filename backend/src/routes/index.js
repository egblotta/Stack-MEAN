const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt'); 

const User = require('../models/Users');        //modelo del usuario

const jwt = require('jsonwebtoken');            //modulo jwt

//ruta inicial
router.get('/', (req, res) => res.send('Hola mundo'))

//ruta de registro
router.post('/signup', async(req, res) => {             //async se usa para que await funcione
    const { email, password } = req.body;       //guardo en una constante lo que extraiga desde email y pass
    var newUser = new User();        //creo un objeto user con los datos ingresados
    newUser.email = email;
    newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    await newUser.save();                             //await establece un metodo asincrono en segundo plano y luego inserta los datos en la bd
    
    const token = jwt.sign({_id: newUser._id}, 'secretKey');        //creo el token de usuario
    res.status(200).json({token})
});

//ruta de login
router.post('/signin', async(req, res) => {

    const{ email, password} = req.body;
    const user = await User.findOne({email})

    const verified = bcrypt.compareSync(password, user.password);           //desencripta la pass para compararla con la encriptada en la bd

    if (!user) return res.status(401).send('El correo no existe');
    if(!verified) return res.status(401).send('La contraseña es incorrecta');

    const token = jwt.sign({_id: user._id}, ('secretKey'),{
        expiresIn: '1h'
    });
    
    return res.status(200).json({token});

});

router.get('/tasks', (req, res)=>{
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2020-10-19T21:50:27.654Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2020-10-19T21:50:27.654Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2020-10-19T21:50:27.654Z"
        }
    ])
})

//ruta perfil
router.get('/private-tasks', verifyToken, (req, res) => {
res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2020-10-19T21:50:27.654Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2020-10-19T21:50:27.654Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2020-10-19T21:50:27.654Z"
        }
    ])
})

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId);
})

module.exports = router;

//para validar si existe el token
function verifyToken(req, res, next){

    if(!req.headers.authorization) {
        return res.status(401).send('Sin autorizacion');
    }

    const token = req.headers.authorization.split(' ')[1]
    if(token == 'null'){
        return res.status(401).send('Sin autorizacion');
    }

    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id                //guarda el id del user para usarlo luego
    next();
}