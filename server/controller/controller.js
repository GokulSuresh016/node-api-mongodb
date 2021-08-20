const Userdb = require('../model/model');
var UserDB = require('../model/model');

exports.create = (req,res)=>{
if(!req.body){
    res.send(400).send({message:"Content can not be empty"});
    return;
}
// create model
console.log('reached here');
const user = new UserDB({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status,
    
})
// save data to db
user.save(user)
.then(data =>{
    res.send(data);
})
.catch(err =>{
    res.status(500).send({
        message:err.message||"Some other errors"
    });
});

}

exports.find = (req,res)=>{
    Userdb.find().then(user=>{
        res.send(user)
    }).catch(err=>{
        res.status(500).send({message:err.message||"some other errors"})
    })
}

exports.update = (req,res)=>{
  if(!req.body){
      return res.status(400).send({message:"ID can not be empty"})
  }  
  const id =req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
  .then(data=>{
      if(!data){
          res.status(404).send({message:"Can not update"})
      }else{
          res.send(data)
      }
  }).catch(err=>{
      res.status(500).send({message:err.message})
  })
}

exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({message:"Con not delete"})
        }
        else{
            res.send({message:"User deleted.."})
        }
    }).catch(err=>{
        res.status(500).send({message:err.message})
    })
}