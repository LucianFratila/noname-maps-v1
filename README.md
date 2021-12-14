# GeoPortal
Api in Dev for a Geoportal

## OBIECTIVE

**GET all obiective**
/api/v1/obiective/


**POST add obiectiv**
/api/v1/obiective/add  

>{
    "nume": "Biserica Neagra";
    "categorie":"Biserici";
    "sat":"Brasov";
    "location": {
                "type": "Point",
                "coordinates": [
                    46.07034,
                    24.654855
                ]
            }
>}


**GET single obiectiv by id**
/api/v1/obiective/:id  

>/api/v1/obiective/61711ff5aba7a928f0a0763e


**POST update single obiectiv**
/obiectiv/update/:id


>/api/v1/obiective/update/61711ff5aba7a928f0a0763e
{
    "nume": "Biserica Neagra";
>}

**DELETE single obiectiv by id**
/obiectiv/delete/:id




# NoName-MapApp-API
# NoName-MapApp-API
