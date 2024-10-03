

//create and save Token in the cookie

export default (user, statusCode, res) => {


    // create JWT Token
    const Token =user.getJwtToken()
    
    
    //options for Cookie 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 *60 * 1000
        ),
        httpOnly: true
    };  
    res.status(statusCode).cookie("token", Token, options).json({
        Token,
    });
};