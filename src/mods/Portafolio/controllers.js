const config = require('../../config/config');
const { IsEmail, ConterField } = require('../../config/config');
const MongoClient = require('mongodb').MongoClient

let db;
let collection;

MongoClient.connect('mongodb+srv://christianw:ducrusfis5@cluster0.qqdwsf0.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')

    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('portafolio')
    collection = db.collection('portafolio')

})



const getUsersC = async (req,res)=>{
    console.log("mensaje antes del colapso");

    let response;
    try {
        response = await collection.find().toArray();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
    
    console.log(response);
    res.status(200).json(response);
}

const getUserByIdC = async (req,res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await collection.findOne({ number_project: id });
        
        return res.status(200).json(response);
    } catch (e) {
        return res.status(401).json(e);
    }
}

const createUserC = async (req,res)=>{
    const { username, email, password, full_name, company, zip_code, country, city, phone_1 } = req.body;

    const fields = "username, email, password, full_name, company, zip_code, country, city, phone_1, role, wallet_balance, status";

    try {
        console.log(req.body);    
        const response = req.body.map( async r => {
            return await collection.insertOne(r);
        });

        // const response = await collection.insertOne(req.body);
        console.log(response);
        res.json('Success');
        
        return res.status(200).json({
            message: 'Account created successfully!',
            user: {username,email}
        });
        
    } catch (error) {

            console.log(error);

            return res.status(500).json({
                message: 'An error occurred on the server: ',
                error
            });
    }
}

const updateUserC = async (req,res)=>{
    const { username, email, full_name, company, zip_code, country, city, phone_1 } = req.body;
    
    
    //const id2 = 19;

    //Tomar el id del usuario:
    const token = extractorToken(req);

    if (token=="error"){
        return res.status(400).json({
            message: 'Your session has expired'
        });
    }
    console.log("token idUser: ") 
    console.log(token.userId)

    if (!(username==undefined) && !(username=="")){

        const resulCHeckEmail = IsEmail(username);

        //Chequeado que no sea un email.
        if (resulCHeckEmail.valid){
            return res.status(400).json({
                message: 'You cannot use an email or a similar structure as a username'
            });
        }


        const obj = await UpdateUsername(username, token.userId);
        if (obj==0){
            return res.status(400).json({message: "You can only choose your username once"});
        }else {
            return res.status(obj.status).json(obj.obj);
        }
        
    }
    
    const fields = "email, full_name, company, zip_code, country, city, phone_1";
     //Codigo para chequear que campos de los que son requeridos no esten vacios

     {//chequea que no esten vacios los campos ()
        const campsForCHeack = [
            ["email", "full name", "zip code"],
            [email, full_name, zip_code]
        ]
        
        const obj = config.IsEmpty(campsForCHeack);
        if (obj.empty){
            return res.status(400).json({
                message: 'The '+obj.camp+' field is required',
            });
        }
    }
 
    //Validando email
    const resulCHeckEmail = IsEmail(email);

    if (!(resulCHeckEmail.valid)){
        return res.status(400).json({
            message: resulCHeckEmail.message
        });
    }

    //function ()
    {//Validando la longitud, el primer parametro es nimimo y el segundo el maximo, si metes 0 es no tomar en cuenta esa validacion
        const campsForCHeack = [
            ["full_name", "company", "zip_code", "country", "city", "phone_1"],
            [full_name, company, zip_code, country, city, phone_1],
            [3, 3, 0, 2, 2, 4, 4],
            [60, 40, 20, 30, 30, 30, 30]
        ]

        const obj = config.LengthMinMax(campsForCHeack);

        if (!(obj.valid)){
            return res.status(400).json({
                message: obj.message
            });
        }
    }

    console.log("wenooo 4");
    
    const values = [ 
        email, 
        full_name, 
        company, 
        zip_code, 
        country, 
        city, 
        phone_1
    ];

    const num_fields = values.length;
    try {
        //Cuenta el numero de campos que deben ser registrados

        var SetCamps = config.ConterFieldUpdate(fields);
        console.log("wenooo 5 "+SetCamps);
        const response = await pool.query('UPDATE users SET '+SetCamps+' WHERE id = '+token.userId,values);

        //const response = await pool.query('INSERT INTO users ('+fields+') VALUES '+NumValues+'',values);
        console.log(response);

        
        return res.status(200).json({
            message: 'Account updated successfully!'
            
        });
        
        
    } catch (error) {

        respError = await checkUniCodesInResgister(username,email);
        console.log("respuesta error: "+ respError);
        if (respError=="none"){
            console.log('An error occurred on the server: '+error);
            
           
            return res.status(500).json({
            message: 'An error occurred on the server: ',
            error
            });
        }else {
            
            return res.status(500).json({
                message: respError
            });
            
        } 
    }
    
}

const deleteUserC = async (req, res) => {
    //const id = parseInt(req.params.id);
    const { email, id } = req.body;
    await pool.query('DELETE FROM users where id = $1 or email = $2', [
        id,
        email
    ]);
    res.status(200).json({message: `User ${email} deleted Successfully`});
};


module.exports = {
    getUsersC,
    getUserByIdC,
    createUserC, 
    updateUserC, 
    deleteUserC
}


