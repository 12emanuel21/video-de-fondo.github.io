
import '../static/css/style_loading.css'



function Loading(){

    return(

        /* From Uiverse.io by alexruix */ 

    <div className="loader">
        <span className="loader-text">loading</span>
        <span className="load"></span>
    </div>

    )


}


export default Loading;






@import url('https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Carter+One&family=Pacifico&family=Roboto&display=swap');

body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
   background: #27262C;
   height: 100vh;
}
.container{
 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.login{
    width: 350px;
    height: 500px;
    margin-top: 150px;

}
h1{
    color: #ffffff;
    font-family: 'ADLaM Display', cursive;
    font-size: 50px;
    font-weight: 100;
    cursor:default ;
}
form{
     display: flex;
    flex-direction: column;
}
.firstcircle{
    width: 680px;
    height:680px;
    background-color: #4044ED;
    border-radius: 50%;
    position: absolute;
    top: 25px;
    left: -450px;
}
.firstcircle::before{
    content: "";
    width: 680px;
    height:680px;
    border-radius: 50%;  
    border: 2px #7577f7 solid;
    position: absolute;
    right: -15px;
    top: 0px;
  
}
.littleCircle{
    width: 50px;
    height:50px;
    background-color: #93DFFF;
    border-radius: 50%;
    position: absolute;
    top: 100px;
    right: 50px;

}
.littleCircle::before{
    content: "";
    width: 50px;
    height:50px;
    border-radius: 50%;  
    border: 2px #70cef7 solid;
    position: absolute;
  
}
.secunCircle{
    height: 1000px;
    width: 400px;
    
    position: absolute;
    right: 0;
}
.circulo1{
    background: repeating-linear-gradient(-30deg, transparent 0 15px, #27262C 16px 35px);
    background-color: #4044ED;
    width: 680px;
    height: 680px;
    border-radius: 50%;
    position: absolute;
    top: -250px;
    right: -350px;
}
.circulo1::before{
    content: "";
    width: 680px;
    height: 680px;
    border-radius: 50%;  
    border: 2px #7577f7 solid;
    position: absolute;
    right: 3px;
    top: 10px;
  
}
.triangulos{
    background-color: #4043ed65;
    width: 200px;
    height: 200px;
    position: absolute;
    
    transform: rotate(-45deg);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
.part1{
    bottom: 180px;
    right: 130px;
}
.part2{
    bottom: 115px;
    right: 60px;
}
.part3{
    bottom: 25px;
    right: -30px;
}
.user{
    outline: none;
    border: none;
    background: none;
    border-bottom: 1px solid white;
    font-size: 16px;
    color: #ffffff;
}
.user::placeholder{
    font-size: 17px;
}
.pass{
    outline: none;
    border: none;
    background: none;
    border-bottom: 1px solid white;
    font-size: 16px;
    color: #ffffff;
}
.pass::placeholder{
    font-size: 17px;
}
.btn{
    outline: none;
    border: none;
    background: #4044ED;
    color: #ffffff;
    height: 40px;
    font-size: 16px;
    font-weight: 100;
    cursor: pointer;
}
.link{
    color: #ffffff;
}
.link a{
    color: #4044ED;
}
