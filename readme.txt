  learn cors and origin;



  app.use(cors(
{
origin:["https://gleeful-naiad-af9083.netlify.app"],
methods:["POST","GET"],
credentials:true
} ))








vercel.json
{
    "version":2,
    "builds":[
        { "src":"*.js","use":"@vercel/node"}
    ],
"routes":[{
    "src":"/(.*)",
    "dest":"/"
}]

}




