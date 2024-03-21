import http from 'http'

const server = http.createServer((req,res)=>{
    const method=req.method
    console.log("=====>>> ",method);
    res.end('Hello world!')
})

server.listen(5000,()=>{
    console.log("=====>>>原神启动！！！！",);
})