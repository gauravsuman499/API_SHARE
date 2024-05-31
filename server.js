const express = require(`express`);
const app = express();

//import the db object
const db = require("./db.js");

//import the comapniesData model
const Company = require("./models/companiesData.js");

//Body-Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //stored data in req.body

app.get("/", (req, res) => {
  res.send("Wlcome to our Company.... How we can help you?");
});

app.post("/company", async (req, res) => {
  try {
    const data = req.body; // taking note that req.body()  contains company data

    const newCompany = new Company(data);

    const response = await newCompany.save(data);

    console.log(`data saved`);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal server error` });
  }
});

app.get('/details', async(req, res) => {
  try {
    const details = await Company.find();
    console.log(`Data fetched`);
    res.status(200).json(details);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error: `Internal server error` });

  }
})

app.get('/details/:country', async (req, res) => {
  try {
    const country = req.params.country; 
    
    const contry = await Company.find({ country: country });
    res.json(contry);
  } catch (error) {
    console.error('Error fetching persons:', error);
  res.status(500).json({ error: 'Internal server error' });
  }
})




app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
