var Joi=require("joi")
var express=require("express");
var app=express();
app.use(express.json());
courses=[{
    id:1,name:'course1'
},
{
    id:2,name:'course2'
},
{
    id:3,name:'course3'
},
]
app.get("/",(req,res)=>{
    res.send('halo');
});
app.get('/api/course',(req,res)=>{
    res.send(courses);
});
app.get('/api/course/:id',(req,res)=>{
    const course=courses.find(c=>c.id===Number(  req.params.id))
    if(!course) {
        res.status(404).send('your requesrt is not correct ')
    }
    res.send(course)
});
app.post('/api/course',(req,res)=>{
      const schema={
          name:Joi.string().min(3).required()
      }
     const result=Joi.validate(req.body,schema);
     console.log(result);
     if(result.error){
         res.status(404).send(result.error.details[0].message);
         return;
     }
    const course={
        id: courses.length +1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);

})
app.put('/api/course/:id',(req,res)=>{
    const course=courses.find(c=>c.id===Number(  req.params.id))
    if(!course) {
        res.status(404).send('your requesrt is not correct ')
    }
    const schema={
        name:Joi.string().min(3).required()
    }
   const result=Joi.validate(req.body,schema);
   if(result.error){
    res.status(404).send(result.error.details[0].message);
    return;
}
course.name=req.body.name;
res.send(course);

})
app.delete('/api/course/:id',(req,res)=>{
    const course=courses.find(c=>c.id===Number(  req.params.id))
    if(!course) {
        res.status(404).send('your requesrt is not correct ')
    }
    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
})
const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`from port ${port}`));