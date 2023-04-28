const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Square, Triangle } = require('./library/shapes');

class SVG {
    constructor() {
        this.textElement = ""
        this.shapeElement = ''
    }
    render() {
        return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shapeElement}${this.textElement}</svg>`;

    }
    setTextElement(text, color) {
        //18 solved exception line
        if (text.length > 3) throw new Error("text cannot exceed 3 characters")
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}" >${text}</text>`
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render()
    }
}
inquirer
    .prompt([

        {
            type: "input",
            name: 'text',
            message: "TEXT: Enter 3=<x Characters"
        },
        {
            type: "input",
            name: 'textColor',
            message: "TEXT COLOR: Enter a color keyword (or a hexadecimal number)"
        },
        {
            type: "input",
            name: 'shapeColor',
            message: "Shape Color: Enter a color keyword (or a hexadecimal number)"
        },
        {
            type: "list",
            name: 'image',
            message: "Choose your Image:",
            choices: ['Circle', 'Square', 'Triangle']
        },

    ])


    .then((answers) => {
        console.log(answers);
        let shape;
        if (answers.image === 'Circle') {
            shape = new Circle()
        } else if (answers.image === 'Square') {
            shape = new Square()
        } else { shape = new Triangle() }

        shape.setColor(answers.shapeColor)
        const svg = new SVG()
        svg.setTextElement(answers.text, answers.textColor)
        svg.setShapeElement(shape)
        return fs.writeFileSync(`${answers.text}.svg`, svg.render())
    }).then(() => console.log('generated svg'))
    .catch(err => {
        console.log(err.message)
    });


