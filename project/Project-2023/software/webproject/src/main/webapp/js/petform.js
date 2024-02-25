/* global username */

"use strict";

let myArray = [];

var map;
var markerLayer;
var mapIsCreated = false;
var passIsWeak = false;
var usernameIsValid = false;
var emailIsValid = false;

var username_pk;
var password_pk;

const RED = "Red";
const GREEN = "Green";
const WHITE = "White";
const ORANGE = "Orange";
const BLACK = "Black";
const MyWidth = "10vw";
const MyHeight = "2.5vh";
const WEAK = "Weak Password";
const MEDIUM = "Medium Password";
const STRONG = "Strong Password";
const CENTER = "center";
const NONE = "none";
const BLOCK = "block";
const SHOW = "#228EFA";
const HideColor = "#f1f1f1";


function onDocumentReady()
{
    change_Photos();
    check_Password_Validity();
    toggle_Passwords();
    toggle_Passwords_login();
    toggle_Passwords_admin();
    check_Passwords();
    check_Address();
    set_Map();
    hide_Map();
    set_User_Type();
    select_Accom_Type();;
    set_Pet_Type();
    clear_Attributes();
    checkLoggedInUser();
    fetch_PetKeepers();
};

document.addEventListener("DOMContentLoaded",onDocumentReady);


/* Changes the photos of the home page */
function change_Photos()
{
    var img = document.getElementById("myImage");

    img.addEventListener("click",function()
    {
     
        if(img.src === "https://www.akc.org/wp-content/uploads/2015/06/Golden-Retriever-laying-down-playing-with-a-cat.jpeg")
        {
            img.src = "https://autumntrailsvet.com/wp-content/uploads/2022/06/what-are-similarities-between-cats-and-dogs.jpg";
        }
        else if(img.src === "https://autumntrailsvet.com/wp-content/uploads/2022/06/what-are-similarities-between-cats-and-dogs.jpg")
        {
            img.src = "https://thattogspot.com/wp-content/uploads/2020/05/Pippi-PortraitVideo-1-SM.jpeg"; 
        }
        else if(img.src === "https://thattogspot.com/wp-content/uploads/2020/05/Pippi-PortraitVideo-1-SM.jpeg")
        {
            img.src = "https://i.ibb.co/10VLQPt/myCats1.jpg"; 
        }
        else if(img.src === "https://i.ibb.co/10VLQPt/myCats1.jpg")
        {
                img.src = "https://littledogtips.com/wp-content/uploads/2017/11/20171117_171019-e1511672548451.jpg";
        }
        else if(img.src === "https://littledogtips.com/wp-content/uploads/2017/11/20171117_171019-e1511672548451.jpg")
        {
            img.src = "https://i.ibb.co/yff3wCR/myCats3.jpg"; 
        }
        else if(img.src === "https://i.ibb.co/yff3wCR/myCats3.jpg")
        {
            img.src="https://a-us.storyblok.com/f/1002562/1024x683/c3401c12a1/to-sleep-or-not-to-sleep-the-pros-and-cons-of-allowing-your-dog-to-sleep-in-your-bed.jpg";
        }
        else if(img.src === "https://a-us.storyblok.com/f/1002562/1024x683/c3401c12a1/to-sleep-or-not-to-sleep-the-pros-and-cons-of-allowing-your-dog-to-sleep-in-your-bed.jpg")
        {
            img.src = "https://tractive.com/blog/wp-content/uploads/2018/02/where_should_dog_sleep.jpg";
        }
        else if(img.src === "https://tractive.com/blog/wp-content/uploads/2018/02/where_should_dog_sleep.jpg")
        {
            img.src = "https://i.ibb.co/HzKX37Z/387622599-3469613149957099-3348945770668298812-n.jpg";
        }
        else
        {
            img.src = "https://www.akc.org/wp-content/uploads/2015/06/Golden-Retriever-laying-down-playing-with-a-cat.jpeg";
        }
        
    });
}



/* Toggles password between hidden and text  */
function toggle_Passwords()
{
    var passworda = document.getElementById("password1");
    var passwordb = document.getElementById("password2");
    var button1 = document.getElementById("showPass");

    button1.addEventListener("click",function()
    {
        if(passworda.type === "password" || passwordb.type === "password")
        {   
            button1.style.backgroundColor = SHOW;
            button1.style.color = WHITE;
            passworda.type = "text";
            passwordb.type = "text";
        }
        else
        {
            button1.style.backgroundColor = HideColor;
            button1.style.color = BLACK;
            passworda.type = "password";
            passwordb.type = "password";
        }
        

    });
   
}




/* Toggles password between hidden and text  */
function toggle_Passwords_login()
{
    var password = document.getElementById("password_login");
    var button2 = document.getElementById("showPass2");

    button2.addEventListener("click",function()
    {
        if (password.type === "password") {
        button2.style.backgroundColor = SHOW;
        button2.style.color = WHITE;
        password.type = "text";
    } else {
        button2.style.backgroundColor = HideColor;
        button2.style.color = BLACK;
        password.type = "password";
    }
    });  
}



/* Toggles password between hidden and text  */
function toggle_Passwords_admin()
{
    var password = document.getElementById("admin_password");
    var bttn = document.getElementById("showAdminPswd");

    bttn.addEventListener('click',function()
    {
        console.log('i clicked');
        
        if (password.type === "password") 
        {
            bttn.style.backgroundColor = SHOW;
            bttn.style.color = WHITE;
            password.type = "text";
        } 
        else 
        {
            bttn.style.backgroundColor = HideColor;
            bttn.style.color = BLACK;
            password.type = "password";
        }
    });  
}




/* Checks if the given passwords are equal */
function check_Passwords()
{
    var errorMessg = document.getElementById("prt-message3");
    var button = document.getElementById("equalPass");

    button.addEventListener("click",function()
    {
        var passwordA = document.getElementById("password1").value;
        var passwordB = document.getElementById("password2").value;

        if (passwordA !== passwordB) 
        {
            if(passwordA.length === 0)
            {
                errorMessg.style.color = "Red";
                errorMessg.innerHTML = "Please enter the password !";
            }
            else if(passwordB.length === 0)
            {
                errorMessg.style.color = "Red";
                errorMessg.innerHTML = "Please enter the verification password !";
            }
            else
            {
                errorMessg.style.color = "Red";
                errorMessg.innerHTML = "&#10060;";
            }
            
        }
        else if(passwordA.length === 0 || passwordB.length === 0)
        {
            errorMessg.style.color = "Red";
            errorMessg.innerHTML = "Please enter both passwords !";
        }
        else
        {
            errorMessg.innerHTML = "&#10004;&#65039;";
        }
    });
}



/* Checks if there are forbidden words or sequences in the password*/
function check_Password_Validity()
{
    var forbidSeq = ["cat", "dog", "gata", "skulos"];
    var errmessg_a = document.getElementById("prt-message");
    var errmessg_b = document.getElementById("prt-message2"); 

    var input1 = document.getElementById("password1");
    var input2 = document.getElementById("password2");


    input1.addEventListener("change",function()
    {
        var originalValue = input1.value;
        var inputValue = input1.value.toLowerCase();
        var isForbidden = false;

        for(var i=0; i<forbidSeq.length; i++)
        {
            if(inputValue.includes(forbidSeq[i]))
            {
                isForbidden = true;
                break;
            }
        }

        if(isForbidden)
        {
                errmessg_a.style.color = RED;
                errmessg_a.innerHTML = "Found either dog, cat, skylos, gata in the password !";
        }
        else
        {
            errmessg_a.innerHTML = "";
            var passLength = inputValue.length;
            var numCounter = 0;
            const isLowerCase = /[a-z]/.test(originalValue);
            const isUppercase = /[A-Z]/.test(originalValue);
            const isSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(originalValue);

            for(var i=0; i<passLength; i++)
            {
                if(inputValue.charAt(i).match(/\d/g))
                {
                    numCounter++;
                }
            }

            if(numCounter > passLength/2)
            {
                errmessg_a.style.width = MyWidth;
                errmessg_a.style.height = MyHeight;
                errmessg_a.style.backgroundColor = RED;
                errmessg_a.style.color = WHITE;
                errmessg_a.style.textAlign = CENTER;
                errmessg_a.innerHTML = WEAK;
                passIsWeak = true;
                alert("Submit Button has been disabled due to Weak Password");
            }
            else if(numCounter >= 3 && isLowerCase && isUppercase && isSymbol)
            {
                errmessg_a.style.width = MyWidth;
                errmessg_a.style.height = MyHeight;
                errmessg_a.style.backgroundColor = GREEN;
                errmessg_a.style.color = WHITE;
                errmessg_a.style.textAlign = CENTER;
                errmessg_a.innerHTML = STRONG;
                passIsWeak = false;
            }
            else if(passLength === 0)
            {
                errmessg_a.innerHTML ="";
                passIsWeak = true;
            }
            else
            {
                errmessg_a.style.width = MyWidth;
                errmessg_a.style.height = MyHeight;
                errmessg_a.style.backgroundColor = ORANGE;
                errmessg_a.style.color = BLACK;
                errmessg_a.style.textAlign = CENTER;
                errmessg_a.innerHTML = MEDIUM;
                passIsWeak = false;
            }
            
        }
    });

    input2.addEventListener("change",function()
    {
        var inputValue = input2.value.toLowerCase();
        var isForbidden = false;

        for(var i=0; i<forbidSeq.length; i++)
        {
            if(inputValue.includes(forbidSeq[i]))
            {
                isForbidden = true;
                break;
            }
        }

        if(isForbidden)
        {
            errmessg_b.style.color = RED;
            errmessg_b.innerHTML = "Found either dog, cat, skylos, gata in the password !";

        }
        else
        {
            errmessg_b.innerHTML = "";
        }
    });

}




/* Checks if the adress exists */
function check_Address()
{
    var errmssg = document.getElementById("addr-message");
    var addr = document.getElementById("address");
    
    addr.addEventListener("change",function()
    {
        const address = document.getElementById("address").value;
        const country = document.getElementById("country").value;
        const city = document.getElementById("city").value;

        const url = "https://nominatim.openstreetmap.org/search?street=" + address 
                    + "&city=" + city + "&country=" + country + "&format=json";

        let xhtpReq = new XMLHttpRequest();

        xhtpReq.onreadystatechange = function ()
        {
            if(this.status === 200 && this.readyState === 4)
            {
                myArray = JSON.parse(this.response);

                if(myArray.length === 0)
                {
                    document.getElementById("showMap").style.display = NONE;
                    document.getElementById("hideMap").style.display = NONE;
                    document.getElementById("map").style.display = NONE;
                    errmssg.style.display = BLOCK;
                    errmssg.style.color = RED;
                    errmssg.innerHTML = "Address was not found !";
                }
                else
                {
                    var displayName = myArray[0].display_name;
                    
                    if(displayName.includes("Heraklion"))
                    {
                        var showmap = document.getElementById("showMap");

                        errmssg.style.display = NONE;
                        
                        showmap.style.backgroundColor = SHOW;
                        showmap.style.color = WHITE;
                        showmap.style.display = BLOCK;
  
                    }
                    else 
                    {
                        document.getElementById("showMap").style.display = NONE;
                        document.getElementById("hideMap").style.display = NONE;
                        errmssg.style.display = BLOCK;
                        errmssg.style.color = RED;
                        errmssg.innerHTML = " Sorry :( The service is only available in Heraklion at the moment !";
                    }
                }
            }
        }
        xhtpReq.open("GET",url,true);
        xhtpReq.send();
    });
}




/* Creates a new map, if the map doesn't exist */
function set_Map()
{   
    var button =  document.getElementById("showMap");
    button.addEventListener("click",function()
    {
        if(!mapIsCreated)
        {
            var hidemap = document.getElementById("hideMap");
        
            hidemap.style.backgroundColor = RED;
            hidemap.style.color = WHITE;
            hidemap.style.display = BLOCK;

            document.getElementById('map').style.display = BLOCK;
            document.getElementById('map').style.height = "400px";
            document.getElementById('map').style.width = "1400px";
            
            map = new OpenLayers.Map("map");
            map.addLayer(new OpenLayers.Layer.OSM());
            markerLayer = new OpenLayers.Layer.Markers("marker");
            map.addLayer(markerLayer);

            var fromProjection = new OpenLayers.Projection("EPSG:4326");
            var toProjection = new OpenLayers.Projection("EPSG:900913");
            var mylat = myArray[0].lat;
            var mylon = myArray[0].lon;
            var position = new OpenLayers.LonLat(mylon,mylat).transform(fromProjection,toProjection);
            var zoom = 15;

            markerLayer.addMarker(new OpenLayers.Marker(position));
            map.setCenter(position,15);

            mapIsCreated = true;
        }
        else
        {
            // document.getElementById('map').style.display = BLOCK;
            map.destroy();
            var hidemap = document.getElementById("hideMap");
        
            hidemap.style.backgroundColor = RED;
            hidemap.style.color = WHITE;
            hidemap.style.display = BLOCK;

            document.getElementById('map').style.display = BLOCK;
            document.getElementById('map').style.height = "400px";
            document.getElementById('map').style.width = "1400px";
            
            map = new OpenLayers.Map("map");
            map.addLayer(new OpenLayers.Layer.OSM());
            markerLayer = new OpenLayers.Layer.Markers("marker");
            map.addLayer(markerLayer);

            var fromProjection = new OpenLayers.Projection("EPSG:4326");
            var toProjection = new OpenLayers.Projection("EPSG:900913");
            var mylat = myArray[0].lat;
            var mylon = myArray[0].lon;
            var position = new OpenLayers.LonLat(mylon,mylat).transform(fromProjection,toProjection);
            var zoom = 15;

            markerLayer.addMarker(new OpenLayers.Marker(position));
            map.setCenter(position,15);

            mapIsCreated = true;
            document.getElementById("hideMap").style.display = BLOCK;
        }

    });
}




/* Hides the map */
function hide_Map()
{
    var bttn = document.getElementById("hideMap");

    bttn.addEventListener("click",function()
    {
        document.getElementById("map").style.display = NONE;

        bttn.style.display = NONE;
    });
}




/* Loads new content if the user is a pet keeper */
function set_User_Type()
{
    var userType = document.getElementById("usertype");
    var extraFields = document.getElementById("extraPetKeeper");

    userType.addEventListener("change",function()
    {
        console.log("User changed");
        console.log(userType.value);
        
        if(userType.value === "2")
        {
            extraFields.style.display = BLOCK;
        }
        else
        {
            extraFields.style.display = NONE;
        }
    });
}




/* Loads new content based on what accommodation type can the user provide */
function select_Accom_Type()
{
    var bothAreas = document.getElementById("both_areas");
    var outdoorArea = document.getElementById("outdoor_area");

    var accomType = document.getElementById("accommodation");

    accomType.addEventListener("change",function()
    {
        if(accomType.value === 1)
        {
            bothAreas.style.display = BLOCK;
            outdoorArea.style.display = NONE;
        }
        else if(accomType.value === 2)
        {
            outdoorArea.style.display = BLOCK;
            bothAreas.style.display = NONE;
        }
        else
        {
            bothAreas.style.display = BLOCK;
            outdoorArea.style.display = NONE;
        }
    });
}




/* Loads new content based on what pet has been selected*/
function set_Pet_Type()
{
    var cats = document.getElementById("onlycat");
    var dogs = document.getElementById("onlydog");
    var pets = document.getElementById("bothpets");

    var petType = document.getElementById("pet_selection");

    petType.addEventListener("change",function()
    {
        if(petType.value === "1")
        {
            cats.style.display = BLOCK;
            dogs.style.display = NONE;
            pets.style.display = NONE;
        }
        else if(petType.value === "2")
        {
            cats.style.display = NONE;
            dogs.style.display = BLOCK;
            pets.style.display = NONE;
        }
        else
        {
            cats.style.display = NONE;
            dogs.style.display = NONE;
            pets.style.display = BLOCK;
        }
    });
}


 

/* Clears the attributes */
function clear_Attributes()
{
    var bttnn = document.getElementById("clear_attributes");
    var button_clear = document.getElementById("clear_attributes_login");
    
    
    bttnn.addEventListener("click",function()
    {
        var prt = document.getElementById("prt-message");
        var prt2 = document.getElementById("prt-message2");
        var prt3 = document.getElementById("prt-message3");
        var prt4 = document.getElementById("addr-message");
        var prt5 = document.getElementById("map");
        var bttn1 = document.getElementById("showMap");
        var bttn2 = document.getElementById("hideMap");
        var bttn3 = document.getElementById("showPass");
        var extraFields = document.getElementById("extraPetKeeper");
      

        prt.innerHTML = "";
        prt.style.backgroundColor = WHITE;
      
        prt2.innerHTML = "";
        prt2.style.backgroundColor = WHITE;

        prt3.innerHTML = "";
        prt.style.backgroundColor = WHITE;

        prt4.innerHTML = "";

        if(mapIsCreated)
        {
            markerLayer.clearMarkers();
            map.destroy();
            mapIsCreated = false;
            prt5.style.display = NONE;
        }

        bttn1.style.display = NONE;
        bttn2.style.display = NONE;
        bttn3.style.backgroundColor = HideColor;
        bttn3.style.color = BLACK;

        extraFields.style.display = NONE;
    });
    
    button_clear.addEventListener("click", function()
    {
        var clear_login = document.getElementById("login_return_result");
        clear_login.innerHTML = "";
    });

}




/* Implement sign up*/
function sign_Up()
{
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password2").value;
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var birthdate = document.getElementById("birthdate").value;
  var job = document.getElementById("job").value;
  var personalpage = document.getElementById("personalpage").value;

  var selectElement = document.getElementById("gender");
  var selectedValue = selectElement.value;

  var gender =  selectedValue === "1" ? "Male" :
                selectedValue === "2" ? "Female" :
                selectedValue === "3" ? "Other" :
                "N/A";   
  var country = document.getElementById("country").value;
  var city = document.getElementById("city").value;
  var address = document.getElementById("address").value;
  var telephone = document.getElementById("telephone").value.toString();

  var lon = parseFloat(myArray[0].lon);
  var lat = parseFloat(myArray[0].lat);
  
  var usType = document.getElementById("usertype").value;
  
  if(usType === "1")
  {

    var xhttpReq = new XMLHttpRequest();
    var url = "/ServletWithDatabaseConnection2023_2024_Maven/NewUser?type=petowner";

    xhttpReq.open("POST", url, true);

    xhttpReq.onreadystatechange = function () {
    if (xhttpReq.readyState === 4 && xhttpReq.status === 200){
        alert('Succeded!');
        console.log("Request Succeded !");
      }
      else{
          alert('Error!');
          console.log("Something went wrong with your request !!!");
      }
    };

    var data = JSON.stringify({
      username,
      email,
      password,
      firstname,
      lastname,
      birthdate,
      gender,
      country,
      city,
      address,
      lat,
      lon,
      telephone,
      personalpage,
      job
    });

    
    xhttpReq.send(data);    
  }
  else
  {
        
        var selectProperty = document.getElementById("accommodation").value;
        var property =  selectProperty === "1" ? "Indoor" :
                        selectProperty === "2" ? "Outdoor" :
                        selectProperty === "3" ? "Both" :
                        "N/A";
        var propertydescription = "";
        var bothAreas = document.getElementById("both_areas");
        var outdoorArea = document.getElementById("outdoor_area");
        var catkeeper;
        var dogkeeper;
        var catprice;
        var dogprice;
        
        if (bothAreas.style.display === 'block') 
        {
//            console.log('Both Areas selected');
            var petSelect = document.getElementById("pet_selection").value;
             
            if(petSelect === "1")
            {
                catkeeper = "true";
                dogkeeper = "false";
                catprice = document.getElementById("catprice").value;
                dogprice = 0;
            }
            else if(petSelect === "2")
            {
                catkeeper = "false";
                dogkeeper = "true";
                catprice = 0;
                dogprice = document.getElementById("dogprice").value;
            }
            else
            {
                catkeeper = "true";
                dogkeeper = "true";
                catprice = document.getElementById("catprice").value;
                dogprice = document.getElementById("dogprice").value;
            }
                    
        
        } 
        else if (outdoorArea.style.display === 'block') 
        {
//            console.log('Outdoor Area selected');
            catkeeper = "false";
            dogkeeper = "true";
            catprice = 0;
            dogprice = document.getElementById("dogprice").value;
        } 
        else 
        {
//            console.log('No area selected');
            catkeeper = "false";
            dogkeeper = "false";
            catprice = 0;
            dogprice = 0;
        }
                
        var xhttpReq = new XMLHttpRequest();
        var url = "/ServletWithDatabaseConnection2023_2024_Maven/NewUser?type=petkeeper";
        
        // open a connection
        xhttpReq.open("POST", url, true);
        
        // Create a state change callback
        xhttpReq.onreadystatechange = function () {
            if (xhttpReq.readyState === 4 && xhttpReq.status === 200) 
            {
                console.log("Success!!!");
            }
            else
            {
                console.log("ERROR");
            }
        };
        
        // Converting JSON data to string
        var data = JSON.stringify({
          username,
          email,
          password,
          firstname,
          lastname,
          birthdate,
          gender,
          country,
          city,
          address,
          lat,
          lon,
          telephone,
          personalpage,
          job,
          property,
          propertydescription,
          catkeeper,
          dogkeeper,
          catprice,
          dogprice
        });

        // Sending data with the request
        xhttpReq.send(data);
  }

}




/* Checks if the username already exists */
function check_Username(event)
{
    var username = event.currentTarget.value;
    var xhttpReq = new XMLHttpRequest();
    
    xhttpReq.onreadystatechange = function ()
    {
        if(this.status === 200 && this.readyState === 4)
        {
            var usermssg = document.getElementById("usernameExists");
            usermssg.innerHTML = "";
            usernameIsValid = true;
        }
        else 
        {
            var usermssg = document.getElementById("usernameExists");
            usermssg.style.color = "red";
            usermssg.innerHTML = "There is already a registered user with this username !";
            usernameIsValid = false;
        }
    };
    
    xhttpReq.open("GET", "/ServletWithDatabaseConnection2023_2024_Maven/CheckDuplicates?type=username&username=" + username, true);
    xhttpReq.send();
}




/* Checks if the email already exists */
function check_Email(event)
{
    var email = event.currentTarget.value;
    var xhttpReq = new XMLHttpRequest();
    
    xhttpReq.onreadystatechange = function ()
    {
        if(this.status === 200 && this.readyState === 4)
        {
            var emlmssg = document.getElementById("emailExists");
            emlmssg.innerHTML = "";
            emailIsValid = true;
        }
        else 
        {
            var emlmssg = document.getElementById("emailExists");
            emlmssg.style.color = "red";
            emlmssg.innerHTML = "There is already a registered account with this eimail !";
            emailIsValid = false;
        }
    };
    
    xhttpReq.open("GET", "/ServletWithDatabaseConnection2023_2024_Maven/CheckDuplicates?type=email&email=" + email, true);
    xhttpReq.send();
}




/* Implements log in */
function user_Login()
{
    event.preventDefault();
    
    username_pk = document.getElementById("username_login").value; 
    password_pk = document.getElementById("password_login").value;
    
    localStorage.setItem("username_pk",username_pk);
    localStorage.setItem("password_pk",password_pk);
    
    var type = document.getElementById('usertype2').value;
    
    
    console.log('username = ' + username_pk);
    console.log('password = ' + password_pk);
    console.log('type = ' + type);
    
    switch(type)
    {
        case "1" :
                var xhttpReq = new XMLHttpRequest();
                xhttpReq.onload = function () 
                {
                  if (xhttpReq.readyState === 4 && xhttpReq.status === 200) 
                  {
                    document.cookie = "user_status=logged_in; expires=Session; path=/";
                    window.location.href = "/ServletWithDatabaseConnection2023_2024_Maven/petowner.html";
                  }
                  else
                  {
                    var displ_mssg = document.getElementById("login_return_result");
                    displ_mssg.style.color = "red";
                    displ_mssg.innerHTML = "Please make sure your username & password are correct !";
                  }
                };

                xhttpReq.open("GET", "/ServletWithDatabaseConnection2023_2024_Maven/GetPetOwner?username=" + username_pk + "&password=" + password_pk);
                xhttpReq.send();
                break;
        case "2" :
                var xhttpReq = new XMLHttpRequest();
                xhttpReq.onload = function () 
                {
                  if (xhttpReq.readyState === 4 && xhttpReq.status === 200) 
                  {
                    document.cookie = "user_status=logged_in; expires=Session; path=/";
                    window.location.href = "/ServletWithDatabaseConnection2023_2024_Maven/petkeeper.html";
                  }
                  else
                  {
                    var displ_mssg = document.getElementById("login_return_result");
                    displ_mssg.style.color = "red";
                    displ_mssg.innerHTML = "Please make sure your username & password are correct !";
                  }
                };

                xhttpReq.open("GET", "/ServletWithDatabaseConnection2023_2024_Maven/GetPetKeeper?username=" + username_pk + "&password=" + password_pk);
                xhttpReq.send();
                break;
        default :
            alert('Error in the given credentials!');
            break;
    }
    
    
    
}




/* Implements log out */
function log_Out()
{
   alert("You have succesfully logged out !");
   document.cookie = "user_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   window.location.href = "/ServletWithDatabaseConnection2023_2024_Maven/petform.html";
}




/** Checks if the user is active */
function checkLoggedInUser() 
{
    var userStatusCookie = document.cookie.replace(/(?:(?:^|.*;\s*)user_status\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (userStatusCookie === "logged_in") 
    {
        console.log("User is acctive");
    } 
    else 
    {
        console.log("User is not active");
    }
}





function apply_Changes()
{
    var username = document.getElementById("usernamenew").value;
    var password = document.getElementById("passwordnew").value;
    var firstname = document.getElementById("firstnamenew").value;
    var lastname = document.getElementById("lastnamenew").value;
    var birthdate = document.getElementById("birthdatenew").value;
    var job = document.getElementById("jobnew").value;
    var personalpage = document.getElementById("personalpagenew").value;

    var selectElement = document.getElementById("gendernew");
    
    var selectedValue = selectElement.value;

    var gender =  selectedValue === "1" ? "Male" :
                  selectedValue === "2" ? "Female" :
                  selectedValue === "3" ? "Other" :
                  "N/A";   
    var country = document.getElementById("countrynew").value;
    var city = document.getElementById("citynew").value;
    var address = document.getElementById("addressnew").value;
    var telephone = document.getElementById("telephonenew").value.toString();
    var lon = parseFloat(myArray[0].lon);
    var lat = parseFloat(myArray[0].lat);
    var selectProperty = document.getElementById("accommodation").value;
    var property =  selectProperty === "1" ? "Indoor" :
                    selectProperty === "2" ? "Outdoor" :
                    selectProperty === "3" ? "Both" :
                    "N/A";
    var propertydescription = document.getElementById("acomDescriptnew");
    var bothAreas = document.getElementById("both_areas");
    var outdoorArea = document.getElementById("outdoor_area");
    var catkeeper;
    var dogkeeper;
    var catprice;
    var dogprice;
    
    var petSelect = document.getElementById("pet_selectionnew").value;
             
    if(petSelect === "1")
    {
        catkeeper = "true";
        dogkeeper = "false";
        catprice = document.getElementById("catpricenew").value;
        dogprice = 0;
    }
    else if(petSelect === "2")
    {
        catkeeper = "false";
        dogkeeper = "true";
        catprice = 0;
        dogprice = document.getElementById("dogpricenew").value;
    }
    else
    {
        catkeeper = "true";
        dogkeeper = "true";
        catprice = document.getElementById("catpricenew").value;
        dogprice = document.getElementById("dogpricenew").value;
    }
            
    var xhttpReq = new XMLHttpRequest();
    var url = "/ServletWithDatabaseConnection2023_2024_Maven/UpdateUser";

    // open a connection
    xhttpReq.open("POST", url, true);

    // Create a state change callback
    xhttpReq.onreadystatechange = function () {
        if (xhttpReq.readyState === 4 && xhttpReq.status === 200) 
        {
            console.log("Request Succeded !");
            alert("Changes Saved Successfully!");
        }
        else
        {
            console.log("Something went wrong with your request !!!");
        }
    };

    // Converting JSON data to string
    var data = JSON.stringify({
      username,
      password,
      firstname,
      lastname,
      birthdate,
      gender,
      country,
      city,
      address,
      lat,
      lon,
      telephone,
      personalpage,
      job,
      property,
      propertydescription,
      catkeeper,
      dogkeeper,
      catprice,
      dogprice
    });

    // Sending data with the request
    xhttpReq.send(data);
            
}




/* Checks if the updated adress exists */
function update_address()
{
    var errmssg = document.getElementById("addr-messagenew");
    
    const address = document.getElementById("addressnew").value;
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;

    const url = "https://nominatim.openstreetmap.org/search?street=" + address 
                + "&city=" + city + "&country=" + country + "&format=json";

    let xhtpReq = new XMLHttpRequest();

    xhtpReq.onreadystatechange = function ()
    {
        if(this.status === 200 && this.readyState === 4)
        {
            myArray = JSON.parse(this.response);

            if(myArray.length === 0)
            {
                errmssg.style.display = BLOCK;
                errmssg.style.color = RED;
                errmssg.innerHTML = "Address was not found !";
            }
            else
            {
                var displayName = myArray[0].display_name;

                if(displayName.includes("Heraklion"))
                {
                    errmssg.style.display = NONE;
                }
                else 
                {
                    errmssg.style.display = BLOCK;
                    errmssg.style.color = RED;
                    errmssg.innerHTML = " Sorry :( The service is only available in Heraklion at the moment !";
                }
            }
        }
    
    xhtpReq.open("GET",url,true);
    xhtpReq.send();
    
    };
}




/* Checks for correct credential in admin */
function check_admin(){   
    
    event.preventDefault();
     
    var password_a = "admin123!";
    var username_a = "admin";
    var toPrint = document.getElementById("admin_pssw_result");
      
    var username_admin = document.getElementById("admin_username").value; 
    var password_admin = document.getElementById("admin_password").value;
    
    console.log("username = " + username_admin);
    console.log("password = " + password_admin);
    
    if(password_admin !== password_a || username_admin !== username_a)
    {
        toPrint.style.color = RED;
        toPrint.innerHTML = "Either username or password are not correct!";
    }
    else
    {
        window.location.href = "/ServletWithDatabaseConnection2023_2024_Maven/admin.html";
    }
}




/* An asynchronous function to fetch the pet keepers when the document is loaded */
async function fetch_PetKeepers()
{
    try {
        const response = await fetch('/ServletWithDatabaseConnection2023_2024_Maven/PrintPetKeepers');
        const data = await response.json();

        
        const tableBody = document.querySelector('#petkeepersTable tbody');

        
        tableBody.innerHTML = '';

        
        data.forEach((petKeeper, index) => {
            const row = tableBody.insertRow();

            
            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = petKeeper.firstname;
            row.insertCell(2).textContent = petKeeper.lastname;  
            row.insertCell(3).textContent = petKeeper.email;
            row.insertCell(4).textContent = petKeeper.personalpage; 
        });
    } catch (error) {
        console.error('Error fetching pet keepers:', error);
    }
}




/* Asynchronous Call */
