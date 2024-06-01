const express = require('express')

const router = express.Router();

const users = [
    {user_id: 0, userName: 'Anas Mahmud', password:'1234', email:'abid1234@gmail.com'},
    {user_id: 1, userName: 'John Doe', password:'4321', email:'johndoe1234@gmail.com'}
 ]

router.get('/:user_id', (req, res, next) => {
    const userId = Number(req.params.user_id);
    const userOneId = users.find(p => {
        return p.user_id === userId;
    })
    if(!userOneId){
        
        const error = new Error('Patient not found')
        error.code = 404;
        throw (error);
    }
    else{
        res.json({userOneId});
    }
    
});


module.exports = router;
