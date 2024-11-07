import '../static/css/style_login.css'
import '../static/css/style_register.css'



function Login(){


    return(

        <div className="container">
            <div className="firstcircle"><div className="littleCircle"></div></div>
            <div className="login">
            <form action="http://localhost:8080/login" method="post">       
                <h1>login</h1>
                <br/>
                    <input type="text"name="username" className="user"placeholder="Username"/><br /><br />
                    <input type="text" name="pass"className="pass"placeholder="Password"/><br/><br/>
                    <input type="submit"name="btn"value="login"className="btn"/>     

            </form>
            <br/>
            <div className="link">resgistrar se <a href='#'>aqui</a></div>
            </div>
            <div className="secunCircle">
                <div className="circulo1"></div>
                <div className="triangulos part1"></div>
                <div className="triangulos part2"></div>
                <div className="triangulos part3"></div>
            </div>
        </div>

    )

}


export default Login;


