/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function onDocumentReady()
{
    open_Keepers();
    open_Owners();
    admin_Logout();
    fetch_PetKeepers();
    fetch_PetOwners();
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
    load_PetCharts();
    load_Earnings();
    });
};

document.addEventListener('DOMContentLoaded',onDocumentReady);




// Display pet keepers
function open_Keepers()
{
    var bttn = document.getElementById('openKeepers');
    
    bttn.addEventListener('click',function()
    {
        var tbl = document.getElementById('petkeepersTable');
        
        switch(tbl.style.display)
        {
            case 'block' :
                tbl.style.display = 'none';
                break;
            case 'none' :
                tbl.style.display = 'block';
                break;
            default :
                break;
        }
    });
}




// Display pet owners
function open_Owners()
{
    var bttn = document.getElementById('openOwners');
    
    bttn.addEventListener('click',function()
    {
        var tbl = document.getElementById('petownersTable');
        
        switch(tbl.style.display)
        {
            case 'block' :
                tbl.style.display = 'none';
                break;
            case 'none' :
                tbl.style.display = 'block';
                break;
            default :
                break;
        }
    });
}




// Admin's logout
function admin_Logout()
{
    var bttn = document.getElementById('admin_logout');
    
    bttn.addEventListener('click',function()
    {
       var res = confirm('Are you sure wish to log out?');
       if(res)
       {
            window.location.href = "/ServletWithDatabaseConnection2023_2024_Maven/petform.html";
       }
        
    });
}




// Deletes a user 
function delete_User(username,usertype)
{    
    var xhttpReq = new XMLHttpRequest();

    xhttpReq.onload = function () 
    {
      if (xhttpReq.readyState === 4 && xhttpReq.status === 200) 
      {
            console.log(xhttpReq.responseText);  
            console.log('Success Request & Success Deletion');
            alert('You have succesfully deleted the user ' + username);
            location.reload();
      }
      else
      {
            console.log('Error in Request',xhttpReq.status);
            alert('An error occured during the procedure.Deletion of ' + username + ' aborted!');
 
      }
    };

    xhttpReq.open("GET", "/ServletWithDatabaseConnection2023_2024_Maven/FindRegisteredUser?username=" + username + "&type=" + usertype);
    xhttpReq.send();
    
}




// An asynchronous function to fetch the pet keepers when the document is loaded 
async function fetch_PetKeepers()
{
    try 
    {
        const response = await fetch('/ServletWithDatabaseConnection2023_2024_Maven/PrintPetKeepers');
        const data = await response.json();
        const tableBody = document.querySelector('#petkeepersTable tbody');

        tableBody.innerHTML = '';

        data.forEach((petKeeper, index) => 
        {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = petKeeper.keeper_id; 
            row.insertCell(2).textContent = petKeeper.username;  
            row.insertCell(3).textContent = petKeeper.email;
            row.insertCell(4).textContent = petKeeper.firstname; 
            row.insertCell(5).textContent = petKeeper.lastname; 
            row.insertCell(6).textContent = petKeeper.city; 
            row.insertCell(7).textContent = petKeeper.address; 
            row.insertCell(8).textContent = petKeeper.telephone; 
            
            const buttonCell = row.insertCell(9);
            const button = document.createElement('button');
            button.textContent = 'Delete';
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
            buttonCell.appendChild(button);
            
            button.addEventListener('click',()=>
            {
                var res = confirm('Do you want to proceed the deletion of ' + petKeeper.username + ' from the system ?');
                if(res)
                {
                    delete_User(petKeeper.username,"petkeeper");
                }
                else
                {
                    alert('Operation aborted!');
                }
                
            });
        });
    }catch (error) {
        console.error('Error fetching pet keepers:', error);
    }
}




// An asynchronous function to fetch the pet owners when the document is loaded 
async function fetch_PetOwners() 
{
    try 
    {
        const response = await fetch('/ServletWithDatabaseConnection2023_2024_Maven/PrintPetOwners');
        const data = await response.json();
        const tableBody = document.querySelector('#petownersTable tbody');

        tableBody.innerHTML = '';

        data.forEach((petOwner, index) => 
        {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = petOwner.owner_id; 
            row.insertCell(2).textContent = petOwner.username;  
            row.insertCell(3).textContent = petOwner.email;
            row.insertCell(4).textContent = petOwner.firstname; 
            row.insertCell(5).textContent = petOwner.lastname; 
            row.insertCell(6).textContent = petOwner.city; 
            row.insertCell(7).textContent = petOwner.address; 
            row.insertCell(8).textContent = petOwner.telephone; 

            const buttonCell = row.insertCell(9);
            const button = document.createElement('button');
            button.textContent = 'Delete';
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
            buttonCell.appendChild(button);
            
            button.addEventListener('click',()=>
            {
                var res = confirm('Do you want to proceed the deletion of ' + petOwner.username + ' from the system ?');
                if(res)
                {
                    delete_User(petOwner.username,"petkeeper");
                }
                else
                {
                    alert('Operation aborted!');
                }
            });
        });
        
    }catch(error){
        console.error('Error fetching pet owners:', error);
    }
}




// An asynchronous function to fetch pet's statistics when the document is loaded 
async function load_PetCharts() 
{
    try 
    {
        const response = await fetch('/ServletWithDatabaseConnection2023_2024_Maven/PetCharts');
        const data = await response.json();
        var ctx = document.getElementById('petChart').getContext('2d');
        var petChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Dogs', 'Cats'],
                datasets: [{
                    label: 'Number of Pets',
                    data: [data.dogsCount, data.catsCount],
                    backgroundColor: ['blue', 'orange'],
                    barThickness: 50   
                }]
            }
        });
    }catch(error){
        console.error('Error:', error);
    }
}




// An asynchronous function to parse the finished bookings 
async function getFinishedBookings() 
{
    try 
    {
        const response = await fetch('/ServletWithDatabaseConnection2023_2024_Maven/FinishedBookings');
        const bookings = await response.json();
        return bookings;    
    } catch(error){
        console.error('Error fetching finished bookings:', error);
        return [];
    }
}




// Draw the chart and set the chart values
async function load_Earnings() 
{
    try
    {
        const finishedBookings = await getFinishedBookings();
        var totalEarnings = 0;

        for(var i=0; i<finishedBookings.length; i++)
        {
            var price = Number(finishedBookings[i].price);
            totalEarnings += price;
        }

        const usersPercentage = (totalEarnings * 0.85).toFixed(2);
        const appPercentage = (totalEarnings * 0.15).toFixed(2); 
        
        
        console.log('users %  = ' + usersPercentage);
        console.log('app %  = ' + appPercentage);

        var data = google.visualization.arrayToDataTable([
                ['Money', 'from total Bookins'],
                ['Users', parseFloat(usersPercentage)],
                ['App', parseFloat(appPercentage)]
            ]);

        var options = {'title':'Money earned from bookings','backgroundColor':'darkkhaki', 'width':600, 'height':400};


        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }catch(error){
        console.error('Error in load_Earnings:', error);
    }
    
}




