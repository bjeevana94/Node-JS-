const https = require('https');

// Result function
function print(city,temp){
  console.log(`Current temperature in ${city} is ${temp}F`);

}

// Error reporting Function
function errorFunc(error){
  console.log(`Error: ${error.message}`);
}

function get(zip){
  try{
      
      https.get(`https://api.wunderground.com/api/58430949e99d6f7e/geolookup/conditions/q/${zip}.json`,response => {
      let body = '';
      
      if(response.statusCode === 200){
          response.on('data', (data) => {
            body += data;
          });
          
          response.on('end', () => {
           const result = JSON.parse(body);
           print(result.location.city,result.current_observation.temp_f);   
          });
        
      }
                
      else {
      console.error(`ERROR in fetching data, Status Code: ${response.statusCode}`);
      }

    }); 

  } catch(error) { errorFunc(error); }
}

const zipcode = process.argv.slice(2);
zipcode.forEach((zip) => { get(zip); })