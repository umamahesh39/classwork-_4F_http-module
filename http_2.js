const http=require('http')


const server =http.createServer((req,res)=>{
    if(res.method==='GET'){
        res.writeHead(200,{'content-Type': 'text/html'});
        res.write('<h1> Get method is processed </h1>');
        const parsedURL= url.parse(req.url,true)
        const {username,password}=parsedURL.query
        res.write('<h3> username:</h3>  <h4> $(usernme)</h4>')
        res.write('<h3> password:</h3>  <h4> $(password)</h4>')
       
        res.end();
    }
    else if (req.method === "POST"){
        res.writeHead(200,{'content-Type': 'text/html'});
        res.write('<h1> post method is processed </h1>');
        
        let inputs =" ";
        req.on('data',(chunks)=>{
            inputs+= chunks.toString()
        })

        req.on('end',()=>{
            const {username,password}=JSON.parse(inputs)
            res.write('<h2> username:   $(usernme)</h2>')
        res.write('<h2> password:   $(password)</h2>')
        })


        res.end();
    }
    else{
        res.writeHead(405,{'content-Type': 'text/html'} );
        res.write('<center> method not found </center>')

    }

})

server.listen(3000, ()=>{
    console.log("server is running @ http://localhost:3000")
})