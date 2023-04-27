const inquirer = require ('inquirer');
const fs = require('fs');
const {Circle, Square, Triangle} = require('./library/shapes');

class Svg{
    constructor(){
        this.textElement=""
        this.shapeElement=''
    }
    render(){
        return `<svg version="1.1" xmlns="http:www.w3.org/2000/svg" width='300' height="200">`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill=${color}`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}
inquirer
.prompt([

    {
        type :"input",
        name : 'text',
        message : "TEXT: Enter 3=<x Characters"
    },
    {
        type :"input",
        name : 'text-color',
        message : "TEXT COLOR: Enter a color keyword (or a hexadecimal number)"
    },
    {
        type :"input",
        name : 'shape',
        message : "Shape Color: Enter a color keyword (or a hexadecimal number)"
    },
    {
        type :"list",
        name : 'pixel-image',
        message : "Choose your Image:",
        choices: ['Circle', 'Square', 'Triangle']
    },
    
])
.then((answers)=> {
    console.log(answers);
    fs.writeFile('new.svg', Svg(answers), (err)=>{

    });

});


)