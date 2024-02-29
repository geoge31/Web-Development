/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global resonse, xhttpReq, username, response, myUsername */

var myUsername = localStorage.getItem("username_pk");
var myPassword = localStorage.getItem("password_pk");
var PetOwnerID;
var petType;




function onDocumentReady()
{
    about_Me();
    log_Out();
    openPet();
    fetch_PetOwnerCredentials();
    findIfHasPet();
//    validate_PetID();
    validate_BirthYear();
    validate_Weight();
    validate_Photo();
    viewAvailableKeepers();
};

document.addEventListener('DOMContentLoaded',onDocumentReady);




// Displays model of about me
function about_Me()
{
    var bttn = document.getElementById('about_me');
    
    bttn.addEventListener('click',function()
    {
        document.getElementById('id03').style.display = 'block';
    });
}




// Log out function 
function log_Out()
{
    var bttn = document.getElementById('lgoutBttn');
    
    bttn.addEventListener('click',function()
    {
        if(confirm('Are you sure you wish to log out?'))
        {
            window.location.href = "/ServletWithDatabaseConnection2023_2024_Maven/petform.html";
        }
    });
}




// Displays model of adding a pet 
function openPet()
{
    var bttn = document.getElementById('addPet');
    
    bttn.addEventListener('click',function()
    {
        document.getElementById('id02').style.display = 'block';
    });
}




// Asynchronous fetches the Credentials of Pet keeper
async function fetch_PetOwnerCredentials()
{
    const response = await fetch("/ServletWithDatabaseConnection2023_2024_Maven/GetPetOwner?username=" + myUsername + "&password=" + myPassword);
    
    if(response.ok)
    {
        
        const user = await response.json();
        
        const username = user.username;
        const email = user.email;
        const password = user.password;
        const firstname = user.firstname;
        const lastname = user.lastname;
        const birthdate = user.birthdate;
        const gender =    user.gender === "Male" ? "Male" :
                          user.gender === "Female" ? "Female" :
                          user.gender === "Other" ? "Other" :
                          "N/A";
        const country = user.country;
        const city = user.city;
        const address = user.address;
        const telephone = user.telephone;
        const job = user.job;
        const personalpage = user.personalpage;
        
        var id = user.owner_id;
        
        set_Value("PetOwnerID",id);
        

           
        document.querySelector("#id03").innerHTML = `
                <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">&times;</span>
 
        <form class='modal-content'>

            <div class="container">

                <h2>My Credentials</h2><br>
            
                <label for="username">*Username</label>
                <input type="text" id="username" value="${username}" disabled>
                
                <label for="email">*Email</label>
                <input type="text" id="email" value="${email}" disabled>
                
                <label for="password">*Password</label>

                <input type="password" id="password" value="${password}">

                <div id="prt-message"></div><br>
                <div id="prt-message2"></div><br>

                <button type="button" id="showPassnew">Show Password</button><br><br>

                <label for="firstname">*First Name</label>
                <input type="text" id="firstname" value="${firstname}"><br>


                <label for="lastname">*Last Name</label>
                <input type="text" id="lastname" value="${lastname}"><br>


                <label for="country">*Country</label><br>
                  <select id="country" name="country"> 
                        <option value="Greece">Greece</option>
                        <option value="Afganistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bonaire">Bonaire</option>
                        <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Canary Islands">Canary Islands</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Channel Islands">Channel Islands</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">Christmas Island</option>
                        <option value="Cocos Island">Cocos Island</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote DIvoire">Cote DIvoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Curaco">Curacao</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands">Falkland Islands</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">French Polynesia</option>
                        <option value="French Southern Ter">French Southern Ter</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Great Britain">Great Britain</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="India">India</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea North">Korea North</option>
                        <option value="Korea Sout">Korea South</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Midway Islands">Midway Islands</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Nambia">Nambia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherland Antilles">Netherland Antilles</option>
                        <option value="Netherlands">Netherlands (Holland, Europe)</option>
                        <option value="Nevis">Nevis</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau Island">Palau Island</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Phillipines">Philippines</option>
                        <option value="Pitcairn Island">Pitcairn Island</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Republic of Montenegro">Republic of Montenegro</option>
                        <option value="Republic of Serbia">Republic of Serbia</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="St Barthelemy">St Barthelemy</option>
                        <option value="St Eustatius">St Eustatius</option>
                        <option value="St Helena">St Helena</option>
                        <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                        <option value="St Lucia">St Lucia</option>
                        <option value="St Maarten">St Maarten</option>
                        <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                        <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                        <option value="Saipan">Saipan</option>
                        <option value="Samoa">Samoa</option>
                        <option value="Samoa American">Samoa American</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tahiti">Tahiti</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Erimates">United Arab Emirates</option>
                        <option value="United States of America">United States of America</option>
                        <option value="Uraguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City State">Vatican City State</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                        <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                        <option value="Wake Island">Wake Island</option>
                        <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zaire">Zaire</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                  </select><br>

                 
                <label for="city">*City</label>
                 <input type="text" id="city" value="${city}"><br>


                <label for="address">*Address</label>
                <input type="text" id="address" value="${address}"><br>
 
                <div id="addr-message"></div><br>


                <button type="button" id="showMap" style="display: none;">Show Map</button>
                <button type="button" id="hideMap" style="display: none;">Hide Map</button>
 
                <div id="map" style="display: none;"></div><br>

                <label for="birthdate">*Birth date</label><br>
                <input type="date" id="birthdate" value="${birthdate} "min="1920-01-01" max="2005-12-31"><br>


                <label for="gender">*Gender</label><br>
                  <select id="gender" name="gender" value="${gender}">
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3" >Other</option> 
                  </select><br>

                 
                <label for="usertype">*User</label><br>
                  <select id="usertype" value="${usertype}">
                    <option value="1">Pet Owner</option>
                    <option value="2">Pet Keeper</option>
                </select><br>

                <label for="personalpage">Personal Page</label>
                <input type="text" id="personalpage" value="${personalpage}"><br>

                <label for="job">Job</label>
                <input type="text" id="job" value="${job}"><br>


                <label for="telephone">Mobile Phone</label>
                <input type="tel" id="telephone" value="${telephone}"><br>
 
                
                <label>
                    <input type="checkbox" id="terms" value="checked"> <a href="#"> *Terms & Conditions</a>
                </label><br><br>


                <div class="clearfix">
                    <button type="reset" id="petkeeperClearAttributes" class="cancelbtn">Clear</button>
                    <button type="submit" id="petkeeperSaveChanges" class="signupbtn">Save Changes</button>
                </div>

            </div>

          </form>

            `;            
    }
    
 }
 
 
 
 
// Validates pet's  birth year
function validate_BirthYear()
{
    var chng = document.getElementById('birthyear');
    
    chng.addEventListener('change',()=>
    {
        console.log(chng.value);
        
        if(parseInt(chng.value) <= 2000)
        {
            document.getElementById('birth-rslt').style.color = 'red';
            document.getElementById('birth-rslt').innerHTML = 'Pet cannot have been borrn before year 2000';
        }else
        {
            document.getElementById('birth-rslt').innerHTML = '';
    }
        
    });
 
}




// validates Pet's weight
function validate_Weight()
{
   var chng = document.getElementById('weight');
    
    chng.addEventListener('change',()=>
    {
        console.log(chng.value);
        
        if(parseFloat(chng.value) <= 0)
        {
            document.getElementById('weight-rslt').style.color = 'red';
            document.getElementById('weight-rslt').innerHTML = 'A Pet cannot be 0 or negative in weight';
        }else
        {
            document.getElementById('weight-rslt').innerHTML = '';
    }
        
    }); 
}




// Validates photo
function validate_Photo()
{
    var chng = document.getElementById('photo');
    
    chng.addEventListener('change',()=>
    {
        console.log(chng.value);
        
        if(!isValidUrl(chng.value)){
            
            document.getElementById('phtreslt').style.color = 'red';
            document.getElementById('phtreslt').innerHTML = 'Not a valid photo of your pet';
        }else{
            
            document.getElementById('phtreslt').innerHTML = '';
        }
        
    });
}




// Checks if it is a valid 
function isValidUrl(url)
{
    try{
        new URL(url);
        return true;
    }catch(error){
        return false;
    }
}




// Gets the owner's id and checks if he has already a pet
async function findIfHasPet()
{
    
    try{
        var owner_id = localStorage.getItem('PetOwnerID');
    
        const response = await fetch("/ServletWithDatabaseConnection2023_2024_Maven/FindIfOwnerHasPet?owner_id=" + owner_id);
        
        if(response.ok){
            const data = await response.json();
        
            if(data){
                console.log('Json info: ',data);
                
                set_Value("petType",data.type);
                set_Value("pet_id",data.pet_id);
                
                document.getElementById('user-has-pet').style.color = 'red';
                document.getElementById('user-has-pet').innerHTML = 'You have already a registered pet';
                document.getElementById('addPet').disabled = true;
            }else{
                console.log('User has no pet');
                document.getElementById('user-has-pet').innerHTML = '';
                document.getElementById('addPet').disabled = false;
            } 
        }else{
            console.log('Error in fetch');
        }
    }catch(error){
        console.log('Error in Servlet : FindIfOwnerHasPet');
    }
    
    
    
}




//
function register_Pet()
{

    var name = document.getElementById('name').value;
    var pet_id = document.getElementById('pet_id').value;
    var type = document.querySelector('input[name="type"]:checked');
    var breed = document.getElementById('breed').value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var weight = document.getElementById('weight').value;
    var description = document.getElementById('description').value;
    var photo = document.getElementById('photo').value;
    var owner_id = localStorage.getItem('PetOwnerID');
    console.log(owner_id,pet_id,name,type,breed,gender,weight,description,photo);

    var xhr = new XMLHttpRequest();
    var url = "/ServletWithDatabaseConnection2023_2024_Maven/NewPet";

    xhr.open("POST", url, true);

    xhr.onreadystatechange = function () 
    {
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log('Request Succeeded !');
            alert('success reg');
        }else{
            console.log('Something went wrong with your request !!!');
            console.log('error reg');
        }
    };
    
    var data = JSON.stringify({
        pet_id,
        owner_id,
        name,
        type,
        breed,
        gender,
        weight,
        description,
        photo
    });

    xhr.send(data);
        
}




// Asynchronus fetches all the keepers based on pet type of the owner
async function viewAvailableKeepers()
{
    try{
        var pettype = localStorage.getItem('petType');
        
        const response = await fetch("/ServletWithDatabaseConnection2023_2024_Maven/GetAvailableKeepers?type=" + pettype);
        
        if(response.ok){
            const data = await response.json();
            const tableBody = document.querySelector('#availableKeepers tbody');
           
            tableBody.innerHTML = '';
            
            if(data){
                
                console.log('Found pet keepers for your ' + pettype);
                if(pettype === "cat"){
                
                    data.forEach((petKeeper, index) => {
                        const row = tableBody.insertRow();

                        row.insertCell(0).textContent = index + 1;
                        row.insertCell(1).textContent = petKeeper.firstname;
                        row.insertCell(2).textContent = petKeeper.lastname;  
                        row.insertCell(3).textContent = petKeeper.email;
                        row.insertCell(4).textContent = petKeeper.telephone; 
                        row.insertCell(5).textContent = 'cat'; 
                        row.insertCell(6).textContent = petKeeper.catprice; 
                        row.insertCell(7).textContent = petKeeper.city; 
                        row.insertCell(8).textContent = petKeeper.address; 
                        row.insertCell(9).textContent = petKeeper.property; 
                        row.insertCell(10).textContent = petKeeper.propertydescription;  
                        
                        const buttonCell = row.insertCell(11);
                        const button = document.createElement('button');
                        button.textContent = 'Book';
                        button.style.backgroundColor = 'green';
                        button.style.color = 'white';
                        buttonCell.appendChild(button);
                        
                        set_Value("keeper_id",petKeeper.keeper_id);

                        button.addEventListener('click',()=>
                        {
                            var res = confirm('Are you sure you want to proceed?');
                            if(res)
                            {
                                document.getElementById('id04').style.display = 'block';
                                
                                var bttn = document.getElementById('petownerBooking');
                                
                                bttn.addEventListener('click',function(event){
                                    
                                    event.preventDefault();
                                    
                                    var fromdate = document.getElementById('fromdate').value;
                                    var todate = document.getElementById('todate').value;
                                    var fromDateObj = new Date(fromdate);
                                    var toDateObj = new Date(todate);
                                    var differ = toDateObj - fromDateObj;
                                    var totalDays =  differ / (1000 * 60 * 60 * 24);
                                    var price = totalDays * petKeeper.catprice;
                                    var owner_id = localStorage.getItem("PetOwnerID");
                                    var pet_id = localStorage.getItem("pet_id");
                                    var keeper_id = localStorage.getItem("keeper_id");
                                    var status = "requested";
                                    var isoFromDate = fromDateObj.toISOString().split('T')[0];
                                    var isoToDate = toDateObj.toISOString().split('T')[0];
                                    
                                    console.log(fromdate,todate,totalDays,price,owner_id,pet_id,keeper_id,status);
                                    
                                    var xhttpReq = new XMLHttpRequest();
                                    var url = "/ServletWithDatabaseConnection2023_2024_Maven/NewBooking";

                                    xhttpReq.open("POST", url, true);

                                    xhttpReq.onreadystatechange = function () {
                                      if (xhttpReq.readyState === 4 && xhttpReq.status === 200) 
                                      {
                                            alert('success booking');
                                            console.log("Request Succeded !");
                                      }
                                      else
                                      { 
                                          alert('error booking');
                                          console.log("Something went wrong with your request !!!");
                                      }
                                    };

                                    var data = JSON.stringify({
                                      owner_id,
                                      pet_id,
                                      keeper_id,
                                      fromdate: isoFromDate,
                                      todate: isoToDate,
                                      status,
                                      price
                                    });
                                    
                                    xhttpReq.setRequestHeader('Content-Type', 'application/json');
                                    xhttpReq.send(data);    

                                    
                                });
                                
                            }

                            else
                            {
                                alert('Booking canceled');
                            }
                        });
                    });
                }else {
                    data.forEach((petKeeper, index) => {
                        const row = tableBody.insertRow();

                        row.insertCell(0).textContent = index + 1;
                        row.insertCell(1).textContent = petKeeper.firstname;
                        row.insertCell(2).textContent = petKeeper.lastname;  
                        row.insertCell(3).textContent = petKeeper.email;
                        row.insertCell(4).textContent = petKeeper.telephone; 
                        row.insertCell(5).textContent = 'dog'; 
                        row.insertCell(6).textContent = petKeeper.dogprice; 
                        row.insertCell(7).textContent = petKeeper.city; 
                        row.insertCell(8).textContent = petKeeper.address; 
                        row.insertCell(9).textContent = petKeeper.property; 
                        row.insertCell(10).textContent = petKeeper.propertydescription;  
                        
                        const buttonCell = row.insertCell(11);
                        const button = document.createElement('button');
                        button.textContent = 'Book';
                        button.style.backgroundColor = 'green';
                        button.style.color = 'white';
                        buttonCell.appendChild(button);
                        
                        set_Value("keeper_id",petKeeper.keeper_id);

                        button.addEventListener('click',()=>
                        {
                            var res = confirm('Are you sure you want to proceed?');
                            if(res)
                            {
                                document.getElementById('id04').style.display = 'block';
                                
                                var bttn = document.getElementById('petownerBooking');
                                
                                bttn.addEventListener('click',function(event){
                                    
                                    event.preventDefault();
                                    
                                    var fromdate = document.getElementById('fromdate').value;
                                    var todate = document.getElementById('todate').value;
                                    var fromDateObj = new Date(fromdate);
                                    var toDateObj = new Date(todate);
                                    var differ = toDateObj - fromDateObj;
                                    var totalDays =  differ / (1000 * 60 * 60 * 24);
                                    var price = totalDays * petKeeper.catprice;
                                    var owner_id = localStorage.getItem("PetOwnerID");
                                    var pet_id = localStorage.getItem("pet_id");
                                    var keeper_id = localStorage.getItem("keeper_id");
                                    var status = "requested";
                                    var isoFromDate = fromDateObj.toISOString().split('T')[0];
                                    var isoToDate = toDateObj.toISOString().split('T')[0];
                                    
                                    console.log(fromdate,todate,totalDays,price,owner_id,pet_id,keeper_id,status);
                                    
                                    var xhttpReq = new XMLHttpRequest();
                                    var url = "/ServletWithDatabaseConnection2023_2024_Maven/NewBooking";

                                    xhttpReq.open("POST", url, true);

                                    xhttpReq.onreadystatechange = function () {
                                      if (xhttpReq.readyState === 4 && xhttpReq.status === 200) 
                                      {
                                            alert('success booking');
                                            console.log("Request Succeded !");
                                      }
                                      else
                                      { 
                                          alert('error booking');
                                          console.log("Something went wrong with your request !!!");
                                      }
                                    };

                                    var data = JSON.stringify({
                                      owner_id,
                                      pet_id,
                                      keeper_id,
                                      fromdate: isoFromDate,
                                      todate: isoToDate,
                                      status,
                                      price
                                    });
                                    
                                    xhttpReq.setRequestHeader('Content-Type', 'application/json');
                                    xhttpReq.send(data);    
                                });   
                            }else
                            {
                                alert('Booking canceled');
                            }
                        });
                    });
                }    
            }else{
                console.log('Found no pet keepers');
            }   
        }else{
            console.log('fetching data failed');
            const tableBody = document.querySelector('#availableKeepers tbody');
            tableBody.innerHTML = '';
        } 
    }catch(error){
        console.log('Response Error from Servlet: GetAvailableKeepers');
    }
}




// Sets values of variables in local storae
function set_Value(name,value)
{
    localStorage.setItem(name,value);
    toPrint(name);
}




// Prints local storage variable
function toPrint(name)
{
    console.log(name + ' = ' + localStorage.getItem(name));
}


