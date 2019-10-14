var fs = require('fs')

const requestHandler = (req,res) => {
    const url = req.url
    const method = req.method
    // console.log('method',method);
    
    if(url === '/') {
        res.write(`
        <html>
            <head>
                <title> my node.js app </title>
            </head>
            <body>
            <form  action="/text" method="POST" >
                    <input type="text" name="message">
                    <button type="submit" >send</button>
            </form>
            </body>
        </html>
        `)
        return res.end()
    }
    if (url === '/text' && method === 'POST'){
        const body = []
        req.on('data',(data)=>{
            console.log(JSON.stringify(data));
            console.log(data.toString());
            body.push(data) 
        })
        req.on('end',() => {
            let data = Buffer.concat(body).toString()
            let message = data.split('=')[0]
            console.log(data );
            console.log(message );

            fs.writeFileSync('text.txt',message)
        })
        
        res.statusCode = 302
        res.setHeader('Location','/')
        return res.end()
    }
    res.setHeader('Content-Type','text/html')
    res.write('<html>');
    res.write('<head><title> my node.js app</title></head>');
    res.write('<body> ');
    res.write('<h1>hello my node.js app</h1>')
    res.write('</body>')
    res.write('</html>');

    res.end()
}

module.exports = {
    handler:requestHandler
}