const Employee = require('../models/Employee');
const mongoose = require('mongoose');

/**
 * GET/
 * Homepage
*/

exports.homepage = async (req, res) => {
    const messages = await req.flash('info');
         const locals = {
             title: 'NodeJs',
             description: 'Free NodeJs User Management System'
         }
 
         let perPage = 12;
         let page = req.query.page || 1;



         try {
            const employee = await Employee.aggregate([ { $sort: { updatedAt: -1 } } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
           // const count = await Employee.count();

            res.render('index', {
                locals,
                employee,
                current: page,
                pages: Math.ceil( perPage),
                messages
            });
        } catch (error) {
             console.log(error);
        }       
}
 

// exports.homepage = async (req, res) => {
//    const messages = await req.flash('info');
//         const locals = {
//             title: 'NodeJs',
//             description: 'Free NodeJs User Management System'
//         }

//         try {
//             const employee = await Employee.find({}).limit(20);
//             res.render('index', { locals, messages, employee });
//         } catch (error) {
//             console.log(error);
//         }       
// }

/**
 * GET/
 * About
*/

exports.about = async (req, res) => {
        const locals = {
            title: 'About',
            description: 'Free NodeJs User Management System'
        }

        try {
            res.render('about', locals);
        } catch (error) {
            console.log(error);
        }       
}


/**
 * GET/
 * New Employee Form
*/

exports.addEmployee = async (req, res) => {
   
    const locals = {
        title: 'Add New Employee - NodeJs',
        description: 'Free NodeJs User Management System'
    }
    res.render('employee/add', locals);
}

/**
 * POST/
 * Create New Employee
*/

exports.postEmployee = async (req, res) => {
    console.log(req.body);

    const newEmployee = new Employee({
        Name: req.body.name,
        Email: req.body.email,
        Telephone: req.body.tel,
        Department: req.body.dept,
        Salary: req.body.salary,
        Details: req.body.details
    })

    const locals = {
        title: 'New Employee Added!',
        description: 'Free NodeJs User Management System'
    }

    try {
        await Employee.create(newEmployee);
        await req.flash('info', 'New employee has been added!')

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }   
}

/**
 * GET/
 * Employee Data
 */
exports.view = async (req, res) => {
    try{
        const employee = await Employee.findOne({ _id: req.params.id})

        const locals = {
            title: "View Employee Data",
            description: "Free NodeJs User Management System"
        };

        res.render('Employee/view', {
            locals,
            employee
        })
    } catch (error) {
        console.log(error);
    }
}


/**
 * GET/
 * Edit Employee Data
 */
exports.edit = async (req, res) => {
    try{
        const employee = await Employee.findOne({ _id: req.params.id})

        const locals = {
            title: "Edit Employee Data",
            description: "Free NodeJs User Management System"
        };

        res.render('Employee/edit', {
            locals,
            employee
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET/
 * Update Employee Data
 */
exports.editPost = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id,{
            Name: req.body.Name,
            Email: req.body.Email,
            Telephone: req.body.Telephone,
            Department: req.body.Department,
            Salary: req.body.Salary,
            updatedAt: Date.now()
        });
         await res.redirect(`/edit/${req.params.id}`);

         console.log('redirected');
    } catch (error) {
        console.log(error);
    }
}


/**
 * Delete/
 * Delete Employee Data
 */
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.deleteOne({_id: req.params.id});
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}


/**
 * Get/
 * Search Employee Data
 */
exports.searchEmployee = async (req, res) => {
    const locals = {
        title: "Search Employee Data",
        description: "Free NodeJs User Management System"
    }
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const employees = await Employee.find({
            $or: [
                { Name: { $regex: new RegExp(searchNoSpecialChar, "i")}}
            ]
        });

        res.render("search", {
            employees,
            locals
        })
    } catch (error) {
        console.log(error);
    }
}