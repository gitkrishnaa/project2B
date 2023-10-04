const check = require("../check/user");
const userModel = require("../model/user");

// user class
class User {
  constructor(name, email, password,verified) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.verified=verified;
  }
}

module.exports.signup = async (req, res) => {
  console.log(["#<--login controller start"]);
  try {
    const email = req.body.email;
    const password =  req.body.password;
    const name =  req.body.name;

    console.log(email,password,name)
// checkuing emapty
if (email==undefined || password==undefined ||name==undefined ) {
    res.status(400).send("empty data");
    return;
  }

    // checking email valid or not
    const email_valid = check.email_validate(email);
    if (email_valid.status == false) {
      res.status(400).send("not valid email");
      return;
    }
    //checking is user exiast or not
    const is_email_exist = await check.is_user_exist_in_db(email);
    if (is_email_exist.response == true) {
      res
        .status(403)
        .json({ status: 200, msg: "user already exist", data: undefined });
      return;
    } else {
      // password encrypt
      const encrypted_psd = await check.encrypt_passowrd(password);
      // console.log(encrypted_psd)

      const user = new User(name, email, encrypted_psd,false);

      const resp = await userModel.create(user);

      console.log("resp", resp);
      res
        .status(200)
        .json({
          status: 200,
          msg: "user signup sucessful",
          data: { jwtKey: "", email: email },
        });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  }
  console.log(["signup controller end --># "]);
};
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password =  req.body.password;
        
    
        console.log(email,password,)
    // checkuing emapty
    if (email==undefined || password==undefined ) {
        res.status(400).send("empty data");
        return;
      }
    
        // checking email valid or not
        const email_valid = check.email_validate(email);
        if (email_valid.status == false) {
          res.status(400).send("not valid email");
          return;
        }
        //checking is user exiast or not
        const is_email_exist = await check.is_user_exist_in_db(email);
        if (is_email_exist.response == false) {
          res
            .status(404)
            .json({ status: 200, msg: "user email id is not exist", data: undefined });
          return;
        } else {
            try {

      //geting  encrypt password from db
      const user_data_db=await userModel.find({"email":email});
    //   console.log(user_data_db)
      const encrypt_passowrd=user_data_db[0].password;
      // console.log(encrypted_psd)

    //   comapre passwword
    const result=await check.decrypt_passowrd_compare(encrypt_passowrd,password)
  console.log(result)
if(result==false){
    res.status(403)
    .json({
      resp: false,
      msg: "wrong password",
      data: undefined,
    });
    return ;
}

      res.status(200)
        .json({
          resp: true,
          msg: "user login sucessful",
          data: { jwtKey: "", email: email },
        });  
} catch (error) {
    console.log(error);
    res.status(500).send("internal error"); 
}

      
        }
    
      } catch (error) {
        console.log(error);
        res.status(500).send("internal error");
      }
      console.log(["login controller end --># "]);
};
