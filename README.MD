### Node.js CRUD API
Restful CRUD API with Node.js, Express and MongoDB

## Technologies Used

 - NodeJs
 - MongoDB
 - Express 
 
### Installation
    npm install
  
### Deployment
    node server.js
    
### API Endpoints

    * Post http://127.0.0.1:3000/notes
        body: {"title":"first note","content":"hoda"}
        
    * GET http://127.0.0.1:3000/notes
        * Read all notes.
        
    * GET http://127.0.0.1:3000/notes/noteId
            * Read note by id.
        
    * PUT http://127.0.0.1:3000/notes/noteId
        * body: {"title":"first note","content":"hoda"}
                        
    * DELETE http://127.0.0.1:3000/notes/noteId
        
   
            
